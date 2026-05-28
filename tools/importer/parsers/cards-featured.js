/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-featured
 * Base block: cards
 * Description: Grid of cards with images, labels, and text content.
 *   Each row represents one card with 2 columns: image and body content.
 * Source selector: .sbc-kr-family-cards
 * Generated: 2026-05-28
 *
 * Source HTML structure per card:
 *   <a class="sbc-kr-family-cards__card" href="...">
 *     <div class="sbc-kr-family-cards__card__label">Label text</div>
 *     <div class="sbc-kr-family-cards__card__image">
 *       <img src="...">
 *       <img src="..." alt="..." class="sr-only">
 *       <div class="sbc-kr-family-cards__card__content">
 *         <p class="sbc-kr-family-cards__card__description">...</p>
 *         <span class="sbc-kr-family-cards__card__cta">
 *           <span class="sbc-kr-family-cards__card__cta__text">CTA text</span>
 *         </span>
 *       </div>
 *     </div>
 *   </a>
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all card elements within the grid
  const cards = element.querySelectorAll('.sbc-kr-family-cards__card');

  cards.forEach((card) => {
    // --- Column 1: Image ---
    // Use the sr-only img (has alt text) if available, otherwise first img
    const srOnlyImg = card.querySelector('.sbc-kr-family-cards__card__image img.sr-only');
    const firstImg = card.querySelector('.sbc-kr-family-cards__card__image img:not(.sr-only)');
    const img = srOnlyImg || firstImg;

    // --- Column 2: Body content (label + description + CTA link) ---
    const bodyContent = [];

    // Label/tag as a heading (p element with bold or just paragraph)
    const labelEl = card.querySelector('.sbc-kr-family-cards__card__label');
    if (labelEl) {
      const labelP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = labelEl.textContent.trim();
      labelP.appendChild(strong);
      bodyContent.push(labelP);
    }

    // Description
    const description = card.querySelector('.sbc-kr-family-cards__card__description');
    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description.textContent.trim();
      bodyContent.push(descP);
    }

    // CTA - the card itself is an <a>, so create a link with CTA text
    const ctaTextEl = card.querySelector('.sbc-kr-family-cards__card__cta__text');
    const cardHref = card.getAttribute('href');
    if (ctaTextEl && cardHref) {
      const ctaLink = document.createElement('a');
      ctaLink.href = cardHref;
      ctaLink.textContent = ctaTextEl.textContent.trim();
      const ctaP = document.createElement('p');
      ctaP.appendChild(ctaLink);
      bodyContent.push(ctaP);
    } else if (cardHref) {
      // Fallback: use card href with generic text
      const ctaLink = document.createElement('a');
      ctaLink.href = cardHref;
      ctaLink.textContent = 'Learn More';
      const ctaP = document.createElement('p');
      ctaP.appendChild(ctaLink);
      bodyContent.push(ctaP);
    }

    // Build the row: [image, body content]
    const imageCell = img ? img : document.createElement('span');
    cells.push([imageCell, bodyContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-featured', cells });
  element.replaceWith(block);
}
