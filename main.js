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
  ball.style.background = `radial-gradient(circle at 20px 20px, ${color}, #333)`;
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
