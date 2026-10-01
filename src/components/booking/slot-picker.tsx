'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Alert, Button, CircularProgress } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link, useRouter } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import { Arena, formatSlot, toDateKey } from '@/lib/types'
import { useAuthStore } from '@/store/auth/authStore'
import DayPicker from './day-picker'

// Часы, которые уже прошли сегодня
export const isPastSlot = (dateKey: string, hour: number) => {
	const now = new Date()
	if (dateKey !== toDateKey(now)) return dateKey < toDateKey(now)
	return hour <= now.getHours()
}

export default function SlotPicker({ arena }: { arena: Arena }) {
	const t = useTranslations('booking')
	const router = useRouter()
	const { user, profile } = useAuthStore()

	const [date, setDate] = useState(() => toDateKey(new Date()))
	const [busy, setBusy] = useState<number[]>([])
	const [loading, setLoading] = useState(true)
	const [selected, setSelected] = useState<number[]>([])
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	const loadBusy = useCallback(async () => {
		setLoading(true)
		const { data, error } = await supabase.rpc('get_busy_hours', {
			p_arena_id: Number(arena.id),
			p_date: date,
		})
		if (error) console.log(error)
		setBusy((data as number[] | null) ?? [])
		setLoading(false)
	}, [arena.id, date])

	useEffect(() => {
		setSelected([])
		loadBusy()
	}, [loadBusy])

	const hours = Array.from(
		{ length: arena.closeHour - arena.openHour },
		(_, i) => arena.openHour + i
	)
	const hasFree = hours.some(h => !busy.includes(h) && !isPastSlot(date, h))

	const toggle = (hour: number) => {
		setMessage(null)
		setSelected(prev =>
			prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort((a, b) => a - b)
		)
	}

	const book = async () => {
		if (!user) {
			router.push(`/login?next=${encodeURIComponent('/' + arena.id)}`)
			return
		}
		setSubmitting(true)
		setMessage(null)
		// Одним запросом: либо бронируются все выбранные часы, либо ни один
		const { error } = await supabase.from('bookings').insert(
			selected.map(hour => ({
				arena_id: Number(arena.id),
				user_id: user.id,
				date,
				hour,
				customer_name: profile?.full_name ?? '',
				customer_phone: profile?.phone ?? '',
				source: 'online',
			}))
		)
		setSubmitting(false)
		if (error) {
			setMessage({
				type: 'error',
				text: error.code === '23505' ? t('conflict') : error.message,
			})
		} else {
			setMessage({ type: 'success', text: t('success') })
			setSelected([])
		}
		loadBusy()
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-baseline justify-between'>
				<h3 className='font-semibold text-slate-900'>{t('title')}</h3>
				<span className='font-bold text-slate-900'>
					{arena.price > 0 ? `${arena.price} ${t('per_hour')}` : t('price_on_request')}
				</span>
			</div>

			<div>
				<div className='text-sm text-slate-500 mb-2'>{t('choose_date')}</div>
				<DayPicker value={date} onChange={setDate} />
			</div>

			<div>
				<div className='text-sm text-slate-500 mb-2'>{t('choose_time')}</div>
				{loading ? (
					<div className='flex justify-center py-6'>
						<CircularProgress size={28} sx={{ color: '#FDC700' }} />
					</div>
				) : (
					<>
						<div className='grid grid-cols-3 gap-2'>
							{hours.map(hour => {
								const isBusy = busy.includes(hour)
								const isPast = isPastSlot(date, hour)
								const isSelected = selected.includes(hour)
								const disabled = isBusy || isPast
								return (
									<button
										key={hour}
										type='button'
										disabled={disabled}
										onClick={() => toggle(hour)}
										title={isBusy ? t('busy') : isPast ? t('past') : t('free')}
										className={`rounded-lg border py-2 text-xs font-semibold transition-colors ${
											isSelected
												? 'bg-[#FDC700] border-[#FDC700] text-black cursor-pointer'
												: isBusy
												? 'bg-red-50 border-red-200 text-red-400 line-through cursor-not-allowed'
												: isPast
												? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
												: 'bg-green-50 border-green-200 text-green-800 hover:border-[#FDC700] cursor-pointer'
										}`}
									>
										{formatSlot(hour)}
									</button>
								)
							})}
						</div>
						{!hasFree && <p className='text-sm text-slate-500 mt-3 text-center'>{t('closed_day')}</p>}
						<div className='flex gap-4 text-[11px] text-slate-500 mt-3'>
							<span className='flex items-center gap-1'>
								<span className='w-3 h-3 rounded bg-green-50 border border-green-200' /> {t('free')}
							</span>
							<span className='flex items-center gap-1'>
								<span className='w-3 h-3 rounded bg-red-50 border border-red-200' /> {t('busy')}
							</span>
							<span className='flex items-center gap-1'>
								<span className='w-3 h-3 rounded bg-[#FDC700]' /> {t('selected')}
							</span>
						</div>
					</>
				)}
			</div>

			{message && (
				<Alert severity={message.type}>
					{message.text}{' '}
					{message.type === 'success' && (
						<Link href='/my-bookings' className='font-semibold underline'>
							→
						</Link>
					)}
				</Alert>
			)}

			{selected.length > 0 && (
				<div className='flex items-center justify-between text-sm'>
					<span>{t('hours_selected', { count: selected.length })}</span>
					{arena.price > 0 && (
						<span className='font-bold'>
							{t('total')}: {arena.price * selected.length} {t('currency')}
						</span>
					)}
				</div>
			)}

			<Button
				variant='contained'
				disabled={selected.length === 0 || submitting}
				onClick={book}
				sx={{
					backgroundColor: '#FDC700',
					color: 'black',
					fontWeight: 'bold',
					borderRadius: 2,
					py: 1.3,
					boxShadow: 'none',
					'&:hover': { backgroundColor: '#FDD500', boxShadow: 'none' },
				}}
			>
				{user ? t('book_btn') : t('login_to_book')}
			</Button>

			<div className='text-center text-xs text-slate-500'>
				{t('or_call')}:{' '}
				<a href={`tel:${arena.adminPhone}`} className='font-semibold text-slate-700 whitespace-nowrap'>
					<PhoneIcon sx={{ fontSize: 14 }} /> {arena.adminPhone}
				</a>
			</div>
		</div>
	)
}
