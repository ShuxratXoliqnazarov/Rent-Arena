'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { supabase } from '@/lib/supabase/client'
import { ArenaRow, Booking, formatSlot, toDateKey } from '@/lib/types'
import DayPicker from '@/components/booking/day-picker'
import { isPastSlot } from '@/components/booking/slot-picker'
import { yellowButtonSx } from '@/components/auth/auth-card'

// Расписание одного поля на выбранный день: кто и когда забронировал
export default function AdminSchedule({ arena }: { arena: ArenaRow }) {
	const t = useTranslations('admin')

	const [date, setDate] = useState(() => toDateKey(new Date()))
	const [bookings, setBookings] = useState<Booking[]>([])
	const [loading, setLoading] = useState(true)
	const [manualHour, setManualHour] = useState<number | null>(null)
	const [customerName, setCustomerName] = useState('')
	const [customerPhone, setCustomerPhone] = useState('')
	const [error, setError] = useState('')

	const load = useCallback(async () => {
		const { data, error } = await supabase
			.from('bookings')
			.select('*')
			.eq('arena_id', arena.id)
			.eq('date', date)
			.eq('status', 'confirmed')
			.order('hour')
		if (error) console.log(error)
		setBookings((data as Booking[]) ?? [])
		setLoading(false)
	}, [arena.id, date])

	useEffect(() => {
		setLoading(true)
		load()
	}, [load])

	// Новая бронь от клиента сразу появляется в расписании
	useEffect(() => {
		const channel = supabase
			.channel(`arena-${arena.id}-bookings`)
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'bookings', filter: `arena_id=eq.${arena.id}` },
				() => load()
			)
			.subscribe()
		return () => {
			supabase.removeChannel(channel)
		}
	}, [arena.id, load])

	const byHour = new Map(bookings.map(b => [b.hour, b]))
	const hours = Array.from({ length: arena.close_hour - arena.open_hour }, (_, i) => arena.open_hour + i)

	const openManual = (hour: number) => {
		setCustomerName('')
		setCustomerPhone('')
		setError('')
		setManualHour(hour)
	}

	const saveManual = async (e: FormEvent) => {
		e.preventDefault()
		if (manualHour === null) return
		const { error } = await supabase.from('bookings').insert({
			arena_id: arena.id,
			date,
			hour: manualHour,
			customer_name: customerName.trim(),
			customer_phone: customerPhone.trim(),
			source: 'manual',
		})
		if (error) {
			setError(error.message)
			return
		}
		setManualHour(null)
		load()
	}

	const cancel = async (b: Booking) => {
		if (!confirm(`${t('cancel_booking')}: ${formatSlot(b.hour)} — ${b.customer_name}?`)) return
		const { error } = await supabase.rpc('cancel_booking', { p_booking_id: b.id })
		if (error) alert(error.message)
		load()
	}

	return (
		<div className='flex flex-col gap-4'>
			<DayPicker value={date} onChange={setDate} />

			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 text-sm'>
				<span className='font-semibold'>{t('bookings_today', { count: bookings.length })}</span>
				<span className='text-slate-500 flex items-center gap-1'>
					<span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
					{t('live')}
				</span>
			</div>
			<p className='text-xs text-slate-500'>{t('free_slot_hint')}</p>

			{loading ? (
				<div className='flex justify-center py-10'>
					<CircularProgress sx={{ color: '#FDC700' }} />
				</div>
			) : (
				<div className='flex flex-col gap-2'>
					{hours.map(hour => {
						const b = byHour.get(hour)
						const past = isPastSlot(date, hour)
						if (b) {
							return (
								<div
									key={hour}
									className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3'
								>
									<span className='font-bold w-28 shrink-0'>{formatSlot(hour)}</span>
									<span className='font-semibold flex-1'>{b.customer_name || '—'}</span>
									{b.customer_phone && (
										<a href={`tel:${b.customer_phone}`} className='text-sm text-slate-700 flex items-center gap-1'>
											<PhoneIcon sx={{ fontSize: 16 }} /> {b.customer_phone}
										</a>
									)}
									<span
										className={`text-xs rounded-full px-2 py-0.5 w-fit ${
											b.source === 'online' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'
										}`}
									>
										{b.source === 'online' ? t('online') : t('manual')}
									</span>
									{!past && (
										<Button size='small' onClick={() => cancel(b)} sx={{ color: '#dc2626', fontSize: 12 }}>
											{t('cancel_booking')}
										</Button>
									)}
								</div>
							)
						}
						return (
							<button
								key={hour}
								type='button'
								disabled={past}
								onClick={() => openManual(hour)}
								className={`flex items-center gap-4 rounded-xl border px-4 py-3 text-left ${
									past
										? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
										: 'border-green-200 bg-green-50 text-green-800 hover:border-[#FDC700] cursor-pointer'
								}`}
							>
								<span className='font-bold w-28 shrink-0'>{formatSlot(hour)}</span>
								<span className='text-sm'>{past ? '' : '+'}</span>
							</button>
						)
					})}
				</div>
			)}

			<Dialog open={manualHour !== null} onClose={() => setManualHour(null)} fullWidth maxWidth='xs'>
				<form onSubmit={saveManual}>
					<DialogTitle sx={{ fontWeight: 'bold' }}>
						{manualHour !== null && t('manual_title', { slot: formatSlot(manualHour) })}
					</DialogTitle>
					<DialogContent className='flex flex-col gap-4' sx={{ pt: '8px !important' }}>
						<TextField label={t('customer_name')} required value={customerName} onChange={e => setCustomerName(e.target.value)} />
						<TextField label={t('customer_phone')} type='tel' value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
						{error && <Alert severity='error'>{error}</Alert>}
					</DialogContent>
					<DialogActions sx={{ px: 3, pb: 3 }}>
						<Button onClick={() => setManualHour(null)} sx={{ color: '#64748b' }}>
							{t('cancel')}
						</Button>
						<Button type='submit' variant='contained' sx={{ ...yellowButtonSx, px: 3 }}>
							{t('save')}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	)
}
