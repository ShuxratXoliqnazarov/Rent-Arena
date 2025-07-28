'use client'
import './sec_2-article.css'
import {
	LocationOn as LocationIcon,
	Schedule as ClockIcon,
	Security as ShieldIcon,
	People as UsersIcon,
	Star as StarIcon,
	Headset as HeadsetIcon,
} from '@mui/icons-material'
import { Box, Container, Typography, Card, CardContent } from '@mui/material'

const services = [
	{
		icon: LocationIcon,
		title: 'Поиск полей',
		description:
			'Находи лучшие футбольные поля в твоем районе с подробной информацией и фотографиями',
		color: 'from-emerald-500 to-teal-600',
	},
	{
		icon: ClockIcon,
		title: 'Быстрое бронирование',
		description:
			'Связывайся с администраторами напрямую для мгновенного бронирования удобного времени',
		color: 'from-teal-500 to-cyan-600',
	},
	{
		icon: ShieldIcon,
		title: 'Проверенные поля',
		description:
			'Все поля проходят модерацию и имеют реальные отзывы от игроков',
		color: 'from-cyan-500 to-blue-600',
	},
	{
		icon: UsersIcon,
		title: 'Сообщество игроков',
		description:
			'Присоединяйся к активному сообществу футболистов и находи команды для игры',
		color: 'from-blue-500 to-indigo-600',
	},
	{
		icon: StarIcon,
		title: 'Рейтинг и отзывы',
		description:
			'Читай честные отзывы и выбирай поля с лучшими рейтингами от реальных игроков',
		color: 'from-indigo-500 to-purple-600',
	},
	{
		icon: HeadsetIcon,
		title: 'Поддержка 24/7',
		description:
			'Наша команда всегда готова помочь с выбором поля и решением любых вопросов',
		color: 'from-purple-500 to-pink-600',
	},
]

export default function Article() {
	return (
		<>
			<Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
				{services.map((service, index) => (
					<Card
						key={index}
						className='group border-0 shadow-lg  transition-all duration-[0.5s] hover:duration-[0.5s] hover:transition-all hover:ease-in-out ease-in-out cursor-pointer  bg-white/80 backdrop-blur-sm'
					>
						<CardContent className='p-8 text-center'>
							<Box
								className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110  transition-all duration-500 shadow-lg`}
							>
								<service.icon className='text-white text-2xl' />
							</Box>
							<Typography
								variant='h6'
								className='text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300'
							>
								{service.title}
							</Typography>
							<Typography className='text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300'>
								{service.description}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</>
	)
}
