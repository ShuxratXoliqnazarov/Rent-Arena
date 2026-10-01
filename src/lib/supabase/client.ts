import { createClient } from '@supabase/supabase-js'

// Публичные данные проекта: publishable key создан для браузера и виден любому посетителю,
// данные защищают политики RLS в базе (supabase/schema.sql). Секретный ключ сюда НЕ класть.
// Переменные окружения (.env.local / Vercel) имеют приоритет — например, для отдельной тестовой базы.
const url =
	process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mjolylhievocdgwrhdyc.supabase.co'
const publishableKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	'sb_publishable_mHqGU0BO3BuVlEZ9NthFGA_gzm29cfc'

export const supabase = createClient(url, publishableKey)
