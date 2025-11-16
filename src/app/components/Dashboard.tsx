'use client'

import { Heart, Wind, BookOpen, Calendar, Home as HomeIcon } from 'lucide-react'
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
  if (currentHour < 12) {
    greeting = `Bom dia, ${userName}. Como seu corpo acordou hoje?`
  } else if (currentHour < 18) {
    greeting = `Oi, ${userName}. Como você tá se sentindo agora?`
  } else {
    greeting = `Boa noite, ${userName}. Vamos desacelerar juntos?`
  }

  const renderHomeTab = () => (
    <div className="space-y-8">
      {/* Logo no topo */}
      <div className="flex justify-center pt-4 pb-2">
        <img 
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/04a7671d-26d0-4fad-a540-da6bfed424e4.png" 
          alt="Calma em Movimento" 
          className="w-24 h-24 object-contain"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
          }}
        />
      </div>

      {/* Saudação */}
      <div className="space-y-6">
        <h1 className="text-2xl font-medium leading-relaxed" style={{ color: '#5C6F82' }}>
          {greeting}
        </h1>

        {/* Card inspiracional */}
        <div 
          className="p-6 rounded-3xl"
          style={{ backgroundColor: '#C7DDF2' }}
        >
          <div className="flex items-start gap-4">
            <Heart className="w-7 h-7 flex-shrink-0 mt-1" style={{ color: '#5C6F82' }} />
            <div className="space-y-2">
              <h3 className="font-medium text-base" style={{ color: '#5C6F82' }}>
                Você não está sozinho.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.85 }}>
                Vamos aos poucos… No seu tempo tudo funciona melhor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações principais (máximo 3) */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('register')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#A8D5C2', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Como você está agora?
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Registre este momento
          </p>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#F3EDE7', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Fazer um exercício
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Respiração, relaxamento, sono
          </p>
        </button>

        <button
          onClick={() => setActiveTab('diary')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#DDE2E6', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Ver meu diário
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Acompanhe sua jornada
          </p>
        </button>
      </div>
    </div>
  )

  const renderExercisesTab = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium mb-2" style={{ color: '#5C6F82' }}>
          Exercícios
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#95A8B8' }}>
          Escolha o que você precisa agora
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('exercises')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#C7DDF2', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Respiração guiada
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Acalme seu corpo e mente
          </p>
        </button>

        <button
          onClick={() => navigate('exercises')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#A8D5C2', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Relaxamento muscular
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Solte as tensões do corpo
          </p>
        </button>

        <button
          onClick={() => navigate('library')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#F3EDE7', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Conteúdos educativos
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Entenda melhor a ansiedade
          </p>
        </button>
      </div>
    </div>
  )

  const renderDiaryTab = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium mb-2" style={{ color: '#5C6F82' }}>
          Seu diário
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#95A8B8' }}>
          Acompanhe sua evolução
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('calendar')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#C7DDF2', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Calendário emocional
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Veja seus dias e padrões
          </p>
        </button>

        <button
          onClick={() => navigate('report')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#A8D5C2', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Relatório semanal
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Seu progresso está aqui
          </p>
        </button>

        <button
          onClick={() => navigate('contacts')}
          className="w-full p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: '#F3EDE7', minHeight: '88px' }}
        >
          <h3 className="font-medium text-lg mb-2" style={{ color: '#5C6F82' }}>
            Contatos de apoio
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Pessoas que podem ajudar
          </p>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Conteúdo principal com padding generoso */}
      <div className="px-6 pt-8 pb-8">
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
        className="fixed bottom-24 left-0 right-0 px-6"
        style={{ backgroundColor: '#F7F9FA' }}
      >
        <div 
          className="flex items-center justify-around p-2 rounded-3xl"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 -2px 20px rgba(92, 111, 130, 0.08)' }}
        >
          <button
            onClick={() => setActiveTab('home')}
            className="flex-1 py-4 px-6 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'home' ? '#C7DDF2' : 'transparent',
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <HomeIcon 
                className="w-6 h-6" 
                style={{ color: activeTab === 'home' ? '#5C6F82' : '#95A8B8' }} 
              />
              <span 
                className="text-xs font-medium"
                style={{ color: activeTab === 'home' ? '#5C6F82' : '#95A8B8' }}
              >
                Home
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className="flex-1 py-4 px-6 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'exercises' ? '#A8D5C2' : 'transparent',
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <Wind 
                className="w-6 h-6" 
                style={{ color: activeTab === 'exercises' ? '#5C6F82' : '#95A8B8' }} 
              />
              <span 
                className="text-xs font-medium"
                style={{ color: activeTab === 'exercises' ? '#5C6F82' : '#95A8B8' }}
              >
                Exercícios
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('diary')}
            className="flex-1 py-4 px-6 rounded-2xl transition-all duration-300"
            style={{ 
              backgroundColor: activeTab === 'diary' ? '#F3EDE7' : 'transparent',
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <BookOpen 
                className="w-6 h-6" 
                style={{ color: activeTab === 'diary' ? '#5C6F82' : '#95A8B8' }} 
              />
              <span 
                className="text-xs font-medium"
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
          className="w-full py-6 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{ 
            backgroundColor: '#E7CBCB',
            boxShadow: '0 4px 20px rgba(231, 203, 203, 0.4)',
            minHeight: '64px'
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Wind className="w-7 h-7" style={{ color: '#5C6F82' }} />
            <span className="text-lg font-medium" style={{ color: '#5C6F82' }}>
              Ajuda Agora
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
