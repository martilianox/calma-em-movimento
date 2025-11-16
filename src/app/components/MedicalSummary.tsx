"use client";

import { ArrowLeft, Download, Share2, Calendar, TrendingUp } from "lucide-react";

interface MedicalSummaryProps {
  onBack: () => void;
}

export default function MedicalSummary({ onBack }: MedicalSummaryProps) {
  // Dados simulados para o resumo
  const summaryData = {
    period: "01/12/2024 - 31/12/2024",
    totalDays: 28,
    registeredDays: 21,
    averageAnxiety: 5.8,
    highestDay: "15/12/2024",
    highestLevel: 9,
    lowestDay: "03/12/2024",
    lowestLevel: 2,
    commonTriggers: [
      "Preocupações com trabalho",
      "Dificuldade para dormir",
      "Situações sociais",
    ],
    physicalSymptoms: [
      "Coração acelerado",
      "Tensão muscular",
      "Dificuldade de concentração",
      "Mãos suadas",
    ],
    mostCommonFeelings: ["preocupação", "tensão", "exaustão"],
    userNotes: [
      {
        date: "15/12/2024",
        note: "Apresentação no trabalho me deixou muito nervoso. Coração disparou e não consegui dormir bem.",
      },
      {
        date: "20/12/2024",
        note: "Conversa difícil com familiar. Senti muito aperto no peito e vontade de chorar.",
      },
      {
        date: "28/12/2024",
        note: "Preocupação com contas do mês. Mente acelerada, não conseguia parar de pensar.",
      },
    ],
  };

  const handleDownload = () => {
    // Lógica para gerar PDF (implementar com biblioteca como jsPDF)
    alert("Função de download será implementada em breve");
  };

  const handleShare = () => {
    // Lógica para compartilhar
    alert("Função de compartilhamento será implementada em breve");
  };

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
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              Resumo para Consulta
            </h1>
            <p className="text-sm text-gray-600">
              Compartilhe com seu profissional de saúde
            </p>
          </div>
        </div>

        {/* Mensagem introdutória */}
        <div className="bg-[#D8E9F1] rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Este é um resumo para apoiar sua próxima consulta. Ele ajuda a
            entender seus padrões emocionais das últimas semanas. 💙
          </p>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleDownload}
            className="bg-[#A8D5C2] hover:bg-[#95c4b0] text-gray-800 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </button>
          <button
            onClick={handleShare}
            className="bg-white hover:bg-[#F7F9FA] text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm border border-[#DDE2E6]"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>

        {/* Período */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-[#95A8B8]" />
            <h2 className="text-lg font-medium text-gray-800">
              Período Analisado
            </h2>
          </div>
          <p className="text-gray-700 mb-2">{summaryData.period}</p>
          <p className="text-sm text-gray-600">
            {summaryData.registeredDays} de {summaryData.totalDays} dias com
            registro
          </p>
        </div>

        {/* Estatísticas gerais */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#95A8B8]" />
            <h2 className="text-lg font-medium text-gray-800">
              Níveis de Ansiedade
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Média do período</p>
              <p className="text-2xl font-semibold text-[#95A8B8]">
                {summaryData.averageAnxiety}/10
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Dia mais intenso</p>
                <p className="text-sm font-medium text-gray-700">
                  {summaryData.highestDay}
                </p>
                <p className="text-lg font-semibold text-[#95A8B8]">
                  Nível {summaryData.highestLevel}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Dia mais tranquilo</p>
                <p className="text-sm font-medium text-gray-700">
                  {summaryData.lowestDay}
                </p>
                <p className="text-lg font-semibold text-[#A8D5C2]">
                  Nível {summaryData.lowestLevel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gatilhos identificados */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Possíveis Gatilhos
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Situações mencionadas com mais frequência
          </p>
          <ul className="space-y-2">
            {summaryData.commonTriggers.map((trigger, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 text-sm"
              >
                <span className="text-[#A8D5C2] mt-1">•</span>
                {trigger}
              </li>
            ))}
          </ul>
        </div>

        {/* Sintomas físicos */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Sintomas Físicos Relatados
          </h2>
          <div className="flex flex-wrap gap-2">
            {summaryData.physicalSymptoms.map((symptom, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-[#F7F9FA] text-gray-700 text-sm rounded-full"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>

        {/* Sentimentos mais comuns */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Sentimentos Mais Frequentes
          </h2>
          <div className="flex flex-wrap gap-2">
            {summaryData.mostCommonFeelings.map((feeling, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#C7DDF2] text-gray-800 text-sm font-medium rounded-full"
              >
                {feeling}
              </span>
            ))}
          </div>
        </div>

        {/* Notas do usuário */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            Registros Importantes
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Trechos selecionados dos seus registros
          </p>
          <div className="space-y-4">
            {summaryData.userNotes.map((note, index) => (
              <div
                key={index}
                className="p-4 bg-[#F7F9FA] rounded-xl border-l-4 border-[#A8D5C2]"
              >
                <p className="text-xs text-gray-500 mb-2">{note.date}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{note.note}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mensagem final */}
        <div className="bg-[#F3EDE7] rounded-2xl p-5">
          <p className="text-sm text-gray-700 leading-relaxed text-center">
            Este resumo foi criado com base nos seus registros. Leve-o para sua
            consulta e converse abertamente com seu profissional. Você está no
            caminho certo. 💛
          </p>
        </div>
      </div>
    </div>
  );
}
