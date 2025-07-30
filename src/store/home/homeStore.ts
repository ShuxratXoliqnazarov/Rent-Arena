import axios from 'axios'
import { create } from 'zustand'

interface Arena {
	id: string | null
	name: string
	adminPhone: string | number
	location: string
	features: string[]
	image: string[]
	category: string
	description: string[]
}
interface HomeStore {
	data: Arena[]
	getData: () => void
}

export const useHomeStore = create<HomeStore>(set => ({
	data: [],
	getData: async () => {
		try {
			const response = await axios.get(
				'https://629d11159dced364.mokky.dev/arena'
			)
			// console.log('responce: ', response)
			set({ data: response.data })
		} catch (error) {
			console.log(error)
		}
	},
}))
