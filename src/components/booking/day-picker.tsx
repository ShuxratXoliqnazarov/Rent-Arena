'use client'

import { useLocale, useTranslations } from 'next-intl'
import { toDateKey } from '@/lib/types'

const DAYS_AHEAD = 14

export const getUpcomingDays = () => {
	const today = new Date()
	return Array.from({ length: DAYS_AHEAD }, (_, i) => {
		const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
		return { key: toDateKey(d), date: d, index: i }
	})
}

// Горизонтальная лента дат на 2 недели вперёд
export default function DayPicker({ value, onChange }: { value: string; onChange: (key: string) => void }) {
	const t = useTranslations('booking')
	const locale = useLocale() === 'tj' ? 'tg-TJ' : 'ru-RU'

	return (
		<div className='flex gap-2 overflow-x-auto pb-2 -mx-1 px-1'>
			{getUpcomingDays().map(({ key, date, index }) => {
				const active = key === value
				const weekday =
					index === 0
						? t('today')
						: index === 1
						? t('tomorrow')
						: date.toLocaleDateString(locale, { weekday: 'short' })
				return (
					<button
						key={key}
						type='button'
						onClick={() => onChange(key)}
						className={`shrink-0 min-w-[64px] rounded-xl border px-3 py-2 text-center cursor-pointer transition-colors ${
							active
								? 'bg-[#FDC700] border-[#FDC700] text-black'
								: 'bg-white border-gray-200 text-slate-700 hover:border-[#FDC700]'
						}`}
					>
						<div className='text-[11px] capitalize leading-tight'>{weekday}</div>
						<div className='text-lg font-bold leading-tight'>{date.getDate()}</div>
						<div className='text-[11px] leading-tight'>
							{date.toLocaleDateString(locale, { month: 'short' })}
						</div>
					</button>
				)
			})}
		</div>
	)
}
