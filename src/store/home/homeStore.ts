import { create } from 'zustand'
import { supabase } from '@/lib/supabase/client'
import { Arena, ArenaRow, toArena } from '@/lib/types'

interface HomeStore {
	data: Arena[]
	loading: boolean
	getData: () => void
}

export const useHomeStore = create<HomeStore>(set => ({
	data: [],
	loading: true,
	getData: async () => {
		const { data, error } = await supabase
			.from('arenas')
			.select('*')
			.eq('is_published', true)
			.order('id')
		if (error) {
			console.log(error)
			set({ loading: false })
			return
		}
		set({ data: (data as ArenaRow[]).map(toArena), loading: false })
	},
}))
