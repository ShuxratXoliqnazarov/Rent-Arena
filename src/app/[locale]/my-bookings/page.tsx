'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button, CircularProgress } from '@mui/material'
import LocationOn from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import { Booking, formatSlot } from '@/lib/types'
import { useAuthStore } from '@/store/auth/authStore'
import RequireAuth from '@/components/auth/require-auth'
import { isPastSlot } from '@/components/booking/slot-picker'

type BookingWithArena = Booking & {
	arenas: { id: number; name: string; location: string; price_per_hour: number } | null
}

// Брони одного поля в один день — показываем одной карточкой
interface Group {
	key: string
	date: string
	arena: BookingWithArena['arenas']
	items: BookingWithArena[]
}

const groupBookings = (list: BookingWithArena[]) => {
	const groups: Group[] = []
	for (const b of list) {
		const key = `${b.date}-${b.arena_id}`
		const last = groups[groups.length - 1]
		if (last && last.key === key) last.items.push(b)
		else groups.push({ key, date: b.date, arena: b.arenas, items: [b] })
	}
	return groups
}

function MyBookings() {
	const t = useTranslations('my')
	const locale = useLocale() === 'tj' ? 'tg-TJ' : 'ru-RU'
	const { user } = useAuthStore()

	const [bookings, setBookings] = useState<BookingWithArena[]>([])
	const [loading, setLoading] = useState(true)

	const load = useCallback(async () => {
		if (!user) return
		const { data, error } = await supabase
			.from('bookings')
			.select('*, arenas(id, name, location, price_per_hour)')
			.eq('user_id', user.id)
			.order('date', { ascending: true })
			.order('hour', { ascending: true })
		if (error) console.log(error)
		setBookings((data as BookingWithArena[]) ?? [])
		setLoading(false)
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	const cancel = async (id: number) => {
		if (!confirm(t('confirm_cancel'))) return
		const { error } = await supabase.rpc('cancel_booking', { p_booking_id: id })
		if (error) alert(error.message)
		load()
	}

	if (loading) {
		return (
			<div className='flex justify-center py-40'>
				<CircularProgress sx={{ color: '#FDC700' }} />
			</div>
		)
	}

	const upcoming = groupBookings(
		bookings.filter(b => b.status === 'confirmed' && !isPastSlot(b.date, b.hour))
	)
	const past = groupBookings(
		bookings.filter(b => b.status === 'cancelled' || isPastSlot(b.date, b.hour)).reverse()
	)

	const formatDate = (d: string) =>
		new Date(d + 'T00:00:00').toLocaleDateString(locale, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		})

	const renderGroup = (g: Group, active: boolean) => (
		<div
			key={g.key + (active ? '' : '-past')}
			className={`rounded-2xl border p-5 flex flex-col gap-3 ${
				active ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-70'
			}`}
		>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1'>
				<Link href={`/${g.arena?.id}`} className='text-lg font-bold text-slate-900 hover:underline'>
					{g.arena?.name}
				</Link>
				<span className='text-sm font-semibold capitalize text-slate-700'>{formatDate(g.date)}</span>
			</div>
			<div className='flex items-center text-sm text-slate-500'>
				<LocationOn fontSize='small' className='text-yellow-500 mr-1' />
				{g.arena?.location}
			</div>
			<div className='flex flex-wrap gap-2'>
				{g.items.map(b => (
					<span
						key={b.id}
						className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-sm font-semibold ${
							b.status === 'cancelled'
								? 'border-gray-200 text-gray-400 line-through'
								: active
								? 'border-[#FDC700] bg-yellow-50 text-black'
								: 'border-gray-200 text-slate-600'
						}`}
						title={b.status === 'cancelled' ? t('cancelled') : undefined}
					>
						{formatSlot(b.hour)}
						{active && (
							<button
								type='button'
								onClick={() => cancel(b.id)}
								title={t('cancel')}
								className='cursor-pointer text-slate-400 hover:text-red-500'
							>
								<CloseIcon sx={{ fontSize: 16 }} />
							</button>
						)}
					</span>
				))}
			</div>
		</div>
	)

	return (
		<section className='md:max-w-[900px] mx-auto py-16 flex flex-col gap-8'>
			<h1 className='text-3xl font-bold text-slate-900'>{t('title')}</h1>

			{bookings.length === 0 ? (
				<div className='rounded-2xl border border-dashed border-gray-300 p-10 text-center flex flex-col items-center gap-4'>
					<p className='text-slate-600'>{t('empty')}</p>
					<Link href='/all-arenas'>
						<Button
							sx={{
								backgroundColor: '#FDC700',
								color: 'black',
								fontWeight: 'bold',
								borderRadius: 2,
								px: 3,
								'&:hover': { backgroundColor: '#FDD500' },
							}}
						>
							{t('find')}
						</Button>
					</Link>
				</div>
			) : (
				<>
					{upcoming.length > 0 && (
						<div className='flex flex-col gap-4'>
							<h2 className='text-xl font-semibold'>{t('upcoming')}</h2>
							{upcoming.map(g => renderGroup(g, true))}
						</div>
					)}
					{past.length > 0 && (
						<div className='flex flex-col gap-4'>
							<h2 className='text-xl font-semibold text-slate-500'>{t('past')}</h2>
							{past.map(g => renderGroup(g, false))}
						</div>
					)}
				</>
			)}
		</section>
	)
}

export default function MyBookingsPage() {
	return (
		<RequireAuth>
			<MyBookings />
		</RequireAuth>
	)
}
