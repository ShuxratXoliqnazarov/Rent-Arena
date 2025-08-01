import StadioniComp from '@/components/stadioni/stadioni'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

export default function Stadion() {
	return (
		<>
			<section
				style={{ margin: '150px auto' }}
				className='md:max-w-[1200px] md:m-auto'
			>
				<div className='flex items-center gap-5'>
					<Link href={'/'}>
						<ArrowBackIcon sx={{fontSize:'35px' , fontWeight:'bold'}}/>
					</Link>
					<h1 className='md:text-[40px] font-semibold my-5'>Мини стадионы</h1>
				</div>
				<StadioniComp />
			</section>
		</>
	)
}
