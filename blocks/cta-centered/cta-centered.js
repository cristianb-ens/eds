export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'cta-centered-inner';

  const title = rows[0]?.textContent.trim();
  const description = rows[1]?.textContent.trim();
  const ctaRow = rows[2];
  const ctaLink = ctaRow?.querySelector('a');

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'cta-centered-title';
    h2.textContent = title;
    wrapper.append(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.className = 'cta-centered-text';
    p.textContent = description;
    wrapper.append(p);
  }

  if (ctaLink) {
    const cta = document.createElement('a');
    cta.href = ctaLink.href;
    cta.className = 'cta-centered-btn';
    cta.textContent = ctaLink.textContent.trim();
    wrapper.append(cta);
  }

  block.append(wrapper);
}
