function calculateMonthlyRate(amount, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return Math.round(amount / months);
  const rate = (amount * monthlyRate * ((1 + monthlyRate) ** months))
    / (((1 + monthlyRate) ** months) - 1);
  return Math.round(rate);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function decorate(block) {
  block.textContent = '';

  const state = {
    amount: 5000,
    years: 5,
    rateType: 'fixed',
    fixedRate: 8.5,
    variableRate: 10.2,
    min: 5000,
    max: 250000,
    step: 100,
  };

  function getRate() {
    return state.rateType === 'fixed' ? state.fixedRate : state.variableRate;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'calc-layout';

  wrapper.innerHTML = `
    <div class="calc-widget">
      <h2 class="calc-title">Calculator Credit Nevoi Personale</h2>

      <label class="calc-label">Care este suma pe vrei să o împrumuți?</label>
      <div class="calc-amount-row">
        <div class="calc-amount-field">
          <input type="text" class="calc-amount-input" value="${formatNumber(state.amount)}" inputmode="numeric">
        </div>
        <div class="calc-currency-badge">LEI <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg></div>
      </div>

      <div class="calc-slider-section">
        <input type="range" class="calc-range" min="${state.min}" max="${state.max}" step="${state.step}" value="${state.amount}">
        <div class="calc-range-labels">
          <span>${formatNumber(state.min)} LEI</span>
          <span>${formatNumber(state.max)} LEI</span>
        </div>
      </div>

      <label class="calc-label">În câți ani vrei să returnezi creditul?</label>
      <div class="calc-years-row">
        ${[1, 2, 3, 4, 5].map((y) => `<button class="calc-year-btn${y === state.years ? ' active' : ''}" data-years="${y}">${y}</button>`).join('')}
      </div>

      <div class="calc-rate-header">
        <label class="calc-label">Alege tipul dobânzii</label>
      </div>
      <div class="calc-rate-row">
        <button class="calc-rate-btn active" data-type="fixed">FIXĂ</button>
        <button class="calc-rate-btn" data-type="variable">VARIABILĂ</button>
      </div>

      <div class="calc-result-row">
        <div class="calc-result-box">
          <div class="calc-result-label">Rata lunară</div>
          <div class="calc-result-value">${calculateMonthlyRate(state.amount, getRate(), state.years)} LEI</div>
        </div>
        <div class="calc-result-actions">
          <button class="calc-action-btn">Schimbă calculul</button>
          <button class="calc-action-btn">Vezi calculul detaliat</button>
        </div>
      </div>

      <div class="calc-bottom-ctas">
        <a href="/credite/credite-de-nevoi/aplica-pentru-credit" class="calc-cta-primary">Aplică pentru credit</a>
        <button class="calc-cta-secondary">Vezi scadențar</button>
      </div>
      <div class="calc-disclaimer">
        <p>E bine să știi că oferta finală este personalizată, cuprinsă între 5,99% și 18,50% și ține cont de câteva elemente precum: încasarea venitului în cont BT, adăugarea poliței de asigurare de viață și șomaj, refinanțare externă, istoricul relației cu banca, comportamentul de plată pentru ratele în derulare, ș. a.</p>
        <p>Valoarea ratei lunare depinde și de parametri aleși pentru calcul (perioada de returnare, valoarea dobânzii variabile). Aceștia pot fi consultați și modificați din setările simulatorului.</p>
      </div>
    </div>

    <div class="calc-sidebar">
      <h2 class="calc-sidebar-title">Protecție financiară</h2>
      <p class="calc-sidebar-text">Uneori vin și zile mai grele, iar pentru momente ca acestea e bine să fii protejat. Poți opta pentru asigurarea de viață și șomaj/spitalizare de la Metropolitan, pentru situații neprevăzute.</p>
      <a href="/credite/credite-de-nevoi/aplica-pentru-credit" class="calc-sidebar-cta">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l4 4 4-4M12 8v8"/></svg>
        Aplică pentru credit
      </a>
    </div>
  `;

  function update() {
    const monthly = calculateMonthlyRate(state.amount, getRate(), state.years);
    wrapper.querySelector('.calc-amount-input').value = formatNumber(state.amount);
    wrapper.querySelector('.calc-result-value').textContent = `${monthly} LEI`;
    const pct = ((state.amount - state.min) / (state.max - state.min)) * 100;
    wrapper.querySelector('.calc-range').style.setProperty('--progress', `${pct}%`);
  }

  // Range slider
  const rangeInput = wrapper.querySelector('.calc-range');
  rangeInput.addEventListener('input', () => {
    state.amount = parseInt(rangeInput.value, 10);
    update();
  });

  // Amount input
  const amountInput = wrapper.querySelector('.calc-amount-input');
  amountInput.addEventListener('change', () => {
    const val = parseInt(amountInput.value.replace(/\./g, ''), 10);
    if (val >= state.min && val <= state.max) {
      state.amount = val;
      rangeInput.value = val;
      update();
    }
  });

  // Year buttons
  wrapper.querySelectorAll('.calc-year-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      wrapper.querySelectorAll('.calc-year-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.years = parseInt(btn.dataset.years, 10);
      update();
    });
  });

  // Rate type buttons
  wrapper.querySelectorAll('.calc-rate-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      wrapper.querySelectorAll('.calc-rate-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.rateType = btn.dataset.type;
      update();
    });
  });

  update();
  block.append(wrapper);
}
