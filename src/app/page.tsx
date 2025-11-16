'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { AnimatedLogo } from './components/AnimatedLogo'
import { AuthForm } from './components/AuthForm'
import { InitialRegistration } from './components/InitialRegistration'
import { OnboardingFlow } from './components/OnboardingFlow'
import { Dashboard } from './components/Dashboard'
import { QuickRegister } from './components/QuickRegister'
import { CrisisMode } from './components/CrisisMode'
import { ExercisesList } from './components/ExercisesList'
import { ExerciseGuided } from './components/ExerciseGuided'
import { ContentLibrary } from './components/ContentLibrary'
import { WeeklyReport } from './components/WeeklyReport'
import { EmergencyContacts } from './components/EmergencyContacts'
import { EmotionalDialogue } from './components/EmotionalDialogue'
import EmotionalCalendar from './components/EmotionalCalendar'
import DailyDiary from './components/DailyDiary'
import AnxietyGraph from './components/AnxietyGraph'
import MedicalSummary from './components/MedicalSummary'

export type Screen = 
  | 'logo'
  | 'auth'
  | 'initial-registration'
  | 'onboarding' 
  | 'dashboard' 
  | 'register' 
  | 'crisis' 
  | 'exercises' 
  | 'exercise-guided'
  | 'library' 
  | 'report'
  | 'contacts'
  | 'emotional-dialogue-pre'
  | 'emotional-dialogue-during'
  | 'emotional-dialogue-post'
  | 'calendar'
  | 'diary'
  | 'graph'
  | 'summary'

interface DiaryEntry {
  date: string;
  anxietyLevel: number;
  feelings: string[];
  whatFeeling: string;
  whatCaused: string;
  bodyReaction: string;
  freeThoughts: string;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('logo')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [showLogo, setShowLogo] = useState(true)
  const [loading, setLoading] = useState(true)
  const [skipRegistration, setSkipRegistration] = useState(false)

  // Verificar autenticação e perfil do usuário
  useEffect(() => {
    checkAuth()

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
      if (session) {
        checkUserProfile()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const hasSeenLogo = sessionStorage.getItem('hasSeenLogo')
      
      if (hasSeenLogo) {
        setShowLogo(false)
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setIsAuthenticated(true)
        await checkUserProfile()
      } else {
        setCurrentScreen(hasSeenLogo ? 'auth' : 'logo')
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      setCurrentScreen('auth')
    } finally {
      setLoading(false)
    }
  }

  const checkUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Tentar buscar perfil
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Se houver erro (tabela não existe ou perfil não encontrado)
      if (error) {
        console.log('Perfil não encontrado ou tabela não existe:', error.message)
        setHasProfile(false)
        setCurrentScreen('initial-registration')
        return
      }

      if (profile) {
        setHasProfile(true)
        setCurrentScreen('onboarding')
      } else {
        setHasProfile(false)
        setCurrentScreen('initial-registration')
      }
    } catch (error) {
      console.error('Erro ao verificar perfil:', error)
      setHasProfile(false)
      setCurrentScreen('initial-registration')
    }
  }

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  const handleLogoComplete = () => {
    sessionStorage.setItem('hasSeenLogo', 'true')
    setShowLogo(false)
    setCurrentScreen('auth')
  }

  const handleAuthSuccess = async () => {
    setIsAuthenticated(true)
    await checkUserProfile()
  }

  const handleRegistrationComplete = () => {
    setHasProfile(true)
    setCurrentScreen('onboarding')
  }

  const handleSkipRegistration = () => {
    setSkipRegistration(true)
    setCurrentScreen('onboarding')
  }

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true)
    setCurrentScreen('dashboard')
  }

  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExercise(exerciseId)
    setCurrentScreen('exercise-guided')
  }

  const handleDayClick = (date: string) => {
    setSelectedDate(date)
    setCurrentScreen('diary')
  }

  const handleSaveDiary = async (entry: DiaryEntry) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Tentar salvar no Supabase (se tabela existir)
      try {
        await supabase
          .from('diary_entries')
          .upsert({
            user_id: user.id,
            date: entry.date,
            anxiety_level: entry.anxietyLevel,
            feelings: entry.feelings,
            what_feeling: entry.whatFeeling,
            what_caused: entry.whatCaused,
            body_reaction: entry.bodyReaction,
            free_thoughts: entry.freeThoughts
          })
      } catch (dbError) {
        console.log('Erro ao salvar no banco (tabela pode não existir):', dbError)
        // Continua mesmo se falhar - salva localmente
      }

      // Atualizar estado local
      setDiaryEntries(prev => [...prev.filter(e => e.date !== entry.date), entry])
      setCurrentScreen('calendar')
    } catch (error) {
      console.error('Erro ao salvar diário:', error)
      // Mesmo com erro, volta para o calendário
      setCurrentScreen('calendar')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F9FA' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
               style={{ borderColor: '#A8D5C2', borderTopColor: 'transparent' }} />
          <p style={{ color: '#5C6F82' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9FA' }}>
      {currentScreen === 'logo' && showLogo && (
        <AnimatedLogo onComplete={handleLogoComplete} />
      )}

      {currentScreen === 'auth' && (
        <AuthForm onSuccess={handleAuthSuccess} />
      )}

      {currentScreen === 'initial-registration' && (
        <InitialRegistration 
          onComplete={handleRegistrationComplete}
          onSkip={handleSkipRegistration}
        />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard navigate={navigate} />
      )}
      
      {currentScreen === 'register' && (
        <QuickRegister navigate={navigate} />
      )}
      
      {currentScreen === 'crisis' && (
        <CrisisMode navigate={navigate} />
      )}
      
      {currentScreen === 'exercises' && (
        <ExercisesList navigate={navigate} onSelectExercise={handleExerciseSelect} />
      )}

      {currentScreen === 'exercise-guided' && selectedExercise && (
        <ExerciseGuided navigate={navigate} exerciseId={selectedExercise} />
      )}
      
      {currentScreen === 'library' && (
        <ContentLibrary navigate={navigate} />
      )}
      
      {currentScreen === 'report' && (
        <WeeklyReport navigate={navigate} />
      )}

      {currentScreen === 'contacts' && (
        <EmergencyContacts navigate={navigate} />
      )}

      {currentScreen === 'emotional-dialogue-pre' && (
        <EmotionalDialogue navigate={navigate} phase="pre" />
      )}

      {currentScreen === 'emotional-dialogue-during' && (
        <EmotionalDialogue navigate={navigate} phase="during" />
      )}

      {currentScreen === 'emotional-dialogue-post' && (
        <EmotionalDialogue navigate={navigate} phase="post" />
      )}

      {currentScreen === 'calendar' && (
        <EmotionalCalendar 
          onDayClick={handleDayClick}
          onViewGraph={() => navigate('graph')}
          onViewSummary={() => navigate('summary')}
          onBackToMenu={() => navigate('dashboard')}
          onViewProgress={() => navigate('report')}
        />
      )}

      {currentScreen === 'diary' && selectedDate && (
        <DailyDiary 
          date={selectedDate}
          onBack={() => navigate('calendar')}
          onSave={handleSaveDiary}
        />
      )}

      {currentScreen === 'graph' && (
        <AnxietyGraph 
          onBack={() => navigate('calendar')}
          onDoExercise={() => navigate('exercises')}
        />
      )}

      {currentScreen === 'summary' && (
        <MedicalSummary 
          onBack={() => navigate('calendar')}
        />
      )}
    </div>
  )
}
