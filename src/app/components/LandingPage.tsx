'use client'

import { useState } from 'react'
import { Heart, Brain, Users, Star, TrendingUp, Shield, Sparkles, ChevronRight } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Maria Silva",
      age: 32,
      role: "Professora",
      text: "Há 3 meses usando o app e minhas crises diminuíram 70%. Finalmente consigo dormir tranquila.",
      rating: 5,
      improvement: "70% menos crises"
    },
    {
      name: "João Pedro",
      age: 28,
      role: "Desenvolvedor",
      text: "O Médico Amigo me ajudou a entender minha ansiedade. Não me sinto mais sozinho nas crises.",
      rating: 5,
      improvement: "Redução de 65% na ansiedade"
    },
    {
      name: "Ana Costa",
      age: 45,
      role: "Empresária",
      text: "Consegui voltar a trabalhar normalmente. Os exercícios de respiração são incríveis!",
      rating: 5,
      improvement: "Retorno ao trabalho em 2 meses"
    },
    {
      name: "Carlos Mendes",
      age: 35,
      role: "Médico",
      text: "Como profissional de saúde, recomendo este app. A abordagem é cientificamente embasada.",
      rating: 5,
      improvement: "Recomenda para pacientes"
    },
    {
      name: "Juliana Santos",
      age: 29,
      role: "Designer",
      text: "Minha qualidade de vida melhorou absurdamente. Consigo identificar gatilhos antes das crises.",
      rating: 5,
      improvement: "80% mais autoconhecimento"
    },
    {
      name: "Roberto Lima",
      age: 41,
      role: "Engenheiro",
      text: "Parei de ir ao pronto-socorro toda semana. O app me ensinou a gerenciar minha ansiedade.",
      rating: 5,
      improvement: "Zero idas ao PS em 4 meses"
    },
    {
      name: "Fernanda Oliveira",
      age: 26,
      role: "Estudante",
      text: "Consegui voltar a estudar e fazer provas. Antes tinha crises paralisantes na faculdade.",
      rating: 5,
      improvement: "Retorno aos estudos"
    },
    {
      name: "Paulo Henrique",
      age: 38,
      role: "Advogado",
      text: "O diário emocional me ajudou a entender padrões. Hoje tenho controle sobre minha ansiedade.",
      rating: 5,
      improvement: "90% mais controle emocional"
    },
    {
      name: "Beatriz Almeida",
      age: 31,
      role: "Psicóloga",
      text: "Uso com meus pacientes. A ferramenta complementa perfeitamente o tratamento terapêutico.",
      rating: 5,
      improvement: "Ferramenta profissional"
    },
    {
      name: "Lucas Ferreira",
      age: 27,
      role: "Atleta",
      text: "Voltei a competir depois de 1 ano afastado. O app me deu segurança para enfrentar a pressão.",
      rating: 5,
      improvement: "Retorno ao esporte"
    }
  ]

  const stats = [
    { icon: Users, value: "50mil+", label: "Usuários ativos" },
    { icon: Heart, value: "85%", label: "Redução de crises" },
    { icon: TrendingUp, value: "92%", label: "Satisfação" },
    { icon: Star, value: "4.9", label: "Avaliação média" }
  ]

  const features = [
    {
      icon: Brain,
      title: "Médico Amigo IA",
      description: "Assistente inteligente disponível 24/7 para acolhimento emocional e orientação"
    },
    {
      icon: Heart,
      title: "Exercícios Guiados",
      description: "Técnicas de respiração e mindfulness com áudio e temporizador inteligente"
    },
    {
      icon: Shield,
      title: "Modo Crise",
      description: "Suporte imediato quando você mais precisa, com contatos de emergência"
    },
    {
      icon: Sparkles,
      title: "Diário Emocional",
      description: "Registre seus sentimentos e identifique padrões para melhor autoconhecimento"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Seu amigo nas horas difíceis</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Calma em <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">Movimento</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Transforme sua relação com a ansiedade através de ferramentas inteligentes, 
            suporte emocional e acompanhamento personalizado
          </p>
          
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Começar agora gratuitamente
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-sm text-gray-500 mt-4">Sem cartão de crédito • Privacidade garantida</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Recursos que fazem a diferença
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Histórias reais de transformação
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Mais de 50 mil pessoas já melhoraram sua qualidade de vida com o Calma em Movimento
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-800 text-center mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-lg">
                  {testimonials[activeTestimonial].name}, {testimonials[activeTestimonial].age}
                </div>
                <div className="text-gray-600 mb-3">{testimonials[activeTestimonial].role}</div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {testimonials[activeTestimonial].improvement}
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs">{testimonial.role}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.improvement.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram paz e equilíbrio emocional
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Começar minha jornada
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Calma em Movimento. Seu amigo nas horas difíceis.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Este aplicativo não substitui tratamento médico profissional
          </p>
        </div>
      </div>
    </div>
  )
}
