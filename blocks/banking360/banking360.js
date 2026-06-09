const cardSvgs = [
  `<svg viewBox="0 0 568 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="140" width="60" height="60" rx="8" fill="#1a76ff" opacity="0.3"/>
    <rect x="120" y="100" width="60" height="100" rx="8" fill="#1a76ff" opacity="0.5"/>
    <rect x="200" y="60" width="60" height="140" rx="8" fill="#1a76ff" opacity="0.7"/>
    <rect x="280" y="30" width="60" height="170" rx="8" fill="#1a76ff"/>
    <rect x="360" y="80" width="60" height="120" rx="8" fill="#1a76ff" opacity="0.6"/>
    <rect x="440" y="50" width="60" height="150" rx="8" fill="#1a76ff" opacity="0.8"/>
  </svg>`,
  `<svg viewBox="0 0 568 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 160 L140 120 L240 140 L340 80 L440 100 L540 40" stroke="#1a76ff" stroke-width="3" fill="none"/>
    <circle cx="40" cy="160" r="6" fill="#1a76ff"/>
    <circle cx="140" cy="120" r="6" fill="#1a76ff"/>
    <circle cx="240" cy="140" r="6" fill="#1a76ff"/>
    <circle cx="340" cy="80" r="6" fill="#1a76ff"/>
    <circle cx="440" cy="100" r="6" fill="#1a76ff"/>
    <circle cx="540" cy="40" r="6" fill="#1a76ff"/>
    <path d="M40 160 L140 120 L240 140 L340 80 L440 100 L540 40 L540 200 L40 200 Z" fill="#1a76ff" opacity="0.08"/>
  </svg>`,
  `<svg viewBox="0 0 568 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="284" cy="100" r="80" stroke="#e5e5e5" stroke-width="16" fill="none"/>
    <circle cx="284" cy="100" r="80" stroke="#1a76ff" stroke-width="16" fill="none" stroke-dasharray="380 120" stroke-linecap="round" transform="rotate(-90 284 100)"/>
    <text x="284" y="108" text-anchor="middle" font-size="28" font-weight="700" fill="#111">75%</text>
  </svg>`,
  `<svg viewBox="0 0 568 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="100" y="20" width="368" height="160" rx="12" stroke="#e5e5e5" stroke-width="2" fill="none"/>
    <line x1="100" y1="50" x2="468" y2="50" stroke="#e5e5e5" stroke-width="1"/>
    <rect x="120" y="65" width="180" height="8" rx="4" fill="#1a76ff" opacity="0.7"/>
    <rect x="120" y="90" width="140" height="8" rx="4" fill="#1a76ff" opacity="0.4"/>
    <rect x="120" y="115" width="200" height="8" rx="4" fill="#1a76ff" opacity="0.6"/>
    <rect x="120" y="140" width="160" height="8" rx="4" fill="#1a76ff" opacity="0.3"/>
    <rect x="360" y="65" width="80" height="8" rx="4" fill="#111" opacity="0.2"/>
    <rect x="360" y="90" width="80" height="8" rx="4" fill="#111" opacity="0.2"/>
    <rect x="360" y="115" width="80" height="8" rx="4" fill="#111" opacity="0.2"/>
    <rect x="360" y="140" width="80" height="8" rx="4" fill="#111" opacity="0.2"/>
  </svg>`,
];

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'banking360-inner';

  const headingSection = document.createElement('div');
  headingSection.className = 'banking360-heading';

  const titleText = rows[0]?.textContent.trim() || 'Banking 360°';
  const h2 = document.createElement('h2');
  h2.className = 'banking360-title';
  h2.innerHTML = titleText.replace(/(360°)/, '<span class="banking360-accent">$1</span>');
  headingSection.append(h2);

  const subtitle = rows[1]?.textContent.trim();
  if (subtitle) {
    const p = document.createElement('p');
    p.className = 'banking360-subtitle';
    p.textContent = subtitle;
    headingSection.append(p);
  }

  wrapper.append(headingSection);

  const grid = document.createElement('div');
  grid.className = 'banking360-grid';

  rows.slice(2).forEach((row, i) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    const cardTitle = cols[0]?.textContent.trim();
    const cardDesc = cols[1]?.textContent.trim() || cols[0]?.textContent.trim();
    if (!cardTitle) return;

    const card = document.createElement('div');
    card.className = 'banking360-card';

    const graphic = document.createElement('div');
    graphic.className = 'banking360-graphic';
    graphic.innerHTML = cardSvgs[i % cardSvgs.length];
    card.append(graphic);

    const title = document.createElement('div');
    title.className = 'banking360-card-title';
    title.textContent = cols.length > 1 ? cols[0].textContent.trim() : cardTitle.split('.')[0];
    card.append(title);

    const desc = document.createElement('div');
    desc.className = 'banking360-card-text';
    desc.textContent = cols.length > 1 ? cardDesc : cardTitle;
    card.append(desc);

    grid.append(card);
  });

  wrapper.append(grid);
  block.append(wrapper);
}
