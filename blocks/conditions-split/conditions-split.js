export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const title = rows[0]?.textContent.trim();
  const items = [];
  const links = [];
  let imageUrl = '';

  rows.slice(1).forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    const text = cols[0]?.textContent.trim();
    const img = row.querySelector('img');
    const link = cols[0]?.querySelector('a');

    if (img) {
      imageUrl = img.src;
    } else if (text && /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)/i.test(text)) {
      imageUrl = text;
    } else if (link && !link.textContent.trim().match(/^https?:\/\//)) {
      links.push({ text: link.textContent.trim(), href: link.href });
    } else if (link && link.textContent.trim().match(/^https?:\/\//)) {
      imageUrl = link.href;
    } else if (text && !text.match(/^https?:\/\//)) {
      items.push(text);
    }
  });

  const layout = document.createElement('div');
  layout.className = 'conditions-split-layout';

  const content = document.createElement('div');
  content.className = 'conditions-split-content';

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'conditions-split-title';
    h2.textContent = title;
    content.append(h2);
  }

  if (items.length) {
    const list = document.createElement('ul');
    list.className = 'conditions-split-list';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'conditions-split-item';
      li.innerHTML = `<svg class="conditions-split-check" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1a76ff"/><path d="M10 16.5l4 4 8-8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${item}</span>`;
      list.append(li);
    });
    content.append(list);
  }

  if (links.length) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'conditions-split-links';
    links.forEach((l) => {
      const a = document.createElement('a');
      a.href = l.href;
      a.className = 'conditions-split-link';
      a.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#1a76ff"/><path d="M7 7h6M7 11h10M7 15h8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>${l.text}`;
      linksDiv.append(a);
    });
    content.append(linksDiv);
  }

  const figure = document.createElement('div');
  figure.className = 'conditions-split-figure';
  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title || '';
    img.loading = 'lazy';
    figure.append(img);
  }

  layout.append(content);
  layout.append(figure);
  block.append(layout);
}
