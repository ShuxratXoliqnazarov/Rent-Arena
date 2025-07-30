'use client'

import { Button } from '@mui/material'
import './main.css'
import Article from '../articles/sec_2-article/sec_2-article'
import Arena from '../articles/arena-article/arena-article'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	A11y,
	Autoplay,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import Steps from '../articles/sec_5-article/sec_5-article'
import Link from 'next/link'

export default function Main() {
	const { getData, data } = useHomeStore()

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<main>
				<section className='sec_1'>
					<div className='text-white  md:max-w-[1200px] md:m-auto flex flex-col items-center gap-10 md:mt-[50px] text-center'>
						<h1 className='md:text-[70px] text-[46px] font-bold'>
							Найди идеальное <br className='hidden md:block' />{' '}
							<span className='text-[#37C8A2]'>футбольное поле</span>{' '}
						</h1>
						<p className='text-[30px]'>
							Бронируй лучшие футбольные поля в твоем городе быстро и <br />
							удобно.
							<span className='text-[#37C8A2]'>
								Более 10+ площадок доступны для игры.
							</span>
						</p>
						<Link href={'/all-arenas'}>
							<Button
								sx={{
									backgroundColor: '#0D9788',
									color: 'white',
									fontWeight: 'bold',
									padding: '10px 20px',
									fontSize: '18px',
									borderRadius: '8px',
									transition: 'all 0.3s ease',
									'&:hover': {
										transform: 'scale(1.02)',
										boxShadow: '0px 0px 10px #0D9788',
									},
								}}
							>
								Найти поле для игры
							</Button>
						</Link>
						<div className='flex md:flex-row gap-[120px]'>
							<div>
								<h2 className='text-[30px]  hover:text-[#0D9788] font-bold'>
									10+
								</h2>
								<p>Полей</p>
							</div>
							<div>
								<h2 className='text-[30px] font-bold hover:text-[#0D9788]'>
									24/7
								</h2>
								<p>Поддержка</p>
							</div>
						</div>
					</div>
				</section>

				{/* //! Swipper of PC */}
				<section className='hidden  sec_4 md:max-w-[1200px] md:m-auto md:flex flex-col gap-5'>
					<h1 className='text-center md:text-[40px] font-semibold'>
						Выбери формат игры
					</h1>
					<p className='text-center md:text-[20px]'>
						Найди свою игру — в зале или на свежем воздухе
					</p>

					<div className=' flex md:flex-row justify-between '>
						<div className=' md:w-[60%]'>
							<Swiper
								modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
								spaceBetween={50}
								slidesPerView={1}
								navigation
								autoplay={{ delay: 3000, disableOnInteraction: false }}
								pagination={{ clickable: true }}
								scrollbar={{ draggable: true }}
								onSwiper={swiper => console.log(swiper)}
								onSlideChange={() => console.log('slide change')}
								className=' h-[50vh] rounded-[20px]'
							>
								{data.slice(0).map(el => (
									<SwiperSlide key={el.id} className='rounded-[20px] relative'>
										<Link href={`/${el.id}`}>
											<div className='absolute group: z-10 m-14  h-[25vh] mt-[90px] bg-black/50 rounded-[20px] w-[60%] '>
												<h1 className='md:text-[35px] m-5 font-bold text-white md:mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out '>
													{el.name}
												</h1>
											</div>
										</Link>

										<img
											src={el.image[0]}
											alt={el.name}
											className='w-full h-full  rounded-[20px] '
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<aside className=' md:w-[35%] flex md:flex-col justify-between text-center'>
							<Link href={'/footzali'}>
								<article className='footzal_art  md:h-[22vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/40 h-[22vh] text-white font-bold  rounded-[20px]'>
										<h1 className='md:text-[35px] md:mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out '>
											Футзали
										</h1>
									</div>
								</article>
							</Link>

							<Link href={'/stadioni'}>
								<article className='mini_art  border md:h-[22vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/15 h-[22vh] text-white font-bold  rounded-[20px]'>
										<h1 className='md:text-[35px] md:mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out'>
											Мини стадионы
										</h1>
									</div>
								</article>
							</Link>
						</aside>
					</div>
				</section>

				{/* //! Sipper of Mobile */}
				<section className='sec_4 md:max-w-[1200px] md:m-auto flex flex-col gap-5 md:hidden p-5'>
					<h1 className='text-center text-[37px] font-semibold'>
						Выбери формат игры
					</h1>
					<p className='text-center text-[18px]'>
						Найди свою игру — в зале или на свежем воздухе
					</p>

					<div className=' flex flex-col-reverse gap-10 justify-between '>
						<div className=' md:w-[60%]'>
							<Swiper
								modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
								spaceBetween={50}
								slidesPerView={1}
								navigation
								autoplay={{ delay: 3000, disableOnInteraction: false }}
								pagination={{ clickable: true }}
								scrollbar={{ draggable: true }}
								onSwiper={swiper => console.log(swiper)}
								onSlideChange={() => console.log('slide change')}
								className=' h-[50vh] rounded-[20px]'
							>
								{data.slice(0).map(el => (
									<SwiperSlide key={el.id} className='rounded-[20px] relative'>
										<Link href={`/${el.id}`}>
											<div className='absolute group: z-10   h-[22vh] mt-[50px] bg-black/50 rounded-[20px] w-[80%] ml-[35px] '>
												<h1 className='text-[28px] text-center m-5 font-bold text-white md:mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out '>
													{el.name}
												</h1>
											</div>
										</Link>

										<img
											src={el.image[0]}
											alt={el.name}
											className='w-full h-full  rounded-[20px] '
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<aside className=' flex flex-col gap-7 justify-between text-center'>
							<Link href={'/footzali'}>
								<article className='footzal_art  h-[22vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/40 h-[22vh] text-white font-bold  rounded-[20px]'>
										<h1 className='text-[35px] mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out '>
											Футзали
										</h1>
									</div>
								</article>
							</Link>

							<Link href={'/stadioni'}>
								<article className='mini_art  border h-[22vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/15 h-[22vh] text-white font-bold  rounded-[20px]'>
										<h1 className='text-[35px] mt-[40px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out'>
											Мини стадионы
										</h1>
									</div>
								</article>
							</Link>
						</aside>
					</div>
				</section>

				<section className='sec_2 md:max-w-[1200px] md:m-auto '>
					<div className='text-center  flex flex-col gap-10'>
						<h1 className='md:text-[50px] text-[40px] font-semibold'>
							Всё для идеальной игры
						</h1>
						<p className='md:text-[18px] text-[20px]'>
							RentArena предоставляет полный спектр услуг для поиска и
							бронирования футбольных полей. <br className='hidden md:block' />{' '}
							Мы делаем процесс максимально простым и удобным.
						</p>
						<div>
							<Article />
						</div>
					</div>
				</section>

				<section className='sec_3 md:max-w-[1200px] md:m-auto flex flex-col gap-10'>
					<h1 className='md:text-[50px] text-[40px] text-center font-semibold'>
						Лучшие поля
					</h1>
					<p className='text-center text-[20px]'>
						Выбери из лучших футбольных полей с отличными отзывами и современным
						оборудованием
					</p>

					<Arena />
				</section>

				<section className='sec_5 md:max-w-[1200px] flex flex-col gap-5 '>
					<h1 className='text-center md:text-[40px] text-[36px] font-semibold'>
						Три простых шага до игры
					</h1>
					<p className='text-center md:text-[20px] text-[18px]'>
						Процесс бронирования максимально упрощен.{' '}
						<br className='hidden md:block' /> Всего несколько кликов отделяют
						вас от игры на лучших полях города.
					</p>
					<Steps />
				</section>
			</main>
		</>
	)
}
