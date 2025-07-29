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

export default function StadioniComp() {
	const { getData, data } = useHomeStore()

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			<Box className='py-16 px-4'>
				<Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{data
						.filter(el => el.category == 'stadion')
						.map(el => (
							<Card
								key={el.id}
								className='overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group cursor-pointer flex flex-col justify-between '
							>
								<Box className='relative overflow-hidden'>
									<img
										src={el.image[0]}
										alt={el.name[0]}
										className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700'
									/>
								</Box>

								<CardContent className='p-6 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-green-50 transition-all duration-300'>
									<Box className='flex items-start justify-between mb-3'>
										<Typography
											variant='h6'
											className='text-xl font-semibold text-slate-900 group-hover:text-green-700 transition-colors duration-300'
										>
											{el.name}
										</Typography>
									</Box>

									<Box className='flex items-center text-slate-600 mb-4 group-hover:text-green-600 transition-colors duration-300'>
										<LocationIcon className='text-lg mr-1' />
										<Typography className='text-sm'>{el.location}</Typography>
									</Box>

									<Box className='flex flex-wrap gap-2 mb-4'>
										{el.features.map((feature: string) => (
											<Chip
												key={feature}
												label={feature}
												size='small'
												className='text-xs bg-slate-100 text-slate-700 hover:bg-green-100 hover:text-green-700 transition-all duration-300 hover:scale-105'
											/>
										))}
									</Box>

									<Box className='space-y-3'>
										<Box className='flex items-center justify-between'>
											{/* <Box className='flex items-center space-x-2'>
											<Typography className='text-2xl font-bold text-green-600 group-hover:text-green-500 transition-colors duration-300'>
												{el.price}₽
											</Typography>
											<Typography className='text-sm text-slate-500'>
												/час
											</Typography>
										</Box> */}
										</Box>

										<Box className='bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200'>
											<Box
												component='a'
												className='flex items-center space-x-2 text-green-700 hover:text-green-800 font-semibold transition-all duration-300 no-underline'
											>
												<PhoneIcon className='text-lg' />
												<Typography>{el.adminPhone}</Typography>
											</Box>
										</Box>

										<Button
											variant='contained'
											fullWidth
											className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-102 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-[0.5s] ease-in-out'
										>
											Подробнее
										</Button>
									</Box>
								</CardContent>
							</Card>
						))}
				</Box>
			</Box>
		</>
	)
}
