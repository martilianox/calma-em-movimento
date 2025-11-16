'use client'

import { useState } from 'react'
import { ChevronRight, Heart } from 'lucide-react'

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    anxietyLevel: '',
    hasTherapy: '',
    goal: '',
    frequency: ''
  })

  const steps = [
    {
      title: 'Bem-vindo(a) 💛',
      subtitle: 'Vamos aos poucos…',
      content: (
        <div className="space-y-6">
          <p className="text-[#5C6F82] text-base leading-relaxed">
            Esse é um espaço seguro pra você entender e cuidar da sua ansiedade no dia a dia.
          </p>
          <p className="text-[#5C6F82] text-sm leading-relaxed">
            Não somos terapia, mas estamos aqui pra te apoiar sempre que precisar.
          </p>
        </div>
      )
    },
    {
      title: 'Como você está hoje?',
      subtitle: 'Sem julgamentos, só curiosidade',
      content: (
        <div className="space-y-4">
          {[
            { value: 'calm', label: 'Tranquilo(a), só explorando', emoji: '😌' },
            { value: 'worried', label: 'Preocupado(a), mente acelerada', emoji: '😰' },
            { value: 'anxious', label: 'Ansioso(a), preciso de ajuda', emoji: '😟' },
            { value: 'crisis', label: 'Em crise agora', emoji: '😣' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setAnswers({ ...answers, anxietyLevel: option.value })}
              className="w-full p-4 rounded-2xl text-left transition-all duration-300"
              style={{
                backgroundColor: answers.anxietyLevel === option.value ? '#C7DDF2' : '#FFFFFF',
                border: `2px solid ${answers.anxietyLevel === option.value ? '#95A8B8' : '#DDE2E6'}`
              }}
            >
              <span className="text-2xl mr-3">{option.emoji}</span>
              <span className="text-[#5C6F82] font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Você faz terapia?',
      subtitle: 'Queremos te apoiar do jeito certo',
      content: (
        <div className="space-y-4">
          {[
            { value: 'yes', label: 'Sim, faço acompanhamento' },
            { value: 'no', label: 'Não, mas tenho interesse' },
            { value: 'never', label: 'Não, e não pretendo no momento' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setAnswers({ ...answers, hasTherapy: option.value })}
              className="w-full p-4 rounded-2xl text-left transition-all duration-300"
              style={{
                backgroundColor: answers.hasTherapy === option.value ? '#A8D5C2' : '#FFFFFF',
                border: `2px solid ${answers.hasTherapy === option.value ? '#95A8B8' : '#DDE2E6'}`
              }}
            >
              <span className="text-[#5C6F82] font-medium">{option.label}</span>
            </button>
          ))}
          <p className="text-xs text-[#95A8B8] mt-4 leading-relaxed">
            Lembrando: esse app não substitui terapia, é um apoio no seu dia a dia.
          </p>
        </div>
      )
    },
    {
      title: 'O que você busca aqui?',
      subtitle: 'Pode escolher mais de uma opção',
      content: (
        <div className="space-y-3">
          {[
            { value: 'understand', label: 'Entender minha ansiedade' },
            { value: 'track', label: 'Acompanhar meus dias' },
            { value: 'exercises', label: 'Fazer exercícios rápidos' },
            { value: 'crisis', label: 'Ter ajuda em momentos difíceis' },
            { value: 'learn', label: 'Aprender sobre ansiedade' }
          ].map((option) => {
            const isSelected = answers.goal.includes(option.value)
            return (
              <button
                key={option.value}
                onClick={() => {
                  const current = answers.goal.split(',').filter(Boolean)
                  const updated = isSelected
                    ? current.filter(v => v !== option.value)
                    : [...current, option.value]
                  setAnswers({ ...answers, goal: updated.join(',') })
                }}
                className="w-full p-4 rounded-2xl text-left transition-all duration-300"
                style={{
                  backgroundColor: isSelected ? '#E7CBCB' : '#FFFFFF',
                  border: `2px solid ${isSelected ? '#95A8B8' : '#DDE2E6'}`
                }}
              >
                <span className="text-[#5C6F82] font-medium">{option.label}</span>
              </button>
            )
          })}
        </div>
      )
    },
    {
      title: 'Quanto tempo você tem?',
      subtitle: 'Vamos respeitar seu ritmo',
      content: (
        <div className="space-y-4">
          {[
            { value: '2min', label: '2-3 minutos por dia', desc: 'Exercícios rápidos' },
            { value: '5min', label: '5-10 minutos por dia', desc: 'Exercícios + registros' },
            { value: 'flexible', label: 'Depende do dia', desc: 'Sem pressão' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setAnswers({ ...answers, frequency: option.value })}
              className="w-full p-4 rounded-2xl text-left transition-all duration-300"
              style={{
                backgroundColor: answers.frequency === option.value ? '#F3EDE7' : '#FFFFFF',
                border: `2px solid ${answers.frequency === option.value ? '#95A8B8' : '#DDE2E6'}`
              }}
            >
              <div className="text-[#5C6F82] font-medium">{option.label}</div>
              <div className="text-sm text-[#95A8B8] mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Tudo pronto! 🌱',
      subtitle: 'Respira, vai dar certo no seu tempo',
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#C7DDF2' }}>
            <Heart className="w-8 h-8 mb-3" style={{ color: '#5C6F82' }} />
            <p className="text-[#5C6F82] leading-relaxed">
              Eu tô com você nesse momento. Vamos juntos, sem pressa, sem pressão.
            </p>
          </div>
          <p className="text-sm text-[#95A8B8] leading-relaxed">
            Você pode voltar aqui sempre que quiser ajustar suas preferências.
          </p>
        </div>
      )
    }
  ]

  const currentStep = steps[step]
  const canProceed = step === 0 || step === steps.length - 1 || 
    (step === 1 && answers.anxietyLevel) ||
    (step === 2 && answers.hasTherapy) ||
    (step === 3 && answers.goal) ||
    (step === 4 && answers.frequency)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: '#DDE2E6' }}>
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            backgroundColor: '#A8D5C2',
            width: `${((step + 1) / steps.length) * 100}%`
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 max-w-md mx-auto w-full">
        <div className="space-y-6 mt-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold" style={{ color: '#5C6F82' }}>
              {currentStep.title}
            </h1>
            <p className="text-sm" style={{ color: '#95A8B8' }}>
              {currentStep.subtitle}
            </p>
          </div>

          <div className="mt-8">
            {currentStep.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 mt-8">
          <button
            onClick={() => {
              if (step === steps.length - 1) {
                onComplete()
              } else {
                setStep(step + 1)
              }
            }}
            disabled={!canProceed}
            className="w-full py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            style={{
              backgroundColor: canProceed ? '#A8D5C2' : '#DDE2E6',
              color: '#5C6F82'
            }}
          >
            {step === steps.length - 1 ? 'Começar' : 'Continuar'}
            <ChevronRight className="w-5 h-5" />
          </button>

          {step > 0 && step < steps.length - 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-full py-3 text-sm"
              style={{ color: '#95A8B8' }}
            >
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
