'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'
import type { Screen } from '../page'

interface ExerciseGuidedProps {
  navigate: (screen: Screen) => void
  exerciseId: string
}

export function ExerciseGuided({ navigate, exerciseId }: ExerciseGuidedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)

  const exercises = {
    'breathing-calm': {
      title: 'Respiração para acalmar',
      color: '#C7DDF2',
      steps: [
        { text: 'Encontre uma posição confortável', duration: 5 },
        { text: 'Coloque uma mão no peito e outra na barriga', duration: 5 },
        { text: 'Inspira pelo nariz contando até 4', duration: 4 },
        { text: 'Segura o ar por 4 segundos', duration: 4 },
        { text: 'Solta pela boca contando até 6', duration: 6 },
        { text: 'Pausa. Sente o seu corpo', duration: 4 },
        { text: 'Vamos repetir mais algumas vezes', duration: 3 },
        { text: 'Inspira pelo nariz, 1... 2... 3... 4', duration: 4 },
        { text: 'Segura, 1... 2... 3... 4', duration: 4 },
        { text: 'Solta pela boca, 1... 2... 3... 4... 5... 6', duration: 6 },
        { text: 'Última vez. Inspira fundo', duration: 4 },
        { text: 'Segura', duration: 4 },
        { text: 'Solta tudo, relaxa os ombros', duration: 6 },
        { text: 'Você conseguiu. Respira no seu ritmo agora', duration: 5 }
      ]
    },
    'sleep-preparation': {
      title: 'Preparar pro sono',
      color: '#5C6F82',
      textLight: true,
      steps: [
        { text: 'Deita confortável, fecha os olhos', duration: 5 },
        { text: 'Sente o peso do seu corpo na cama', duration: 5 },
        { text: 'Relaxa a testa, as sobrancelhas', duration: 4 },
        { text: 'Relaxa a mandíbula, deixa a boca entreaberta', duration: 4 },
        { text: 'Solta os ombros, deixa eles pesados', duration: 5 },
        { text: 'Relaxa os braços, as mãos', duration: 4 },
        { text: 'Sente a barriga subindo e descendo', duration: 5 },
        { text: 'Relaxa as pernas, os pés', duration: 4 },
        { text: 'Todo seu corpo tá pesado e relaxado', duration: 5 },
        { text: 'Respira devagar, sem esforço', duration: 6 },
        { text: 'Cada respiração te deixa mais calmo(a)', duration: 6 },
        { text: 'Você está seguro(a), pode descansar', duration: 8 }
      ]
    },
    'racing-thoughts': {
      title: 'Pensamento acelerado',
      color: '#A8D5C2',
      steps: [
        { text: 'Respira fundo. Eu tô aqui com você', duration: 5 },
        { text: 'Vamos organizar esses pensamentos juntos', duration: 5 },
        { text: 'Imagina cada pensamento como uma nuvem', duration: 5 },
        { text: 'Você não precisa segurar nenhuma nuvem', duration: 5 },
        { text: 'Deixa elas passarem, uma de cada vez', duration: 6 },
        { text: 'Respira. Observa. Deixa ir', duration: 5 },
        { text: 'Não precisa resolver tudo agora', duration: 5 },
        { text: 'Volta pro seu corpo. Sente seus pés no chão', duration: 5 },
        { text: 'Sente suas mãos. Mexe os dedos devagar', duration: 5 },
        { text: 'Você tá aqui, no presente', duration: 5 },
        { text: 'Os pensamentos vão e vêm. Você permanece', duration: 6 }
      ]
    },
    'self-compassion': {
      title: 'Autocompaixão',
      color: '#E7CBCB',
      steps: [
        { text: 'Coloca a mão no coração', duration: 5 },
        { text: 'Sente o calor da sua mão', duration: 5 },
        { text: 'Você está fazendo o melhor que pode', duration: 6 },
        { text: 'E isso é suficiente', duration: 5 },
        { text: 'Todos nós lutamos. Você não está sozinho(a)', duration: 6 },
        { text: 'Seja gentil com você mesmo(a)', duration: 5 },
        { text: 'Como você falaria com um amigo querido?', duration: 6 },
        { text: 'Fale assim com você', duration: 5 },
        { text: 'Você merece compaixão', duration: 5 },
        { text: 'Você merece descanso', duration: 5 },
        { text: 'Você merece paz', duration: 6 }
      ]
    },
    'quick-crisis': {
      title: 'Crise rápida',
      color: '#F3EDE7',
      steps: [
        { text: 'Eu tô com você. Respira comigo', duration: 4 },
        { text: 'Inspira pelo nariz', duration: 4 },
        { text: 'Solta pela boca', duration: 6 },
        { text: 'Olha ao redor. Encontra 5 coisas que você vê', duration: 8 },
        { text: 'Agora 4 coisas que você pode tocar', duration: 8 },
        { text: '3 sons que você escuta', duration: 6 },
        { text: '2 cheiros que você sente', duration: 6 },
        { text: '1 coisa que você pode saborear', duration: 5 },
        { text: 'Você está aqui. Você está seguro(a)', duration: 6 },
        { text: 'Vai passar. Respira', duration: 5 }
      ]
    }
  }

  const exercise = exercises[exerciseId as keyof typeof exercises]

  useEffect(() => {
    if (!isPlaying || currentStep >= exercise.steps.length) return

    setTimeLeft(exercise.steps[currentStep].duration)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentStep < exercise.steps.length - 1) {
            setCurrentStep((s) => s + 1)
            return exercise.steps[currentStep + 1].duration
          } else {
            setIsPlaying(false)
            return 0
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentStep, exercise.steps])

  const handlePlayPause = () => {
    if (currentStep >= exercise.steps.length) {
      setCurrentStep(0)
      setIsPlaying(true)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setTimeLeft(exercise.steps[0].duration)
  }

  const progress = ((currentStep + 1) / exercise.steps.length) * 100
  const isComplete = currentStep >= exercise.steps.length && !isPlaying

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: exercise.color }}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => navigate('exercises')}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: exercise.textLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)' }}
        >
          <ArrowLeft 
            className="w-5 h-5" 
            style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }} 
          />
        </button>
        <button
          onClick={handleRestart}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: exercise.textLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)' }}
        >
          <RotateCcw 
            className="w-5 h-5" 
            style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }} 
          />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8">
        {/* Timer circle */}
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={exercise.textLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(92, 111, 130, 0.2)'}
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={exercise.textLight ? '#FFFFFF' : '#5C6F82'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-5xl font-semibold"
              style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }}
            >
              {isPlaying ? timeLeft : '•'}
            </span>
          </div>
        </div>

        {/* Instruction text */}
        <div className="text-center space-y-2 max-w-sm">
          <p 
            className="text-xl font-medium leading-relaxed"
            style={{ color: exercise.textLight ? '#FFFFFF' : '#5C6F82' }}
          >
            {isComplete 
              ? 'Você conseguiu 💛' 
              : exercise.steps[currentStep]?.text
            }
          </p>
          <p 
            className="text-sm"
            style={{ color: exercise.textLight ? 'rgba(255, 255, 255, 0.8)' : '#95A8B8' }}
          >
            {isComplete 
              ? 'Respira no seu ritmo agora'
              : `Passo ${currentStep + 1} de ${exercise.steps.length}`
            }
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 space-y-4">
        <button
          onClick={handlePlayPause}
          className="w-full py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: exercise.textLight ? 'rgba(255, 255, 255, 0.9)' : '#FFFFFF',
            color: '#5C6F82'
          }}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {isComplete ? 'Recomeçar' : currentStep === 0 ? 'Começar' : 'Continuar'}
            </>
          )}
        </button>

        {isComplete && (
          <button
            onClick={() => navigate('dashboard')}
            className="w-full py-3 text-sm"
            style={{ color: exercise.textLight ? 'rgba(255, 255, 255, 0.9)' : '#5C6F82' }}
          >
            Voltar pro início
          </button>
        )}
      </div>
    </div>
  )
}
