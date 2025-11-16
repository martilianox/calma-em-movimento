'use client'

import { ArrowLeft, TrendingDown, TrendingUp, Minus, Heart, Calendar } from 'lucide-react'
import type { Screen } from '../page'

interface WeeklyReportProps {
  navigate: (screen: Screen) => void
}

export function WeeklyReport({ navigate }: WeeklyReportProps) {
  // Dados simulados
  const weekData = {
    average: 5.2,
    trend: 'down', // 'up', 'down', 'stable'
    bestDay: 'Quarta-feira',
    hardestDay: 'Segunda-feira',
    exercisesCompleted: 8,
    registrations: 12,
    dailyData: [
      { day: 'Seg', level: 7, date: '20/01' },
      { day: 'Ter', level: 6, date: '21/01' },
      { day: 'Qua', level: 3, date: '22/01' },
      { day: 'Qui', level: 5, date: '23/01' },
      { day: 'Sex', level: 6, date: '24/01' },
      { day: 'Sáb', level: 4, date: '25/01' },
      { day: 'Dom', level: 5, date: '26/01' }
    ]
  }

  const maxLevel = Math.max(...weekData.dailyData.map(d => d.level))

  return (
    <div className="min-h-screen pb-6" style={{ backgroundColor: '#F7F9FA' }}>
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <button
          onClick={() => navigate('dashboard')}
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#5C6F82' }} />
        </button>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: '#5C6F82' }}>
            Seu progresso
          </h1>
          <p className="text-sm" style={{ color: '#95A8B8' }}>
            Semana de 20 a 26 de janeiro
          </p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Average card */}
        <div 
          className="p-6 rounded-2xl"
          style={{ backgroundColor: '#C7DDF2' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm mb-1" style={{ color: '#5C6F82' }}>
                Média da semana
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-semibold" style={{ color: '#5C6F82' }}>
                  {weekData.average}
                </span>
                <span className="text-lg mb-1" style={{ color: '#95A8B8' }}>
                  /10
                </span>
              </div>
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: 'rgba(168, 213, 194, 0.5)' }}
            >
              {weekData.trend === 'down' && <TrendingDown className="w-6 h-6" style={{ color: '#5C6F82' }} />}
              {weekData.trend === 'up' && <TrendingUp className="w-6 h-6" style={{ color: '#5C6F82' }} />}
              {weekData.trend === 'stable' && <Minus className="w-6 h-6" style={{ color: '#5C6F82' }} />}
            </div>
          </div>
          <p className="text-sm" style={{ color: '#5C6F82', opacity: 0.8 }}>
            {weekData.trend === 'down' && '✨ Sua ansiedade diminuiu essa semana'}
            {weekData.trend === 'up' && '💛 Foi uma semana mais difícil, tá tudo bem'}
            {weekData.trend === 'stable' && '🌱 Você manteve a estabilidade'}
          </p>
        </div>

        {/* Chart */}
        <div 
          className="p-6 rounded-2xl"
          style={{ backgroundColor: '#FFFFFF', border: '2px solid #DDE2E6' }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: '#5C6F82' }}>
            Nível de ansiedade por dia
          </h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.dailyData.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-32">
                  <div
                    className="w-full rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${(day.level / maxLevel) * 100}%`,
                      backgroundColor: day.level <= 3 ? '#A8D5C2' : day.level <= 6 ? '#C7DDF2' : '#E7CBCB'
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium" style={{ color: '#5C6F82' }}>
                    {day.day}
                  </p>
                  <p className="text-xs" style={{ color: '#95A8B8' }}>
                    {day.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <div 
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: '#A8D5C2' }}
          >
            <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#5C6F82' }} />
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#5C6F82' }}>
                Melhor dia
              </p>
              <p className="text-sm" style={{ color: '#5C6F82', opacity: 0.8 }}>
                {weekData.bestDay} foi seu dia mais tranquilo
              </p>
            </div>
          </div>

          <div 
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: '#E7CBCB' }}
          >
            <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#5C6F82' }} />
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#5C6F82' }}>
                Dia mais difícil
              </p>
              <p className="text-sm" style={{ color: '#5C6F82', opacity: 0.8 }}>
                {weekData.hardestDay} foi mais desafiador, mas você passou por ele
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div 
          className="p-6 rounded-2xl"
          style={{ backgroundColor: '#F3EDE7' }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: '#5C6F82' }}>
            Sua dedicação
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-semibold" style={{ color: '#5C6F82' }}>
                {weekData.exercisesCompleted}
              </p>
              <p className="text-sm" style={{ color: '#95A8B8' }}>
                Exercícios feitos
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ color: '#5C6F82' }}>
                {weekData.registrations}
              </p>
              <p className="text-sm" style={{ color: '#95A8B8' }}>
                Registros salvos
              </p>
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div 
          className="p-5 rounded-2xl"
          style={{ backgroundColor: '#C7DDF2' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#5C6F82' }}>
            💛 <strong>Você está indo bem.</strong> Cada registro, cada exercício, cada vez que você para pra se observar — tudo isso é cuidado. Continue no seu ritmo.
          </p>
        </div>
      </div>
    </div>
  )
}
