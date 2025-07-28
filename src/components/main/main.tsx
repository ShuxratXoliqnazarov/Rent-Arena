import { Button } from '@mui/material'
import './main.css'
import Article from '../articles/sec_2-article/sec_2-article'
import Arena from '../articles/arena-article/arena-article'

export default function Main() {
	return (
		<>
			<main>
				<section className='sec_1'>
					<div className='text-white  md:max-w-[1200px] md:m-auto flex flex-col items-center gap-10 md:mt-[50px] text-center'>
						<h1 className='md:text-[70px] text-[46px] font-bold'>
							Найди идеальное <br className='hidden md:block' />{' '}
							<span className='text-[#37C8A2]'>футбольное поле</span>{' '}
						</h1>
						<p className='text-[30px]'>
							Бронируй лучшие футбольные поля в твоем городе быстро и <br />
							удобно.
							<span className='text-[#37C8A2]'>
								Более 10+ площадок доступны для игры.
							</span>
						</p>
						<Button
							sx={{
								backgroundColor: '#0D9788',
								color: 'white',
								fontWeight: 'bold',
								padding: '10px 20px',
								fontSize: '18px',
								borderRadius: '8px',
								transition: 'all 0.3s ease',
								'&:hover': {
									transform: 'scale(1.02)',
									boxShadow: '0px 0px 10px #0D9788',
								},
							}}
						>
							Найти поле для игры
						</Button>
						<div className='flex md:flex-row gap-[120px]'>
							<div>
								<h2 className='text-[30px]  hover:text-[#0D9788] font-bold'>
									10+
								</h2>
								<p>Полей</p>
							</div>
							<div>
								<h2 className='text-[30px] font-bold hover:text-[#0D9788]'>
									24/7
								</h2>
								<p>Поддержка</p>
							</div>
						</div>
					</div>
				</section>

				<section className='sec_2 md:max-w-[1200px] md:m-auto '>
					<div className='text-center  flex flex-col gap-10'>
						<h1 className='md:text-[50px] text-[40px] font-semibold'>
							Всё для идеальной игры
						</h1>
						<p className='md:text-[18px] text-[20px]'>
							RentArena предоставляет полный спектр услуг для поиска и
							бронирования футбольных полей. <br className='hidden md:block' />{' '}
							Мы делаем процесс максимально простым и удобным.
						</p>
						<div>
							<Article />
						</div>
					</div>
				</section>

				<section className='sec_3 md:max-w-[1200px] md:m-auto flex flex-col gap-10'>
					<h1 className='md:text-[50px] text-[40px] text-center font-semibold'>Лучшие поля</h1>
					<p className='text-center text-[20px]'>
						Выбери из лучших футбольных полей с отличными отзывами и современным
						оборудованием
					</p>

					<Arena/>
				</section>
			</main>
		</>
	)
}
