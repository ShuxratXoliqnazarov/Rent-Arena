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
	const { getData } = useHomeStore()

	const t = useTranslations('home')

	const slides = [
		{
			id: 1,
			image: '/assets/bg-yandex3.jpg',
			title: t('first_baner_title'),
			description: t('first_banner_subtitle'),
		},
		{
			id: 2,
			image: '/assets/bg-yandex2.webp',
			title: t('second_baner_title'),
			description: t('second_banner_subtitle'),
		},
		{
			id: 3,
			image: '/assets/bg-yandex1.jpg',
			title: t('third_baner_title'),
			description: t('third_banner_subtitle'),
		},
	]

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<main>
				<section className='sec_1 relative md:max-w-[1200px] md:m-auto w-full h-[600px] md:h-[75vh] overflow-hidden md:rounded-[25px]'>
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
							<SwiperSlide key={slide.id} className='md:rounded-[25px]'>
								<div className='relative w-full h-full'>
									<div
										className='absolute inset-0 bg-cover bg-center md:rounded-[25px]'
										style={{ backgroundImage: `url('${slide.image}')` }}
										aria-label={slide.title}
									></div>
									<div className='absolute inset-0 bg-black/60 md:rounded-[25px]' />

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
												<Link href='/all-arenas'>{t('hero_banner_btn')}</Link>
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
						{t('sec_3_title')}
					</h1>
					<p className='text-center text-[20px]'>{t('sec_3_subtitle')}</p>

					<div className=' flex md:flex-row justify-between mt-10 flex-col gap-8 md:gap-0'>
						<aside className='md:w-[45%] w-[100%]'>
							<Link href={'/footzali'}>
								<article className='footzal_art h-[27vh] md:h-[35vh] rounded-[20px] relative group'>
									<div className='absolute w-[100%] bg-black/40 h-[27vh] md:h-[35vh] text-white font-bold  rounded-[20px]'>
										<h1 className='md:text-[45px] text-[37px] text-center mt-[70px] group-hover:text-[#FDC700] transition-all duration-500 ease-in-out '>
											{t('footzali')}
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
											{t('mini')}
										</h1>
									</div>
								</article>
							</Link>
						</aside>
					</div>
				</section>

				<section className='sec_3 md:max-w-[1200px] md:m-auto flex flex-col gap-10'>
					<h1 className='md:text-[50px] text-[40px] text-center font-semibold'>
						{t('sec_4_title')}
					</h1>
					<p className='text-center text-[20px]'>
						{t('sec_4_subtitle')}
					</p>

					<ArenaSwip />
				</section>

				<section className='sec_5 md:max-w-[1200px] flex flex-col gap-5 '>
					<h1 className='text-center md:text-[40px] text-[36px] font-semibold'>
						{t('sec_5_title')}
					</h1>
					<p className='text-center md:text-[20px] text-[18px]'>
						{t('sec_5_subtitle')}
					</p>
					<Steps />
				</section>
			</main>
		</>
	)
}
