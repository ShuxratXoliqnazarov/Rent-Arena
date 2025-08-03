'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useLocale } from 'next-intl'
import LanguageIcon from '@mui/icons-material/Language'

export default function LanguageSwitcher() {
	const router = useRouter()
	const pathname = usePathname()
	const currentLocale = useLocale()

	const handleChange = (event: SelectChangeEvent) => {
		const newLocale = event.target.value
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<Select
			value={currentLocale}
			onChange={handleChange}
			variant='outlined'
			IconComponent={LanguageIcon}
			sx={{
				color: 'black',
				height: '40px',
				ml: 2,
				border: 'none',
				fontSize: '20px',
				borderRadius: '8px',
				backgroundColor: 'transparent',
				// transition: 'all 0.3s ease',
				'.MuiOutlinedInput-notchedOutline': {
					border: 'none',
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					border: 'none',
				},
				'&:hover': {
					backgroundColor: 'transparent',
					boxShadow: '0 0 2px #FDC700',
					cursor: 'pointer',
				},
			}}
		>
			{/* <MenuItem value='ru'>🇷🇺</MenuItem>
      <MenuItem value='tj'>🇹🇯</MenuItem> */}
			<MenuItem value='ru'>🇷🇺</MenuItem>
			<MenuItem value='tj'>🇹🇯</MenuItem>
		</Select>
	)
}
