const questions = Array.from({length: 100}, (_, i) => `Question ${i+1}`);

function startQuiz() {
  document.querySelector('.container').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('quiz').classList.remove('hidden');

  const form = document.getElementById('quizForm');
  form.innerHTML = '';

  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <label>${i+1}. ${q}</label>
      <input type="checkbox" onchange="updateProgress()">
    `;
    form.appendChild(div);
  });
}

function updateProgress() {
  const total = questions.length;
  const checked = document.querySelectorAll('#quizForm input:checked').length;
  const percent = (checked / total) * 100;
  document.getElementById('progressBar').style.width = percent + '%';
}

function calculateScore() {
  const inputs = document.querySelectorAll('#quizForm input');
  let score = 100;

  inputs.forEach(input => {
    if (input.checked) score--;
  });

  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  document.getElementById('scoreText').innerText = `Your score is ${score}`;

  let meaning = '';
  if (score >= 90) meaning = 'Very high purity score.';
  else if (score >= 70) meaning = 'Above average purity.';
  else if (score >= 50) meaning = 'Moderate purity score.';
  else meaning = 'Lower score indicates more life experience.';

  document.getElementById('meaningText').innerText = meaning;
}
