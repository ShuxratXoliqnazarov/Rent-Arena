'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Alert, Button, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from '@/i18n/navigation'
import { supabase } from '@/lib/supabase/client'
import { ArenaRow, formatWorkingHours } from '@/lib/types'
import { useAuthStore } from '@/store/auth/authStore'
import { useHomeStore } from '@/store/home/homeStore'
import RequireAuth from '@/components/auth/require-auth'
import ArenaForm from '@/components/admin/arena-form'
import AdminSchedule from '@/components/admin/admin-schedule'
import { yellowButtonSx } from '@/components/auth/auth-card'

function AdminPanel() {
	const t = useTranslations('admin')
	const tb = useTranslations('booking')
	const { user, profile } = useAuthStore()

	const [arenas, setArenas] = useState<ArenaRow[]>([])
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [loading, setLoading] = useState(true)
	// undefined — форма закрыта, null — новое поле, ArenaRow — редактирование
	const [editing, setEditing] = useState<ArenaRow | null | undefined>(undefined)

	const load = useCallback(async () => {
		if (!user) return
		const { data, error } = await supabase
			.from('arenas')
			.select('*')
			.eq('owner_id', user.id)
			.order('id')
		if (error) console.log(error)
		const list = (data as ArenaRow[]) ?? []
		setArenas(list)
		setSelectedId(prev => prev ?? list[0]?.id ?? null)
		setLoading(false)
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	if (profile && profile.role !== 'admin') {
		return (
			<section className='md:max-w-[900px] mx-auto py-16'>
				<Alert severity='warning'>{t('not_admin')}</Alert>
			</section>
		)
	}

	if (loading || !user) {
		return (
			<div className='flex justify-center py-40'>
				<CircularProgress sx={{ color: '#FDC700' }} />
			</div>
		)
	}

	const selected = arenas.find(a => a.id === selectedId) ?? null

	return (
		<section className='md:max-w-[1100px] mx-auto py-16 flex flex-col gap-8'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold text-slate-900'>{t('title')}</h1>
					{profile?.full_name && <p className='text-slate-500'>{profile.full_name}</p>}
				</div>
				<Button startIcon={<AddIcon />} onClick={() => setEditing(null)} sx={{ ...yellowButtonSx, px: 3 }}>
					{t('add_arena')}
				</Button>
			</div>

			{arenas.length === 0 ? (
				<div className='rounded-2xl border border-dashed border-gray-300 p-10 text-center text-slate-600'>
					{t('no_arenas')}
				</div>
			) : (
				<div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6'>
					<div className='flex flex-col gap-3'>
						<h2 className='font-semibold text-slate-500 text-sm uppercase'>{t('my_arenas')}</h2>
						{arenas.map(a => (
							<button
								key={a.id}
								type='button'
								onClick={() => setSelectedId(a.id)}
								className={`rounded-xl border-2 p-4 text-left cursor-pointer transition-colors ${
									a.id === selectedId ? 'border-[#FDC700] bg-yellow-50' : 'border-gray-200 bg-white hover:border-gray-300'
								}`}
							>
								<div className='font-semibold'>{a.name}</div>
								<div className='text-xs text-slate-500 mt-1'>
									{formatWorkingHours(a.open_hour, a.close_hour)} ·{' '}
									{a.price_per_hour > 0 ? `${a.price_per_hour} ${tb('per_hour')}` : tb('price_on_request')}
								</div>
							</button>
						))}
					</div>

					{selected && (
						<div className='min-w-0 rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-4'>
							<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
								<div>
									<h2 className='text-xl font-bold'>{selected.name}</h2>
									<Link href={`/${selected.id}`} className='text-sm text-slate-500 underline'>
										{selected.location}
									</Link>
								</div>
								<Button startIcon={<EditIcon />} onClick={() => setEditing(selected)} sx={{ color: 'black', fontWeight: 'bold' }}>
									{t('edit')}
								</Button>
							</div>
							<h3 className='font-semibold'>{t('schedule')}</h3>
							<AdminSchedule key={selected.id} arena={selected} />
						</div>
					)}
				</div>
			)}

			{editing !== undefined && (
				<ArenaForm
					key={editing?.id ?? 'new'}
					open
					ownerId={user.id}
					arena={editing}
					onClose={() => setEditing(undefined)}
					onSaved={saved => {
						setEditing(undefined)
						setSelectedId(saved.id)
						load()
						// Каталог на сайте тоже должен увидеть изменения
						useHomeStore.getState().getData()
					}}
				/>
			)}
		</section>
	)
}

export default function AdminPage() {
	return (
		<RequireAuth>
			<AdminPanel />
		</RequireAuth>
	)
}
