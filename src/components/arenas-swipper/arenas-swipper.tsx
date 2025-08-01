'use client'

import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Button,
	Chip,
} from '@mui/material'
import {
	LocationOn as LocationIcon,
	Star as StarIcon,
	Phone as PhoneIcon,
	PlayArrow as PlayIcon,
} from '@mui/icons-material'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
	A11y,
	Autoplay,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper/modules'

export default function ArenaSwip() {
	const { getData, data } = useHomeStore()

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<Box className='py-16 px-4'>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
					spaceBetween={20}
					slidesPerView={1}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
				>
					{data.map(el => (
						<SwiperSlide key={el.id}>
							<Card className='overflow-hidden border-0 shadow-md hover:shadow-2xl rounded-xl group transition-all duration-500 bg-white'>
								<Box className='relative overflow-hidden'>
									<img
										src={el.image[0]}
										alt={el.name[0]}
										className='w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105'
									/>
								</Box>
								<CardContent className='p-5 transition-all duration-300 group-hover:bg-yellow-50'>
									<Box className='flex items-start justify-between mb-3'>
										<Typography
											variant='h6'
											className='text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300'
										>
											{el.name}
										</Typography>
									</Box>
									<Box className='flex items-center text-gray-600 mb-4 group-hover:text-yellow-700 transition-colors duration-300'>
										<LocationIcon className='mr-2 text-yellow-600' />
										<Typography className='text-sm font-medium'>
											{el.location}
										</Typography>
									</Box>

									<Box className='flex flex-wrap gap-2 mb-5'>
										{el.features.map((feature: string) => (
											<Chip
												key={feature}
												label={feature}
												size='small'
												className='bg-yellow-100 text-yellow-800 text-xs font-medium hover:bg-yellow-200 transition-all duration-300 hover:scale-105'
											/>
										))}
									</Box>

									<Box className='space-y-3'>
										<Box className='bg-yellow-50 p-3 rounded-lg border border-yellow-200 shadow-sm'>
											<Box
												component='a'
												className='flex items-center space-x-2 text-yellow-800 hover:text-yellow-900 font-semibold transition-all duration-300 no-underline'
											>
												<PhoneIcon className='text-lg' />
												<Typography>{el.adminPhone}</Typography>
											</Box>
										</Box>

										<Button
											variant='contained'
											fullWidth
											className='bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 hover:shadow-lg transition-all duration-300 font-bold py-2'
										>
											Подробнее
										</Button>
									</Box>
								</CardContent>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
				<Box className='text-center mt-12'>
					<Link href={'/all-arenas'}>
						<Button
							variant='outlined'
							size='large'
							className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent hover:scale-105 transition-all duration-300'
						>
							Посмотреть все поля
						</Button>
					</Link>
				</Box>
			</Box>
		</>
	)
}
