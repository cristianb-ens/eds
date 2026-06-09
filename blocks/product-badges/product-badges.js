function highlightValue(text) {
  const pattern = /(\d[\d.,]*\s*(%|lei|ani|luni|euro))|(\bbanii\b)/gi;
  return text.replace(pattern, '<span class="product-badges-accent">$&</span>');
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'product-badges-grid';

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    if (cols.length < 2) return;

    const heading = cols[0]?.textContent.trim();
    const description = cols[1]?.innerHTML.trim();
    if (!heading) return;

    const card = document.createElement('div');
    card.className = 'product-badges-item';

    const headingEl = document.createElement('h3');
    headingEl.className = 'product-badges-heading';
    headingEl.innerHTML = highlightValue(heading);
    card.append(headingEl);

    if (description) {
      const descEl = document.createElement('div');
      descEl.className = 'product-badges-desc';
      descEl.innerHTML = description;
      card.append(descEl);
    }

    grid.append(card);
  });

  block.append(grid);
}
