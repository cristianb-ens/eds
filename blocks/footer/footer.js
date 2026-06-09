export default function decorate(block) {
  block.textContent = '';

  const footer = document.createElement('div');
  footer.className = 'footer-inner';

  // === Columns section ===
  const columnsData = [
    {
      title: 'Despre noi',
      links: ['Contact', 'Noutăți', 'Cariere', 'Top Management', 'Blog', 'Hartă Site', 'Starea Serviciilor', 'Oferte'],
    },
    {
      title: 'Investitori',
      links: ['Relații investitori', 'Rezultate financiare', 'Rapoarte curente', 'Prezentări', 'ESG', 'Calendar financiar', 'BT Research'],
    },
    {
      title: 'Grupul Financiar BT',
      links: ['BT Capital Partners', 'BT Leasing', 'BT Asset Management', 'BT Direct', 'BT Leasing MD', 'BT Mic', 'BT Pensii', 'SaltBank', 'Victoriabank', 'Inno Investments', 'Microinvest'],
    },
    {
      title: 'Legal',
      links: ['Guvernanță corporativă', 'Informații MIFID', 'Garantarea depozitelor', 'CSALB', 'ANPC', 'Termeni și condiții', 'Informații și documente utile', 'Responsible Disclosure Policy', 'Regulamente campanii', 'Comisioane', 'Regim Fiscal Dobânzi'],
    },
  ];

  const columns = document.createElement('div');
  columns.className = 'footer-columns';

  columnsData.forEach((col) => {
    const colEl = document.createElement('div');
    colEl.className = 'footer-column';

    const title = document.createElement('div');
    title.className = 'footer-column-title';
    title.textContent = col.title;
    colEl.append(title);

    const content = document.createElement('div');
    content.className = 'footer-column-content';
    col.links.forEach((linkText) => {
      const a = document.createElement('a');
      a.href = '/';
      a.textContent = linkText;
      content.append(a);
    });
    colEl.append(content);
    columns.append(colEl);
  });

  // Newsletter column
  const newsletterCol = document.createElement('div');
  newsletterCol.className = 'footer-column footer-column-newsletter';
  newsletterCol.innerHTML = `
    <div class="footer-column-title">Abonează-te la newsletter</div>
    <p class="footer-newsletter-text">Și afli primul noutățile de pe Newsroom & Blogul BT.</p>
    <form class="footer-newsletter-form">
      <input type="email" placeholder="E-mailul tău" aria-label="E-mailul tău">
      <button type="submit" aria-label="Trimite">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </form>
    <p class="footer-newsletter-disclaimer">Poți renunța oricând, <a href="/">vezi detalii</a>.</p>
  `;
  columns.append(newsletterCol);

  footer.append(columns);

  // === Bottom legal bar ===
  const legal = document.createElement('div');
  legal.className = 'footer-legal';

  const legalLinks = [
    'Privacy Hub',
    'Politica de confidențialitate',
    'Politica de cookies',
    'Setări cookies',
    'Exercitarea drepturilor GDPR',
    'Opțiuni de marketing',
  ];

  legalLinks.forEach((text) => {
    const a = document.createElement('a');
    a.href = '/';
    a.textContent = text;
    legal.append(a);
  });

  footer.append(legal);
  block.append(footer);
}
