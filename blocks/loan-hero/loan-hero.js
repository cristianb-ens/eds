export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const badge = rows[0]?.textContent.trim();
  const title = rows[1]?.textContent.trim();
  const description = rows[2]?.textContent.trim();
  const ctaRow = rows[3];

  if (badge) {
    const badgeEl = document.createElement('span');
    badgeEl.className = 'loan-hero-badge';
    badgeEl.textContent = badge;
    block.append(badgeEl);
  }

  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title;
    block.append(h1);
  }

  if (description) {
    const p = document.createElement('p');
    p.className = 'loan-hero-description';
    p.textContent = description;
    block.append(p);
  }

  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'loan-hero-actions';
    const links = ctaRow.querySelectorAll('a');
    links.forEach((link, i) => {
      const cta = link.cloneNode(true);
      cta.className = i === 0 ? 'loan-hero-cta-primary' : 'loan-hero-cta-secondary';
      actions.append(cta);
    });
    block.append(actions);
  }
}
