'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Heart, AlertCircle, BookOpen, Activity, Loader2 } from 'lucide-react'
import { Screen } from '../page'
import { supabase } from '@/lib/supabase'

interface MedicoAmigoProps {
  navigate: (screen: Screen) => void
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  sentiment?: 'anxious' | 'fearful' | 'calm' | 'neutral'
  symptomsDetected?: string[]
  suggestions?: {
    type: 'exercise' | 'education' | 'medical'
    content: string
  }[]
}

// Sistema de análise de sintomas e emoções
const analyzeMessage = (text: string): {
  sentiment: 'anxious' | 'fearful' | 'calm' | 'neutral'
  symptomsDetected: string[]
  urgencyLevel: 'low' | 'medium' | 'high'
} => {
  const lowerText = text.toLowerCase()
  
  // Palavras-chave de emoções
  const anxiousKeywords = ['ansioso', 'nervoso', 'preocupado', 'estressado', 'tenso', 'inquieto']
  const fearKeywords = ['medo', 'pânico', 'terror', 'assustado', 'apavorado', 'receio']
  const calmKeywords = ['calmo', 'tranquilo', 'relaxado', 'bem', 'melhor', 'aliviado']
  
  // Sintomas físicos
  const symptoms = {
    'coração acelerado': ['coração', 'acelerado', 'taquicardia', 'palpitação'],
    'falta de ar': ['falta de ar', 'respirar', 'sufocando', 'ar', 'respiração'],
    'tremores': ['tremor', 'tremendo', 'tremer', 'tremedeira'],
    'suor excessivo': ['suor', 'suando', 'transpiração'],
    'tontura': ['tontura', 'tonto', 'vertigem', 'zonzo'],
    'náusea': ['náusea', 'enjoo', 'vomitar', 'estômago'],
    'aperto no peito': ['peito', 'aperto', 'pressão no peito'],
    'formigamento': ['formigamento', 'dormência', 'formigando'],
    'dor de cabeça': ['dor de cabeça', 'cefaleia', 'enxaqueca']
  }
  
  // Detectar sentimento
  let sentiment: 'anxious' | 'fearful' | 'calm' | 'neutral' = 'neutral'
  if (fearKeywords.some(keyword => lowerText.includes(keyword))) {
    sentiment = 'fearful'
  } else if (anxiousKeywords.some(keyword => lowerText.includes(keyword))) {
    sentiment = 'anxious'
  } else if (calmKeywords.some(keyword => lowerText.includes(keyword))) {
    sentiment = 'calm'
  }
  
  // Detectar sintomas
  const symptomsDetected: string[] = []
  Object.entries(symptoms).forEach(([symptom, keywords]) => {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      symptomsDetected.push(symptom)
    }
  })
  
  // Calcular urgência
  let urgencyLevel: 'low' | 'medium' | 'high' = 'low'
  if (sentiment === 'fearful' || symptomsDetected.length >= 3) {
    urgencyLevel = 'high'
  } else if (sentiment === 'anxious' || symptomsDetected.length >= 1) {
    urgencyLevel = 'medium'
  }
  
  return { sentiment, symptomsDetected, urgencyLevel }
}

