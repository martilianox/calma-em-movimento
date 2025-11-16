'use client'

import { useState } from 'react'
import { Heart, ArrowLeft } from 'lucide-react'
import type { Screen } from '../page'

interface EmotionalDialogueProps {
  navigate: (screen: Screen) => void
  phase: 'pre' | 'during' | 'post'
}

export function EmotionalDialogue({ navigate, phase }: EmotionalDialogueProps) {
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [textInput, setTextInput] = useState('')

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) 
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    )
  }

  const handleSave = () => {
    // Aqui salvaria os dados
    console.log({ phase, selectedChips, textInput })
    navigate('crisis')
  }

  const config = {
    pre: {
      title: 'O que você começou a sentir antes da crise?',
      chips: [
        'Coração acelerado',
        'Pensamentos rápidos',
        'Medo sem motivo',
        'Falta de ar',
        'Aperto no peito',
        'Tontura'
      ],
      placeholder: 'Quer descrever um pouco mais?',
      bgColor: '#D8E9F1'
    },
    during: {
      title: 'O que está acontecendo agora com você?',
      chips: [
        'Minha respiração ficou curta',
        'Estou tremendo',
        'Sinto que vai acontecer algo ruim',
        'Não estou no controle',
        'Sensação de desmaio'
      ],
      placeholder: 'O que você percebe nesse momento?',
      bgColor: '#E7CBCB'
    },
    post: {
      title: 'Como você se sente agora?',
      chips: [
        'Cansado(a)',
        'Aliviado(a)',
        'Com medo de voltar',
        'Mais calmo(a)',
        'Triste'
      ],
      placeholder: 'Quer deixar uma anotação para você mesmo(a)?',
      bgColor: '#A8D5C2'
    }
  }

  const current = config[phase]

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: current.bgColor }}>
      {/* Header */}
      <div className="p-6 space-y-6">
        <button
          onClick={() => navigate('crisis')}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: '#5C6F82' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Voltar</span>
        </button>

        <div className="space-y-3">
          <Heart className="w-10 h-10" style={{ color: '#5C6F82' }} />
          <h1 className="text-2xl font-semibold leading-tight" style={{ color: '#5C6F82' }}>
            {current.title}
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82', opacity: 0.8 }}>
            Tudo que você colocar aqui é só seu, e está seguro.
          </p>
        </div>
      </div>

      {/* Chips de sentimentos */}
      <div className="px-6 space-y-4">
        <p className="text-sm font-medium" style={{ color: '#5C6F82' }}>
          Selecione o que se encaixa:
        </p>
        <div className="flex flex-wrap gap-2">
          {current.chips.map((chip) => (
            <button
              key={chip}
              onClick={() => toggleChip(chip)}
              className="px-4 py-2 rounded-full text-sm transition-all duration-300"
              style={{
                backgroundColor: selectedChips.includes(chip) ? '#5C6F82' : 'rgba(255, 255, 255, 0.7)',
                color: selectedChips.includes(chip) ? '#FFFFFF' : '#5C6F82',
                border: `2px solid ${selectedChips.includes(chip) ? '#5C6F82' : 'transparent'}`
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Campo de texto livre */}
      <div className="px-6 mt-8 space-y-3">
        <label className="text-sm font-medium block" style={{ color: '#5C6F82' }}>
          {current.placeholder}
        </label>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Se quiser, escreva um pouco sobre seu momento. Sem pressa."
          className="w-full p-4 rounded-2xl resize-none focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#5C6F82',
            minHeight: '150px',
            border: '2px solid transparent',
            focusRingColor: '#95A8B8'
          }}
          rows={6}
        />
      </div>

      {/* Botão de salvar */}
      <div className="px-6 mt-8">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: '#83978A', color: '#FFFFFF' }}
        >
          Salvar registro
        </button>
        <p className="text-xs text-center mt-4 leading-relaxed" style={{ color: '#5C6F82', opacity: 0.7 }}>
          Obrigado por confiar esse momento aqui.
        </p>
      </div>
    </div>
  )
}
