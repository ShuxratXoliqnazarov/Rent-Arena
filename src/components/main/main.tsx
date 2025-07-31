'use client'

import { Button } from '@mui/material'
import './main.css'
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
import WhyChooseUs from '../why-rent-arena/why-rent-arena'
import ArenaSwip from '../arenas-swipper/arenas-swipper'



export default function Main() {
	const { getData, data } = useHomeStore()

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<main>
				<section className='sec_1 text-start'>
					<div className='  md:max-w-[1200px] md:m-auto '>
						<aside className='md:w-[60%]'>
							<div className='text-white flex flex-col items-statrt gap-10 md:mt-[50px] '>
								<h1 className='md:text-[65px] text-[46px] font-bold'>
									Бронируй футбольные поля за пару кликов
								</h1>
								<p className='text-[28px] md:w-[90%]'>
									Мы сделали бронирование стадионов максимально простым и
									доступным. Забудь о звонках и сложных схемах —
									<span className='font-semibold'> просто выбери поле, время и выходи на игру.</span>
									<br className='hidden md:block' />
									<span className='text-[#37C8A2]'>
										10+ площадок уже ждут тебя!
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
								{/* <div className='flex md:flex-row gap-[120px]'>
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
								</div> */}
							</div>
						</aside>
					</div>
				</section>

				<WhyChooseUs />

				{/* //! Swipper of PC */}
				<section className='  sec_4 md:max-w-[1200px] md:m-auto flex flex-col gap-5'>
					<h1 className='text-center md:text-[40px] text-[37px] font-semibold'>
						Выбери формат игры
					</h1>
					<p className='text-center text-[20px]'>
						Найди свою игру — в зале или на свежем воздухе
					</p>

					<div className=' flex md:flex-row justify-between mt-10 flex-col gap-8 md:gap-0'>
						<aside className='md:w-[45%] w-[100%]'>
							<Link href={'/footzali'}>
								<article className='footzal_art h-[27vh] md:h-[35vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/40 h-[27vh] md:h-[35vh] text-white font-bold  rounded-[20px]'>
										<h1 className='md:text-[45px] text-[37px] text-center mt-[70px] group-hover:text-[#00B680] transition-all duration-500 ease-in-out '>
											Футзалы
										</h1>
									</div>
								</article>
							</Link>
						</aside>

						<aside className=' md:w-[45%] w-[100%] '>
							<Link href={'/stadioni'}>
								<article className='mini_art  border h-[27vh] md:h-[35vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/15 h-[27vh] md:h-[35vh] text-white font-bold  rounded-[20px]'>
										<h1 className='md:text-[45px] text-[37px] text-center mt-[70px]  group-hover:text-[#00B680] transition-all duration-500 ease-in-out'>
											Мини стадионы
										</h1>
									</div>
								</article>
							</Link>
						</aside>
					</div>
				</section>

				{/* //! Sipper of Mobile */}
				{/* <section className='sec_4 md:max-w-[1200px] md:m-auto flex flex-col gap-5 md:hidden p-5'>
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
				</section> */}

				<section className='sec_3 md:max-w-[1200px] md:m-auto flex flex-col gap-10'>
					<h1 className='md:text-[50px] text-[40px] text-center font-semibold'>
						Лучшие поля
					</h1>
					<p className='text-center text-[20px]'>
						Выбери из лучших футбольных полей с отличными отзывами и современным
						оборудованием
					</p>

					<ArenaSwip />
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

{
	/* <div className=' md:w-[60%]'>
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
						</div> */
}
