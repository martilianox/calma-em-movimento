"use client";

import { ArrowLeft, AlertCircle, Heart } from "lucide-react";

interface AnxietyGraphProps {
  onBack: () => void;
  onDoExercise: () => void;
}

export default function AnxietyGraph({
  onBack,
  onDoExercise,
}: AnxietyGraphProps) {
  // Dados simulados para o gráfico (últimos 14 dias)
  const graphData = [
    { day: "Seg", level: 3 },
    { day: "Ter", level: 5 },
    { day: "Qua", level: 4 },
    { day: "Qui", level: 7 },
    { day: "Sex", level: 6 },
    { day: "Sáb", level: 8 },
    { day: "Dom", level: 5 },
    { day: "Seg", level: 4 },
    { day: "Ter", level: 8 },
    { day: "Qua", level: 7 },
    { day: "Qui", level: 9 },
    { day: "Sex", level: 6 },
    { day: "Sáb", level: 5 },
    { day: "Dom", level: 4 },
  ];

  // Detectar padrão de ansiedade alta (3+ vezes nível 7-10 na última semana)
  const lastWeek = graphData.slice(-7);
  const highAnxietyDays = lastWeek.filter((d) => d.level >= 7).length;
  const showAlert = highAnxietyDays >= 3;

  // Calcular média
  const average = (
    graphData.reduce((sum, d) => sum + d.level, 0) / graphData.length
  ).toFixed(1);

  // Altura máxima para normalizar o gráfico
  const maxLevel = 10;

  return (
    <div className="min-h-screen bg-[#F7F9FA] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-full transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Frequência da Ansiedade
            </h1>
            <p className="text-sm text-gray-600">Últimos 14 dias</p>
          </div>
        </div>

        {/* Alerta suave (se aplicável) */}
        {showAlert && (
          <div className="bg-[#E7CBCB] rounded-2xl p-5 mb-6 animate-fade-in">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#95A8B8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Percebi que sua ansiedade tem aparecido mais vezes nesta
                  semana. Você merece cuidado — já pensou em conversar com um
                  profissional?
                </p>
                <button
                  onClick={onDoExercise}
                  className="text-sm font-medium text-[#5C6F82] hover:text-[#95A8B8] transition-colors underline"
                >
                  Fazer um exercício agora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Média do período</p>
            <p className="text-3xl font-semibold text-[#95A8B8]">{average}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Dias registrados</p>
            <p className="text-3xl font-semibold text-[#A8D5C2]">
              {graphData.length}
            </p>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">
            Evolução diária
          </h2>

          <div className="flex items-end justify-between gap-2 h-64">
            {graphData.map((data, index) => {
              const heightPercentage = (data.level / maxLevel) * 100;
              let barColor = "bg-[#DDE2E6]"; // Leve

              if (data.level >= 8) barColor = "bg-[#95A8B8]"; // Intensa
              else if (data.level >= 6) barColor = "bg-[#A8D5C2]"; // Elevada
              else if (data.level >= 4) barColor = "bg-[#C7DDF2]"; // Moderada

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className={`w-full rounded-t-lg ${barColor} transition-all hover:opacity-80 relative group`}
                      style={{ height: `${heightPercentage}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        Nível {data.level}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{data.day}</span>
                </div>
              );
            })}
          </div>

          {/* Escala lateral */}
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">0 - Tranquilo</span>
            <span className="text-xs text-gray-500">10 - Intenso</span>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#F3EDE7] rounded-2xl p-5 mb-6">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-[#95A8B8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                O que seus dados dizem
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {average < 5
                  ? "Você tem mantido sua ansiedade em níveis mais leves. Continue cuidando de si com carinho."
                  : average < 7
                  ? "Sua ansiedade tem estado moderada. Lembre-se de fazer pausas e usar os exercícios quando precisar."
                  : "Sua ansiedade tem estado mais elevada. Você está fazendo o melhor que pode. Considere conversar com alguém de confiança."}
              </p>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs text-gray-500 mb-3">Legenda de intensidade</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-[#DDE2E6]" />
              <span className="text-sm text-gray-600">Leve (0-3)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-[#C7DDF2]" />
              <span className="text-sm text-gray-600">Moderada (4-5)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-[#A8D5C2]" />
              <span className="text-sm text-gray-600">Elevada (6-7)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-[#95A8B8]" />
              <span className="text-sm text-gray-600">Intensa (8-10)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
