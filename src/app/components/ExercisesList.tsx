'use client'

import { ArrowLeft, Wind, Moon, Brain, Heart as HeartIcon, Zap } from 'lucide-react'
import type { Screen } from '../page'

interface ExercisesListProps {
  navigate: (screen: Screen) => void
  onSelectExercise: (exerciseId: string) => void
}

export function ExercisesList({ navigate, onSelectExercise }: ExercisesListProps) {
  const exercises = [
    {
      id: 'breathing-calm',
      title: 'Respiração para acalmar',
      duration: '3 min',
      description: 'Quando a mente tá acelerada',
      icon: Wind,
      color: '#C7DDF2'
    },
    {
      id: 'sleep-preparation',
      title: 'Preparar pro sono',
      duration: '5 min',
      description: 'Pra desacelerar antes de dormir',
      icon: Moon,
      color: '#5C6F82',
      textLight: true
    },
    {
      id: 'racing-thoughts',
      title: 'Pensamento acelerado',
      duration: '4 min',
      description: 'Quando não consegue parar de pensar',
      icon: Brain,
      color: '#A8D5C2'
    },
    {
      id: 'self-compassion',
      title: 'Autocompaixão',
      duration: '3 min',
      description: 'Pra ser gentil com você mesmo(a)',
      icon: HeartIcon,
      color: '#E7CBCB'
    },
    {
      id: 'quick-crisis',
      title: 'Crise rápida',
      duration: '2 min',
      description: 'Quando precisa de ajuda agora',
      icon: Zap,
      color: '#F3EDE7'
    }
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
            Exercícios guiados
          </h1>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Escolha o que você precisa agora
          </p>
        </div>
      </div>

      {/* Exercises list */}
      <div className="px-6 space-y-3">
        {exercises.map((exercise) => {
          const Icon = exercise.icon
          return (
            <button
              key={exercise.id}
              onClick={() => onSelectExercise(exercise.id)}
              className="w-full p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: exercise.color }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ 
                    backgroundColor: exercise.textLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(92, 111, 130, 0.1)' 
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 
                      className="font-medium"
                      style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }}
                    >
                      {exercise.title}
                    </h3>
                    <span 
                      className="text-sm"
                      style={{ color: exercise.textLight ? 'rgba(255, 255, 255, 0.8)' : '#95A8B8' }}
                    >
                      {exercise.duration}
                    </span>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: exercise.textLight ? 'rgba(255, 255, 255, 0.9)' : '#5C6F82', opacity: 0.8 }}
                  >
                    {exercise.description}
                  </p>
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
            💡 Dica: Encontre um lugar tranquilo e use fones de ouvido se possível.
          </p>
        </div>
      </div>
    </div>
  )
}