// Gerar resposta empática e personalizada
const generateResponse = (
  userMessage: string,
  analysis: ReturnType<typeof analyzeMessage>
): Message => {
  const { sentiment, symptomsDetected, urgencyLevel } = analysis
  
  let responseText = ''
  let suggestions: Message['suggestions'] = []
  
  // Respostas empáticas baseadas no sentimento
  if (sentiment === 'fearful') {
    responseText = `Eu entendo que você está sentindo muito medo agora, e isso é completamente válido. O medo é uma resposta natural do nosso corpo, mas vamos trabalhar juntos para você se sentir mais seguro. `
    
    if (symptomsDetected.length > 0) {
      responseText += `\n\nPercebo que você está sentindo: ${symptomsDetected.join(', ')}. Esses sintomas, embora assustadores, são manifestações da ansiedade e não representam perigo real para sua saúde. `
    }
    
    suggestions = [
      {
        type: 'exercise',
        content: 'Vamos fazer um exercício de respiração 4-7-8 agora? Ele pode ajudar a acalmar seu sistema nervoso rapidamente.'
      },
      {
        type: 'education',
        content: 'Gostaria de entender melhor por que seu corpo reage assim? Posso explicar de forma simples.'
      }
    ]
    
    if (urgencyLevel === 'high') {
      suggestions.push({
        type: 'medical',
        content: 'Se os sintomas estiverem muito intensos ou persistirem, considere buscar atendimento médico ou ligar para um serviço de emergência.'
      })
    }
  } else if (sentiment === 'anxious') {
    responseText = `Percebo que você está ansioso, e quero que saiba que estou aqui para te apoiar. A ansiedade pode ser desconfortável, mas existem formas de lidar com ela. `
    
    if (symptomsDetected.length > 0) {
      responseText += `\n\nVocê mencionou: ${symptomsDetected.join(', ')}. Vamos trabalhar juntos para aliviar esses sintomas. `
    }
    
    suggestions = [
      {
        type: 'exercise',
        content: 'Que tal experimentar uma técnica de relaxamento muscular progressivo? Pode ajudar bastante.'
      },
      {
        type: 'education',
        content: 'Posso te explicar o que está acontecendo no seu corpo quando você sente ansiedade.'
      }
    ]
  } else if (sentiment === 'calm') {
    responseText = `Que bom saber que você está se sentindo melhor! É importante reconhecer esses momentos de calma. `
    
    suggestions = [
      {
        type: 'education',
        content: 'Gostaria de aprender técnicas para manter essa sensação de bem-estar?'
      },
      {
        type: 'exercise',
        content: 'Posso te ensinar exercícios preventivos para usar no dia a dia.'
      }
    ]
  } else {
    responseText = `Estou aqui para conversar e te ajudar. Pode me contar mais sobre como você está se sentindo? `
    
    if (symptomsDetected.length > 0) {
      responseText += `\n\nNotei que você mencionou: ${symptomsDetected.join(', ')}. Vamos conversar sobre isso. `
      
      suggestions = [
        {
          type: 'education',
          content: 'Gostaria de entender melhor esses sintomas?'
        },
        {
          type: 'exercise',
          content: 'Posso te mostrar técnicas para aliviar esses sintomas.'
        }
      ]
    }
  }
  
  // Adicionar informações educativas sobre sintomas específicos
  if (symptomsDetected.includes('coração acelerado')) {
    responseText += `\n\n💙 **Sobre o coração acelerado:** Quando você fica ansioso, seu corpo libera adrenalina, que faz o coração bater mais rápido. É uma resposta de "luta ou fuga" - seu corpo está se preparando para uma ameaça, mesmo que não haja perigo real. Isso é desconfortável, mas não é perigoso.`
  }
  
  if (symptomsDetected.includes('falta de ar')) {
    responseText += `\n\n🌬️ **Sobre a falta de ar:** A sensação de falta de ar geralmente vem da respiração rápida e superficial (hiperventilação). Seu corpo está recebendo oxigênio suficiente, mas a forma como você está respirando cria essa sensação. Exercícios de respiração podem ajudar muito.`
  }
  
  if (symptomsDetected.includes('tremores')) {
    responseText += `\n\n🤝 **Sobre os tremores:** Os tremores acontecem porque seus músculos estão tensos e recebendo mais energia do que o normal. É o corpo se preparando para ação. Técnicas de relaxamento muscular podem aliviar isso.`
  }
  
  return {
    id: Date.now().toString(),
    text: responseText,
    sender: 'bot',
    timestamp: new Date(),
    sentiment,
    symptomsDetected,
    suggestions
  }
}

