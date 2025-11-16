'use client'

import { ArrowLeft, BookOpen, Headphones, Video, Clock } from 'lucide-react'
import type { Screen } from '../page'

interface ContentLibraryProps {
  navigate: (screen: Screen) => void
}

export function ContentLibrary({ navigate }: ContentLibraryProps) {
  const contents = [
    {
      id: 1,
      type: 'article',
      title: 'O que é ansiedade?',
      description: 'Entenda o que acontece no seu corpo',
      duration: '5 min de leitura',
      icon: BookOpen,
      color: '#C7DDF2'
    },
    {
      id: 2,
      type: 'audio',
      title: 'Respiração guiada',
      description: 'Áudio para ouvir quando precisar',
      duration: '8 min',
      icon: Headphones,
      color: '#A8D5C2'
    },
    {
      id: 3,
      type: 'article',
      title: 'Gatilhos comuns',
      description: 'Aprenda a identificar os seus',
      duration: '4 min de leitura',
      icon: BookOpen,
      color: '#E7CBCB'
    },
    {
      id: 4,
      type: 'video',
      title: 'Técnicas de aterramento',
      description: 'Exercícios práticos em vídeo',
      duration: '6 min',
      icon: Video,
      color: '#F3EDE7'
    },
    {
      id: 5,
      type: 'article',
      title: 'Ansiedade e sono',
      description: 'Como melhorar a qualidade do sono',
      duration: '6 min de leitura',
      icon: BookOpen,
      color: '#C7DDF2'
    },
    {
      id: 6,
      type: 'audio',
      title: 'Meditação para iniciantes',
      description: 'Comece aos poucos, sem pressão',
      duration: '10 min',
      icon: Headphones,
      color: '#A8D5C2'
    },
    {
      id: 7,
      type: 'article',
      title: 'Rotina e ansiedade',
      description: 'Pequenos hábitos que ajudam',
      duration: '5 min de leitura',
      icon: BookOpen,
      color: '#E7CBCB'
    },
    {
      id: 8,
      type: 'video',
      title: 'Quando procurar ajuda',
      description: 'Sinais importantes pra observar',
      duration: '4 min',
      icon: Video,
      color: '#F3EDE7'
    }
  ]

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'article', label: 'Artigos' },
    { id: 'audio', label: 'Áudios' },
    { id: 'video', label: 'Vídeos' }
  ]

  return (
    <div className="min-h-screen pb-6" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <button
          onClick={() => navigate('dashboard')}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#5C6F82' }} />
        </button>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: '#5C6F82' }}>
            Biblioteca
          </h1>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Aprenda sobre ansiedade no seu ritmo
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: category.id === 'all' ? '#A8D5C2' : '#FFFFFF',
                color: '#5C6F82',
                border: '2px solid #DDE2E6'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="px-6 space-y-3">
        {contents.map((content) => {
          const Icon = content.icon
          return (
            <button
              key={content.id}
              className="w-full p-4 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: content.color }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: 'rgba(92, 111, 130, 0.1)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#5C6F82' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1" style={{ color: '#5C6F82' }}>
                    {content.title}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#5C6F82', opacity: 0.8 }}>
                    {content.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#95A8B8' }}>
                    <Clock className="w-3 h-3" />
                    {content.duration}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom note */}
      <div className="px-6 mt-6">
        <div 
          className="p-4 rounded-xl"
          style={{ backgroundColor: '#FFFFFF', border: '2px solid #DDE2E6' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#95A8B8' }}>
            💡 Novos conteúdos são adicionados toda semana. Volte sempre!
          </p>
        </div>
      </div>
    </div>
  )
}
