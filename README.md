# Simple Pomodoro

Um cronômetro Pomodoro extremamente minimalista focado em produtividade sem distrações. Construído com um design limpo, tipografia elegante e recursos essenciais para manter o foco durante o trabalho ou estudo.

## Funcionalidades

* **Design Minimalista:** Interface escura (Dark mode nativo) livre de elementos visuais desnecessários.
* **Ciclos Automáticos:** Alterna de forma inteligente entre os modos de Foco (25 minutos) e Pausa (5 minutos).
* **Barra de Progresso Visual:** Acompanhe o avanço do tempo de forma fluida e intuitiva.
* **Controles Completos:** Botões de Play/Pause, Reset (reinicia o tempo do ciclo atual) e Next (pula direto para o próximo ciclo).
* **Tempo na Aba do Navegador:** O título da página é atualizado dinamicamente, permitindo que você acompanhe o timer mesmo enquanto navega em outras abas.
* **Alerta Sonoro Nativo:** Um som suave e elegante avisa quando o ciclo termina, gerado nativamente via Web Audio API (sem depender de arquivos `.mp3` externos).

## Tecnologias Utilizadas

Este projeto foi construído focando em simplicidade e performance, sem a necessidade de frameworks complexos ou processos de build:

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização customizada e importação de fontes.
* **JavaScript (Vanilla):** Lógica do timer, manipulação do DOM e geração de áudio.
* **Tailwind CSS (via CDN):** Para um estilo rápido, responsivo e utilitário.
* **Google Fonts (Inter):** Tipografia moderna e legível.

## 📁 Estrutura de Arquivos

O projeto está dividido em três arquivos principais para facilitar a manutenção:

* `index.html`: A estrutura da página e a interface do usuário.
* `style.css`: Regras de estilo globais e ajustes finos (como a formatação dos números).
* `script.js`: Toda a "inteligência" do app, o controle de tempo e a emissão de sons.

