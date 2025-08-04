'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import Link from 'next/link'
import ClientMenu from '../menu/menu'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageSwitcher from '../languageSwitcher/languageSwitcher'
import { useTranslations } from 'next-intl'

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	const t = useTranslations('nav')

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<header className='bg-black/5 backdrop-blur-sm fixed w-full top-0 z-50'>
				<nav className='md:max-w-[1200px] md:m-auto flex flex-row justify-between items-center'>
					<Image
						src={'/assets/logo.png'}
						width={100}
						height={100}
						alt='logo'
						className='w-[90px] h-[90px]'
					/>
					<div className='md:flex items-center gap-5 hidden'>
						<Link href='/'>
							<Button
								sx={{
									border: 'none',
									fontSize: '12px',
									fontWeight: 'bold',
									color: 'black',
									'&:hover': { color: '#FDC700' },
								}}
							>
								{t('home')}
							</Button>
						</Link>

						<Link href='/all-arenas'>
							<Button
								sx={{
									border: 'none',
									fontSize: '12px',
									fontWeight: 'bold',
									color: 'black',
									'&:hover': { color: '#FDC700' },
								}}
							>
								{t('all_stadions')}
							</Button>
						</Link>

						<Link href='/footzali'>
							<Button
								sx={{
									border: 'none',
									fontSize: '12px',
									fontWeight: 'bold',
									color: 'black',
									'&:hover': { color: '#FDC700' },
								}}
							>
								{t('footzali')}
							</Button>
						</Link>

						<Link href='/stadioni'>
							<Button
								sx={{
									border: 'none',
									fontSize: '12px',
									fontWeight: 'bold',
									color: 'black',
									'&:hover': { color: '#FDC700' },
								}}
							>
								{t('stadions')}
							</Button>
						</Link>

						<LanguageSwitcher />
					</div>

					{/* <MenuIcon
								sx={{ fontSize: '30px' }}
								className='hover:text-[#0DA366]'
							/> */}
					<div className='block md:hidden'>
						<div>
							<Button
								id='basic-button'
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
								variant='contained'
							>
								Открыть меню
							</Button>

							<Menu
								id='basic-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={handleClose}>
									<Link href={'/'}>{t('home')}</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href='/all-arenas'> {t('all_stadions')}</Link>{' '}
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href='/footzali'> {t('footzali')} </Link>{' '}
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href='/stadioni'> {t('stadions')}</Link>{' '}
								</MenuItem>
							</Menu>
						</div>
					</div>
				</nav>
			</header>

			<main className='flex-grow p-4 md:mt-[98px] mb-5'>{children}</main>

			<footer className='bg-[#0F172A] text-white py-8'>
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
								<LocalPhoneOutlinedIcon sx={{ color: '#0DA366' }} /> +992
								991-991-905
							</p>
						</li>
						<li>
							<p>
								<AlternateEmailOutlinedIcon sx={{ color: '#0DA366' }} />{' '}
								khiliqnazarovshuhrat@gmail.com
							</p>
						</li>
					</ul>

					<div className='flex justify-between w-full md:w-[40%]'>
						<ul className='flex flex-col gap-6'>
							<li className='mb-6 font-bold'>Страницы</li>
							<li className='hover:text-[#47d67d]'>
								<Link href={'/'}>Главная</Link>
							</li>
							<li className='hover:text-[#47d67d]'>
								<Link href={'/'}>Стадионы</Link>
							</li>
							<li className='hover:text-[#47d67d]'>
								<Link href={''}>О нас</Link>
							</li>
						</ul>
						<ul className='flex flex-col gap-6'>
							<li className='mb-6 font-bold'>Поддержка</li>
							<li>Помощь</li>
							<li>Контакты</li>
							<li>Отзывы сайта</li>
						</ul>
					</div>
				</section>
			</footer>
		</>
	)
}

export default Layout
