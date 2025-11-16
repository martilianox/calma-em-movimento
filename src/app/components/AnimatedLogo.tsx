'use client'

import { useEffect, useState } from 'react'

interface AnimatedLogoProps {
  onComplete: () => void
}

export function AnimatedLogo({ onComplete }: AnimatedLogoProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Após 3 segundos, inicia o fade out
    const timer = setTimeout(() => {
      setFadeOut(true)
      // Após o fade out (0.8s), chama onComplete
      setTimeout(onComplete, 800)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, #C7DDF2 0%, #A8D5C2 100%)',
        zIndex: 9999
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo SVG Animada */}
        <div className="relative">
          <svg 
            width="180" 
            height="180" 
            viewBox="0 0 180 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse-slow"
          >
            {/* Círculo externo - representando calma e completude */}
            <circle 
              cx="90" 
              cy="90" 
              r="70" 
              stroke="#5C6F82" 
              strokeWidth="2" 
              fill="none"
              className="animate-draw-circle"
              style={{
                strokeDasharray: 440,
                strokeDashoffset: 440,
                animation: 'drawCircle 2s ease-out forwards'
              }}
            />
            
            {/* Ondas de respiração - 3 curvas suaves */}
            <path 
              d="M 50 90 Q 70 70, 90 90 T 130 90" 
              stroke="#83978A" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              className="animate-wave-1"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'drawWave 1.5s ease-out 0.5s forwards, breathe 3s ease-in-out 2s infinite'
              }}
            />
            
            <path 
              d="M 50 100 Q 70 80, 90 100 T 130 100" 
              stroke="#A8D5C2" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              className="animate-wave-2"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'drawWave 1.5s ease-out 0.7s forwards, breathe 3s ease-in-out 2.2s infinite'
              }}
            />
            
            <path 
              d="M 50 110 Q 70 90, 90 110 T 130 110" 
              stroke="#95A8B8" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              className="animate-wave-3"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: 'drawWave 1.5s ease-out 0.9s forwards, breathe 3s ease-in-out 2.4s infinite'
              }}
            />

            {/* Ponto central - representando o "eu" */}
            <circle 
              cx="90" 
              cy="90" 
              r="8" 
              fill="#5C6F82"
              className="animate-scale-in"
              style={{
                transform: 'scale(0)',
                transformOrigin: 'center',
                animation: 'scaleIn 0.6s ease-out 1.2s forwards'
              }}
            />
          </svg>
        </div>

        {/* Nome do App */}
        <div className="text-center space-y-2 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
          <h1 
            className="text-3xl font-light tracking-wide"
            style={{ color: '#5C6F82', fontFamily: 'var(--font-inter)' }}
          >
            Calma em Movimento
          </h1>
          <p 
            className="text-sm font-light tracking-wider opacity-70"
            style={{ color: '#83978A' }}
          >
            Respire. Sinta. Cuide-se.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawWave {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 0.6;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @keyframes scaleIn {
          to {
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
