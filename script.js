const questions = Array.from({ length: 100 }, (_, i) => `Question ${i + 1}`);

window.onload = function () {
  const form = document.getElementById('quizForm');

  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';

    div.innerHTML = `
      <label>${i + 1}. ${q}</label>
      <input type="checkbox" onchange="updateProgress()">
    `;

    form.appendChild(div);
  });
};

function updateProgress() {
  const total = questions.length;
  const checked = document.querySelectorAll('#quizForm input:checked').length;
  const percent = Math.round((checked / total) * 100);

  // Show sticky bar when user starts
  if (checked > 0) {
    document.getElementById('stickyProgress').classList.remove('hidden');
  }

  document.getElementById('progressBar').style.width = percent + '%';
  document.getElementById('progressText').innerText = percent + '% completed';

  // Auto show result when finished
  if (checked === total) {
    calculateScore();
  }
}

function calculateScore() {
  const inputs = document.querySelectorAll('#quizForm input');
  let score = 100;

  inputs.forEach(input => {
    if (input.checked) score--;
  });

  document.getElementById('result').classList.remove('hidden');

  document.getElementById('scoreText').innerText = `Your score is ${score}`;

  let meaning = '';
  if (score >= 90) meaning = 'Very high purity score.';
  else if (score >= 70) meaning = 'Above average purity.';
  else if (score >= 50) meaning = 'Moderate purity score.';
  else meaning = 'Lower score indicates more life experience.';

  document.getElementById('meaningText').innerText = meaning;

  // Scroll to result
  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}
