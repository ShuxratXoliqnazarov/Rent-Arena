import { Box } from '@mui/material'
import { ShineBorder } from '../shine-border/shine-border'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function WhyChooseUs() {
	const t = useTranslations('home')

	const reasons = [
		{
			id: 1,
			title: t('first_art_sec_2_title'),
			desc: t('first_art_sec_2_subtitle'),
			image: '/assets/quickBook.jpg',
		},
		{
			id: 2,
			title: t('second_art_sec_2_title'),
			desc: t('second_art_sec_2_subtitle'),
			image: '/assets/filt.png',
		},
		{
			id: 3,
			title: t('third_art_sec_2_title'),
			desc: t('third_art_sec_2_subtitle'),
			image: '/assets/cheked.png',
		},
	]

	return (
		<section className='md:max-w-[1200px] md:m-auto why'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl md:text-[40px] font-bold mb-4'>
					{t('sec_2_title')}
					<span className='font-extrabold text-[#FDC700]'>RentArena?</span>
				</h2>
				<p className='text-gray-600 mb-12'>{t('sec_2_subtitle')}</p>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{reasons.map(reason => (
						<ShineBorder key={reason.id}>
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

									<p className='text-gray-600 mt-2'>{reason.desc}</p>
								</Box>
							</Box>
						</ShineBorder>
					))}
				</div>
			</div>
		</section>
	)
}
