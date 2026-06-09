export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const supertitle = rows[0]?.textContent.trim();
  const title = rows[1]?.textContent.trim();
  const description = rows[2]?.textContent.trim();
  const imageRow = rows[rows.length - 1];
  const imgEl = imageRow?.querySelector('img');
  const imageUrl = imgEl?.src || imageRow?.textContent.trim();

  const steps = [];
  const ctaRow = rows.find((row) => row.querySelector('a'));
  const ctaLink = ctaRow?.querySelector('a');

  rows.slice(3, -1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) return;
    const text = row.textContent.trim();
    if (text) steps.push(text);
  });

  const layout = document.createElement('div');
  layout.className = 'btpay-layout';

  const figure = document.createElement('div');
  figure.className = 'btpay-figure';
  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title || 'BT Pay';
    img.loading = 'lazy';
    figure.append(img);
  }

  const content = document.createElement('div');
  content.className = 'btpay-content';

  if (supertitle) {
    const st = document.createElement('span');
    st.className = 'btpay-supertitle';
    st.textContent = supertitle;
    content.append(st);
  }

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'btpay-title';
    h2.textContent = title;
    content.append(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.className = 'btpay-desc';
    p.textContent = description;
    content.append(p);
  }

  if (steps.length) {
    const list = document.createElement('ul');
    list.className = 'btpay-steps';
    steps.forEach((step) => {
      const li = document.createElement('li');
      li.className = 'btpay-step';
      li.innerHTML = `<svg class="btpay-check" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1a76ff"/><path d="M10 16.5l4 4 8-8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${step}</span>`;
      list.append(li);
    });
    content.append(list);
  }

  if (ctaLink) {
    const cta = document.createElement('a');
    cta.href = ctaLink.href;
    cta.className = 'btpay-cta';
    cta.textContent = ctaLink.textContent.trim();
    content.append(cta);
  }

  layout.append(figure);
  layout.append(content);
  block.append(layout);
}
