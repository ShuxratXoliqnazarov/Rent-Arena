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

const arena = [
	{
		id: 1,
		name: 'Арена Спорт',
		location: 'Центральный район',
		price: '2500',
		image: '/assets/airportArena.png',
		features: ['Искусственное покрытие', 'Освещение', 'Раздевалки'],
		adminPhone: '+7 (999) 123-45-67',
		adminName: 'Алексей',
	},
	{
		id: 2,
		name: 'Футбол Сити',
		location: 'Северный район',
		price: '2000',
		image: '/assets/frunzeArena.png',
		features: ['Крытое поле', 'Парковка', 'Душевые'],
		adminPhone: '+7 (999) 234-56-78',
		adminName: 'Дмитрий',
	},
	{
		id: 3,
		name: 'Стадион Победа',
		location: 'Южный район',
		price: '3000',
		image: '/assets/frunze2.png',
		features: ['Натуральный газон', 'Трибуны', 'VIP зона'],
		adminPhone: '+7 (999) 345-67-89',
		adminName: 'Сергей',
	},
]

export default function Arena() {
	return (
		<>
			<Box className='py-16 px-4'>
				<Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{arena.map(field => (
						<Card
							key={field.id}
							className='overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group cursor-pointer flex flex-col justify-between '
						>
							<Box className='relative overflow-hidden'>
								<img
									src={field.image}
									alt={field.name}
									className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700'
								/>
							</Box>

							<CardContent className='p-6 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-green-50 transition-all duration-300'>
								<Box className='flex items-start justify-between mb-3'>
									<Typography
										variant='h6'
										className='text-xl font-semibold text-slate-900 group-hover:text-green-700 transition-colors duration-300'
									>
										{field.name}
									</Typography>
								</Box>

								<Box className='flex items-center text-slate-600 mb-4 group-hover:text-green-600 transition-colors duration-300'>
									<LocationIcon className='text-lg mr-1' />
									<Typography className='text-sm'>{field.location}</Typography>
								</Box>

								<Box className='flex flex-wrap gap-2 mb-4'>
									{field.features.map(feature => (
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
										<Box className='flex items-center space-x-2'>
											<Typography className='text-2xl font-bold text-green-600 group-hover:text-green-500 transition-colors duration-300'>
												{field.price}₽
											</Typography>
											<Typography className='text-sm text-slate-500'>
												/час
											</Typography>
										</Box>
									</Box>

									<Box className='bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200'>
										<Typography className='text-sm text-slate-600 mb-1'>
											Администратор: {field.adminName}
										</Typography>
										<Box
											component='a'
											className='flex items-center space-x-2 text-green-700 hover:text-green-800 font-semibold transition-all duration-300 no-underline'
										>
											<PhoneIcon className='text-lg' />
											<Typography>{field.adminPhone}</Typography>
										</Box>
									</Box>

									<Button
										variant='contained'
										fullWidth
										className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300'
									>
										Подробнее
									</Button>
								</Box>
							</CardContent>
						</Card>
					))}
				</Box>

				<Box className='text-center mt-12'>
					<Button
						variant='outlined'
						size='large'
						
						className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent hover:scale-105 transition-all duration-300'
					>
						Посмотреть все поля
					</Button>
				</Box>
			</Box>
		</>
	)
}
