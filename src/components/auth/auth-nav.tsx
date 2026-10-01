'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthStore } from '@/store/auth/authStore'

const linkSx = {
	border: 'none',
	fontSize: '12px',
	fontWeight: 'bold',
	color: 'black',
	'&:hover': { color: '#FDC700' },
}

// Кнопки входа / профиля в шапке. vertical — для мобильного меню
export default function AuthNav({ vertical = false, onNavigate }: { vertical?: boolean; onNavigate?: () => void }) {
	const t = useTranslations('nav')
	const router = useRouter()
	const { user, profile, loading, init, signOut } = useAuthStore()

	useEffect(() => {
		init()
	}, [init])

	if (loading) return null

	const wrap = vertical ? 'flex flex-col items-start gap-2 px-4 py-2' : 'flex items-center gap-3'

	if (!user) {
		return (
			<div className={wrap}>
				<Link href='/login' onClick={onNavigate}>
					<Button sx={linkSx}>{t('login')}</Button>
				</Link>
				<Link href='/register' onClick={onNavigate}>
					<Button
						sx={{
							backgroundColor: '#FDC700',
							color: 'black',
							fontWeight: 'bold',
							fontSize: '12px',
							borderRadius: 2,
							px: 2,
							'&:hover': { backgroundColor: '#FDD500' },
						}}
					>
						{t('register')}
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className={wrap}>
			{profile?.role === 'admin' ? (
				<Link href='/admin' onClick={onNavigate}>
					<Button sx={linkSx}>{t('admin')}</Button>
				</Link>
			) : (
				<Link href='/my-bookings' onClick={onNavigate}>
					<Button sx={linkSx}>{t('my_bookings')}</Button>
				</Link>
			)}
			<Button
				sx={{ ...linkSx, color: '#64748b' }}
				onClick={async () => {
					onNavigate?.()
					await signOut()
					router.replace('/')
				}}
			>
				{t('logout')}
			</Button>
		</div>
	)
}
