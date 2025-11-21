import { createClient } from '@supabase/supabase-js'

// Função para criar cliente Supabase de forma segura
function createSupabaseClient() {
  // Apenas criar cliente no browser/runtime, nunca durante build
  if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Exportar cliente (será null durante build)
export const supabase = createSupabaseClient()

// Types para o banco de dados
export interface UserProfile {
  id: string
  user_id: string
  name: string
  nickname: string
  idade: string
  endereco: string
  cidade: string
  estado: string
  atividades: string
  ocupacao: string
  hobbies: string
  tempo_ansiedade: string
  como_comecou: string
  sintomas_principais: string[]
  frequencia_crises: string
  gatilhos_conhecidos: string
  tratamento_atual: string
  medicamentos: string
  observacoes: string
  created_at: string
  updated_at: string
}

export interface DiaryEntry {
  id: string
  user_id: string
  date: string
  anxiety_level: number
  feelings: string[]
  what_feeling: string
  what_caused: string
  body_reaction: string
  free_thoughts: string
  created_at: string
}
