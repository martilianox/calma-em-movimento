'use client'

import { useState, useEffect } from 'react'
import { Heart, Phone, Users, Wind } from 'lucide-react'
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

  const phaseColors = {
    inhale: 'from-blue-400 to-purple-500',
    hold: 'from-purple-400 to-pink-500',
    exhale: 'from-pink-400 to-blue-400'
  }

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="flex-1 flex flex-col justify-center space-y-8 max-w-2xl mx-auto w-full">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Respira comigo. Você não está só.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-xl mx-auto">
              Vamos por partes… você tá fazendo o melhor que consegue.
            </p>
          </div>

          <div 
            className="p-6 md:p-8 rounded-3xl space-y-4 backdrop-blur-md shadow-xl"
            style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)' }}
          >
            <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
              Se você está em risco imediato, ligue para:
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50">
              <Phone className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
              <div>
                <p className="font-bold text-lg md:text-xl text-gray-800">CVV: 188</p>
                <p className="text-sm md:text-base text-gray-600">Apoio emocional 24h</p>
              </div>
            </div>
          </div>

          {/* Botão de Contatos de Emergência */}
          <button
            onClick={() => navigate('contacts')}
            className="w-full p-6 md:p-8 rounded-3xl flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md shadow-xl group"
            style={{ background: 'linear-gradient(135deg, rgba(168, 213, 194, 0.6) 0%, rgba(168, 213, 194, 0.4) 100%)' }}
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-green-700 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-left flex-1">
              <p className="font-bold text-lg md:text-xl text-gray-800 mb-1">
                Meus Contatos de Emergência
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Pessoas que podem te ajudar agora
              </p>
            </div>
          </button>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto w-full">
          <button
            onClick={() => setStep('breathing')}
            className="w-full py-6 md:py-7 rounded-3xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-white"
            style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #60a5fa 100%)' }}
          >
            Começar respiração
          </button>
          <button
            onClick={() => navigate('dashboard')}
            className="w-full py-4 text-base md:text-lg font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300"
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
      <div className="min-h-screen flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="flex-1 flex flex-col justify-center items-center space-y-12 md:space-y-16">
          {/* Breathing circle - maior e mais impactante */}
          <div className="relative">
            <div
              className={`rounded-full transition-all duration-1000 ease-in-out backdrop-blur-md shadow-2xl bg-gradient-to-br ${phaseColors[phase]}`}
              style={{
                width: phase === 'inhale' ? '280px' : phase === 'hold' ? '280px' : '200px',
                height: phase === 'inhale' ? '280px' : phase === 'hold' ? '280px' : '200px',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl">
                  {timer}
                </span>
              </div>
            </div>
            {/* Anel externo pulsante */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{
                width: '280px',
                height: '280px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #60a5fa 100%)'
              }}
            />
          </div>

          {/* Instructions - texto maior e mais legível */}
          <div className="text-center space-y-4 max-w-xl">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              {phaseText[phase]}
            </p>
            <p className="text-lg md:text-xl text-gray-600">
              Mais uma vez, no seu ritmo.
            </p>
          </div>

          {/* Progress bar - mais visível */}
          <div className="w-full max-w-md space-y-3">
            <div className="w-full h-4 rounded-full backdrop-blur-sm shadow-inner" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <div
                className="h-full rounded-full transition-all duration-300 shadow-lg"
                style={{ 
                  background: 'linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #60a5fa 100%)',
                  width: `${progress}%` 
                }}
              />
            </div>
            <p className="text-base md:text-lg text-center font-medium text-gray-700">
              {breathCount} de 5 ciclos
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('dashboard')}
          className="w-full py-4 text-base md:text-lg font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300 max-w-2xl mx-auto"
        >
          Parar exercício
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 md:p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="flex-1 flex flex-col justify-center space-y-8 max-w-2xl mx-auto w-full">
        <div className="text-center space-y-6">
          <div 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' }}
          >
            <Heart className="w-12 h-12 md:w-14 md:h-14 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Ótimo. Sua calma importa.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-xl mx-auto">
            Como você se sente agora? Fique aqui o tempo que precisar.
          </p>
        </div>

        <div 
          className="p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-xl"
          style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)' }}
        >
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Se quiser, me conta o que estava acontecendo. Tudo que você colocar aqui é só seu, e está seguro.
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto w-full">
        <button
          onClick={() => navigate('register')}
          className="w-full py-6 md:py-7 rounded-3xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-white"
          style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #60a5fa 100%)' }}
        >
          Registrar momento
        </button>
        <button
          onClick={() => setStep('breathing')}
          className="w-full py-4 text-base md:text-lg font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          Repetir exercício
        </button>
        <button
          onClick={() => navigate('dashboard')}
          className="w-full py-4 text-base md:text-lg font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  )
}
