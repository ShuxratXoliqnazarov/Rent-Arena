'use client'

import './main.css'
import Arena from '../articles/arena-article/arena-article'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect } from 'react'

import 'swiper/css'
import 'swiper/css/pagination'
import Steps from '../articles/sec_5-article/sec_5-article'
import WhyChooseUs from '../why-rent-arena/why-rent-arena'
import ArenaSwip from '../arenas-swipper/arenas-swipper'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay' //
import { useTranslations } from 'next-intl'

export default function Main() {
	const { getData, data } = useHomeStore()

	const t = useTranslations('home')

	const slides = [
		{
			id: 1,
			image: '/assets/bg-of-arena.jpg',
			title: t('first_baner_title'),
			description:
				'Мгновенное бронирование мини-стадионов и спортивных площадок рядом с вами. Легко, быстро и удобно.',
		},
		{
			id: 2,
			image: '/assets/bg-of-arena2.webp',
			title: 'Играйте в Любую Погоду',
			description:
				'Открытые и закрытые площадки доступны для бронирования круглый год. Выберите свой идеальный вариант.',
		},
		{
			id: 3,
			image: '/assets/bg-of-arena3.jpeg',
			title: 'Соберите Команду, Забронируйте Поле',
			description:
				'Идеальное место для тренировок, дружеских матчей и турниров. Начните играть уже сегодня!',
		},
	]

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<main>
				<section className='sec_1 relative md:max-w-[1200px] md:m-auto w-full h-[600px] md:h-[75vh] overflow-hidden rounded-[25px]'>
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={10}
						slidesPerView={1}
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						speed={800}
						pagination={{
							clickable: true,
						}}
						loop={true}
						className='w-full h-full'
					>
						{slides.map(slide => (
							<SwiperSlide key={slide.id} className='rounded-[25px]'>
								<div className='relative w-full h-full'>
									<div
										className='absolute inset-0 bg-cover bg-center rounded-[25px]'
										style={{ backgroundImage: `url('${slide.image}')` }}
										aria-label={slide.title}
									></div>
									<div className='absolute inset-0 bg-black/60 rounded-[25px]' />

									<div className='absolute inset-0 z-10 md:w-[50%] flex flex-col items-start justify-center md:p-5 md:ml-[50px] md:mt-[70px] gap-5'>
										<h1 className='text-white text-4xl md:text-6xl font-bold drop-shadow-xl animate-fadeIn'>
											{slide.title}
										</h1>
										<p className='text-gray-200 mt-4 text-base md:text-lg leading-relaxed max-w-xl drop-shadow-md animate-fadeIn delay-200'>
											{slide.description}
										</p>
										<Button
											asChild
											variant='outline'
											size='lg'
											className='btn relative z-20 bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition hover:scale-105 shadow-md animate-fadeIn delay-300'
										>
											<Link href='/stadiums'>Посмотреть Стадионы</Link>
										</Button>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</section>

				<WhyChooseUs />

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
										<h1 className='md:text-[45px] text-[37px] text-center mt-[70px] group-hover:text-[#FDC700] transition-all duration-500 ease-in-out '>
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
										<h1 className='md:text-[45px] text-[37px] text-center mt-[70px]  group-hover:text-[#FDC700] transition-all duration-500 ease-in-out'>
											Мини стадионы
										</h1>
									</div>
								</article>
							</Link>
						</aside>
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
