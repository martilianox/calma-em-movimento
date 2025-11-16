'use client'

import { Heart, Wind, BookOpen, Calendar, Home as HomeIcon, Sparkles, GraduationCap, Lightbulb, Brain, Stethoscope } from 'lucide-react'
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
    greeting = `Bom dia, ${userName}`
  } else if (currentHour < 18) {
    greeting = `Oi, ${userName}`
  } else {
    greeting = `Boa noite, ${userName}`
  }

  // Funções para abrir conteúdos externos
  const openAnxietyPDFs = () => {
    window.open('https://www.google.com/search?q=ansiedade+depressão+filetype:pdf', '_blank')
  }

  const openPracticalTipsVideos = () => {
    window.open('https://www.youtube.com/results?search_query=dicas+práticas+ansiedade+depressão', '_blank')
  }

  const openAllContents = () => {
    // Abre PDFs
    window.open('https://www.google.com/search?q=ansiedade+depressão+filetype:pdf', '_blank')
    // Abre vídeos após um pequeno delay para não bloquear popups
    setTimeout(() => {
      window.open('https://www.youtube.com/results?search_query=dicas+práticas+ansiedade+depressão', '_blank')
    }, 500)
  }

  const renderHomeTab = () => (
    <div className="space-y-6 md:space-y-8">
      {/* Header com logo e saudação - responsivo */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 pb-4">
        <img 
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46450cd0-be72-47f6-bc9f-5cc92c1cc158.png" 
          alt="Calma em Movimento" 
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain flex-shrink-0 transition-transform duration-300 hover:scale-105"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))'
          }}
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {greeting}
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Como você está se sentindo?
          </p>
        </div>
      </div>

      {/* Card inspiracional com gradiente suave */}
      <div 
        className="p-6 md:p-8 rounded-3xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, rgba(232, 212, 248, 0.6) 0%, rgba(199, 221, 242, 0.6) 100%)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex items-start gap-4">
          <Heart className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 mt-1 text-purple-500 animate-pulse" />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg md:text-xl text-gray-800">
              Você não está sozinho
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-700">
              Vamos aos poucos… No seu tempo tudo funciona melhor.
            </p>
          </div>
        </div>
      </div>

      {/* Botão único do Médico Amigo - destaque máximo */}
      <button
        onClick={() => navigate('medico-amigo')}
        className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] group shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #60a5fa 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-xl md:text-2xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-white">
              Médico Amigo
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-white/95">
              Conversar agora com IA de acolhimento
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Stethoscope className="w-7 h-7 md:w-8 md:h-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-white" />
            <Heart className="w-6 h-6 md:w-7 md:h-7 opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-white animate-pulse" />
          </div>
        </div>
      </button>

      {/* Seção de Conteúdos Educativos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <GraduationCap className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Conteúdos Educativos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={openAnxietyPDFs}
            className="p-5 md:p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97] group shadow-md"
            style={{ 
              background: 'linear-gradient(135deg, rgba(232, 212, 248, 0.8) 0%, rgba(232, 212, 248, 0.5) 100%)',
            }}
          >
            <div className="space-y-3">
              <Brain className="w-7 h-7 md:w-8 md:h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-purple-600" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1 text-gray-800">
                  Entenda a ansiedade
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-gray-600">
                  Aprenda sobre o tema
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={openPracticalTipsVideos}
            className="p-5 md:p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97] group shadow-md"
            style={{ 
              background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.8) 0%, rgba(251, 207, 232, 0.5) 100%)',
            }}
          >
            <div className="space-y-3">
              <Lightbulb className="w-7 h-7 md:w-8 md:h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300 text-pink-600" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1 text-gray-800">
                  Dicas práticas
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-gray-600">
                  Técnicas do dia a dia
                </p>
              </div>
            </div>
          </button>
        </div>

        <button
          onClick={openAllContents}
          className="w-full p-5 md:p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-md"
          style={{ 
            background: 'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(191, 219, 254, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base md:text-lg mb-1 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Ver todos os conteúdos
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-gray-600">
                Explore a biblioteca completa
              </p>
            </div>
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-blue-600" />
          </div>
        </button>
      </div>

      {/* Dica do dia */}
      <div 
        className="p-5 rounded-3xl border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <p className="text-sm md:text-base text-center leading-relaxed text-gray-700">
          💡 <strong>Dica:</strong> Respire fundo 3 vezes sempre que sentir ansiedade
        </p>
      </div>
    </div>
  )

  const renderExercisesTab = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="pt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Exercícios
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-gray-500">
          Escolha o que você precisa agora
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('exercises')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(191, 219, 254, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Respiração guiada
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Acalme seu corpo e mente
              </p>
            </div>
            <Wind className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-blue-600" />
          </div>
        </button>

        <button
          onClick={() => navigate('exercises')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(232, 212, 248, 0.8) 0%, rgba(232, 212, 248, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Relaxamento muscular
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Solte as tensões do corpo
              </p>
            </div>
            <Heart className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-purple-600" />
          </div>
        </button>

        <button
          onClick={() => navigate('library')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.8) 0%, rgba(251, 207, 232, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Conteúdos educativos
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Entenda melhor a ansiedade
              </p>
            </div>
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-pink-600" />
          </div>
        </button>
      </div>
    </div>
  )

  const renderDiaryTab = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="pt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Seu diário
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-gray-500">
          Acompanhe sua evolução
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('calendar')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(191, 219, 254, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Calendário emocional
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Veja seus dias e padrões
              </p>
            </div>
            <Calendar className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-blue-600" />
          </div>
        </button>

        <button
          onClick={() => navigate('report')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(232, 212, 248, 0.8) 0%, rgba(232, 212, 248, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Relatório semanal
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Seu progresso está aqui
              </p>
            </div>
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-purple-600" />
          </div>
        </button>

        <button
          onClick={() => navigate('contacts')}
          className="w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.8) 0%, rgba(251, 207, 232, 0.5) 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-800">
                Contatos de apoio
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Pessoas que podem ajudar
              </p>
            </div>
            <Heart className="w-6 h-6 md:w-7 md:h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-pink-600" />
          </div>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-40 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Conteúdo principal com padding generoso e max-width para desktop */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-6 pb-8">
        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'exercises' && renderExercisesTab()}
        {activeTab === 'diary' && renderDiaryTab()}
      </div>

      {/* Aviso legal */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 pb-4">
        <p className="text-xs md:text-sm text-center leading-relaxed text-gray-500">
          Este app é um apoio, não substitui terapia ou tratamento médico.
        </p>
      </div>

      {/* Navegação em 3 abas - fixa no topo do botão de emergência */}
      <div 
        className="fixed bottom-28 md:bottom-32 left-0 right-0 px-6 md:px-8 py-2"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex items-center justify-around p-3 rounded-3xl backdrop-blur-md shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            }}
          >
            <button
              onClick={() => setActiveTab('home')}
              className="flex-1 py-4 px-4 md:px-6 rounded-2xl transition-all duration-300"
              style={{ 
                background: activeTab === 'home' ? 'linear-gradient(135deg, rgba(191, 219, 254, 0.8) 0%, rgba(191, 219, 254, 0.5) 100%)' : 'transparent',
                transform: activeTab === 'home' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <HomeIcon 
                  className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300" 
                  style={{ 
                    color: activeTab === 'home' ? '#2563eb' : '#9ca3af',
                    strokeWidth: activeTab === 'home' ? 2.5 : 2
                  }} 
                />
                <span 
                  className="text-xs md:text-sm font-medium transition-all duration-300"
                  style={{ color: activeTab === 'home' ? '#2563eb' : '#9ca3af' }}
                >
                  Home
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('exercises')}
              className="flex-1 py-4 px-4 md:px-6 rounded-2xl transition-all duration-300"
              style={{ 
                background: activeTab === 'exercises' ? 'linear-gradient(135deg, rgba(232, 212, 248, 0.8) 0%, rgba(232, 212, 248, 0.5) 100%)' : 'transparent',
                transform: activeTab === 'exercises' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <Wind 
                  className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300" 
                  style={{ 
                    color: activeTab === 'exercises' ? '#9333ea' : '#9ca3af',
                    strokeWidth: activeTab === 'exercises' ? 2.5 : 2
                  }} 
                />
                <span 
                  className="text-xs md:text-sm font-medium transition-all duration-300"
                  style={{ color: activeTab === 'exercises' ? '#9333ea' : '#9ca3af' }}
                >
                  Exercícios
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('diary')}
              className="flex-1 py-4 px-4 md:px-6 rounded-2xl transition-all duration-300"
              style={{ 
                background: activeTab === 'diary' ? 'linear-gradient(135deg, rgba(251, 207, 232, 0.8) 0%, rgba(251, 207, 232, 0.5) 100%)' : 'transparent',
                transform: activeTab === 'diary' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <BookOpen 
                  className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300" 
                  style={{ 
                    color: activeTab === 'diary' ? '#ec4899' : '#9ca3af',
                    strokeWidth: activeTab === 'diary' ? 2.5 : 2
                  }} 
                />
                <span 
                  className="text-xs md:text-sm font-medium transition-all duration-300"
                  style={{ color: activeTab === 'diary' ? '#ec4899' : '#9ca3af' }}
                >
                  Diário
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Botão fixo de emergência - sempre visível com gradiente impactante */}
      <div className="fixed bottom-6 md:bottom-8 left-0 right-0 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('crisis')}
            className="w-full py-6 md:py-7 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #f87171 0%, #fb923c 50%, #fbbf24 100%)',
              minHeight: '72px'
            }}
          >
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <Wind className="w-7 h-7 md:w-8 md:h-8 group-hover:animate-pulse text-white" />
              <span className="text-xl md:text-2xl font-bold text-white">
                Ajuda Agora
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
