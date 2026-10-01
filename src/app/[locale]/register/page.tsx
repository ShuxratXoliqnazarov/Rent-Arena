'use client'

import { FormEvent, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Alert, Button, TextField } from '@mui/material'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import StadiumIcon from '@mui/icons-material/Stadium'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthStore } from '@/store/auth/authStore'
import AuthCard, { yellowButtonSx } from '@/components/auth/auth-card'
import { Role } from '@/lib/types'

function RegisterForm() {
	const t = useTranslations('auth')
	const router = useRouter()
	const params = useSearchParams()
	const next = params.get('next') || '/'
	const { signUp } = useAuthStore()

	const [role, setRole] = useState<Role>(params.get('role') === 'admin' ? 'admin' : 'client')
	const [fullName, setFullName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [confirmSent, setConfirmSent] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		const res = await signUp({
			email: email.trim(),
			password,
			fullName: fullName.trim(),
			phone: phone.trim(),
			role,
		})
		setLoading(false)
		if (res.error) {
			setError(res.error)
			return
		}
		if (res.needsConfirm) {
			setConfirmSent(true)
			return
		}
		router.replace(role === 'admin' ? '/admin' : next)
	}

	if (confirmSent) {
		return (
			<AuthCard title={t('register_title')}>
				<Alert severity='success'>{t('confirm_email', { email })}</Alert>
				<Link href='/login' className='text-center font-semibold underline'>
					{t('submit_login')}
				</Link>
			</AuthCard>
		)
	}

	const roles = [
		{ value: 'client' as Role, icon: <SportsSoccerIcon />, title: t('role_client'), hint: t('role_client_hint') },
		{ value: 'admin' as Role, icon: <StadiumIcon />, title: t('role_admin'), hint: t('role_admin_hint') },
	]

	return (
		<AuthCard title={t('register_title')}>
			<div className='flex flex-col gap-2'>
				<span className='text-sm text-slate-600'>{t('role_label')}</span>
				<div className='grid grid-cols-2 gap-3'>
					{roles.map(r => (
						<button
							key={r.value}
							type='button'
							onClick={() => setRole(r.value)}
							className={`rounded-xl border-2 p-3 text-left transition-colors cursor-pointer ${
								role === r.value
									? 'border-[#FDC700] bg-yellow-50'
									: 'border-gray-200 hover:border-gray-300'
							}`}
						>
							<div className='flex items-center gap-2 font-semibold'>
								{r.icon}
								{r.title}
							</div>
							<div className='text-xs text-slate-500 mt-1'>{r.hint}</div>
						</button>
					))}
				</div>
			</div>

			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<TextField
					label={t('full_name')}
					required
					value={fullName}
					onChange={e => setFullName(e.target.value)}
					autoComplete='name'
				/>
				<TextField
					label={t('phone')}
					required
					type='tel'
					placeholder='+992 90 000 00 00'
					value={phone}
					onChange={e => setPhone(e.target.value)}
					autoComplete='tel'
				/>
				<TextField
					label={t('email')}
					type='email'
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
					autoComplete='email'
				/>
				<TextField
					label={t('password')}
					type='password'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
					helperText={t('password_hint')}
					slotProps={{ htmlInput: { minLength: 6 } }}
					autoComplete='new-password'
				/>
				{error && <Alert severity='error'>{error}</Alert>}
				<Button type='submit' variant='contained' disabled={loading} sx={yellowButtonSx}>
					{t('submit_register')}
				</Button>
			</form>
			<p className='text-center text-sm text-slate-600'>
				{t('have_account')}{' '}
				<Link href='/login' className='font-semibold text-black underline'>
					{t('submit_login')}
				</Link>
			</p>
		</AuthCard>
	)
}

export default function RegisterPage() {
	return (
		<Suspense>
			<RegisterForm />
		</Suspense>
	)
}
