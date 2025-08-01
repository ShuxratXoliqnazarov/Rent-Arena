'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() // правильно получаем текущий язык


const handleChange = (event: SelectChangeEvent) => {
  const newLocale = event.target.value
  router.replace(pathname, { locale: newLocale })
}


  return (
    <Select
      value={currentLocale}
      onChange={handleChange}
      variant='standard'
      sx={{ color: 'black', ml: 2 }}
    >
      <MenuItem value='ru'>🇷🇺 Рус</MenuItem>
      <MenuItem value='tj'>🇹🇯 Тоҷ</MenuItem>
    </Select>
  )
}
