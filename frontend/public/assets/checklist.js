const inputs = [...document.querySelectorAll('[data-checklist-id]')];
const count = document.querySelector('[data-checklist-count]');
const progress = document.querySelector('[data-checklist-progress]');
const clear = document.querySelector('[data-checklist-clear]');
const status = document.querySelector('[data-checklist-status]');
const storageKey = 'solar-forge:aion2:weekly-priorities:v1';
const validIds = new Set(inputs.map(input => input.dataset.checklistId));

function checkedIds() {
  return inputs.filter(input => input.checked).map(input => input.dataset.checklistId);
}

function update() {
  const complete = checkedIds().length;
  count.textContent = `${complete} of ${inputs.length} complete`;
  progress.value = complete;
  progress.textContent = count.textContent;
  clear.disabled = complete === 0;
  inputs.forEach(input => input.closest('[data-checklist-item]').classList.toggle('is-complete', input.checked));
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(checkedIds()));
  } catch {
    status.textContent = 'Checks are available for this visit, but this browser cannot save them.';
  }
  update();
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) {
    const completed = new Set(saved.filter(id => validIds.has(id)));
    inputs.forEach(input => { input.checked = completed.has(input.dataset.checklistId); });
  }
} catch {
  status.textContent = 'Checks are available for this visit, but saved progress could not be loaded.';
}

inputs.forEach(input => input.addEventListener('change', save));
clear.addEventListener('click', () => {
  inputs.forEach(input => { input.checked = false; });
  save();
});
update();
