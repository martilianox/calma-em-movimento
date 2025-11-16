'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Heart, Phone, AlertCircle, Activity, Brain, Dumbbell, MessageCircle, Lightbulb, Stethoscope } from 'lucide-react'
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
  suggestions?: string[]
}

interface SymptomAnalysis {
  severity: 'low' | 'medium' | 'high' | 'emergency'
  symptoms: string[]
  recommendation: 'exercise' | 'breathing' | 'medical' | 'emergency' | 'conversation' | 'education'
  confidence: number
  emotionalState: string
}

const QUICK_RESPONSES = [
  "Meu coração está acelerado",
  "Estou com muito medo",
  "Sinto falta de ar",
  "Estou com tontura",
  "Preciso de exercícios",
  "Quero entender o que sinto"
]

// Palavras-chave expandidas para análise profunda
const EMERGENCY_KEYWORDS = [
  'desmaiar', 'desmaiando', 'peito dói muito', 'dor no peito forte', 
  'não consigo respirar', 'sufocando', 'morrer', 'morrendo',
  'infarto', 'ataque cardíaco', 'coração dói muito', 'dormência no braço',
  'visão escura', 'perdendo consciência', 'convulsão', 'vou morrer'
]

const HIGH_SEVERITY_KEYWORDS = [
  'peito dói', 'coração dói', 'dor no peito', 'muito mal',
  'não aguento', 'desespero', 'pânico intenso', 'muito forte',
  'pior da vida', 'nunca senti assim', 'fora de controle',
  'não consigo mais', 'acabar com tudo', 'sem saída'
]

const MEDIUM_SEVERITY_KEYWORDS = [
  'ansiedade', 'nervoso', 'preocupado', 'estresse', 'medo',
  'coração acelerado', 'taquicardia', 'tremendo', 'suando',
  'tontura', 'enjoo', 'mal estar', 'agitado', 'inquieto',
  'insônia', 'não durmo', 'cansado', 'exausto'
]

const EXERCISE_KEYWORDS = [
  'exercício', 'exercicios', 'respiração', 'respirar', 'acalmar',
  'relaxar', 'técnica', 'meditação', 'alongamento', 'movimento',
  'prática', 'atividade'
]

const CONVERSATION_KEYWORDS = [
  'conversar', 'falar', 'desabafar', 'ouvir', 'entender',
  'explicar', 'saber', 'porque', 'por que', 'como funciona',
  'o que está', 'o que é', 'me ajuda a entender', 'não entendo',
  'corpo', 'sintoma', 'sensação', 'sentindo', 'acontecendo',
  'normal', 'comum', 'todo mundo sente'
]

const EDUCATION_KEYWORDS = [
  'o que é', 'como funciona', 'por que sinto', 'é normal',
  'todo mundo', 'ansiedade é', 'pânico é', 'causa',
  'sintoma de', 'significa', 'quer dizer'
]

const BODY_SYMPTOMS = {
  cardiac: ['coração', 'peito', 'taquicardia', 'palpitação', 'batimento'],
  respiratory: ['respiração', 'ar', 'sufoco', 'falta de ar', 'respirar'],
  neurological: ['tontura', 'cabeça', 'visão', 'formigamento', 'dormência'],
  digestive: ['estômago', 'enjoo', 'náusea', 'barriga', 'intestino'],
  muscular: ['tremor', 'tensão', 'dor muscular', 'rigidez', 'contração'],
  general: ['suor', 'calor', 'frio', 'fraqueza', 'cansaço']
}

