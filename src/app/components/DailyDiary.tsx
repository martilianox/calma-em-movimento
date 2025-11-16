"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

interface DailyDiaryProps {
  date: string;
  onBack: () => void;
  onSave: (entry: DiaryEntry) => void;
}

interface DiaryEntry {
  date: string;
  anxietyLevel: number;
  feelings: string[];
  whatFeeling: string;
  whatCaused: string;
  bodyReaction: string;
  freeThoughts: string;
}

const FEELINGS = [
  "medo",
  "preocupação",
  "tensão",
  "tristeza",
  "irritação",
  "confusão",
  "exaustão",
];

export default function DailyDiary({ date, onBack, onSave }: DailyDiaryProps) {
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [whatFeeling, setWhatFeeling] = useState("");
  const [whatCaused, setWhatCaused] = useState("");
  const [bodyReaction, setBodyReaction] = useState("");
  const [freeThoughts, setFreeThoughts] = useState("");

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  };

  const handleSave = () => {
    const entry: DiaryEntry = {
      date,
      anxietyLevel,
      feelings: selectedFeelings,
      whatFeeling,
      whatCaused,
      bodyReaction,
      freeThoughts,
    };
    onSave(entry);
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
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Diário do Dia
            </h1>
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
        </div>

        {/* Mensagem acolhedora */}
        <div className="bg-[#D8E9F1] rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Se quiser, escreva um pouco sobre seu momento. Sem pressa. Tudo que
            você colocar aqui é só seu, e está seguro. 💙
          </p>
        </div>

        {/* Nível de ansiedade */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-gray-700 font-medium mb-3">
            Como está sua ansiedade hoje?
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10"
              value={anxietyLevel}
              onChange={(e) => setAnxietyLevel(Number(e.target.value))}
              className="w-full h-2 bg-[#DDE2E6] rounded-lg appearance-none cursor-pointer accent-[#A8D5C2]"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Tranquilo (0)</span>
              <span className="text-2xl font-semibold text-[#95A8B8]">
                {anxietyLevel}
              </span>
              <span className="text-xs text-gray-500">Intenso (10)</span>
            </div>
          </div>
        </div>

        {/* Sentimentos */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-gray-700 font-medium mb-3">
            Que sentimentos apareceram?
          </label>
          <div className="flex flex-wrap gap-2">
            {FEELINGS.map((feeling) => (
              <button
                key={feeling}
                onClick={() => toggleFeeling(feeling)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFeelings.includes(feeling)
                    ? "bg-[#A8D5C2] text-gray-800 shadow-sm"
                    : "bg-[#F7F9FA] text-gray-600 hover:bg-[#DDE2E6]"
                }`}
              >
                {feeling}
              </button>
            ))}
          </div>
        </div>

        {/* O que estou sentindo */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            O que estou sentindo?
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Descreva com suas palavras, do jeito que vier
          </p>
          <textarea
            value={whatFeeling}
            onChange={(e) => setWhatFeeling(e.target.value)}
            placeholder="Ex: Meu peito está apertado, minha mente não para..."
            className="w-full h-24 p-4 bg-[#F7F9FA] border border-[#DDE2E6] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C7DDF2] resize-none"
          />
        </div>

        {/* O que causou */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            O que acredito que causou isso?
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Pode ser uma situação, pensamento ou lembrança
          </p>
          <textarea
            value={whatCaused}
            onChange={(e) => setWhatCaused(e.target.value)}
            placeholder="Ex: Conversa difícil no trabalho, preocupação com dinheiro..."
            className="w-full h-24 p-4 bg-[#F7F9FA] border border-[#DDE2E6] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C7DDF2] resize-none"
          />
        </div>

        {/* Reação do corpo */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Como meu corpo reagiu?
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Sintomas físicos que você percebeu
          </p>
          <textarea
            value={bodyReaction}
            onChange={(e) => setBodyReaction(e.target.value)}
            placeholder="Ex: Coração acelerado, mãos suadas, dor de cabeça..."
            className="w-full h-24 p-4 bg-[#F7F9FA] border border-[#DDE2E6] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C7DDF2] resize-none"
          />
        </div>

        {/* Campo livre */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Espaço livre para você
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Escreva o que quiser, sem julgamento
          </p>
          <textarea
            value={freeThoughts}
            onChange={(e) => setFreeThoughts(e.target.value)}
            placeholder="Este é seu espaço seguro..."
            className="w-full h-32 p-4 bg-[#F7F9FA] border border-[#DDE2E6] rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C7DDF2] resize-none"
          />
        </div>

        {/* Botão salvar */}
        <button
          onClick={handleSave}
          className="w-full bg-[#A8D5C2] hover:bg-[#95c4b0] text-gray-800 font-medium py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md"
        >
          <Save className="w-5 h-5" />
          Salvar registro
        </button>

        {/* Mensagem final */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Você está cuidando de si. Isso importa. 💛
          </p>
        </div>
      </div>
    </div>
  );
}
