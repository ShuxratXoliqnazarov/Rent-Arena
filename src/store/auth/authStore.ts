import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { Profile, Role } from '@/lib/types'

interface SignUpData {
	email: string
	password: string
	fullName: string
	phone: string
	role: Role
}

interface AuthStore {
	user: User | null
	profile: Profile | null
	loading: boolean
	init: () => void
	signIn: (email: string, password: string) => Promise<string | null>
	signUp: (data: SignUpData) => Promise<{ error: string | null; needsConfirm: boolean }>
	signOut: () => Promise<void>
}

let initialized = false

const loadProfile = async (userId: string) => {
	const { data } = await supabase
		.from('profiles')
		.select('id, full_name, phone, role')
		.eq('id', userId)
		.single()
	return (data as Profile) ?? null
}

export const useAuthStore = create<AuthStore>(set => ({
	user: null,
	profile: null,
	loading: true,

	init: () => {
		if (initialized) return
		initialized = true

		supabase.auth.onAuthStateChange((_event, session) => {
			const user = session?.user ?? null
			set({ user })
			if (!user) {
				set({ profile: null, loading: false })
				return
			}
			// Запрос к базе нельзя делать прямо внутри колбэка — откладываем
			setTimeout(async () => {
				set({ profile: await loadProfile(user.id), loading: false })
			}, 0)
		})
	},

	signIn: async (email, password) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		return error ? error.message : null
	},

	signUp: async ({ email, password, fullName, phone, role }) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { full_name: fullName, phone, role } },
		})
		if (error) return { error: error.message, needsConfirm: false }
		return { error: null, needsConfirm: !data.session }
	},

	signOut: async () => {
		await supabase.auth.signOut()
		set({ user: null, profile: null })
	},
}))
