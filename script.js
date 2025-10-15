function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeElement.textContent = formattedTime;
}

setInterval(updateTime, 1);

let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

function toggleStopwatch() {
    const stopwatchElement = document.getElementById('stop');
    if (!isRunning) {
        // Start the stopwatch
        stopwatchInterval = setInterval(() => {
            elapsedTime += 10; // Increment by 10ms
            const milliseconds = elapsedTime % 1000;
            const seconds = Math.floor(elapsedTime / 1000) % 60;
            const minutes = Math.floor(elapsedTime / 60000) % 60;
            const hours = Math.floor(elapsedTime / 3600000);
            stopwatchElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10)
                .toString()
                .padStart(2, '0')}`;
        }, 10);
        isRunning = true;
    } else {
        // Stop the stopwatch
        clearInterval(stopwatchInterval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    isRunning = false;
    document.getElementById('stop').textContent = '00:00:00.00';
}

// Add event listeners for stopwatch buttons
document.getElementById('startBtn').addEventListener('click', toggleStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);

// === TEMPORIZADOR ===
let timerInterval;
let timerRemaining = 0;
let timerRunning = false;

function startTimer() {
  const hourInput = document.getElementById('hour');
  const minuteInput = document.getElementById('minute');
  const secondInput = document.getElementById('second');
  const timeDisplay = document.getElementById('timer'); // <-- cambiado

  // Si ya está corriendo, pausamos
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('startBtn').textContent = 'Start';
    return;
  }

  // Calcular tiempo total en segundos
  let totalSeconds =
    parseInt(hourInput.value || 0) * 3600 +
    parseInt(minuteInput.value || 0) * 60 +
    parseInt(secondInput.value || 0);

  if (totalSeconds <= 0) {
    alert('Introduce un tiempo válido.');
    return;
  }

  timerRemaining = totalSeconds;
  timerRunning = true;
  document.getElementById('startBtn').textContent = 'Pause';

  timerInterval = setInterval(() => {
    const hours = Math.floor(timerRemaining / 3600);
    const minutes = Math.floor((timerRemaining % 3600) / 60);
    const seconds = timerRemaining % 60;

    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('startBtn').textContent = 'Start';
      alert('⏰ ¡Tiempo terminado!');
    }

    timerRemaining--;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRemaining = 0;
  timerRunning = false;
  document.getElementById('startBtn').textContent = 'Start';
  document.getElementById('timer').textContent = '00:00:00'; // <-- cambiado
  document.getElementById('hour').value = '';
  document.getElementById('minute').value = '';
  document.getElementById('second').value = '';
}

// Botones
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
