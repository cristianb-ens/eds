export default async function decorate(block) {
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  brand.innerHTML = `<a href="/">
    <img src="https://www.bancatransilvania.ro/assets/themes/bancatransilvania/partials/vendor/logos/bt-symbol-color.mix.svg" alt="Banca Transilvania" width="49" height="56" loading="eager">
  </a>`;

  const menuData = {
    Personal: {
      type: 'grid',
      columns: [
        { heading: 'Credite', links: ['Creditul de nevoi personale', 'Creditul pentru casă', 'Creditul Overdraft'] },
        { heading: 'Carduri', links: ['Cardurile de credit Star', 'Cardurile de credit BT Flying Blue', 'Carduri de debit', 'Cardul de masă'] },
        { heading: 'Conturi și operațiuni', links: ['Cont online', 'Abonamente de cont curent', 'Oferta pentru tineri', 'Actualizare date', 'Schimb valutar'] },
        { heading: 'Economii și investiții', links: ['Economii', 'Fonduri de investiții', 'Pensii facultative', 'Investiții la bursă'] },
        { heading: 'Asigurări', links: ['Asigurare de călătorie', 'Asigurare RCA', 'Asigurări de locuință', 'Asigurări de viață', 'Asigurări atașate creditelor'] },
        { heading: 'Premium Banking', links: ['Premium Club', 'Private Banking'], extra: ['BT Pay Kiddo', 'Diaspora'] },
      ],
      banner: 'https://modul.bancatransilvania.ro/secure-storage/BTRL/Menu/acord-mk-meniu-pf.webp',
    },
    Business: {
      type: 'grid',
      columns: [
        { heading: 'Conturi și operațiuni', links: ['Deschide cont online', 'Pachet de cont Nelimitat', 'Contul primul an gratuit', 'Actualizare date', 'Schimb valutar'] },
        { heading: 'Finanțare', links: ['Credite rapide pentru IMM-uri', 'Credite de investiții', 'Credite verzi', 'Factoring', 'Leasing', 'Programe speciale'] },
        { heading: 'Carduri', links: ['Carduri business credit', 'Carduri business debit', 'Cardul de masă'] },
        { heading: 'Soluții de plată', links: ['POS', 'POS App', 'E-commerce'] },
        { heading: 'Economii și investiții', links: ['Economii', 'Fonduri de investiții', 'Investiții la bursă'] },
        { heading: 'Sectoare specializate', links: ['Corporate', 'Divizia pentru Medici', 'Agri'] },
      ],
      banner: 'https://modul.bancatransilvania.ro/secure-storage/BTRL/Menu/acord-mk-meniu-pf.webp',
    },
    'Despre BT': {
      type: 'grid',
      columns: [
        { heading: 'Cariere', links: ['Joburi disponibile', 'Internships', 'Life@BT', 'Cultura BT', 'BT Code'] },
        { heading: 'Newsroom', links: ['Comunicate de presă', 'Milestones', 'Noutăți', '#BT Voice', 'Anunțuri'] },
        { heading: 'Blog', links: ['Campanii', 'Educație financiară', 'BT Pay', 'Evenimente', 'The MacRO Zone'] },
        { heading: 'Podcast', links: ['BT Business Talks', 'BT Talks'] },
        { heading: 'BT Comunitate', links: ['Educație', 'Social', 'Mediu'] },
      ],
      banner: '',
    },
    'Relații Investitori': {
      type: 'list-quote',
      links: ['Sinteză', 'Guvernanță corporativă', 'Rezultate financiare', 'Calendar Financiar', 'ESG', 'BT Research'],
      quote: {
        text: 'Ne-am asumat un angajament ferm față de români și de antreprenorii locali în susținerea visurilor lor, BT fiind partenerul cu care pot să își înceapă călătoria.',
        name: 'OMER TETIK',
        role: 'CEO Banca Transilvania',
      },
    },
  };

  const links = document.createElement('div');
  links.className = 'nav-links';

  Object.entries(menuData).forEach(([label, data]) => {
    const item = document.createElement('div');
    item.className = 'nav-link-item';

    const trigger = document.createElement('a');
    trigger.href = '/';
    trigger.className = 'nav-link-trigger';
    trigger.textContent = label;

    const dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';

    const dropdownInner = document.createElement('div');
    dropdownInner.className = 'nav-dropdown-inner';

    if (data.type === 'grid') {
      const grid = document.createElement('div');
      grid.className = 'nav-dropdown-grid';

      data.columns.forEach((col) => {
        const column = document.createElement('div');
        column.className = 'nav-dropdown-col';

        const heading = document.createElement('h3');
        heading.className = 'nav-dropdown-heading';
        heading.textContent = col.heading;
        column.append(heading);

        col.links.forEach((linkText) => {
          const link = document.createElement('a');
          link.href = '/';
          link.className = 'nav-dropdown-link';
          link.textContent = linkText;
          column.append(link);
        });

        if (col.extra) {
          col.extra.forEach((extraHeading) => {
            const extraH = document.createElement('h3');
            extraH.className = 'nav-dropdown-heading nav-dropdown-heading-extra';
            extraH.textContent = extraHeading;
            column.append(extraH);
          });
        }

        grid.append(column);
      });

      dropdownInner.append(grid);

      if (data.banner) {
        const banner = document.createElement('div');
        banner.className = 'nav-dropdown-banner';
        banner.innerHTML = `<img src="${data.banner}" alt="" loading="lazy">`;
        dropdownInner.append(banner);
      }
    } else if (data.type === 'list-quote') {
      dropdownInner.classList.add('nav-dropdown-inner-listquote');

      const listCol = document.createElement('div');
      listCol.className = 'nav-dropdown-linklist';

      data.links.forEach((linkText) => {
        const link = document.createElement('a');
        link.href = '/';
        link.className = 'nav-dropdown-linklist-item';
        link.innerHTML = `<span>${linkText}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        listCol.append(link);
      });

      const quoteCard = document.createElement('div');
      quoteCard.className = 'nav-dropdown-quote';
      quoteCard.innerHTML = `
        <div class="nav-dropdown-quote-content">
          <svg class="nav-dropdown-quote-icon" width="32" height="24" viewBox="0 0 32 24" fill="none"><path d="M0 24V14.4C0 4.8 5.6 0 14 0v5.6C9.8 6.4 7.6 9.2 7.2 12H14v12H0zm18 0V14.4C18 4.8 23.6 0 32 0v5.6c-4.2.8-6.4 3.6-6.8 6.4H32v12H18z" fill="#1a76ff"/></svg>
          <p class="nav-dropdown-quote-text">${data.quote.text}</p>
          <div class="nav-dropdown-quote-author">
            <strong>${data.quote.name}</strong>
            <span>${data.quote.role}</span>
          </div>
        </div>
        <div class="nav-dropdown-quote-photo"></div>
      `;

      dropdownInner.append(listCol);
      dropdownInner.append(quoteCard);
    }

    dropdown.append(dropdownInner);
    item.append(trigger);
    item.append(dropdown);
    links.append(item);
  });

  const actions = document.createElement('div');
  actions.className = 'nav-actions';
  actions.innerHTML = `
    <button class="nav-icon" aria-label="Telefon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    </button>
    <button class="nav-icon" aria-label="Cont">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </button>
    <button class="nav-icon" aria-label="Caută">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
    </button>
    <a href="/" class="nav-btn-secondary">Internet Banking</a>
    <a href="/credite/credite-de-nevoi/aplica-pentru-credit" class="nav-btn-primary">Deschide cont</a>
  `;

  nav.append(brand);
  nav.append(links);
  nav.append(actions);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}
