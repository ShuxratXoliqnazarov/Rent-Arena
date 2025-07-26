// components/Layout.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone } from 'lucide-react'

import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<header className='bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 hover:bg-white transition-all duration-300'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2 group cursor-pointer'>
							<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/30'>
								<svg
									className='w-6 h-6 text-white'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
								</svg>
							</div>
							<span className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300'>
								RentArena
							</span>
						</div>

						<nav className='hidden md:flex items-center space-x-8'>
							<a
								href='#'
								className='text-slate-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 relative group'
							>
								Поля
								<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300'></span>
							</a>
							<a
								href='#'
								className='text-slate-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 relative group'
							>
								О нас
								<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300'></span>
							</a>
							<a
								href='#'
								className='text-slate-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105 relative group'
							>
								Контакты
								<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300'></span>
							</a>
							<Button
								variant='outline'
								className='border-green-200 text-green-700 hover:bg-green-50 bg-transparent hover:scale-105 hover:shadow-lg transition-all duration-300 hover:border-green-300'
							>
								Войти
							</Button>
							<Button className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300'>
								Регистрация
							</Button>
						</nav>

						<button
							className='md:hidden hover:scale-110 transition-transform duration-300'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							) : (
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								</svg>
							)}
						</button>
					</div>

					{isMenuOpen && (
						<div className='md:hidden mt-4 pb-4 border-t border-green-100 pt-4 animate-in slide-in-from-top duration-300'>
							<nav className='flex flex-col space-y-4'>
								<a
									href='#'
									className='text-slate-700 hover:text-green-600 font-medium hover:translate-x-2 transition-all duration-300'
								>
									Поля
								</a>
								<a
									href='#'
									className='text-slate-700 hover:text-green-600 font-medium hover:translate-x-2 transition-all duration-300'
								>
									О нас
								</a>
								<a
									href='#'
									className='text-slate-700 hover:text-green-600 font-medium hover:translate-x-2 transition-all duration-300'
								>
									Контакты
								</a>
								<div className='flex flex-col space-y-2 pt-2'>
									<Button
										variant='outline'
										className='border-green-200 text-green-700 bg-transparent hover:scale-105 transition-all duration-300'
									>
										Войти
									</Button>
									<Button className='bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300'>
										Регистрация
									</Button>
								</div>
							</nav>
						</div>
					)}
				</div>
			</header>

			<main className='flex-grow p-4 my-[50px]'>{children}</main>

			<footer className='bg-slate-900 text-white py-16 px-4'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div className='col-span-1 md:col-span-2'>
							<div className='flex items-center space-x-2 mb-6'>
								<div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center'>
									<MapPin className='w-6 h-6 text-white' />
								</div>
								<span className='text-2xl font-bold'>RentArena</span>
							</div>
							<p className='text-slate-300 mb-6 max-w-md'>
								Лучшая платформа для бронирования футбольных полей. Играй там,
								где удобно, когда удобно.
							</p>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<Phone className='w-5 h-5 text-green-400' />
									<span className='text-slate-300'>+7 (999) 123-45-67</span>
								</div>
								<div className='flex items-center space-x-3'>
									<Mail className='w-5 h-5 text-green-400' />
									<span className='text-slate-300'>info@rentarena.ru</span>
								</div>
							</div>
						</div>

						<div>
							<h4 className='text-lg font-semibold mb-6'>Компания</h4>
							<ul className='space-y-3'>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										О нас
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Карьера
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Партнерам
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Блог
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className='text-lg font-semibold mb-6'>Поддержка</h4>
							<ul className='space-y-3'>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Помощь
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Контакты
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Правила
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-slate-300 hover:text-green-400 transition-colors'
									>
										Конфиденциальность
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className='border-t border-slate-800 mt-12 pt-8 text-center'>
						<p className='text-slate-400'>
							© 2024 RentArena. Все права защищены.
						</p>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Layout
