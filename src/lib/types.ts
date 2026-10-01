export type Role = 'client' | 'admin'

export interface Profile {
	id: string
	full_name: string
	phone: string
	role: Role
}

// Строка таблицы arenas в Supabase
export interface ArenaRow {
	id: number
	owner_id: string | null
	name: string
	category: 'stadion' | 'footzal'
	location: string
	admin_phone: string
	price_per_hour: number
	open_hour: number
	close_hour: number
	coverage: string
	payment_info: string
	features: string[]
	images: string[]
	is_published: boolean
}

export interface Booking {
	id: number
	arena_id: number
	user_id: string | null
	date: string
	hour: number
	customer_name: string
	customer_phone: string
	status: 'confirmed' | 'cancelled'
	source: 'online' | 'manual'
	created_at: string
}

export interface Arena {
	id: string | null
	name: string
	adminPhone: string | number
	location: string
	features: string[]
	image: string[]
	category: string
	description: string[]
	price: number
	openHour: number
	closeHour: number
	ownerId: string | null
}

const pad = (h: number) => String(h).padStart(2, '0') + ':00'

export const formatHour = pad

export const formatWorkingHours = (open: number, close: number) =>
	open === 0 && close === 24 ? '24/7' : `${pad(open)} – ${pad(close)}`

export const formatSlot = (hour: number) => `${pad(hour)}–${pad(hour + 1)}`

// Приводим строку из базы к формату, который уже используют компоненты сайта
export const toArena = (row: ArenaRow): Arena => ({
	id: String(row.id),
	name: row.name,
	adminPhone: row.admin_phone,
	location: row.location,
	features: row.features,
	image: row.images.length ? row.images : ['/assets/mini.jpg'],
	category: row.category,
	description: [
		row.coverage,
		formatWorkingHours(row.open_hour, row.close_hour),
		row.payment_info,
	],
	price: row.price_per_hour,
	openHour: row.open_hour,
	closeHour: row.close_hour,
	ownerId: row.owner_id,
})

// Дата в формате YYYY-MM-DD по локальному времени
export const toDateKey = (d: Date) => {
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	return `${y}-${m}-${day}`
}
