export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const ol = document.createElement('ol');
  ol.className = 'onboarding-steps-list';

  rows.forEach((row) => {
    const text = row.textContent.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'onboarding-steps-item';

    const indicator = document.createElement('span');
    indicator.className = 'onboarding-steps-indicator';
    indicator.setAttribute('aria-hidden', 'true');

    const content = document.createElement('span');
    content.className = 'onboarding-steps-text';
    content.textContent = text;

    li.append(indicator);
    li.append(content);
    ol.append(li);
  });

  block.append(ol);
}
