'use client'

import React from 'react'
import './shine-border.css'

export function ShineBorder({ children }: { children: React.ReactNode }) {
	return (
		<div className='shine-border-wrapper'>
			<div className='shine-border-inner'>{children}</div>
		</div>
	)
}
