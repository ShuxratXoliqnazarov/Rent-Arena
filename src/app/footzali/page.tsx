import FootzaliComp from '@/components/footzali/footzali'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'



export default function Footzal() {
	return (
		<>
			<section
				style={{ margin: '150px auto' }}
				className='md:max-w-[1200px] md:m-auto'
			>
				<div className='flex items-center gap-5'>
					<Link href={'/'}>
						<ArrowBackIcon sx={{ fontSize: '35px', fontWeight: 'bold' }} />
					</Link>
					<h1 className='md:text-[40px] font-semibold my-5'>Футзали</h1>
				</div>{' '}
				<FootzaliComp />
			</section>
		</>
	)
}
