import React, { useState } from 'react';
import {
  GraduationCap,
  Map,
  Users,
  Bot,
  Code2,
  Trophy,
  ChevronDown
} from 'lucide-react';

const ecosystemItems = [
  {
    icon: GraduationCap,
    title: "Plataforma Proprietária",
    description: "Ambiente de aprendizado moderno, sem distrações, com player otimizado, marcação de progresso e resumos práticos para você focar no que importa."
  },
  {
    icon: Map,
    title: "Trilhas Zero ao Pro",
    description: "Chega de se sentir perdido. Siga um plano de estudos estruturado em rotas claras que guiam você até o nível Full Stack de verdade."
  },
  {
    icon: Users,
    title: "Comunidade VIP",
    description: "O nosso 'Discord exclusivo'. Faça networking, compartilhe seus repositórios, comemore conquistas e nunca mais estude sozinho."
  },
  {
    icon: Bot,
    title: "Club Agents (IA 24/7)",
    description: "Travou em um bug de madrugada? Nossa Inteligência Artificial exclusiva analisa seu código e ensina a solução em segundos."
  },
  {
    icon: Code2,
    title: "Playground Prático",
    description: "Onde a teoria vira código rodando. Pratique em ambientes reais, resolva desafios técnicos e teste APIs diretamente no navegador."
  },
  {
    icon: Trophy,
    title: "Mural da Fama e Vagas",
    description: "Sua vitrine profissional no ecossistema. Alunos destaque ganham visibilidade direta perante recrutadores e empresas parceiras."
  }
];

export default function PlatformEcosystemSection() {
  // Deixamos o primeiro item aberto por padrão para a página já carregar com conteúdo
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 bg-[#09090B] text-white py-24 overflow-hidden">
      <div className="w-full">

        {/* GRID: mobile empilha (1 col), desktop separa (2 col + justify-between) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:justify-between items-start">

          {/* =========================================================
              COLUNA DA ESQUERDA: NARRATIVA + LISTA FAQ/ACCORDION
          ========================================================= */}
          <div className="order-1 flex flex-col w-full pl-6">

            {/* Badge */}
            <div className="border border-white/10 text-[#39D353] bg-[#121215] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide w-fit mb-6">
              🚀 AQUI VOCÊ APRENDE RÁPIDO
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Acesso Total às <span className="text-[#39D353]">AULAS GRAVADAS.</span>
            </h2>

            {/* Subtítulo */}
            <p className="text-neutral-400 text-base md:text-lg font-light mb-10 leading-relaxed">
              Plataforma própria, suporte diário com professores, networking ativo e Inteligência Artificial trabalhando 24/7 para acelerar a sua evolução.
            </p>

            {/* LISTA HORIZONTAL INTERATIVA (ESTILO FAQ) */}
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {ecosystemItems.map((item, idx) => {
                const Icon = item.icon;
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => toggleItem(idx)}
                    className="py-4 cursor-pointer group transition-colors"
                  >
                    {/* Linha Principal: Ícone -> Título -> Descrição Truncada (...) -> Chevron */}
                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Ícone */}
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#39D353] text-[#09090B] font-bold'
                            : 'bg-[#121215] text-[#39D353] border border-white/5 group-hover:border-[#39D353]/40'
                        }`}>
                          <Icon size={18} />
                        </div>

                        {/* Título */}
                        <span className="font-bold text-white text-base md:text-lg shrink-0">
                          {item.title}
                        </span>

                        {/* Descrição Truncada (Surgem as reticências "..." se não estiver aberto) */}
                        {!isOpen && (
                          <span className="text-neutral-500 text-sm truncate hidden sm:inline">
                            — {item.description}
                          </span>
                        )}
                      </div>

                  
                    </div>

                    {/* Conteúdo Expandido (Aparece na linha de baixo ao clicar) */}
                    {isOpen && (
                      <div className="mt-3 pl-12 pr-4 text-neutral-300 text-sm md:text-base leading-relaxed animate-fadeIn">
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* =========================================================
              COLUNA DA DIREITA: SHOWCASE VISUAL (STICKY)
          ========================================================= */}
          <div className="order-2 lg:sticky lg:top-24 w-full">
            <div className="relative w-full rounded-l-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#121215] group">

              {/* Glow sutil atrás da imagem para dar profundidade */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#39D353]/20 via-transparent to-transparent opacity-50 blur-xl -z-10"></div>

              {/* Imagem do Ecossistema */}
              <img
                src="/assets/background-2.png"
                alt="Ecossistema DevClub"
                className="w-full h-auto object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Badge flutuante de status */}
              <div className="absolute bottom-4 right-4 bg-[#09090B]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#39D353] animate-pulse"></span>
                Ambiente 100% Integrado
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
