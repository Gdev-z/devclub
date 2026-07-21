# DevClub - Landing Page

Site institucional do DevClub, plataforma de formação em tecnologia.

🔗 **Deploy**: [devclub-smoky.vercel.app](https://devclub-smoky.vercel.app/)

## Sobre o Projeto

Landing page desenvolvida para apresentar as trilhas de formação, o ecossistema de aprendizado e as tecnologias ensinadas pelo DevClub. O site foi construído com foco em experiência visual, animações fluidas e performance.

## Como foi construído

Para acelerar o desenvolvimento, utilizei **Inteligência Artificial** como ferramenta de apoio na geração de código e estrutura dos componentes. Porém, cada seção foi **revisada, ajustada e customizada manualmente** por mim, garantindo que o resultado final refletisse a minha visão criativa e as necessidades reais do projeto.

O processo foi iterativo: a IA fornecia a base, e eu refinava cada detalhe — desde o layout responsivo até as animações de scroll, passando pela paleta de cores, tipografia e interações visuais.

## Toque Artístico

A identidade visual do site foi pensada para transmitir **tecnologia, modernidade e confiança**:

- **Paleta de cores**: fundo escuro (#09090B) com acentos em verde neon (#39D353) e roxo (#8532F2), criando contraste e destaque nos CTAs
- **Cena 3D interativa**: um icosaedro metálico com wireframe neon que responde ao movimento do mouse, usando Three.js e React Three Fiber
- **Animações scroll-driven**: cada seção tem revelações progressivas controladas pelo scroll (GSAP ScrollTrigger), incluindo stack cards, circular reveal e tilt 3D nos cards do ecossistema
- **Loading screen personalizado**: contador de 0 a 100% com barra de progresso e glow verde, criando expectativa antes do conteúdo
- **Smooth scroll**: navegação fluida entre seções com Lenis

## Stack Tecnológica

| Ferramenta | Uso |
|---|---|
| React + Vite | Framework e build tool |
| Tailwind CSS | Estilização |
| Framer Motion | Animações de componentes |
| GSAP + ScrollTrigger | Animações baseadas em scroll |
| Three.js + React Three Fiber | Cena 3D interativa |
| Lenis | Smooth scroll |
| Lucide React | Ícones |
| Vercel | Deploy e hospedagem |

## Estrutura do Projeto

```
src/
├── App.jsx                        # Orquestrador principal
├── main.jsx                       # Entry point
├── index.css                      # Estilos globais e animações CSS
├── hooks/
│   └── useSmoothScroll.js         # Integração Lenis + GSAP
└── components/
    ├── Header.jsx                 # Navbar fixa com nav responsiva
    ├── Hero.jsx                   # Seção principal com headline e CTA
    ├── HeroScene.jsx              # Cena 3D com duas cenas alternadas
    ├── LoadingScreen.jsx          # Pré-loader animado
    ├── LogosCarousel.jsx          # Ticker infinito de logos
    ├── FormacoesSection.jsx       # Trilhas de formação (stack cards)
    ├── EcosystemSection.jsx       # Bento grid com tilt 3D
    ├── TechStackSection.jsx       # Dock de tecnologias
    └── PlatformFeatures.jsx       # Features da plataforma (accordion)
```

## Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

## Deploy

O projeto está configurado para deploy automático na **Vercel**. A cada push na branch principal, o site é construído e publicado automaticamente.

---

*Desenvolvido com apoio de IA e refinado manualmente seção por seção.*
