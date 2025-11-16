'use client'

import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import type { Screen } from '../page'

interface QuickRegisterProps {
  navigate: (screen: Screen) => void
}

export function QuickRegister({ navigate }: QuickRegisterProps) {
  const [anxietyLevel, setAnxietyLevel] = useState(5)
  const [emotion, setEmotion] = useState('')
  const [situation, setSituation] = useState('')
  const [saved, setSaved] = useState(false)

  const emotions = [
    { value: 'worried', label: 'Preocupado(a)', emoji: '😰' },
    { value: 'nervous', label: 'Nervoso(a)', emoji: '😬' },
    { value: 'overwhelmed', label: 'Sobrecarregado(a)', emoji: '😓' },
    { value: 'restless', label: 'Inquieto(a)', emoji: '😟' },
    { value: 'scared', label: 'Com medo', emoji: '😨' },
    { value: 'tense', label: 'Tenso(a)', emoji: '😣' }
  ]

  const handleSave = () => {
    // Simula salvamento
    setSaved(true)
    setTimeout(() => {
      navigate('dashboard')
    }, 1500)
  }

  if (saved) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F7F9FA' }}>
        <div className="text-center space-y-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: '#A8D5C2' }}
          >
            <Check className="w-8 h-8" style={{ color: '#5C6F82' }} />
          </div>
          <h2 className="text-xl font-medium" style={{ color: '#5C6F82' }}>
            Registro salvo. Você está se cuidando, e isso já é muito.
          </h2>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Obrigado por confiar esse momento aqui.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9FA' }}>
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
            Como você está?
          </h1>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Seu sentimento é válido.
          </p>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Anxiety level slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium" style={{ color: '#5C6F82' }}>
              Como está sua ansiedade neste momento?
            </label>
            <span 
              className="text-3xl font-semibold"
              style={{ color: '#5C6F82' }}
            >
              {anxietyLevel}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="10"
            value={anxietyLevel}
            onChange={(e) => setAnxietyLevel(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #A8D5C2 0%, #A8D5C2 ${anxietyLevel * 10}%, #DDE2E6 ${anxietyLevel * 10}%, #DDE2E6 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs" style={{ color: '#95A8B8' }}>
            <span>Tranquilo(a)</span>
            <span>Muito ansioso(a)</span>
          </div>
        </div>

        {/* Emotion selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium" style={{ color: '#5C6F82' }}>
            O que você está sentindo?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {emotions.map((item) => (
              <button
                key={item.value}
                onClick={() => setEmotion(item.value)}
                className="p-3 rounded-xl text-left transition-all duration-300"
                style={{
                  backgroundColor: emotion === item.value ? '#C7DDF2' : '#FFFFFF',
                  border: `2px solid ${emotion === item.value ? '#95A8B8' : '#DDE2E6'}`
                }}
              >
                <span className="text-xl mr-2">{item.emoji}</span>
                <span className="text-sm" style={{ color: '#5C6F82' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Situation input */}
        <div className="space-y-3">
          <label className="text-sm font-medium" style={{ color: '#5C6F82' }}>
            Se quiser, me conta o que estava acontecendo.
          </label>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Ex: Reunião importante, trânsito, pensando no futuro..."
            className="w-full p-4 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #DDE2E6',
              color: '#5C6F82',
              minHeight: '100px'
            }}
            maxLength={200}
          />
          <p className="text-xs text-right" style={{ color: '#95A8B8' }}>
            {situation.length}/200
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!emotion}
          className="w-full py-4 rounded-2xl font-medium transition-all duration-300 disabled:opacity-50"
          style={{
            backgroundColor: emotion ? '#A8D5C2' : '#DDE2E6',
            color: '#5C6F82'
          }}
        >
          Salvar registro
        </button>

        <p className="text-xs text-center leading-relaxed pb-6" style={{ color: '#95A8B8' }}>
          Tudo que você colocar aqui é só seu, e está seguro.
        </p>
      </div>
    </div>
  )
}
