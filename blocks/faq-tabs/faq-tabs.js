export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'faq-tabs-inner';

  const titleEl = document.createElement('div');
  titleEl.className = 'faq-tabs-label';
  titleEl.textContent = 'AJUTOR RAPID';
  wrapper.append(titleEl);

  const tabNames = [];
  const tabPanels = {};
  let currentTab = null;

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    const firstText = cols[0]?.textContent.trim();
    const secondText = cols[1]?.textContent.trim();
    const link = row.querySelector('a');

    if (link && !secondText) return;

    if (!secondText && firstText && firstText.length < 30 && !firstText.includes('?')) {
      currentTab = firstText;
      if (!tabNames.includes(currentTab)) {
        tabNames.push(currentTab);
        tabPanels[currentTab] = [];
      }
    } else if (firstText && secondText && currentTab) {
      tabPanels[currentTab].push({ question: firstText, answer: secondText });
    }
  });

  const tabMenu = document.createElement('div');
  tabMenu.className = 'faq-tabs-menu';

  tabNames.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = `faq-tabs-btn${i === 0 ? ' active' : ''}`;
    btn.textContent = name;
    btn.dataset.tab = name;
    btn.addEventListener('click', () => {
      tabMenu.querySelectorAll('.faq-tabs-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      wrapper.querySelectorAll('.faq-tabs-panel').forEach((p) => { p.hidden = true; });
      wrapper.querySelector(`[data-panel="${name}"]`).hidden = false;
    });
    tabMenu.append(btn);
  });

  wrapper.append(tabMenu);

  tabNames.forEach((name, i) => {
    const panel = document.createElement('div');
    panel.className = 'faq-tabs-panel';
    panel.dataset.panel = name;
    panel.hidden = i !== 0;

    tabPanels[name].forEach((qa) => {
      const item = document.createElement('div');
      item.className = 'faq-tabs-item';

      const question = document.createElement('button');
      question.className = 'faq-tabs-question';
      question.setAttribute('aria-expanded', 'false');
      question.innerHTML = `<span>${qa.question}</span><span class="faq-tabs-icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span>`;

      const answer = document.createElement('div');
      answer.className = 'faq-tabs-answer';
      answer.hidden = true;
      answer.innerHTML = `<p>${qa.answer}</p>`;

      question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', String(!expanded));
        answer.hidden = expanded;
      });

      item.append(question);
      item.append(answer);
      panel.append(item);
    });

    wrapper.append(panel);
  });

  const ctaRow = rows.find((r) => r.querySelector('a'));
  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'faq-tabs-cta-wrap';
    const cta = document.createElement('a');
    cta.href = link.href;
    cta.className = 'faq-tabs-cta';
    cta.textContent = link.textContent.trim();
    ctaDiv.append(cta);
    wrapper.append(ctaDiv);
  }

  block.append(wrapper);
}
