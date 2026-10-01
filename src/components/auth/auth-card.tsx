import { ReactNode } from 'react'

const AuthCard = ({ title, children }: { title: string; children: ReactNode }) => (
	<section className='min-h-[70vh] flex items-center justify-center py-16'>
		<div className='w-full max-w-[440px] rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col gap-6 bg-white'>
			<h1 className='text-3xl font-bold text-slate-900 text-center'>{title}</h1>
			{children}
		</div>
	</section>
)

export default AuthCard

export const yellowButtonSx = {
	backgroundColor: '#FDC700',
	color: 'black',
	fontWeight: 'bold',
	borderRadius: 2,
	py: 1.3,
	boxShadow: 'none',
	'&:hover': { backgroundColor: '#FDD500', boxShadow: 'none' },
}
