'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent =
  'Congratulation, you guess correctly!';

document.querySelector('.number').textContent = 24;
document.querySelector('.score').textContent = 56;

document.querySelector('.guess').value = 67;
*/

let randomInt = Math.floor(Math.random() * 20) + 1;
console.log(randomInt);

let score = 20;
let highscore = 0;

// Rain Emoji Function
function rainEmoji(emoji, count) {
  const container = document.querySelector('.emoji-container');

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.classList.add('emoji');
    span.textContent = emoji;

    // Random horizontal position
    span.style.left = Math.random() * 100 + 'vw';

    // Random animation duration and delay
    span.style.animationDuration = 2 + Math.random() * 2 + 's';
    span.style.animationDelay = Math.random() * 0.5 + 's';

    container.appendChild(span);

    // Remove after animation ends
    span.addEventListener('animationend', () => {
      span.remove();
    });
  }
}

// Core part of the game
document.querySelector('.btn.check').addEventListener('click', function () {
  // User Input
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess);

  // When score is larger than 1 (Valid)
  if (score > 1) {
    if (!guess) {
      // When there is no guess!
      document.querySelector('.message').innerHTML = `
  <div style = "display: inline-block; text-indent: 0; padding-left: 0;">
    No number found!<br><div style = "margin-top: 10px">Type again</div>
  </div>
`;
    }

    // When the guess is correct
    else if (guess === randomInt) {
      // Change CSS Styles
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.btn.check').disabled = true;

      // Update current score
      document.querySelector('.message').innerHTML =
        '🍾 Congratulation,<br> you guess correctly!';
      document.querySelector('.score').textContent = score;
      document.querySelector('.number').textContent = guess;

      // Rain EmojI Effect
      rainEmoji('🍾', 30);

      // Update highscore
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    }

    // When guess is not equal to the target
    else if (guess !== randomInt) {
      document.querySelector('.message').textContent =
        guess > randomInt
          ? '📈 Too high, try again!'
          : '📉 Too low, try again!';
      score -= 1;
      document.querySelector('.score').textContent = score;
    }
  }

  // When the score is 0 (Invalid)
  else {
    // Change CSS Theme
    document.querySelector('body').style.backgroundColor = '#ff2c2c';

    // Update score and message
    document.querySelector('.message').textContent =
      '😔 You lost the game!!! Click "Again!" to play again.';
    document.querySelector('.score').textContent = 0;
    document.querySelector('.number').textContent = randomInt;

    // Rain Emoji Effect
    rainEmoji('😔', 30);
  }
});

// When user click again button
document.querySelector('.btn.again').addEventListener('click', function () {
  // Change CSS themes
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.btn.check').disabled = false;

  // Reset score
  score = 20;
  randomInt = Math.floor(Math.random() * 20) + 1;
  console.log(randomInt);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highscore;
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
});
