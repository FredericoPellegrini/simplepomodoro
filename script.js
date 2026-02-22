// Configurações de tempo (em segundos)
const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// Elementos do DOM
const timerDisplay = document.getElementById('timerDisplay');
const statusText = document.getElementById('statusText');
const progressBar = document.getElementById('progressBar');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const nextBtn = document.getElementById('nextBtn');

// Variáveis de estado
let timeLeft = FOCUS_TIME;
let totalTime = FOCUS_TIME;
let isRunning = false;
let isFocusMode = true;
let timerInterval = null;

// Função para formatar e atualizar a tela e a ABA do navegador
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Formata o tempo (ex: 25:00)
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Atualiza os números grandes na tela
    timerDisplay.textContent = timeString;

    // NOVIDADE 1: Atualiza o título da aba do navegador
    const modeString = isFocusMode ? 'Foco' : 'Pausa';
    document.title = `(${timeString}) ${modeString} - Simple Pomodoro`;

    // Atualiza a barra de progresso
    const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Lógica de contagem
function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        playAlertSound(); // Toca o som de aviso
        switchMode();     // Pula pro próximo ciclo
    }
}

// Alterna entre Foco e Pausa
function switchMode() {
    clearInterval(timerInterval);
    isRunning = false;
    isFocusMode = !isFocusMode;

    if (isFocusMode) {
        timeLeft = FOCUS_TIME;
        totalTime = FOCUS_TIME;
        statusText.textContent = "Foco";
    } else {
        timeLeft = BREAK_TIME;
        totalTime = BREAK_TIME;
        statusText.textContent = "Pausa";
    }

    toggleBtn.textContent = "Play";
    updateDisplay();
}

// Botão Play/Pause
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        toggleBtn.textContent = "Play";
    } else {
        timerInterval = setInterval(tick, 1000);
        toggleBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

// Botão Reset (Recomeça o ciclo atual)
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = isFocusMode ? FOCUS_TIME : BREAK_TIME;
    toggleBtn.textContent = "Play";
    updateDisplay();
}

// Botão Next (Pula para o próximo ciclo)
function skipTimer() {
    switchMode();
}

// NOVIDADE 2: Som de aviso aprimorado ("Ding-Ding" suave)
function playAlertSound() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    
    // Função interna para criar um "ding"
    function createDing(frequency, startTime) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine'; // Som suave
        oscillator.frequency.setValueAtTime(frequency, context.currentTime + startTime);
        
        // Efeito de "fade out" para imitar um sino
        gainNode.gain.setValueAtTime(0.5, context.currentTime + startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + startTime + 0.8);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start(context.currentTime + startTime);
        oscillator.stop(context.currentTime + startTime + 0.8);
    }

    // Toca dois dings em sequência (Frequências diferentes para soar melódico)
    createDing(880, 0);       // Nota Lá
    createDing(1046.50, 0.2); // Nota Dó (0.2 segundos depois)
}

// Conectando os botões às funções
toggleBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
nextBtn.addEventListener('click', skipTimer);

// Inicializa a tela
updateDisplay();