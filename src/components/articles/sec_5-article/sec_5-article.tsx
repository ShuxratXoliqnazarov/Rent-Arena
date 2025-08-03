'use client'

import { Phone, PlayCircle } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { ShineBorder } from '@/components/shine-border/shine-border'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Steps() {
	const t = useTranslations('home')

	const steps = [
		{
			step: '01',
			image: '/assets/fast-search.png',
			title: t('step_1_title'),
			description: t('step_1_subtitle'),
		},
		{
			step: '02',
			image: '/assets/fast-call.png',
			title: t('step_2_title'),
			description: t('step_2_subtitle'),
		},
		{
			step: '03',
			image: '/assets/play.png',
			title: t('step_3_title'),
			description: t('step_3_subtitle'),
		},
	]

	return (
		<>
			<section className='md:max-w-[1200px] md:m-auto why'>
				<div className='max-w-6xl mx-auto text-center'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{steps.map(reason => (
							<ShineBorder key={reason.step}>
								<Box className=' rounded-[14px] '>
									<Box className='flex flex-col items-center text-center p-8 justify-between why_article'>
										<div className='w-40 h-40 mb-4'>
											<Image
												width={100}
												height={100}
												src={reason.image}
												alt={reason.title}
												className='w-full h-full object-contain'
											/>
										</div>

										<h1 className='font-semibold md:text-lg text-[20px] text-gray-800'>
											{reason.title}
										</h1>

										<p className='text-gray-600 mt-2'>{reason.description}</p>
									</Box>
								</Box>
							</ShineBorder>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
