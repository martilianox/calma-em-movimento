'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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
        {/* Logo Oficial Animada */}
        <div 
          className="relative animate-fade-in-scale"
          style={{
            animation: 'fadeInScale 1.5s ease-out forwards'
          }}
        >
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/46450cd0-be72-47f6-bc9f-5cc92c1cc158.png" 
            alt="Calma em Movimento" 
            className="w-48 h-48 object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))'
            }}
          />
        </div>

        {/* Nome do App */}
        <div className="text-center space-y-2 animate-fade-in-up" style={{ animationDelay: '1s' }}>
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

        {/* Indicadores de carregamento */}
        <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#A8D5C2',
              animationDelay: '0s',
              animationDuration: '1s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#95A8B8',
              animationDelay: '0.2s',
              animationDuration: '1s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: '#83978A',
              animationDelay: '0.4s',
              animationDuration: '1s'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-scale {
          opacity: 0;
          animation: fadeInScale 1.5s ease-out forwards;
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
