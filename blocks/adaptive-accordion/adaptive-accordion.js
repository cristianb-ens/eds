export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    if (cols.length < 2) return;

    const heading = cols[0]?.textContent.trim();
    const content = cols[1];
    if (!heading || !content) return;

    const item = document.createElement('div');
    item.className = 'adaptive-accordion-item';

    const trigger = document.createElement('button');
    trigger.className = 'adaptive-accordion-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('type', 'button');

    const titleSpan = document.createElement('span');
    titleSpan.className = 'adaptive-accordion-title';
    titleSpan.textContent = heading;

    const icon = document.createElement('span');
    icon.className = 'adaptive-accordion-icon';
    icon.setAttribute('aria-hidden', 'true');

    trigger.append(titleSpan);
    trigger.append(icon);

    const panel = document.createElement('div');
    panel.className = 'adaptive-accordion-panel';
    panel.setAttribute('role', 'region');
    panel.hidden = true;

    const panelInner = document.createElement('div');
    panelInner.className = 'adaptive-accordion-panel-content';
    panelInner.append(...content.childNodes);
    panel.append(panelInner);

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });

    item.append(trigger);
    item.append(panel);
    block.append(item);
  });
}
