'use client'

import { Phone, PlayCircle } from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const steps = [
	{
		step: '01',
		icon: SearchOutlinedIcon,
		title: 'Найдите поле',
		description:
			'Выберите подходящее поле из нашего каталога с фильтрами по району, цене и удобствам',
	},
	{
		step: '02',
		icon: Phone,
		title: 'Позвоните администратору',
		description:
			'Свяжитесь с администратором поля по указанному номеру для уточнения деталей',
	},
	{
		step: '03',
		icon: PlayCircle,
		title: 'Играйте и наслаждайтесь',
		description:
			'Приходите в назначенное время и наслаждайтесь игрой на качественном поле',
	},
]

export default function Steps() {
	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{steps.map((step, index) => (
					<Card
						key={index}
						sx={{
							textAlign: 'center',
							transition: 'transform 0.3s ease',
							'&:hover': {
								transform: 'translateY(-4px)',
								transition: 'transform 0.3s ease',
							},
						}}
					>
						<CardContent sx={{ p: 4 }}>
							<Box
								sx={{
									width: 64,
									height: 64,
									borderRadius: 3,
									background: 'linear-gradient(135deg, #10B981, #06B6D4)', // как gradient-primary
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									mx: 'auto',
									mb: 3,
									boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // shadow-professional
								}}
							>
								<step.icon sx={{ width: 32, height: 32, color: '#fff' }} />
							</Box>

							<Typography
								variant='body2'
								sx={{ fontWeight: 'bold', color: 'emerald.main', mb: 1 , fontSize:'18px' }}
							>
								шаг {step.step}
							</Typography>

							<Typography
								variant='h6'
								sx={{ fontWeight: 'bold', color: 'slate.900', mb: 2 }}
							>
								{step.title}
							</Typography>

							<Typography sx={{ color: 'slate.600', lineHeight: 1.6 }}>
								{step.description}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
}
