document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('checkbox');
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 7) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  const numberArray = Array.from(numbers).sort((a, b) => a - b);
  const bonusNumber = numberArray.pop();
  const winningNumbers = numberArray;

  const lottoNumbersDiv = document.getElementById('lotto-numbers');
  lottoNumbersDiv.innerHTML = '';

  winningNumbers.forEach(number => {
    const ball = createBall(number);
    lottoNumbersDiv.appendChild(ball);
  });

  const bonusDiv = document.createElement('div');
  bonusDiv.className = 'bonus-number';
  bonusDiv.innerHTML = '<span class="plus-sign">+</span>';
  
  const bonusBall = createBall(bonusNumber);
  bonusDiv.appendChild(bonusBall);
  lottoNumbersDiv.appendChild(bonusDiv);
}

function createBall(number) {
  const ball = document.createElement('div');
  ball.className = 'lotto-ball';
  ball.textContent = number;
  const color = getBallColor(number);
  ball.style.backgroundColor = color; // Changed to solid color
  return ball;
}

function getBallColor(number) {
  if (number <= 10) {
    return '#fbc400'; // Yellow
  } else if (number <= 20) {
    return '#69c8f2'; // Blue
  } else if (number <= 30) {
    return '#ff7272'; // Red
  } else if (number <= 40) {
    return '#aaa'; // Grey
  } else {
    return '#b0d840'; // Green
  }
}

// Animal Face Test Logic
const ANIMAL_URL = "https://teachablemachine.withgoogle.com/models/NESzUcrac/";
let animalModel, webcam, labelContainer, maxPredictions;

function toggleAnimalWidget() {
  const container = document.getElementById('animal-container');
  container.classList.toggle('hidden');
}

async function initAnimalTest() {
  const startBtn = document.getElementById('start-btn');
  startBtn.disabled = true;
  startBtn.textContent = "모델 로딩 중...";

  const modelURL = ANIMAL_URL + "model.json";
  const metadataURL = ANIMAL_URL + "metadata.json";

  animalModel = await tmImage.load(modelURL, metadataURL);
  maxPredictions = animalModel.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(200, 200, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loopAnimal);

  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = ''; // Clear previous labels
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
  
  startBtn.style.display = 'none';
}

async function loopAnimal() {
  webcam.update();
  await predictAnimal();
  window.requestAnimationFrame(loopAnimal);
}

async function predictAnimal() {
  const prediction = await animalModel.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}

