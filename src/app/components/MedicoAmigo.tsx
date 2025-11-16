'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Heart, Phone, AlertCircle, Activity, Brain, Dumbbell } from 'lucide-react'
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
  severity?: 'low' | 'medium' | 'high' | 'emergency'
}

interface SymptomAnalysis {
  severity: 'low' | 'medium' | 'high' | 'emergency'
  symptoms: string[]
  recommendation: 'exercise' | 'breathing' | 'medical' | 'emergency'
  confidence: number
}

const QUICK_RESPONSES = [
  "Meu coração está acelerado",
  "Estou com muito medo",
  "Sinto falta de ar",
  "Estou com tontura",
  "Preciso de exercícios",
  "Quero conversar"
]

// Palavras-chave para análise de severidade
const EMERGENCY_KEYWORDS = [
  'desmaiar', 'desmaiando', 'peito dói muito', 'dor no peito forte', 
  'não consigo respirar', 'sufocando', 'morrer', 'morrendo',
  'infarto', 'ataque cardíaco', 'coração dói muito', 'dormência no braço',
  'visão escura', 'perdendo consciência', 'convulsão'
]

const HIGH_SEVERITY_KEYWORDS = [
  'peito dói', 'coração dói', 'dor no peito', 'muito mal',
  'não aguento', 'desespero', 'pânico intenso', 'muito forte',
  'pior da vida', 'nunca senti assim', 'fora de controle'
]

const MEDIUM_SEVERITY_KEYWORDS = [
  'ansiedade', 'nervoso', 'preocupado', 'estresse', 'medo',
  'coração acelerado', 'taquicardia', 'tremendo', 'suando',
  'tontura', 'enjoo', 'mal estar', 'agitado'
]

const EXERCISE_KEYWORDS = [
  'exercício', 'exercicios', 'respiração', 'respirar', 'acalmar',
  'relaxar', 'técnica', 'meditação', 'alongamento', 'movimento'
]

