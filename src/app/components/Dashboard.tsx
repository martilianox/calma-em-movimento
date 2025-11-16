'use client'

import { Heart, Wind, BookOpen, Calendar, Home as HomeIcon, Sparkles } from 'lucide-react'
import type { Screen } from '../page'
import { useEffect, useState } from 'react'

interface DashboardProps {
  navigate: (screen: Screen) => void
}

export function Dashboard({ navigate }: DashboardProps) {
  const [userName, setUserName] = useState('você')
  const [activeTab, setActiveTab] = useState<'home' | 'exercises' | 'diary'>('home')
  
  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      const profile = JSON.parse(userProfile)
      setUserName(profile.nickname || profile.name || 'você')
    }
  }, [])

  const currentHour = new Date().getHours()
  
  let greeting = ''
  let greetingIcon = '☀️'
  if (currentHour < 12) {
    greeting = `Bom dia, ${userName}`
    greetingIcon = '☀️'
  } else if (currentHour < 18) {
    greeting = `Oi, ${userName}`
    greetingIcon = '🌤️'
  } else {
    greeting = `Boa noite, ${userName}`
    greetingIcon = '🌙'
  }

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Header com logo e saudação alinhados */}
      <div className="flex items-center gap-4 pt-4 pb-2">
        <img 
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/04a7671d-26d0-4fad-a540-da6bfed424e4.png" 
          alt="Calma em Movimento" 
          className="w-16 h-16 object-contain flex-shrink-0 transition-transform duration-300 hover:scale-105"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
          }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{greetingIcon}</span>
            <h1 className="text-xl font-semibold" style={{ color: '#5C6F82' }}>
              {greeting}
            </h1>
          </div>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Como você está se sentindo?
          </p>
        </div>
      </div>

      {/* Card inspiracional com animação */}
      <div 
        className="p-5 rounded-3xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        style={{ 
          backgroundColor: '#C7DDF2',
          boxShadow: '0 2px 12px rgba(92, 111, 130, 0.08)'
        }}
      >
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 flex-shrink-0 mt-0.5 animate-pulse" style={{ color: '#5C6F82' }} />
          <div className="space-y-1.5">
            <h3 className="font-semibold text-base" style={{ color: '#5C6F82' }}>
              Você não está sozinho
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.85 }}>
              Vamos aos poucos… No seu tempo tudo funciona melhor.
            </p>
          </div>
        </div>
      </div>

      {/* Ações principais com feedback visual aprimorado */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('register')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#A8D5C2',
            boxShadow: '0 2px 12px rgba(168, 213, 194, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Como você está agora?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Registre este momento
              </p>
            </div>
            <Sparkles className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#F3EDE7',
            boxShadow: '0 2px 12px rgba(243, 237, 231, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Fazer um exercício
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Respiração, relaxamento, sono
              </p>
            </div>
            <Wind className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => setActiveTab('diary')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#DDE2E6',
            boxShadow: '0 2px 12px rgba(221, 226, 230, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Ver meu diário
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Acompanhe sua jornada
              </p>
            </div>
            <BookOpen className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>
      </div>

      {/* Dica do dia */}
      <div 
        className="p-4 rounded-2xl border-2 border-dashed"
        style={{ 
          borderColor: '#C7DDF2',
          backgroundColor: 'rgba(199, 221, 242, 0.1)'
        }}
      >
        <p className="text-xs text-center leading-relaxed" style={{ color: '#5C6F82', opacity: 0.9 }}>
          💡 <strong>Dica:</strong> Respire fundo 3 vezes sempre que sentir ansiedade
        </p>
      </div>
    </div>
  )

  const renderExercisesTab = () => (
    <div className="space-y-6">
      <div className="pt-4">
        <h1 className="text-2xl font-semibold mb-2" style={{ color: '#5C6F82' }}>
          Exercícios
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#95A8B8' }}>
          Escolha o que você precisa agora
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate('exercises')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#C7DDF2',
            boxShadow: '0 2px 12px rgba(199, 221, 242, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Respiração guiada
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Acalme seu corpo e mente
              </p>
            </div>
            <Wind className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => navigate('exercises')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#A8D5C2',
            boxShadow: '0 2px 12px rgba(168, 213, 194, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Relaxamento muscular
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Solte as tensões do corpo
              </p>
            </div>
            <Heart className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => navigate('library')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#F3EDE7',
            boxShadow: '0 2px 12px rgba(243, 237, 231, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Conteúdos educativos
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Entenda melhor a ansiedade
              </p>
            </div>
            <BookOpen className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>
      </div>
    </div>
  )

  const renderDiaryTab = () => (
    <div className="space-y-6">
      <div className="pt-4">
        <h1 className="text-2xl font-semibold mb-2" style={{ color: '#5C6F82' }}>
          Seu diário
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#95A8B8' }}>
          Acompanhe sua evolução
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate('calendar')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#C7DDF2',
            boxShadow: '0 2px 12px rgba(199, 221, 242, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Calendário emocional
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Veja seus dias e padrões
              </p>
            </div>
            <Calendar className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => navigate('report')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#A8D5C2',
            boxShadow: '0 2px 12px rgba(168, 213, 194, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Relatório semanal
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Seu progresso está aqui
              </p>
            </div>
            <Sparkles className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>

        <button
          onClick={() => navigate('contacts')}
          className="w-full p-5 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group"
          style={{ 
            backgroundColor: '#F3EDE7',
            boxShadow: '0 2px 12px rgba(243, 237, 231, 0.15)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1.5 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#5C6F82' }}>
                Contatos de apoio
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
                Pessoas que podem ajudar
              </p>
            </div>
            <Heart className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#5C6F82' }} />
          </div>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Conteúdo principal com padding generoso */}
      <div className="px-6 pt-6 pb-8">
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'exercises' && renderExercisesTab()}
        {activeTab === 'diary' && renderDiaryTab()}
      </div>

      {/* Aviso legal */}
      <div className="px-6 pb-4">
        <p className="text-xs text-center leading-relaxed" style={{ color: '#95A8B8' }}>
          Este app é um apoio, não substitui terapia ou tratamento médico.
        </p>
      </div>

      {/* Navegação em 3 abas - fixa no topo do botão de emergência */}
      <div 
        className="fixed bottom-24 left-0 right-0 px-6 py-2"
        style={{ backgroundColor: '#F7F9FA' }}
      >
        <div 
          className="flex items-center justify-around p-2 rounded-3xl backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            boxShadow: '0 -2px 20px rgba(92, 111, 130, 0.12)' 
          }}
        >
          <button
            onClick={() => setActiveTab('home')}
            className="flex-1 py-3.5 px-4 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'home' ? '#C7DDF2' : 'transparent',
              transform: activeTab === 'home' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <HomeIcon 
                className="w-5 h-5 transition-all duration-300" 
                style={{ 
                  color: activeTab === 'home' ? '#5C6F82' : '#95A8B8',
                  strokeWidth: activeTab === 'home' ? 2.5 : 2
                }} 
              />
              <span 
                className="text-xs font-medium transition-all duration-300"
                style={{ color: activeTab === 'home' ? '#5C6F82' : '#95A8B8' }}
              >
                Home
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className="flex-1 py-3.5 px-4 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'exercises' ? '#A8D5C2' : 'transparent',
              transform: activeTab === 'exercises' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <Wind 
                className="w-5 h-5 transition-all duration-300" 
                style={{ 
                  color: activeTab === 'exercises' ? '#5C6F82' : '#95A8B8',
                  strokeWidth: activeTab === 'exercises' ? 2.5 : 2
                }} 
              />
              <span 
                className="text-xs font-medium transition-all duration-300"
                style={{ color: activeTab === 'exercises' ? '#5C6F82' : '#95A8B8' }}
              >
                Exercícios
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('diary')}
            className="flex-1 py-3.5 px-4 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'diary' ? '#F3EDE7' : 'transparent',
              transform: activeTab === 'diary' ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <BookOpen 
                className="w-5 h-5 transition-all duration-300" 
                style={{ 
                  color: activeTab === 'diary' ? '#5C6F82' : '#95A8B8',
                  strokeWidth: activeTab === 'diary' ? 2.5 : 2
                }} 
              />
              <span 
                className="text-xs font-medium transition-all duration-300"
                style={{ color: activeTab === 'diary' ? '#5C6F82' : '#95A8B8' }}
              >
                Diário
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Botão fixo de emergência - sempre visível */}
      <div className="fixed bottom-6 left-0 right-0 px-6">
        <button
          onClick={() => navigate('crisis')}
          className="w-full py-5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          style={{ 
            backgroundColor: '#E7CBCB',
            boxShadow: '0 4px 24px rgba(231, 203, 203, 0.5)',
            minHeight: '64px'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Wind className="w-6 h-6 group-hover:animate-pulse" style={{ color: '#5C6F82' }} />
            <span className="text-lg font-semibold" style={{ color: '#5C6F82' }}>
              Ajuda Agora
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
