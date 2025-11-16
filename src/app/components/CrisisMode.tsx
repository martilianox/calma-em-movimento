'use client'

import { useState, useEffect } from 'react'
import { Heart, Phone, Users } from 'lucide-react'
import type { Screen } from '../page'

interface CrisisModeProps {
  navigate: (screen: Screen) => void
}

export function CrisisMode({ navigate }: CrisisModeProps) {
  const [step, setStep] = useState<'welcome' | 'breathing' | 'complete'>('welcome')
  const [breathCount, setBreathCount] = useState(0)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [timer, setTimer] = useState(4)

  useEffect(() => {
    if (step !== 'breathing') return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Muda de fase
          if (phase === 'inhale') {
            setPhase('hold')
            return 4
          } else if (phase === 'hold') {
            setPhase('exhale')
            return 6
          } else {
            setBreathCount((c) => c + 1)
            setPhase('inhale')
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [step, phase])

  const phaseText = {
    inhale: 'Inspira devagar…',
    hold: 'Segura o ar',
    exhale: 'Solta o ar como quem solta um peso.'
  }

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col justify-between p-6" style={{ backgroundColor: '#D8E9F1' }}>
        <div className="flex-1 flex flex-col justify-center space-y-6 max-w-md mx-auto">
          <div className="text-center space-y-4">
            <Heart className="w-12 h-12 mx-auto" style={{ color: '#5C6F82' }} />
            <h1 className="text-2xl font-semibold" style={{ color: '#5C6F82' }}>
              Respira comigo. Você não está só.
            </h1>
            <p className="text-base leading-relaxed" style={{ color: '#5C6F82' }}>
              Vamos por partes… você tá fazendo o melhor que consegue.
            </p>
          </div>

          <div 
            className="p-5 rounded-2xl space-y-3"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#5C6F82' }}>
              Se você está em risco imediato, ligue para:
            </p>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" style={{ color: '#5C6F82' }} />
              <div>
                <p className="font-medium" style={{ color: '#5C6F82' }}>CVV: 188</p>
                <p className="text-xs" style={{ color: '#95A8B8' }}>Apoio emocional 24h</p>
              </div>
            </div>
          </div>

          {/* Botão de Contatos de Emergência */}
          <button
            onClick={() => navigate('contacts')}
            className="w-full p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: 'rgba(168, 213, 194, 0.3)', border: '2px solid #A8D5C2' }}
          >
            <Users className="w-6 h-6" style={{ color: '#5C6F82' }} />
            <div className="text-left flex-1">
              <p className="font-medium" style={{ color: '#5C6F82' }}>
                Meus Contatos de Emergência
              </p>
              <p className="text-xs" style={{ color: '#95A8B8' }}>
                Pessoas que podem te ajudar agora
              </p>
            </div>
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setStep('breathing')}
            className="w-full py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: '#83978A', color: '#FFFFFF' }}
          >
            Começar respiração
          </button>
          <button
            onClick={() => navigate('dashboard')}
            className="w-full py-3 text-sm"
            style={{ color: '#5C6F82' }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  if (step === 'breathing') {
    const progress = (breathCount / 5) * 100

    if (breathCount >= 5) {
      setTimeout(() => setStep('complete'), 1000)
    }

    return (
      <div className="min-h-screen flex flex-col justify-between p-6" style={{ backgroundColor: '#D8E9F1' }}>
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          {/* Breathing circle */}
          <div className="relative">
            <div
              className="rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: phase === 'inhale' ? '200px' : phase === 'hold' ? '200px' : '150px',
                height: phase === 'inhale' ? '200px' : phase === 'hold' ? '200px' : '150px',
                backgroundColor: 'rgba(168, 213, 194, 0.3)',
                border: '3px solid #A8D5C2'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-semibold" style={{ color: '#5C6F82' }}>
                {timer}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <p className="text-xl font-medium" style={{ color: '#5C6F82' }}>
              {phaseText[phase]}
            </p>
            <p className="text-sm" style={{ color: '#95A8B8' }}>
              Mais uma vez, no seu ritmo.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ backgroundColor: '#A8D5C2', width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center mt-2" style={{ color: '#95A8B8' }}>
              {breathCount} de 5 ciclos
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('dashboard')}
          className="w-full py-3 text-sm"
          style={{ color: '#5C6F82' }}
        >
          Parar exercício
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-6" style={{ backgroundColor: '#D8E9F1' }}>
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: '#A8D5C2' }}
          >
            <Heart className="w-8 h-8" style={{ color: '#5C6F82' }} />
          </div>
          <h1 className="text-2xl font-semibold" style={{ color: '#5C6F82' }}>
            Ótimo. Sua calma importa.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#5C6F82' }}>
            Como você se sente agora? Fique aqui o tempo que precisar.
          </p>
        </div>

        <div 
          className="p-5 rounded-2xl"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82' }}>
            Se quiser, me conta o que estava acontecendo. Tudo que você colocar aqui é só seu, e está seguro.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate('dialogue')}
          className="w-full py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: '#83978A', color: '#FFFFFF' }}
        >
          Registrar momento
        </button>
        <button
          onClick={() => setStep('breathing')}
          className="w-full py-3 text-sm"
          style={{ color: '#5C6F82' }}
        >
          Repetir exercício
        </button>
        <button
          onClick={() => navigate('dashboard')}
          className="w-full py-3 text-sm"
          style={{ color: '#5C6F82' }}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  )
}