export function MedicoAmigo({ navigate }: MedicoAmigoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Oi, eu sou o Médico Amigo. 💙\n\nEstou aqui para te ouvir e te ajudar.\n\nMe conta: como você está se sentindo agora?',
      timestamp: new Date(),
      showActions: false
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const [userSymptoms, setUserSymptoms] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Análise inteligente de sintomas
  const analyzeSymptoms = (text: string, context: string[]): SymptomAnalysis => {
    const lowerText = text.toLowerCase()
    const fullContext = [...context, lowerText].join(' ')
    
    let severity: 'low' | 'medium' | 'high' | 'emergency' = 'low'
    let recommendation: 'exercise' | 'breathing' | 'medical' | 'emergency' = 'exercise'
    const symptoms: string[] = []
    let confidence = 0

    // Verifica emergência
    const hasEmergency = EMERGENCY_KEYWORDS.some(keyword => {
      if (lowerText.includes(keyword)) {
        symptoms.push(keyword)
        return true
      }
      return false
    })

    if (hasEmergency) {
      severity = 'emergency'
      recommendation = 'emergency'
      confidence = 0.95
      return { severity, symptoms, recommendation, confidence }
    }

    // Verifica alta severidade
    const highSeverityCount = HIGH_SEVERITY_KEYWORDS.filter(keyword => {
      if (lowerText.includes(keyword)) {
        symptoms.push(keyword)
        return true
      }
      return false
    }).length

    if (highSeverityCount >= 2) {
      severity = 'high'
      recommendation = 'medical'
      confidence = 0.85
    } else if (highSeverityCount >= 1) {
      severity = 'medium'
      recommendation = 'breathing'
      confidence = 0.7
    }

    // Verifica média severidade
    const mediumSeverityCount = MEDIUM_SEVERITY_KEYWORDS.filter(keyword => {
      if (lowerText.includes(keyword)) {
        symptoms.push(keyword)
        return true
      }
      return false
    }).length

    if (mediumSeverityCount >= 3 && severity === 'low') {
      severity = 'medium'
      recommendation = 'breathing'
      confidence = 0.75
    } else if (mediumSeverityCount >= 1 && severity === 'low') {
      severity = 'low'
      recommendation = 'exercise'
      confidence = 0.6
    }

    // Verifica se usuário pede exercícios diretamente
    const asksForExercise = EXERCISE_KEYWORDS.some(keyword => lowerText.includes(keyword))
    if (asksForExercise && severity !== 'emergency' && severity !== 'high') {
      recommendation = 'exercise'
      confidence = 0.9
    }

    // Ajusta confiança baseado no contexto
    if (context.length > 3) {
      confidence = Math.min(confidence + 0.1, 0.95)
    }

    return { severity, symptoms, recommendation, confidence }
  }

  // Gera resposta inteligente baseada na análise
  const generateIntelligentResponse = (
    userMessage: string, 
    analysis: SymptomAnalysis,
    messageCount: number
  ): { content: string; showActions: boolean } => {
    const { severity, recommendation, symptoms } = analysis

    // EMERGÊNCIA - Resposta imediata
    if (severity === 'emergency') {
      return {
        content: '🚨 ATENÇÃO: Os sintomas que você descreveu precisam de avaliação médica URGENTE.\n\n' +
                 'Por favor, procure atendimento de emergência IMEDIATAMENTE ou ligue para 192 (SAMU).\n\n' +
                 'Não espere. Sua segurança é prioridade.\n\n' +
                 'Posso abrir seus contatos de emergência?',
        showActions: true
      }
    }

    // ALTA SEVERIDADE - Recomenda atendimento médico
    if (severity === 'high') {
      return {
        content: '⚠️ Entendo que você está passando por algo intenso.\n\n' +
                 'Pelos sintomas que você descreveu, eu recomendo fortemente que você procure atendimento médico hoje mesmo.\n\n' +
                 'Enquanto isso, posso te ajudar com técnicas de respiração para aliviar um pouco o desconforto.\n\n' +
                 'O que você prefere fazer agora?',
        showActions: true
      }
    }

    // MÉDIA SEVERIDADE - Oferece suporte e exercícios
    if (severity === 'medium') {
      if (recommendation === 'breathing') {
        return {
          content: 'Eu entendo o que você está sentindo. 💙\n\n' +
                   'Esses sintomas são comuns em momentos de ansiedade, mas podemos trabalhar juntos para aliviar.\n\n' +
                   'Vou te ensinar uma técnica de respiração que pode ajudar muito agora.\n\n' +
                   'Quer tentar comigo?',
          showActions: true
        }
      }
    }

    // BAIXA SEVERIDADE ou PEDIDO DE EXERCÍCIOS
    if (recommendation === 'exercise') {
      return {
        content: 'Ótimo! Exercícios podem te ajudar muito nesse momento. 🌟\n\n' +
                 'Temos várias opções:\n' +
                 '• Respiração guiada\n' +
                 '• Relaxamento muscular\n' +
                 '• Meditação rápida\n' +
                 '• Alongamento suave\n\n' +
                 'Vou te levar para os exercícios agora, tudo bem?',
        showActions: true
      }
    }

    // Respostas contextuais baseadas no histórico
    if (messageCount <= 2) {
      return {
        content: 'Obrigado por compartilhar isso comigo. 💙\n\n' +
                 'Você está em um espaço seguro aqui.\n\n' +
                 'Para eu te ajudar melhor: você já sentiu isso antes ou é a primeira vez?',
        showActions: false
      }
    }

    if (messageCount <= 4) {
      return {
        content: 'Entendo. Cada sensação que você tem é válida e importante.\n\n' +
                 'Vamos trabalhar juntos para você se sentir melhor.\n\n' +
                 'Além do que você já me contou, há algo específico que você acha que pode ter causado isso?',
        showActions: false
      }
    }

    // Resposta empática padrão
    return {
      content: 'Estou aqui com você, ouvindo tudo com atenção. 💙\n\n' +
               'Suas sensações são reais e importantes.\n\n' +
               'Continue me contando, no seu tempo. Não há pressa.',
      showActions: false
    }
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

    // Atualiza contexto da conversa
    const newContext = [...conversationContext, text]
    setConversationContext(newContext)

    // Analisa sintomas
    const analysis = analyzeSymptoms(text, conversationContext)
    setUserSymptoms(prev => [...new Set([...prev, ...analysis.symptoms])])

    // Simula digitação da IA
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      const response = generateIntelligentResponse(text, analysis, messages.length)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        showActions: response.showActions,
        severity: analysis.severity
      }
      
      setMessages(prev => [...prev, aiMessage])
    }, 1800)
  }

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response)
  }

  const handleAction = (action: 'contacts' | 'exercise' | 'crisis' | 'breathing' | 'medical') => {
    // Adiciona mensagem de transição
    let transitionMessage = ''
    
    switch (action) {
      case 'contacts':
        transitionMessage = 'Abrindo seus contatos de emergência agora. 📞'
        break
      case 'exercise':
        transitionMessage = 'Perfeito! Vou te levar para os exercícios. 🌟'
        break
      case 'crisis':
        transitionMessage = 'Ativando o Modo Crise para te ajudar agora. 🆘'
        break
      case 'breathing':
        transitionMessage = 'Vamos respirar juntos. Isso vai te ajudar. 🌬️'
        break
      case 'medical':
        transitionMessage = 'Lembre-se: procurar ajuda médica é sempre a melhor escolha quando algo não está bem. 💙'
        break
    }

    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: transitionMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmMessage])
    
    setTimeout(() => {
      if (action === 'contacts') {
        navigate('contacts')
      } else if (action === 'exercise' || action === 'breathing') {
        navigate('exercises')
      } else if (action === 'crisis') {
        navigate('crisis')
      }
    }, 1500)
  }

  const handleSaveDiary = () => {
    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Ótima ideia! Registrar seus sentimentos pode te ajudar muito. 📝\n\nVou te levar para o diário agora.',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmMessage])
    
    setTimeout(() => {
      navigate('calendar')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('dashboard')}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Médico Amigo</h1>
              <p className="text-sm text-white/90 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Aqui para te ouvir
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm'
              }`}
            >
              <p className="text-base leading-relaxed whitespace-pre-line">
                {message.content}
              </p>
              
              {/* Ações baseadas na severidade */}
              {message.showActions && (
                <div className="mt-4 space-y-2">
                  {message.severity === 'emergency' && (
                    <>
                      <button
                        onClick={() => handleAction('contacts')}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Abrir Contatos de Emergência
                      </button>
                      <button
                        onClick={() => handleAction('crisis')}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-all"
                      >
                        Ativar Modo Crise
                      </button>
                    </>
                  )}

                  {message.severity === 'high' && (
                    <>
                      <button
                        onClick={() => handleAction('medical')}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-all flex items-center justify-center gap-2"
                      >
                        <AlertCircle className="w-5 h-5" />
                        Entendi, vou procurar ajuda médica
                      </button>
                      <button
                        onClick={() => handleAction('breathing')}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Brain className="w-5 h-5" />
                        Fazer exercício de respiração
                      </button>
                    </>
                  )}

                  {(message.severity === 'medium' || message.severity === 'low' || !message.severity) && (
                    <>
                      <button
                        onClick={() => handleAction('exercise')}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Dumbbell className="w-5 h-5" />
                        Sim, vamos aos exercícios
                      </button>
                      <button
                        onClick={handleSaveDiary}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white transition-all"
                      >
                        Prefiro registrar no diário
                      </button>
                      <button
                        onClick={() => setInputValue('Quero continuar conversando')}
                        className="w-full py-2 px-4 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                      >
                        Continuar conversando
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm p-4 shadow-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Quick responses */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-sm text-center text-gray-500 font-medium">
              Ou escolha uma opção rápida:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUICK_RESPONSES.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="py-3 px-4 rounded-xl font-medium bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg transition-all text-left"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Digite como você está se sentindo..."
            className="flex-1 px-4 py-3 sm:py-4 rounded-xl border-2 border-purple-200 focus:outline-none focus:border-purple-400 text-base bg-gray-50 text-gray-800 placeholder-gray-400"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Aviso ético */}
        <div className="mt-3 flex items-start gap-2 px-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
          <p className="text-xs leading-relaxed text-gray-500">
            Este é um suporte emocional. Em caso de emergência ou sintomas graves, procure atendimento médico imediatamente.
          </p>
        </div>
      </div>
    </div>
  )
}
