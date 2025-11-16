'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Heart, Phone, AlertCircle } from 'lucide-react'
import type { Screen } from '../page'

interface MedicoAmigoProps {
  navigate: (screen: Screen) => void
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  showActions?: boolean
  isTyping?: boolean
}

const QUICK_RESPONSES = [
  "Meu coração acelerou",
  "Estou com medo",
  "Não sei se é ansiedade",
  "Acho que estou passando mal",
  "Tenho sintomas físicos"
]

const EMERGENCY_KEYWORDS = [
  'desmaiar', 'peito dói', 'não consigo respirar', 
  'fora do corpo', 'morrer', 'infarto', 'coração dói'
]

export function MedicoAmigo({ navigate }: MedicoAmigoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Oi, eu tô aqui com você.\nMe conta o que você está sentindo.\nVamos entender isso juntos, com calma.',
      timestamp: new Date(),
      showActions: true
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState<'initial' | 'listening' | 'triaging' | 'supporting'>('initial')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const checkForEmergency = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return EMERGENCY_KEYWORDS.some(keyword => lowerText.includes(keyword))
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Respostas para sintomas físicos comuns
    if (lowerMessage.includes('coração') || lowerMessage.includes('taquicardia')) {
      return 'Eu entendo o que você está sentindo, e isso deve estar sendo bem desconfortável.\n\nO coração acelerado pode acontecer durante a ansiedade, mas também pode ter outras causas.\n\nVocê pode me contar quando começou essa sensação?'
    }
    
    if (lowerMessage.includes('medo') || lowerMessage.includes('pânico')) {
      return 'Estou com você. Essa sensação de medo intenso é muito real e assustadora.\n\nVamos respirar juntos e entender o que está acontecendo.\n\nO que estava acontecendo antes de você começar a sentir isso?'
    }
    
    if (lowerMessage.includes('respirar') || lowerMessage.includes('falta de ar')) {
      return 'A sensação de falta de ar é muito angustiante, eu sei.\n\nVocê consegue respirar, mesmo que pareça difícil? Tenta inspirar devagar pelo nariz e soltar pela boca.\n\nVocê já sentiu isso outras vezes?'
    }
    
    if (lowerMessage.includes('tontura') || lowerMessage.includes('tonto')) {
      return 'Tontura pode ser assustadora, mas vamos entender juntos.\n\nVocê está sentado(a) ou deitado(a) agora? Tenta ficar numa posição confortável.\n\nEssa tontura veio de repente ou foi aumentando aos poucos?'
    }
    
    if (lowerMessage.includes('passando mal') || lowerMessage.includes('mal estar')) {
      return 'Eu entendo que você não está se sentindo bem.\n\nVamos conversar para entender melhor o que está acontecendo.\n\nVocê pode descrever exatamente o que está sentindo no seu corpo agora?'
    }
    
    // Respostas de acolhimento geral
    if (conversationStage === 'initial') {
      setConversationStage('listening')
      return 'Obrigado por compartilhar isso comigo.\n\nVocê não está sozinho(a) nesse momento.\n\nPara eu te ajudar melhor, me conta: você já sentiu isso outras vezes antes?'
    }
    
    if (conversationStage === 'listening') {
      setConversationStage('triaging')
      return 'Entendo. Isso que você está sentindo é real e válido.\n\nVamos identificar juntos se isso pode estar relacionado à ansiedade ou se precisa de atenção médica.\n\nAlém do que você já me contou, você sente dor em algum lugar específico?'
    }
    
    if (conversationStage === 'triaging') {
      setConversationStage('supporting')
      return 'Seu corpo está reagindo ao estresse e à ansiedade.\n\nIsso é mais comum do que você imagina, e vai passar.\n\nVocê gostaria de fazer um exercício de respiração comigo agora para acalmar?'
    }
    
    // Resposta padrão empática
    return 'Eu estou aqui ouvindo você com atenção.\n\nCada coisa que você sente importa.\n\nContinue me contando, no seu ritmo.'
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Verifica se é emergência
    const isEmergency = checkForEmergency(text)

    // Simula digitação da IA
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      if (isEmergency) {
        // Resposta de emergência
        const emergencyMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'Tom, alguns desses sintomas precisam ser avaliados presencialmente.\n\nEu recomendo que você procure atendimento médico agora, tudo bem?\n\nQuer que eu abra sua lista de contatos de emergência para você?',
          timestamp: new Date(),
          showActions: true
        }
        setMessages(prev => [...prev, emergencyMessage])
      } else {
        // Resposta normal
        const aiResponse = generateAIResponse(text)
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiResponse,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    }, 1500) // Simula tempo de "digitação"
  }

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response)
  }

  const handleEmergencyAction = (action: 'contacts' | 'exercise' | 'crisis') => {
    if (action === 'contacts') {
      navigate('contacts')
    } else if (action === 'exercise') {
      navigate('exercises')
    } else if (action === 'crisis') {
      navigate('crisis')
    }
  }

  const handleSaveDiary = () => {
    // Adiciona mensagem de confirmação
    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Ótima ideia! Registrar o que você sentiu pode te ajudar a entender seus padrões.\n\nVou te levar para o registro agora.',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmMessage])
    
    setTimeout(() => {
      navigate('register')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Header */}
      <div 
        className="p-6 flex items-center gap-4 shadow-sm"
        style={{ backgroundColor: '#83978A' }}
      >
        <button
          onClick={() => navigate('dashboard')}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Médico Amigo</h1>
            <p className="text-sm text-white/80">Aqui pra te ouvir</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'user'
                  ? 'rounded-br-sm'
                  : 'rounded-bl-sm'
              }`}
              style={{
                backgroundColor: message.type === 'user' ? '#C7DDF2' : '#FFFFFF',
                color: '#5C6F82',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <p className="text-base leading-relaxed whitespace-pre-line">
                {message.content}
              </p>
              
              {/* Ações após mensagem de emergência */}
              {message.showActions && message.content.includes('contatos de emergência') && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleEmergencyAction('contacts')}
                    className="w-full py-2 px-4 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: '#E7CBCB', color: '#5C6F82' }}
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Ver meus contatos
                  </button>
                  <button
                    onClick={() => handleEmergencyAction('crisis')}
                    className="w-full py-2 px-4 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: '#A8D5C2', color: '#5C6F82' }}
                  >
                    Modo crise
                  </button>
                </div>
              )}

              {/* Ações após mensagem de suporte */}
              {message.showActions && message.content.includes('exercício de respiração') && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleEmergencyAction('exercise')}
                    className="w-full py-2 px-4 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: '#A8D5C2', color: '#5C6F82' }}
                  >
                    Sim, vamos respirar juntos
                  </button>
                  <button
                    onClick={handleSaveDiary}
                    className="w-full py-2 px-4 rounded-xl font-medium transition-all"
                    style={{ backgroundColor: '#F3EDE7', color: '#5C6F82' }}
                  >
                    Prefiro registrar no diário
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl rounded-bl-sm p-4"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex gap-1">
                <div 
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: '#83978A',
                    animationDelay: '0ms'
                  }}
                />
                <div 
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: '#83978A',
                    animationDelay: '150ms'
                  }}
                />
                <div 
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: '#83978A',
                    animationDelay: '300ms'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick responses (apenas na primeira mensagem) */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-sm text-center" style={{ color: '#95A8B8' }}>
              Ou escolha uma opção:
            </p>
            {QUICK_RESPONSES.map((response, index) => (
              <button
                key={index}
                onClick={() => handleQuickResponse(response)}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all text-left"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#5C6F82',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              >
                {response}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' }}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Digite o que você sente agora..."
            className="flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-50 text-base"
            style={{ 
              borderColor: '#C7DDF2',
              color: '#5C6F82',
              backgroundColor: '#F7F9FA'
            }}
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 rounded-xl transition-all disabled:opacity-50"
            style={{ backgroundColor: '#83978A' }}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Aviso ético */}
        <div className="mt-3 flex items-start gap-2 px-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#95A8B8' }} />
          <p className="text-xs leading-relaxed" style={{ color: '#95A8B8' }}>
            Este é um suporte emocional técnico. Se seus sintomas piorarem ou você sentir algo muito intenso, procure atendimento presencial.
          </p>
        </div>
      </div>
    </div>
  )
}