// Banco de respostas empáticas expandido
const EMPATHETIC_RESPONSES = {
  understanding: [
    "Eu entendo o quanto isso deve ser difícil para você. 💙",
    "Obrigado por confiar em mim e compartilhar o que está sentindo. 🌸",
    "Você não está sozinho(a) nisso. Estou aqui com você. 💙",
    "É completamente compreensível que você esteja se sentindo assim. 🌟",
    "Reconheço a coragem que você tem ao falar sobre isso. 💪"
  ],
  validation: [
    "O que você está sentindo é real e válido. 💙",
    "Suas sensações são importantes e merecem atenção. 🌸",
    "Não há nada de errado em sentir o que você está sentindo. 🌟",
    "Você tem todo o direito de se sentir assim. 💙",
    "Suas emoções fazem sentido considerando o que você está passando. 🌸"
  ],
  support: [
    "Estou aqui para te apoiar em cada passo. 💙",
    "Vamos passar por isso juntos, no seu ritmo. 🌸",
    "Você pode contar comigo sempre que precisar. 🌟",
    "Não há pressa. Vamos com calma. 💙",
    "Estou aqui para te ouvir, sem julgamentos. 🌸"
  ],
  hope: [
    "Você já deu um grande passo ao buscar ajuda. 🌟",
    "Cada dia é uma nova oportunidade de se sentir melhor. 💙",
    "Você é mais forte do que imagina. 💪",
    "Juntos, vamos encontrar formas de você se sentir melhor. 🌸",
    "Há esperança e há caminhos para melhorar. 🌟"
  ]
}

// Explicações educativas sobre sintomas
const SYMPTOM_EDUCATION = {
  anxiety: "A ansiedade é uma resposta natural do corpo ao estresse. Quando você se sente ameaçado, seu corpo ativa o 'modo de alerta', liberando hormônios como adrenalina. Isso explica sintomas como coração acelerado, suor e respiração rápida. É desconfortável, mas é seu corpo tentando te proteger.",
  
  panic: "Um ataque de pânico é uma onda intensa de medo que atinge o pico em minutos. Seu corpo entra em 'modo de fuga', mesmo sem perigo real. Os sintomas são assustadores, mas não são perigosos. Geralmente passam em 10-20 minutos.",
  
  cardiac: "Quando ansioso, seu coração acelera porque seu corpo está se preparando para 'lutar ou fugir'. É desconfortável, mas é diferente de um problema cardíaco. Se você tem dúvidas, um médico pode avaliar seu coração e te dar tranquilidade.",
  
  breathing: "A respiração rápida e superficial é comum na ansiedade. Você pode sentir que falta ar, mas na verdade está respirando demais (hiperventilação). Técnicas de respiração lenta ajudam a normalizar.",
  
  dizziness: "A tontura na ansiedade geralmente vem da hiperventilação ou tensão muscular. Seu cérebro recebe sinais confusos e você sente que está 'flutuando'. É temporário e não é perigoso.",
  
  physical: "A ansiedade pode causar MUITOS sintomas físicos reais: dor no peito, náusea, tremores, suor, formigamento. Não é 'só na sua cabeça' - seu corpo está realmente reagindo ao estresse."
}

