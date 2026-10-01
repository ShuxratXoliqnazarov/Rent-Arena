'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { supabase } from '@/lib/supabase/client'
import { ArenaRow, formatHour } from '@/lib/types'
import { yellowButtonSx } from '@/components/auth/auth-card'

interface Props {
	open: boolean
	ownerId: string
	arena: ArenaRow | null // null — новое поле
	onClose: () => void
	onSaved: (arena: ArenaRow) => void
}

const HOURS = Array.from({ length: 25 }, (_, i) => i)

export default function ArenaForm({ open, ownerId, arena, onClose, onSaved }: Props) {
	const t = useTranslations('admin')

	const [name, setName] = useState(arena?.name ?? '')
	const [category, setCategory] = useState<ArenaRow['category']>(arena?.category ?? 'stadion')
	const [location, setLocation] = useState(arena?.location ?? '')
	const [phone, setPhone] = useState(arena?.admin_phone ?? '')
	const [price, setPrice] = useState(String(arena?.price_per_hour ?? ''))
	const [openHour, setOpenHour] = useState(arena?.open_hour ?? 8)
	const [closeHour, setCloseHour] = useState(arena?.close_hour ?? 24)
	const [coverage, setCoverage] = useState(arena?.coverage ?? '')
	const [payment, setPayment] = useState(arena?.payment_info ?? t('form_payment_default'))
	const [features, setFeatures] = useState((arena?.features ?? []).join(', '))
	const [images, setImages] = useState<string[]>(arena?.images ?? [])
	const [uploading, setUploading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')

	const upload = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? [])
		if (!files.length) return
		setUploading(true)
		setError('')
		const urls: string[] = []
		for (const file of files) {
			// Папка = id владельца, так требует политика хранилища
			const ext = file.name.split('.').pop() || 'jpg'
			const path = `${ownerId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
			const { error } = await supabase.storage.from('arena-images').upload(path, file)
			if (error) {
				setError(error.message)
				continue
			}
			urls.push(supabase.storage.from('arena-images').getPublicUrl(path).data.publicUrl)
		}
		setImages(prev => [...prev, ...urls])
		setUploading(false)
		e.target.value = ''
	}

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		if (closeHour <= openHour) {
			setError(`${t('form_close')} > ${t('form_open')}`)
			return
		}
		setSaving(true)
		setError('')
		const values = {
			owner_id: ownerId,
			name: name.trim(),
			category,
			location: location.trim(),
			admin_phone: phone.trim(),
			price_per_hour: Number(price) || 0,
			open_hour: openHour,
			close_hour: closeHour,
			coverage: coverage.trim(),
			payment_info: payment.trim(),
			features: features
				.split(',')
				.map(f => f.trim())
				.filter(Boolean),
			images,
		}
		const query = arena
			? supabase.from('arenas').update(values).eq('id', arena.id)
			: supabase.from('arenas').insert(values)
		const { data, error } = await query.select().single()
		setSaving(false)
		if (error) {
			setError(error.message)
			return
		}
		onSaved(data as ArenaRow)
	}

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<form onSubmit={submit}>
				<DialogTitle sx={{ fontWeight: 'bold' }}>{arena ? t('edit') : t('add_arena')}</DialogTitle>
				<DialogContent className='flex flex-col gap-4' sx={{ pt: '8px !important' }}>
					<TextField label={t('form_name')} required value={name} onChange={e => setName(e.target.value)} />
					<TextField
						select
						label={t('form_category')}
						value={category}
						onChange={e => setCategory(e.target.value as ArenaRow['category'])}
					>
						<MenuItem value='stadion'>{t('cat_stadion')}</MenuItem>
						<MenuItem value='footzal'>{t('cat_footzal')}</MenuItem>
					</TextField>
					<TextField label={t('form_location')} required value={location} onChange={e => setLocation(e.target.value)} />
					<TextField label={t('form_phone')} required type='tel' value={phone} onChange={e => setPhone(e.target.value)} />
					<TextField
						label={t('form_price')}
						type='number'
						value={price}
						onChange={e => setPrice(e.target.value)}
						slotProps={{ htmlInput: { min: 0 } }}
					/>
					<div className='grid grid-cols-2 gap-4'>
						<TextField select label={t('form_open')} value={openHour} onChange={e => setOpenHour(Number(e.target.value))}>
							{HOURS.slice(0, 24).map(h => (
								<MenuItem key={h} value={h}>
									{formatHour(h)}
								</MenuItem>
							))}
						</TextField>
						<TextField select label={t('form_close')} value={closeHour} onChange={e => setCloseHour(Number(e.target.value))}>
							{HOURS.slice(1).map(h => (
								<MenuItem key={h} value={h}>
									{formatHour(h)}
								</MenuItem>
							))}
						</TextField>
					</div>
					<TextField label={t('form_coverage')} value={coverage} onChange={e => setCoverage(e.target.value)} />
					<TextField label={t('form_payment')} value={payment} onChange={e => setPayment(e.target.value)} />
					<TextField
						label={t('form_features')}
						placeholder='Освещение, Раздевалки, Душ'
						value={features}
						onChange={e => setFeatures(e.target.value)}
					/>

					<div className='flex flex-col gap-2'>
						<span className='text-sm text-slate-600'>{t('form_images')}</span>
						<div className='grid grid-cols-3 gap-2'>
							{images.map(src => (
								<div key={src} className='relative'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={src} alt='' className='w-full h-24 object-cover rounded-lg' />
									<button
										type='button'
										title={t('remove')}
										onClick={() => setImages(prev => prev.filter(i => i !== src))}
										className='absolute top-1 right-1 bg-white/90 rounded-full p-0.5 cursor-pointer hover:text-red-500'
									>
										<CloseIcon sx={{ fontSize: 16 }} />
									</button>
								</div>
							))}
						</div>
						<Button component='label' variant='outlined' disabled={uploading} sx={{ borderColor: '#FDC700', color: 'black' }}>
							{uploading ? t('uploading') : t('upload')}
							<input type='file' accept='image/*' multiple hidden onChange={upload} />
						</Button>
					</div>

					{error && <Alert severity='error'>{error}</Alert>}
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button onClick={onClose} sx={{ color: '#64748b' }}>
						{t('cancel')}
					</Button>
					<Button type='submit' variant='contained' disabled={saving || uploading} sx={{ ...yellowButtonSx, px: 3 }}>
						{t('save')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
