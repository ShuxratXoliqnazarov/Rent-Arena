'use client'

import { Card, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material'
import MapIcon from '@mui/icons-material/Map'
import { useHomeStore } from '@/store/home/homeStore'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SlotPicker from '@/components/booking/slot-picker'

export default function ByIdPage() {
	const t = useTranslations('arena')
	const { getData, data, loading } = useHomeStore()

	const [img, setImg] = useState('')

	const { id } = useParams()
	useEffect(() => {
		getData()
	}, [getData])
	const arena = data.find(el => el.id == id)

	if (!arena) {
		return (
			<div className='flex justify-center py-40'>
				{loading ? <CircularProgress sx={{ color: '#FDC700' }} /> : <p>{t('not_found')}</p>}
			</div>
		)
	}

	return (
		<>
			<section
				className='byId_sec md:max-w-[1200px] '
				style={{ margin: '120px auto' }}
			>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 '>
					<div className='lg:col-span-2 space-y-6 min-w-0'>
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
									{t('description')}
								</h2>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
									<div className='text-center p-4 bg-green-50 rounded-lg'>
										<div className='font-semibold text-slate-900'>
											{t('coverage')}
										</div>
										<p>{arena.description[0]}</p>
									</div>
									<div className='text-center p-4 bg-green-50 rounded-lg'>
										<div className='font-semibold text-slate-900'>
											{t('hours')}
										</div>
										<p>{arena.description[1]}</p>
									</div>
									<div className='text-center p-4 bg-green-50 rounded-lg'>
										<div className='font-semibold text-slate-900'>
											{t('payment')}
										</div>
										<p>{arena.description[2]}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className='space-y-6 min-w-0'>
						<Card>
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

								<SlotPicker arena={arena} />
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	)
}
