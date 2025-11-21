/**
 * Integração com API Doutor IA
 * Especialização: Psiquiatria/Psicologia
 */

interface DoctorAIRequest {
  message: string
  specialization: 'psychiatry' | 'psychology'
  language: 'pt' | 'en'
}

interface DoctorAIResponse {
  response: string
  confidence?: number
  suggestions?: string[]
  error?: string
}

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '9211b38301msh9d910c56ed70368p11ea61jsn2c18ca91e354'
const RAPIDAPI_HOST = 'ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com'
const API_URL = `https://${RAPIDAPI_HOST}/chat?noqueue=1`

/**
 * Consulta a API Doutor IA para obter resposta especializada
 * IMPORTANTE: Esta função só funciona no lado do cliente (browser)
 */
export async function consultDoctorAI(
  message: string,
  specialization: 'psychiatry' | 'psychology' = 'psychiatry',
  language: 'pt' | 'en' = 'pt'
): Promise<DoctorAIResponse> {
  // Verifica se está no browser
  if (typeof window === 'undefined') {
    return {
      response: '',
      error: 'API só disponível no cliente',
    }
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
      body: JSON.stringify({
        message,
        specialization,
        language,
      }),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      response: data.response || data.message || 'Desculpe, não consegui processar sua mensagem.',
      confidence: data.confidence,
      suggestions: data.suggestions,
    }
  } catch (error) {
    console.error('Erro ao consultar Doctor AI:', error)
    
    return {
      response: '',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }
  }
}

/**
 * Traduz mensagem do português para inglês (para API)
 */
export function translateToEnglish(message: string): string {
  const translations: Record<string, string> = {
    // Sintomas comuns
    'coração acelerado': 'racing heart',
    'taquicardia': 'tachycardia',
    'falta de ar': 'shortness of breath',
    'dificuldade para respirar': 'difficulty breathing',
    'tontura': 'dizziness',
    'tremor': 'trembling',
    'suando': 'sweating',
    'náusea': 'nausea',
    'enjoo': 'nausea',
    'medo': 'fear',
    'pânico': 'panic',
    'ansiedade': 'anxiety',
    'nervoso': 'nervous',
    'preocupado': 'worried',
    'estresse': 'stress',
    'angústia': 'distress',
    'desespero': 'despair',
    'insônia': 'insomnia',
    'cansaço': 'fatigue',
    'tristeza': 'sadness',
    'depressão': 'depression',
    'irritação': 'irritation',
    'raiva': 'anger',
    
    // Perguntas comuns
    'como estou': 'how am I',
    'o que fazer': 'what to do',
    'preciso de ajuda': 'I need help',
    'estou mal': 'I feel bad',
    'não aguento': 'I can\'t take it',
    'me ajude': 'help me',
  }

  let translated = message.toLowerCase()
  
  for (const [pt, en] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(pt, 'gi'), en)
  }
  
  return translated
}

/**
 * Traduz resposta do inglês para português (da API)
 */
export function translateToPortuguese(message: string): string {
  const translations: Record<string, string> = {
    // Termos médicos
    'anxiety': 'ansiedade',
    'panic attack': 'ataque de pânico',
    'depression': 'depressão',
    'stress': 'estresse',
    'breathing': 'respiração',
    'exercise': 'exercício',
    'relaxation': 'relaxamento',
    'meditation': 'meditação',
    'therapy': 'terapia',
    'counseling': 'aconselhamento',
    'symptoms': 'sintomas',
    'treatment': 'tratamento',
    'medication': 'medicação',
    'professional': 'profissional',
    'emergency': 'emergência',
    
    // Frases comuns
    'I understand': 'Eu entendo',
    'It\'s normal': 'É normal',
    'You should': 'Você deveria',
    'Try to': 'Tente',
    'It\'s important': 'É importante',
    'Please': 'Por favor',
    'Thank you': 'Obrigado',
    'Take care': 'Cuide-se',
  }

  let translated = message
  
  for (const [en, pt] of Object.entries(translations)) {
    translated = translated.replace(new RegExp(en, 'gi'), pt)
  }
  
  return translated
}

/**
 * Combina resposta da API com contexto local
 */
export function enhanceResponse(
  apiResponse: string,
  userMessage: string,
  severity: 'low' | 'medium' | 'high' | 'emergency'
): string {
  // Se API retornou resposta vazia ou erro, usa fallback
  if (!apiResponse || apiResponse.includes('Desculpe')) {
    return getFallbackResponse(userMessage, severity)
  }

  // Adiciona contexto empático baseado na severidade
  let enhancedResponse = ''

  switch (severity) {
    case 'emergency':
      enhancedResponse = '🚨 **ATENÇÃO URGENTE**\n\n' + apiResponse + '\n\n⚠️ Por favor, procure atendimento médico IMEDIATAMENTE ou ligue 192 (SAMU).'
      break
    
    case 'high':
      enhancedResponse = '⚠️ ' + apiResponse + '\n\n💙 Recomendo fortemente que você procure um profissional de saúde mental hoje.'
      break
    
    case 'medium':
      enhancedResponse = '💙 ' + apiResponse + '\n\nEstou aqui para te apoiar. Vamos trabalhar juntos nisso.'
      break
    
    case 'low':
      enhancedResponse = '🌟 ' + apiResponse
      break
  }

  return enhancedResponse
}

/**
 * Resposta de fallback quando API não está disponível
 */
function getFallbackResponse(userMessage: string, severity: 'low' | 'medium' | 'high' | 'emergency'): string {
  const lowerMessage = userMessage.toLowerCase()

  // Respostas específicas para sintomas comuns
  if (lowerMessage.includes('coração') || lowerMessage.includes('taquicardia')) {
    return 'Coração acelerado é um sintoma comum de ansiedade. Vamos fazer um exercício de respiração para acalmar seu sistema nervoso. Inspire profundamente por 4 segundos, segure por 4, expire por 6. Repita algumas vezes.'
  }

  if (lowerMessage.includes('falta de ar') || lowerMessage.includes('respirar')) {
    return 'A sensação de falta de ar pode ser muito assustadora, mas é comum em momentos de ansiedade. Vamos focar em respirar devagar e profundamente. Coloque uma mão no peito e outra na barriga. Respire pelo nariz enchendo a barriga, não o peito.'
  }

  if (lowerMessage.includes('tontura') || lowerMessage.includes('tonto')) {
    return 'Tontura pode acontecer quando estamos ansiosos devido à hiperventilação. Sente-se em um lugar confortável, coloque os pés no chão e respire calmamente. Foque em um ponto fixo à sua frente.'
  }

  if (lowerMessage.includes('pânico') || lowerMessage.includes('desespero')) {
    return 'Ataques de pânico são intensos mas temporários. Lembre-se: isso VAI passar. Você está seguro. Vamos usar a técnica 5-4-3-2-1: Identifique 5 coisas que você vê, 4 que você toca, 3 que você ouve, 2 que você cheira, 1 que você saboreia.'
  }

  // Resposta empática padrão
  return 'Eu entendo o que você está sentindo. Suas emoções são válidas e importantes. Estou aqui para te apoiar. Vamos trabalhar juntos para você se sentir melhor.'
}
