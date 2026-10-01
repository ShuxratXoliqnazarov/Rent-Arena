import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured && typeof window !== 'undefined') {
	console.error(
		'Supabase не настроен: добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env.local'
	)
}

// Заглушки нужны, чтобы сборка не падала, пока ключи не добавлены
export const supabase = createClient(
	url || 'https://placeholder.supabase.co',
	anonKey || 'placeholder-anon-key'
)
