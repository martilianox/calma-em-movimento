'use client'

import { useState } from 'react'
import { User, MapPin, Calendar, Activity, Heart, FileText, ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface InitialRegistrationProps {
  onComplete: () => void
}

export function InitialRegistration({ onComplete }: InitialRegistrationProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: '',
    nickname: '',
    idade: '',
    endereco: '',
    cidade: '',
    estado: '',
    
    // Atividades e Rotina
    atividades: '',
    ocupacao: '',
    hobbies: '',
    
    // Histórico de Ansiedade
    tempoAnsiedade: '',
    comoComecou: '',
    sintomasPrincipais: [] as string[],
    frequenciaCrises: '',
    gatilhosConhecidos: '',
    tratamentoAtual: '',
    medicamentos: '',
    observacoes: ''
  })

  const sintomasOptions = [
    'Coração acelerado',
    'Falta de ar',
    'Tremores',
    'Suor excessivo',
    'Tontura',
    'Pensamentos acelerados',
    'Medo intenso',
    'Aperto no peito',
    'Náusea',
    'Insônia'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleSintoma = (sintoma: string) => {
    setFormData(prev => ({
      ...prev,
      sintomasPrincipais: prev.sintomasPrincipais.includes(sintoma)
        ? prev.sintomasPrincipais.filter(s => s !== sintoma)
        : [...prev.sintomasPrincipais, sintoma]
    }))
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      setError('')

      try {
        // Obter usuário autenticado
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('Usuário não autenticado')
        }

        // Salvar perfil no Supabase
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: user.id,
            name: formData.name,
            nickname: formData.nickname,
            idade: formData.idade,
            endereco: formData.endereco,
            cidade: formData.cidade,
            estado: formData.estado,
            atividades: formData.atividades,
            ocupacao: formData.ocupacao,
            hobbies: formData.hobbies,
            tempo_ansiedade: formData.tempoAnsiedade,
            como_comecou: formData.comoComecou,
            sintomas_principais: formData.sintomasPrincipais,
            frequencia_crises: formData.frequenciaCrises,
            gatilhos_conhecidos: formData.gatilhosConhecidos,
            tratamento_atual: formData.tratamentoAtual,
            medicamentos: formData.medicamentos,
            observacoes: formData.observacoes,
            updated_at: new Date().toISOString()
          })

        if (profileError) throw profileError

        // Também salvar no localStorage como backup
        localStorage.setItem('userProfile', JSON.stringify(formData))
        
        onComplete()
      } catch (err: any) {
        setError(err.message || 'Erro ao salvar perfil. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    if (step === 1) {
      return formData.name && formData.idade && formData.endereco
    }
    if (step === 2) {
      return formData.atividades || formData.ocupacao
    }
    if (step === 3) {
      return formData.tempoAnsiedade && formData.comoComecou
    }
    return false
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F7F9FA' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#C7DDF2' }}>
            <Heart className="w-8 h-8" style={{ color: '#5C6F82' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#5C6F82' }}>
            Bem-vindo ao Calma em Movimento
          </h1>
          <p className="text-lg" style={{ color: '#95A8B8' }}>
            Vamos conhecer você melhor para personalizar sua experiência
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#5C6F82' }}>
              Etapa {step} de 3
            </span>
            <span className="text-sm" style={{ color: '#95A8B8' }}>
              {Math.round((step / 3) * 100)}% completo
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#DDE2E6' }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: '#A8D5C2',
                width: `${(step / 3) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6" style={{ color: '#A8D5C2' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#5C6F82' }}>
                  Dados Pessoais
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Como gostaria de ser chamado? (apelido)
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  placeholder="Ex: Ana, João, Lú..."
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#95A8B8' }}>
                  Este será o nome usado nas saudações do app
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Idade *
                </label>
                <input
                  type="number"
                  value={formData.idade}
                  onChange={(e) => handleInputChange('idade', e.target.value)}
                  placeholder="Sua idade"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Endereço *
                </label>
                <input
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Rua, número, bairro"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    placeholder="Sua cidade"
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{ 
                      backgroundColor: '#F7F9FA',
                      borderColor: '#DDE2E6',
                      color: '#5C6F82'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                    Estado
                  </label>
                  <input
                    type="text"
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    placeholder="UF"
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{ 
                      backgroundColor: '#F7F9FA',
                      borderColor: '#DDE2E6',
                      color: '#5C6F82'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Atividades e Rotina */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6" style={{ color: '#A8D5C2' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#5C6F82' }}>
                  Atividades e Rotina
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Ocupação atual *
                </label>
                <input
                  type="text"
                  value={formData.ocupacao}
                  onChange={(e) => handleInputChange('ocupacao', e.target.value)}
                  placeholder="Estudante, profissional, autônomo..."
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Atividades diárias *
                </label>
                <textarea
                  value={formData.atividades}
                  onChange={(e) => handleInputChange('atividades', e.target.value)}
                  placeholder="Descreva sua rotina: trabalho, estudos, exercícios..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Hobbies e interesses
                </label>
                <textarea
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  placeholder="O que você gosta de fazer no tempo livre?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Histórico de Ansiedade */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6" style={{ color: '#A8D5C2' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#5C6F82' }}>
                  Histórico de Ansiedade
                </h2>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: '#E7CBCB' }}>
                <p className="text-sm" style={{ color: '#5C6F82' }}>
                  Essas informações nos ajudam a personalizar seu acompanhamento. Tudo aqui é privado e seguro.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Há quanto tempo você convive com ansiedade? *
                </label>
                <input
                  type="text"
                  value={formData.tempoAnsiedade}
                  onChange={(e) => handleInputChange('tempoAnsiedade', e.target.value)}
                  placeholder="Ex: 2 anos, desde a adolescência..."
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Como começou? *
                </label>
                <textarea
                  value={formData.comoComecou}
                  onChange={(e) => handleInputChange('comoComecou', e.target.value)}
                  placeholder="Conte um pouco sobre quando e como você percebeu os primeiros sinais..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#5C6F82' }}>
                  Sintomas principais (selecione todos que se aplicam)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sintomasOptions.map((sintoma) => (
                    <button
                      key={sintoma}
                      onClick={() => toggleSintoma(sintoma)}
                      className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        backgroundColor: formData.sintomasPrincipais.includes(sintoma) 
                          ? '#A8D5C2' 
                          : '#F7F9FA',
                        color: formData.sintomasPrincipais.includes(sintoma)
                          ? '#FFFFFF'
                          : '#5C6F82',
                        border: `2px solid ${formData.sintomasPrincipais.includes(sintoma) ? '#A8D5C2' : '#DDE2E6'}`
                      }}
                    >
                      {sintoma}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Frequência das crises
                </label>
                <select
                  value={formData.frequenciaCrises}
                  onChange={(e) => handleInputChange('frequenciaCrises', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="diaria">Diariamente</option>
                  <option value="semanal">Semanalmente</option>
                  <option value="mensal">Mensalmente</option>
                  <option value="esporadica">Esporadicamente</option>
                  <option value="rara">Raramente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Gatilhos conhecidos
                </label>
                <textarea
                  value={formData.gatilhosConhecidos}
                  onChange={(e) => handleInputChange('gatilhosConhecidos', e.target.value)}
                  placeholder="Situações, lugares ou momentos que costumam desencadear ansiedade..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Tratamento atual
                </label>
                <input
                  type="text"
                  value={formData.tratamentoAtual}
                  onChange={(e) => handleInputChange('tratamentoAtual', e.target.value)}
                  placeholder="Terapia, acompanhamento médico..."
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Medicamentos (se houver)
                </label>
                <input
                  type="text"
                  value={formData.medicamentos}
                  onChange={(e) => handleInputChange('medicamentos', e.target.value)}
                  placeholder="Nome e dosagem dos medicamentos"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5C6F82' }}>
                  Observações adicionais
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Algo mais que você gostaria de compartilhar..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ 
                    backgroundColor: '#F7F9FA',
                    borderColor: '#DDE2E6',
                    color: '#5C6F82'
                  }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl mt-6" style={{ backgroundColor: '#E7CBCB' }}>
              <p className="text-sm" style={{ color: '#5C6F82' }}>
                {error}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl font-medium transition-all hover:opacity-80 disabled:opacity-50"
                style={{
                  backgroundColor: '#DDE2E6',
                  color: '#5C6F82'
                }}
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="flex-1 px-6 py-4 rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#A8D5C2',
                color: '#FFFFFF'
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  {step === 3 ? 'Salvar e Continuar' : 'Próximo'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: '#95A8B8' }}>
              Seus dados são armazenados de forma segura e criptografada. Você pode editá-los a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