export function MedicoAmigo({ navigate }: MedicoAmigoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Olá, eu sou o Médico Amigo. 💙\n\nEstou aqui para te ouvir, te entender e te ajudar.\n\nVocê pode me contar tudo: como está se sentindo, o que está acontecendo com seu corpo, suas dúvidas e preocupações.\n\nEstou aqui para conversar, explicar e te orientar. Sem pressa, no seu tempo. 🌸',
      timestamp: new Date(),
      showActions: false
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const [userSymptoms, setUserSymptoms] = useState<string[]>([])
  const [conversationMode, setConversationMode] = useState<'initial' | 'exploring' | 'monitoring' | 'educating'>('initial')
  const [emotionalProfile, setEmotionalProfile] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Detecta estado emocional do usuário
  const detectEmotionalState = (text: string): string => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.match(/medo|assustado|terror|pânico/)) return 'medo'
    if (lowerText.match(/triste|deprimido|vazio|sem esperança/)) return 'tristeza'
    if (lowerText.match(/nervoso|agitado|inquieto|tenso/)) return 'ansiedade'
    if (lowerText.match(/confuso|perdido|não entendo|não sei/)) return 'confusão'
    if (lowerText.match(/cansado|exausto|sem energia|esgotado/)) return 'exaustão'
    if (lowerText.match(/sozinho|isolado|ninguém entende/)) return 'solidão'
    if (lowerText.match(/irritado|raiva|frustrado|bravo/)) return 'irritação'
    
    return 'neutro'
  }

  // Identifica sintomas corporais específicos
  const identifyBodySymptoms = (text: string): string[] => {
    const lowerText = text.toLowerCase()
    const identified: string[] = []
    
    Object.entries(BODY_SYMPTOMS).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        identified.push(category)
      }
    })
    
    return identified
  }

  // Análise inteligente e profunda de sintomas
  const analyzeSymptoms = (text: string, context: string[]): SymptomAnalysis => {
    const lowerText = text.toLowerCase()
    const fullContext = [...context, lowerText].join(' ')
    
    let severity: 'low' | 'medium' | 'high' | 'emergency' = 'low'
    let recommendation: 'exercise' | 'breathing' | 'medical' | 'emergency' | 'conversation' | 'education' = 'conversation'
    const symptoms: string[] = []
    let confidence = 0
    
    // Detecta estado emocional
    const emotionalState = detectEmotionalState(text)
    
    // Identifica sintomas corporais
    const bodySymptoms = identifyBodySymptoms(text)
    symptoms.push(...bodySymptoms)

    // Verifica se usuário quer educação/entendimento
    const wantsEducation = EDUCATION_KEYWORDS.some(keyword => lowerText.includes(keyword))
    
    // Verifica se usuário quer conversar/entender
    const wantsConversation = CONVERSATION_KEYWORDS.some(keyword => lowerText.includes(keyword))
    
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
      return { severity, symptoms, recommendation, confidence, emotionalState }
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
      recommendation = wantsEducation ? 'education' : wantsConversation ? 'conversation' : 'breathing'
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
      recommendation = wantsEducation ? 'education' : wantsConversation ? 'conversation' : 'breathing'
      confidence = 0.75
    } else if (mediumSeverityCount >= 1 && severity === 'low') {
      severity = 'low'
      recommendation = wantsEducation ? 'education' : wantsConversation ? 'conversation' : 'exercise'
      confidence = 0.6
    }

    // Verifica se usuário pede exercícios diretamente
    const asksForExercise = EXERCISE_KEYWORDS.some(keyword => lowerText.includes(keyword))
    if (asksForExercise && severity !== 'emergency' && severity !== 'high') {
      recommendation = 'exercise'
      confidence = 0.9
    }

    // Prioriza educação se usuário quer entender
    if (wantsEducation && severity !== 'emergency' && severity !== 'high') {
      recommendation = 'education'
      confidence = 0.9
    }

    // Prioriza conversação se usuário demonstra querer entender
    if (wantsConversation && !wantsEducation && severity !== 'emergency' && severity !== 'high') {
      recommendation = 'conversation'
      confidence = 0.85
    }

    // Ajusta confiança baseado no contexto
    if (context.length > 3) {
      confidence = Math.min(confidence + 0.1, 0.95)
    }

    return { severity, symptoms, recommendation, confidence, emotionalState }
  }

  // Gera explicação educativa personalizada
  const generateEducationalResponse = (symptoms: string[], emotionalState: string): string => {
    let response = "Deixa eu te explicar o que pode estar acontecendo: 🧠\n\n"
    
    // Explica baseado nos sintomas identificados
    if (symptoms.includes('cardiac')) {
      response += "**Sobre seu coração acelerado:**\n" + SYMPTOM_EDUCATION.cardiac + "\n\n"
    }
    
    if (symptoms.includes('respiratory')) {
      response += "**Sobre a respiração:**\n" + SYMPTOM_EDUCATION.breathing + "\n\n"
    }
    
    if (symptoms.includes('neurological')) {
      response += "**Sobre tontura/formigamento:**\n" + SYMPTOM_EDUCATION.dizziness + "\n\n"
    }
    
    // Se não identificou sintomas específicos, explica ansiedade geral
    if (symptoms.length === 0 || !symptoms.some(s => ['cardiac', 'respiratory', 'neurological'].includes(s))) {
      response += SYMPTOM_EDUCATION.anxiety + "\n\n"
    }
    
    response += "**O importante é:**\n"
    response += "✓ Esses sintomas são reais, não imaginários\n"
    response += "✓ São desconfortáveis, mas geralmente não são perigosos\n"
    response += "✓ Existem técnicas que podem te ajudar\n"
    response += "✓ Se persistirem, um médico pode te avaliar e tranquilizar\n\n"
    response += "Isso faz sentido para você? Quer que eu explique mais alguma coisa? 💙"
    
    return response
  }

  // Gera sugestões contextuais
  const generateSuggestions = (analysis: SymptomAnalysis, messageCount: number): string[] => {
    const suggestions: string[] = []
    
    if (analysis.severity === 'medium' || analysis.severity === 'low') {
      suggestions.push("Como posso me acalmar agora?")
      suggestions.push("Por que sinto isso?")
      suggestions.push("Isso é perigoso?")
      
      if (messageCount > 3) {
        suggestions.push("Quero fazer exercícios")
        suggestions.push("Preciso de ajuda médica?")
      }
    }
    
    return suggestions
  }

  // Seleciona resposta empática aleatória
  const getEmpatheticResponse = (category: keyof typeof EMPATHETIC_RESPONSES): string => {
    const responses = EMPATHETIC_RESPONSES[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Gera resposta inteligente baseada na análise
  const generateIntelligentResponse = (
    userMessage: string, 
    analysis: SymptomAnalysis,
    messageCount: number
  ): { content: string; showActions: boolean; suggestions?: string[] } => {
    const { severity, recommendation, symptoms, emotionalState } = analysis

    // Atualiza perfil emocional
    if (emotionalState !== 'neutro') {
      setEmotionalProfile(prev => [...new Set([...prev, emotionalState])])
    }

    // EMERGÊNCIA - Resposta imediata
    if (severity === 'emergency') {
      return {
        content: '🚨 **ATENÇÃO URGENTE**\n\n' +
                 getEmpatheticResponse('understanding') + '\n\n' +
                 'Os sintomas que você descreveu precisam de avaliação médica IMEDIATA.\n\n' +
                 '**Por favor, faça AGORA:**\n' +
                 '• Ligue 192 (SAMU) ou vá ao pronto-socorro\n' +
                 '• Se possível, peça ajuda a alguém próximo\n' +
                 '• Não espere - sua segurança é prioridade\n\n' +
                 'Posso abrir seus contatos de emergência para você?',
        showActions: true
      }
    }

    // ALTA SEVERIDADE - Recomenda atendimento médico
    if (severity === 'high') {
      return {
        content: '⚠️ ' + getEmpatheticResponse('understanding') + '\n\n' +
                 'Pelos sintomas que você descreveu, **eu recomendo fortemente** que você procure atendimento médico hoje.\n\n' +
                 '**Por que é importante:**\n' +
                 '• Sintomas intensos merecem avaliação profissional\n' +
                 '• Um médico pode te examinar e tranquilizar\n' +
                 '• Pode haver tratamentos que te ajudem rapidamente\n\n' +
                 'Enquanto isso, posso te ensinar técnicas para aliviar o desconforto, ou podemos conversar mais.\n\n' +
                 'O que você prefere fazer agora?',
        showActions: true
      }
    }

    // EDUCAÇÃO - Usuário quer entender
    if (recommendation === 'education') {
      setConversationMode('educating')
      
      const educationalContent = generateEducationalResponse(symptoms, emotionalState)
      
      return {
        content: getEmpatheticResponse('validation') + '\n\n' + educationalContent,
        showActions: false,
        suggestions: ["Isso me ajudou a entender", "Ainda tenho dúvidas", "O que posso fazer agora?"]
      }
    }

    // CONVERSAÇÃO - Usuário quer dialogar/entender
    if (recommendation === 'conversation') {
      setConversationMode('exploring')
      
      const conversationResponses = [
        getEmpatheticResponse('understanding') + '\n\n' +
        'Vamos conversar com calma sobre isso. Cada sensação que você tem é uma forma do seu corpo se comunicar.\n\n' +
        'Me conte: quando essas sensações começaram? Há algo específico que você notou que pode ter desencadeado?',
        
        getEmpatheticResponse('validation') + '\n\n' +
        'A ansiedade pode se manifestar de muitas formas físicas. Seu corpo está tentando te proteger, mesmo que pareça desconfortável.\n\n' +
        'O que mais te preocupa nessas sensações? Há algo específico que te assusta?',
        
        getEmpatheticResponse('support') + '\n\n' +
        'Muitas vezes, quando entendemos nossos sintomas, eles se tornam menos assustadores.\n\n' +
        'Essas sensações aparecem em momentos específicos (como em lugares cheios, à noite, quando está sozinho) ou de forma mais aleatória?',
        
        getEmpatheticResponse('hope') + '\n\n' +
        'Cada sintoma tem um significado, e juntos podemos descobrir o que seu corpo está tentando dizer.\n\n' +
        'Além do que você já me contou, há outras sensações que você tem notado? Mesmo que pareçam pequenas?'
      ]
      
      const randomIndex = Math.floor(Math.random() * conversationResponses.length)
      return {
        content: conversationResponses[randomIndex],
        showActions: false,
        suggestions: generateSuggestions(analysis, messageCount)
      }
    }

    // MÉDIA SEVERIDADE - Oferece suporte e exercícios
    if (severity === 'medium') {
      if (recommendation === 'breathing') {
        return {
          content: getEmpatheticResponse('understanding') + '\n\n' +
                   'Esses sintomas são comuns em momentos de ansiedade, e há formas de aliviar.\n\n' +
                   '**Posso te ajudar de duas formas:**\n' +
                   '1. Te ensinar técnicas de respiração que funcionam rápido\n' +
                   '2. Conversar mais sobre o que você está sentindo e por que acontece\n\n' +
                   'O que você prefere agora?',
          showActions: true,
          suggestions: ["Por que isso acontece comigo?", "Quero me acalmar agora"]
        }
      }
    }

    // BAIXA SEVERIDADE ou PEDIDO DE EXERCÍCIOS
    if (recommendation === 'exercise') {
      return {
        content: getEmpatheticResponse('hope') + '\n\n' +
                 'Exercícios podem te ajudar muito! Temos várias opções:\n\n' +
                 '🌬️ **Respiração guiada** - Acalma rapidamente\n' +
                 '💆 **Relaxamento muscular** - Libera tensão\n' +
                 '🧘 **Meditação rápida** - Clareia a mente\n' +
                 '🤸 **Alongamento suave** - Relaxa o corpo\n\n' +
                 'Vou te levar para os exercícios agora, tudo bem?',
        showActions: true
      }
    }

    // Respostas contextuais baseadas no histórico - MODO EXPLORAÇÃO
    if (conversationMode === 'exploring') {
      const exploringResponses = [
        getEmpatheticResponse('support') + '\n\n' +
        'Cada detalhe que você compartilha me ajuda a te entender melhor.\n\n' +
        'Essas sensações costumam durar muito tempo? Como você geralmente lida com elas?',
        
        getEmpatheticResponse('validation') + '\n\n' +
        'Seu corpo está reagindo a algo, e juntos vamos descobrir a melhor forma de te ajudar.\n\n' +
        'Você já tentou alguma técnica de relaxamento antes? Se sim, como foi a experiência?',
        
        getEmpatheticResponse('understanding') + '\n\n' +
        'Às vezes, só de colocar para fora o que sentimos, já alivia um pouco.\n\n' +
        'Há algo mais que você gostaria de me contar sobre como está se sentindo? Ou alguma dúvida sobre esses sintomas?',
        
        getEmpatheticResponse('hope') + '\n\n' +
        'Reconhecer e falar sobre nossos sentimentos é o primeiro passo para lidar com eles.\n\n' +
        'O que você acha que poderia te ajudar neste momento? Conversar mais, entender melhor, ou fazer algo prático?'
      ]
      
      const randomIndex = Math.floor(Math.random() * exploringResponses.length)
      return {
        content: exploringResponses[randomIndex],
        showActions: false,
        suggestions: generateSuggestions(analysis, messageCount)
      }
    }

    // MODO EDUCAÇÃO - Após explicar, oferece próximos passos
    if (conversationMode === 'educating') {
      return {
        content: getEmpatheticResponse('support') + '\n\n' +
                 'Agora que você entende melhor o que está acontecendo, podemos:\n\n' +
                 '1. Praticar técnicas para aliviar esses sintomas\n' +
                 '2. Continuar conversando sobre suas dúvidas\n' +
                 '3. Registrar isso no seu diário para acompanhar\n\n' +
                 'O que faz mais sentido para você agora?',
        showActions: true,
        suggestions: ["Quero praticar técnicas", "Tenho mais dúvidas", "Vou registrar no diário"]
      }
    }

    // Respostas iniciais - Construindo rapport
    if (messageCount <= 2) {
      return {
        content: getEmpatheticResponse('understanding') + '\n\n' +
                 'Você está em um espaço seguro aqui. Pode falar tudo no seu tempo.\n\n' +
                 'Para eu te ajudar melhor: você já sentiu isso antes ou é a primeira vez? E há quanto tempo você está sentindo isso?',
        showActions: false,
        suggestions: ["É a primeira vez", "Já senti antes", "Não sei explicar direito"]
      }
    }

    if (messageCount <= 4) {
      return {
        content: getEmpatheticResponse('validation') + '\n\n' +
                 'Vamos trabalhar juntos para você se sentir melhor.\n\n' +
                 'Me conta: além do que você já descreveu, há algo específico que você acha que pode ter causado ou intensificado essas sensações? (Como estresse, mudanças recentes, preocupações...)',
        showActions: false,
        suggestions: ["Estou muito estressado", "Não sei o motivo", "Tenho muitas preocupações"]
      }
    }

    // Resposta empática padrão com oferta de ações
    if (messageCount > 6) {
      setConversationMode('monitoring')
      return {
        content: getEmpatheticResponse('support') + '\n\n' +
                 'Você já me contou bastante, e eu entendo melhor agora o que você está passando.\n\n' +
                 '**Posso te ajudar de várias formas:**\n' +
                 '• Explicar o que pode estar causando esses sintomas\n' +
                 '• Ensinar técnicas práticas para aliviar\n' +
                 '• Continuar conversando e te apoiando\n\n' +
                 'O que você prefere agora?',
        showActions: true,
        suggestions: ["Quero entender melhor", "Preciso me acalmar", "Vamos continuar conversando"]
      }
    }

    // Resposta padrão de escuta ativa
    return {
      content: getEmpatheticResponse('support') + '\n\n' +
               'Continue me contando, no seu tempo. Não há pressa. Estou aqui para te ouvir e te ajudar.\n\n' +
               'Cada palavra sua é importante para eu entender melhor como te apoiar.',
      showActions: false,
      suggestions: generateSuggestions(analysis, messageCount)
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
        severity: analysis.severity,
        suggestions: response.suggestions
      }
      
      setMessages(prev => [...prev, aiMessage])
    }, 2000)
  }

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response)
  }

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleAction = (action: 'contacts' | 'exercise' | 'crisis' | 'breathing' | 'medical' | 'continue' | 'education') => {
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
        transitionMessage = 'Lembre-se: procurar ajuda médica é sempre a melhor escolha quando algo não está bem. 💙\n\nSe precisar, posso te ajudar a encontrar atendimento ou abrir seus contatos.'
        break
      case 'continue':
        transitionMessage = 'Claro! Estou aqui para te ouvir. Continue me contando o que você está sentindo. 💙'
        break
      case 'education':
        transitionMessage = 'Vou te explicar melhor sobre isso. Conhecimento traz tranquilidade. 🧠'
        break
    }

    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: transitionMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, confirmMessage])
    
    if (action !== 'continue' && action !== 'medical' && action !== 'education') {
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
  }

  const handleSaveDiary = () => {
    const confirmMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Ótima ideia! Registrar seus sentimentos pode te ajudar muito a entender melhor o que você está passando. 📝\n\nVou te levar para o diário agora.',
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
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Médico Amigo</h1>
              <p className="text-sm text-white/90 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Aqui para ouvir, explicar e orientar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div
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
                        <button
                          onClick={() => handleAction('continue')}
                          className="w-full py-2 px-4 rounded-xl font-medium bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-700 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Quero conversar mais sobre isso
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
                          onClick={() => handleAction('continue')}
                          className="w-full py-2 px-4 rounded-xl font-medium bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-700 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Continuar conversando e entendendo
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sugestões contextuais */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 justify-start ml-2">
                {message.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestion(suggestion)}
                    className="py-2 px-3 rounded-lg text-sm font-medium bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-200 flex items-center gap-1"
                  >
                    <Lightbulb className="w-3 h-3" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
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
            Este é um suporte emocional e orientação educativa. Em caso de emergência ou sintomas graves, procure atendimento médico imediatamente.
          </p>
        </div>
      </div>
    </div>
  )
}
