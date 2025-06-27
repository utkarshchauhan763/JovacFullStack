const undoStack = [];
const redoStack = [];

document.body.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') return;

  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.left = `${event.clientX - 30}px`;
  circle.style.top = `${event.clientY - 30}px`;
  circle.style.backgroundColor = getRandomColor();

  document.body.appendChild(circle);
  undoStack.push(circle);
  redoStack.length = 0;

  updateButtons();
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function undo() {
  if (undoStack.length === 0) return;

  const last = undoStack.pop();
  last.remove();
  redoStack.push(last);
  updateButtons();
}

function redo() {
  if (redoStack.length === 0) return;

  const circle = redoStack.pop();
  document.body.appendChild(circle);
  undoStack.push(circle);
  updateButtons();
}

function resetAll() {
  while (undoStack.length) {
    const circle = undoStack.pop();
    circle.remove();
  }
  redoStack.length = 0;
  updateButtons();
}

function updateButtons() {
  document.getElementById('undoBtn').disabled = undoStack.length === 0;
  document.getElementById('redoBtn').disabled = redoStack.length === 0;
  document.getElementById('resetBtn').disabled = undoStack.length === 0;
}