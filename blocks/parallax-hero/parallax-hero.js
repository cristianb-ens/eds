export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const subtitle = rows[0]?.textContent.trim();
  const title = rows[1]?.textContent.trim();
  const ctaRow = rows[2];
  const ctaLink = ctaRow?.querySelector('a');
  const imageUrl = rows[3]?.textContent.trim() || '';

  if (imageUrl) {
    block.style.backgroundImage = `url('${imageUrl}')`;
  }

  const content = document.createElement('div');
  content.className = 'parallax-hero-content';

  if (subtitle) {
    const sub = document.createElement('span');
    sub.className = 'parallax-hero-subtitle';
    sub.textContent = subtitle;
    content.append(sub);
  }

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'parallax-hero-title';
    h2.textContent = title;
    content.append(h2);
  }

  if (ctaLink) {
    const cta = document.createElement('a');
    cta.href = ctaLink.href;
    cta.className = 'parallax-hero-cta';
    cta.textContent = ctaLink.textContent.trim();
    content.append(cta);
  }

  block.append(content);
}
