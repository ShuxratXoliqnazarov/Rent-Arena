'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import { useRouter } from '@/i18n/navigation'
import { useAuthStore } from '@/store/auth/authStore'

// Показывает страницу только вошедшим пользователям, остальных отправляет на вход
export default function RequireAuth({ children }: { children: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const { user, loading, init } = useAuthStore()

	useEffect(() => {
		init()
	}, [init])

	useEffect(() => {
		if (!loading && !user) {
			// pathname содержит локаль (/ru/...), убираем её для next
			const path = pathname.replace(/^\/(ru|tj)(?=\/|$)/, '') || '/'
			router.replace(`/login?next=${encodeURIComponent(path)}`)
		}
	}, [loading, user, pathname, router])

	if (loading || !user) {
		return (
			<div className='flex justify-center py-40'>
				<CircularProgress sx={{ color: '#FDC700' }} />
			</div>
		)
	}

	return <>{children}</>
}
