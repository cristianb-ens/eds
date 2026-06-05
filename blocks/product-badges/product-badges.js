export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'product-badges-grid';

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    if (cols.length < 2) return;

    const value = cols[0]?.textContent.trim();
    const label = cols[1]?.textContent.trim();
    if (!value) return;

    const card = document.createElement('div');
    card.className = 'product-badges-item';

    const valueEl = document.createElement('span');
    valueEl.className = 'product-badges-value';
    valueEl.textContent = value;
    card.append(valueEl);

    const labelEl = document.createElement('span');
    labelEl.className = 'product-badges-label';
    labelEl.textContent = label;
    card.append(labelEl);

    grid.append(card);
  });

  block.append(grid);
}
