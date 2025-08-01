'use client'

import { Card, CardContent, CardMedia, Chip, Button } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import MapIcon from '@mui/icons-material/Map'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ByIdPage() {
	const { getData, data } = useHomeStore()

	const [img, setImg] = useState('')

	const { id } = useParams()
	useEffect(() => {
		getData()
	}, [getData])
	const arena = data.find(el => el.id == id)

	if (!arena) {
		return <div>Загрузка данных...</div>
	}

	return (
		<>
			<section
				className='byId_sec md:max-w-[1200px] '
				style={{ margin: '120px auto' }}
			>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 '>
					<div className='lg:col-span-2 space-y-6'>
						<Card
							className='overflow-hidden  flex flex-col gap-5'
							style={{ padding: '16px' }}
						>
							<div className='relative'>
								<CardMedia
									component='img'
									height='380'
									image={img || arena.image[0] || '/placeholder.svg'}
									alt={arena.name}
									className='w-full h-96 object-cover rounded-[10px]'
								/>
							</div>
							{arena.image.length > 1 && (
								<div
									className='flex flex-row p-3'
									style={{ padding: '16px 0px' }}
								>
									<div className='grid grid-cols-4 gap-2'>
										{arena.image
											.slice(0)
											.map((image: string, index: number) => (
												<Image
													width={100}
													height={100}
													onClick={() => setImg(image)}
													key={index}
													src={image || '/placeholder.svg'}
													alt={`${arena.name} ${index + 2}`}
													className='w-full h-20 object-cover rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity'
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
										<div className='font-semibold text-slate-900'>Покрытие</div>
										<p>{arena.description[0]}</p>
									</div>
									<div className='text-center p-4 bg-green-50 rounded-lg'>
										<div className='font-semibold text-slate-900'>
											Режим работы
										</div>
										<p>{arena.description[1]}</p>
									</div>
									<div className='text-center p-4 bg-green-50 rounded-lg'>
										<div className='font-semibold text-slate-900'>
											Оплата за аренду
										</div>
										<p>{arena.description[2]}</p>
									</div>
								</div>
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
									<h3 className='font-semibold text-slate-900 mb-2 text-center'>
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
			</section>
		</>
	)
}
