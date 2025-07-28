'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import Link from 'next/link'
import ClientMenu from '../menu/menu'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	const [open, setOpen] = useState(false)

	function toggleOpen(){
		open ? setOpen(false) : setOpen(true)
	}

	return (
		<>
			<header className='bg-black/5 backdrop-blur-sm fixed w-[100%] top-0 z-50'>
				<nav className=' md:max-w-[1400px] md:m-auto flex flex-row justify-between items-center '>
					<Image
						src={'/assets/logo.png'}
						width={100}
						height={100}
						alt=''
						className='w-[100px] h-[100px]'
					/>
					<div className='md:flex items-center  gap-5  hidden'>
						<p className='text-[20px] hover:text-[#459A65] hover:border-b hover:border-[#459A65]'>
							Поля
						</p>
						<div className='flex items-center gap-5'>
							<Button sx={{ border: '1px solid #459A65', color: '#459A65' }}>
								Войти
							</Button>
							<Button sx={{ backgroundColor: '#10A865', color: 'white' }}>
								Регистрация
							</Button>
						</div>
					</div>

					<div className='block md:hidden'>
						<Button color='inherit' onClick={toggleOpen} className=''>
							<MenuIcon
								sx={{ fontSize: '30px' }}
								className='hover:text-[#0DA366]'
							/>
						</Button>

						{open && <ClientMenu />}
					</div>
				</nav>
			</header>

			<main className='flex-grow p-4 md:mt-[98px] mb-5'>{children}</main>

			<footer className='bg-[#0F172A] text-white py-8 '>
				<section className='md:max-w-[1400px] md:m-auto flex md:flex-row flex-col gap-8 md:gap-0 justify-between items-center'>
					<ul className='flex flex-col gap-6'>
						<li className='md:mb-6'>
							<Image
								src={'/assets/logo.png'}
								alt='logo'
								width={100}
								height={100}
								className='w-[100px] h-[100px]'
							/>
						</li>
						<li>
							<p className='md:w-[55%]'>
								Лучшая платформа для бронирования футбольных полей. Играй там,
								где удобно, когда удобно.
							</p>
						</li>
						<li>
							<p>
								<LocalPhoneOutlinedIcon sx={{ color: '#0DA366' }} />
								+992 991-991-905
							</p>
						</li>
						<li>
							<p>
								<AlternateEmailOutlinedIcon sx={{ color: '#0DA366' }} />
								khiliqnazarovshuhrat@gmail.com
							</p>
						</li>
					</ul>

					<div className='flex justify-between w-[100%] md:w-[40%]'>
						<ul className='flex flex-col gap-6'>
							<li className='mb-6 font-bold'>Страницы</li>
							<li className='hover:text-[#47d67d]'>
								<Link href={'/'}>Главная</Link>
							</li>
							<li className='hover:text-[#47d67d]'>
								<Link href={'/'}>Стадионы</Link>
							</li>
							<li className='hover:text-[#47d67d]'>
								{' '}
								<Link href={''}> О нас</Link>
							</li>
						</ul>
						<ul className='flex flex-col gap-6'>
							<li className='mb-6 font-bold'>Паддержка</li>
							<li>Помощь</li>
							<li>Контакты</li>
							<li>Отзивы сайта</li>
						</ul>
					</div>
				</section>
			</footer>
		</>
	)
}

export default Layout
