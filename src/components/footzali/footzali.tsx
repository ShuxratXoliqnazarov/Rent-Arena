'use client'

import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material'
import {
	LocationOn as LocationIcon,
	LocationOn,
	Phone,
	Phone as PhoneIcon,
} from '@mui/icons-material'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FootzaliComp() {
	const { getData, data } = useHomeStore()

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<>
			<Box className='py-16 px-4'>
				<Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{data
						.filter(el => el.category == 'footzal')
						.map(el => (
							<div
								key={el.id}
								className=' rounded-2xl hover:border-[#FDC700]    border-gray-200 border-[1.1px]  transition-all duration-300 overflow-hidden group flex flex-col  h-[75vh]'
							>
								<div className='relative h-[70vh] w-full'>
									<Link href={`/${el.id}`}>
										<Image
											src={el.image[0]}
											alt={el.name}
											fill
											className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-103'
										/>
										{/* <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div> */}
									</Link>
								</div>

								<CardContent className='p-6 flex flex-col gap-5 h-full'>
									<div className='space-y-3 mb-5 flex flex-col justify-between  h-[22vh] '>
										<Typography
											variant='h6'
											className='text-xl font-bold text-gray-900  transition-colors'
										>
											{el.name}
										</Typography>

										<div className='flex items-start text-sm text-gray-600'>
											<LocationOn className='text-yellow-500 mr-2 mt-0.5' />
											<span>{el.location}</span>
										</div>

										<div className='flex flex-wrap gap-2'>
											{el.features.map((feature: string) => (
												<Chip
													key={feature}
													label={feature}
													size='small'
													className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all duration-200 text-xs'
												/>
											))}
										</div>
									</div>

									<div className='mt-auto space-y-4'>
										<div className='flex items-center gap-2 text-sm font-medium   p-3 rounded-xl '>
											<Phone fontSize='small' />
											<a href={`tel:${el.adminPhone}`} className='no-underline'>
												{el.adminPhone}
											</a>
										</div>

										<Link href={`/${el.id}`}>
											<Button
												variant='contained'
												fullWidth
												sx={{
													backgroundColor: 'transparent',
													// border: '1px',
													// backgroundColor: '#FDC700',
													color: 'black',
													fontWeight: 'bold',
													'&:hover': {
														backgroundColor: '#FDD500',
														transform: 'scale(1.05)',
													},
													transition: 'all 0.3s ease',
													boxShadow: '0px 0px 2px #FDC700',
													borderRadius: 2,
													py: 1,
												}}
											>
												Подробнее
											</Button>
										</Link>
									</div>
								</CardContent>
							</div>
						))}
				</Box>
			</Box>
		</>
	)
}
