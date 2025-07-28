'use client'

import { Button } from '@mui/material'

const ClientMenu = () => {
	return (
		<>
			<div className='flex items-center  gap-5  flex-col'>
				<p className='text-[20px] hover:text-[#459A65] hover:border-b hover:border-[#459A65]'>
					Поля
				</p>
				<Button sx={{ border: '1px solid #459A65', color: '#459A65' }}>
					Войти
				</Button>
				<Button sx={{ backgroundColor: '#10A865', color: 'white' }}>
					Регистрация
				</Button>
			</div>
		</>
	)
}

export default ClientMenu