export function MedicoAmigo({ navigate }: MedicoAmigoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Eu sou o Médico Amigo, seu companheiro de apoio emocional. 💙\n\nEstou aqui para te ouvir, entender o que você está sentindo e te ajudar a lidar com a ansiedade. Pode me contar como você está se sentindo agora?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadConversationHistory()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadConversationHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data, error } = await supabase
        .from('medico_amigo_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.log('Erro ao carregar histórico:', error.message)
        return
      }

      if (data && data.length > 0) {
        // Carregar últimas mensagens do histórico
        const historyMessages: Message[] = data.reverse().flatMap(conv => [
          {
            id: `user-${conv.id}`,
            text: conv.message,
            sender: 'user' as const,
            timestamp: new Date(conv.created_at)
          },
          {
            id: `bot-${conv.id}`,
            text: conv.response,
            sender: 'bot' as const,
            timestamp: new Date(conv.created_at),
            sentiment: conv.sentiment as any,
            symptomsDetected: conv.symptoms_detected || []
          }
        ])

        setMessages(prev => [...prev, ...historyMessages])
      }
    } catch (error) {
      console.log('Erro ao carregar histórico:', error)
    }
  }

  const saveConversation = async (userMessage: string, botResponse: Message) => {
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      await supabase
        .from('medico_amigo_conversations')
        .insert({
          user_id: user.id,
          message: userMessage,
          response: botResponse.text,
          sentiment: botResponse.sentiment,
          symptoms_detected: botResponse.symptomsDetected || []
        })
    } catch (error) {
      console.log('Erro ao salvar conversa:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simular digitação
    setTimeout(() => {
      const analysis = analyzeMessage(inputText)
      const botResponse = generateResponse(inputText, analysis)
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      // Salvar no Supabase
      saveConversation(inputText, botResponse)
      
      // Focar no input novamente
      inputRef.current?.focus()
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: Message['suggestions'][0]) => {
    if (suggestion.type === 'exercise') {
      navigate('exercises')
    } else if (suggestion.type === 'education') {
      navigate('library')
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-4 shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={() => navigate('dashboard')}
            className="p-2 rounded-xl transition-colors hover:bg-opacity-80"
            style={{ backgroundColor: '#F7F9FA' }}
          >
            <ArrowLeft className="w-6 h-6" style={{ color: '#5C6F82' }} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C7DDF2' }}>
              <Heart className="w-5 h-5" style={{ color: '#5C6F82' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: '#5C6F82' }}>
                Médico Amigo
              </h1>
              <p className="text-xs" style={{ color: '#95A8B8' }}>
                {isTyping ? 'Digitando...' : 'Online'}
              </p>
            </div>
          </div>
          
          <div className="w-10" /> {/* Spacer para centralizar */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'
                }`}
                style={{
                  backgroundColor: message.sender === 'user' ? '#A8D5C2' : '#FFFFFF',
                  color: message.sender === 'user' ? '#FFFFFF' : '#5C6F82'
                }}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                
                {/* Sugestões */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all hover:opacity-80 flex items-center gap-2"
                        style={{
                          backgroundColor: '#F7F9FA',
                          color: '#5C6F82'
                        }}
                      >
                        {suggestion.type === 'exercise' && <Activity className="w-4 h-4" />}
                        {suggestion.type === 'education' && <BookOpen className="w-4 h-4" />}
                        {suggestion.type === 'medical' && <AlertCircle className="w-4 h-4" />}
                        {suggestion.content}
                      </button>
                    ))}
                  </div>
                )}
                
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div
                className="max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#A8D5C2', animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#A8D5C2', animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#A8D5C2', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 px-4 py-4 shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                disabled={isTyping}
                className="w-full px-4 py-3 pr-12 rounded-2xl border-2 focus:outline-none focus:border-opacity-100 transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: '#F7F9FA',
                  borderColor: '#DDE2E6',
                  color: '#5C6F82'
                }}
              />
              {isSaving && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#95A8B8' }} />
                </div>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              className="p-3 rounded-2xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#A8D5C2'
              }}
            >
              <Send className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </button>
          </div>
          
          {/* Info */}
          <p className="text-xs text-center mt-2" style={{ color: '#95A8B8' }}>
            O Médico Amigo não substitui atendimento médico profissional
          </p>
        </div>
      </div>
    </div>
  )
}
