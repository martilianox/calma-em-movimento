'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'

interface AuthFormProps {
  onSuccess: () => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Verificar se Supabase está configurado
      if (!supabase) {
        setError('Supabase não está configurado. Por favor, configure as variáveis de ambiente.')
        setLoading(false)
        return
      }

      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          onSuccess()
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
        })

        if (error) throw error

        if (data.user) {
          // Após cadastro, redirecionar para o formulário de perfil
          onSuccess()
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F7F9FA' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#C7DDF2' }}>
            <User className="w-8 h-8" style={{ color: '#5C6F82' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#5C6F82' }}>
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h1>
          <p className="text-lg" style={{ color: '#95A8B8' }}>
            {isLogin 
              ? 'Entre para continuar sua jornada' 
              : 'Comece sua jornada de bem-estar'}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#95A8B8' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{ 
                      backgroundColor: '#F7F9FA',
                      borderColor: '#DDE2E6',
                      color: '#5C6F82'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#95A8B8' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#95A8B8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: '#95A8B8' }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: '#95A8B8' }} />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs mt-1" style={{ color: '#95A8B8' }}>
                  Mínimo de 6 caracteres
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#E7CBCB' }}>
                <p className="text-sm" style={{ color: '#5C6F82' }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#A8D5C2',
                color: '#FFFFFF'
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </button>
          </form>

          {/* Toggle Login/Cadastro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-sm font-medium hover:underline"
              style={{ color: '#A8D5C2' }}
            >
              {isLogin 
                ? 'Não tem uma conta? Cadastre-se' 
                : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: '#95A8B8' }}>
            Seus dados são protegidos com criptografia de ponta a ponta
          </p>
        </div>
      </div>
    </div>
  )
}
