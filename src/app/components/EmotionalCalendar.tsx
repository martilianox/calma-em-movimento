"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, FileText, Home } from "lucide-react";

interface DayEntry {
  date: string;
  anxietyLevel: number | null;
  hasEntry: boolean;
}

interface EmotionalCalendarProps {
  onDayClick: (date: string) => void;
  onViewGraph: () => void;
  onViewSummary: () => void;
  onBackToMenu: () => void;
  onViewProgress: () => void;
}

export default function EmotionalCalendar({
  onDayClick,
  onViewGraph,
  onViewSummary,
  onBackToMenu,
  onViewProgress,
}: EmotionalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Função para obter cor baseada no nível de ansiedade
  const getColorForLevel = (level: number | null): string => {
    if (level === null) return "bg-transparent border border-[#DDE2E6]";
    if (level >= 8) return "bg-[#95A8B8]"; // Azul Acinzentado
    if (level >= 6) return "bg-[#A8D5C2]"; // Verde Jade Suave
    if (level >= 4) return "bg-[#C7DDF2]"; // Azul Névoa
    return "bg-[#DDE2E6]"; // Cinza Nuvem
  };

  // Gerar dias do mês
  const generateCalendarDays = (): DayEntry[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayEntry[] = [];

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: "", anxietyLevel: null, hasEntry: false });
    }

    // Dias do mês (simulando alguns registros)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const hasEntry = Math.random() > 0.6; // Simula alguns dias com registro
      const anxietyLevel = hasEntry ? Math.floor(Math.random() * 11) : null;

      days.push({
        date: dateStr,
        anxietyLevel,
        hasEntry,
      });
    }

    return days;
  };

  const days = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header com botão voltar */}
        <div className="mb-6">
          <button
            onClick={onBackToMenu}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Voltar para o início</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Calendário Emocional
          </h1>
          <p className="text-sm text-gray-600">
            Acompanhe seus dias e perceba padrões com gentileza
          </p>
        </div>

        {/* Navegação do mês */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-[#F7F9FA] rounded-full transition-colors"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-lg font-medium text-gray-800 capitalize">
              {monthName} {year}
            </h2>

            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[#F7F9FA] rounded-full transition-colors"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day.date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dayNumber = parseInt(day.date.split("-")[2]);

              return (
                <button
                  key={day.date}
                  onClick={() => onDayClick(day.date)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all hover:scale-105 ${getColorForLevel(
                    day.anxietyLevel
                  )} ${
                    day.hasEntry
                      ? "text-gray-700 shadow-sm"
                      : "text-gray-400 hover:bg-[#F7F9FA]"
                  }`}
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3">Legenda de intensidade</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#DDE2E6]" />
                <span className="text-xs text-gray-600">Leve (0-3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#C7DDF2]" />
                <span className="text-xs text-gray-600">Moderada (4-5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#A8D5C2]" />
                <span className="text-xs text-gray-600">Elevada (6-7)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#95A8B8]" />
                <span className="text-xs text-gray-600">Intensa (8-10)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={onViewGraph}
            className="bg-white hover:bg-[#C7DDF2] text-gray-700 rounded-xl p-4 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Ver Gráfico</span>
          </button>

          <button
            onClick={onViewSummary}
            className="bg-[#A8D5C2] hover:bg-[#95c4b0] text-gray-800 rounded-xl p-4 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Resumo Médico</span>
          </button>
        </div>

        {/* Botão Ver Meu Progresso */}
        <button
          onClick={onViewProgress}
          className="w-full bg-[#E7CBCB] hover:bg-[#ddb8b8] text-gray-800 rounded-xl p-4 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md mb-4"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Ver Meu Progresso</span>
        </button>

        {/* Mensagem encorajadora */}
        <div className="bg-[#F3EDE7] rounded-2xl p-5">
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            Cada dia registrado é um passo de autocuidado. Você está fazendo o
            melhor que pode. 💛
          </p>
        </div>
      </div>
    </div>
  );
}
