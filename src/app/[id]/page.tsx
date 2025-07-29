'use client'

import { Card, CardContent, CardMedia, Chip, Button } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import MapIcon from '@mui/icons-material/Map'
import StarIcon from '@mui/icons-material/Star'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function ByIdPage() {
	const { getData, data } = useHomeStore()

	const { id } = useParams()
	useEffect(() => {
		getData()
	}, [])
	const arena = data.find(el => el.id == id)
	// console.log('ARENA', arena)

	if (!arena) {
		return <div>Загрузка данных...</div>
	}

	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-6'>
					<Card className='overflow-hidden'>
						<div className='relative'>
							<CardMedia
								component='img'
								height='380'
								image={arena.image[0] || '/placeholder.svg'}
								alt={arena.name}
								className='w-full h-96 object-cover'
							/>
						</div>
						{arena.image.length > 1 && (
							<div className='p-4'>
								<div className='grid grid-cols-4 gap-2'>
									{arena.image.slice(1).map((image: string, index: number) => (
										<img
											key={index}
											src={image || '/placeholder.svg'}
											alt={`${arena.name} ${index + 2}`}
											className='w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity'
										/>
									))}
								</div>
							</div>
						)}
					</Card>

					<Card>
						<CardContent className='p-6'>
							<h2 className='text-2xl font-bold text-slate-900 mb-4'>
								Описание
							</h2>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
								<div className='text-center p-4 bg-green-50 rounded-lg'>
									<div className='font-semibold text-slate-900'>
										Размер поля
									</div>
								</div>
								<div className='text-center p-4 bg-green-50 rounded-lg'>
									<div className='font-semibold text-slate-900'>Покрытие</div>
								</div>
								<div className='text-center p-4 bg-green-50 rounded-lg'>
									<div className='font-semibold text-slate-900'>
										Режим работы
									</div>
								</div>
							</div>

							<h3 className='text-xl font-semibold text-slate-900 mb-4'>
								Удобства
							</h3>
						</CardContent>
					</Card>
				</div>

				<div className='space-y-6'>
					<Card className='sticky top-24'>
						<CardContent className='p-6'>
							<div className='flex items-start justify-between mb-4'>
								<h1 className='text-3xl font-bold text-slate-900'>
									{arena.name}
								</h1>
								<div className='flex items-center space-x-1'>
									<StarIcon className='w-5 h-5 text-yellow-400' />
								</div>
							</div>

							<div className='flex items-center text-slate-600 mb-6'>
								<MapIcon className='w-5 h-5 mr-2' />
								<span>{arena.location}</span>
							</div>

							<div className='flex flex-wrap gap-2 mb-6'>
								{arena.features.map((feature: string) => (
									<Chip
										key={feature}
										label={feature}
										className='bg-green-100 text-green-700'
									/>
								))}
							</div>

							<div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-6'>
								<h3 className='font-semibold text-slate-900 mb-2'>
									Для бронирования
								</h3>

								<Button
									href={`tel:${arena.adminPhone}`}
									startIcon={<PhoneIcon />}
									className='w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold'
								>
									Позвонить {arena.adminPhone}
								</Button>
							</div>

							<div className='text-xs text-slate-500 text-center'>
								Позвоните администратору для уточнения свободного времени и
								бронирования поля
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	)
}
