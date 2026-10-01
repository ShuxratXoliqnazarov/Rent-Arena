'use client'

import { FormEvent, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Alert, Button, TextField } from '@mui/material'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthStore } from '@/store/auth/authStore'
import AuthCard, { yellowButtonSx } from '@/components/auth/auth-card'

function LoginForm() {
	const t = useTranslations('auth')
	const router = useRouter()
	const next = useSearchParams().get('next') || '/'
	const { signIn } = useAuthStore()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		const err = await signIn(email.trim(), password)
		setLoading(false)
		if (err) {
			setError(err)
			return
		}
		router.replace(next)
	}

	return (
		<AuthCard title={t('login_title')}>
			{next !== '/' && <Alert severity='info'>{t('login_required')}</Alert>}
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
					autoComplete='current-password'
				/>
				{error && <Alert severity='error'>{error}</Alert>}
				<Button type='submit' variant='contained' disabled={loading} sx={yellowButtonSx}>
					{t('submit_login')}
				</Button>
			</form>
			<p className='text-center text-sm text-slate-600'>
				{t('no_account')}{' '}
				<Link
					href={next !== '/' ? `/register?next=${encodeURIComponent(next)}` : '/register'}
					className='font-semibold text-black underline'
				>
					{t('submit_register')}
				</Link>
			</p>
		</AuthCard>
	)
}

export default function LoginPage() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	)
}
