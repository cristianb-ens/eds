/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-industries
 * Base block: accordion
 * Selector: .sbc-industries-accordion-kr
 * Source: https://kaufmanrossin.com/
 * Generated: 2026-05-28
 *
 * Extracts industry accordion items from the source DOM.
 * Each accordion item becomes a row with 2 columns:
 *   Col 1: industry title (summary/label)
 *   Col 2: body content (description paragraph + image + CTA link)
 *
 * The section heading "Featured Industries" is placed before the block
 * as default content (h2 element).
 */
export default function parse(element, { document }) {
  // Extract the section heading and place it before the block
  const sectionTitle = element.querySelector('.sbc-industries-accordion-kr__title, h2');

  // Get all accordion items from the left column
  const accordionItems = element.querySelectorAll('.kr-accordion-item');

  // Get the right-column panels (desktop versions with image + CTA per item)
  const rightPanels = element.querySelectorAll('.sbc-industries-accordion-kr__right-col .kr-panel');

  const cells = [];

  accordionItems.forEach((item, index) => {
    // Col 1: Extract the title text
    const titleEl = item.querySelector('.kr-accordion-title');
    const titleText = titleEl ? titleEl.textContent.trim() : '';

    // Create a heading element for the title (summary/label)
    const titleNode = document.createElement('p');
    titleNode.textContent = titleText;

    // Col 2: Build body content (description + image + CTA)
    const bodyContent = [];

    // Description paragraph from the accordion body
    const descriptionP = item.querySelector('.kr-accordion-body > div > p');
    if (descriptionP) {
      const pClone = document.createElement('p');
      pClone.textContent = descriptionP.textContent.trim();
      bodyContent.push(pClone);
    }

    // Image and CTA - prefer right panel (desktop) if available, fallback to mobile panel
    const panel = rightPanels[index];
    if (panel) {
      const img = panel.querySelector('img');
      if (img) {
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt || '';
        bodyContent.push(imgEl);
      }
      const cta = panel.querySelector('a.btn-kr');
      if (cta) {
        const link = document.createElement('a');
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        bodyContent.push(link);
      }
    } else {
      // Fallback: use mobile panel content
      const mobilePanel = item.querySelector('.kr-panel-mobile');
      if (mobilePanel) {
        const img = mobilePanel.querySelector('img');
        if (img) {
          const imgEl = document.createElement('img');
          imgEl.src = img.src;
          imgEl.alt = img.alt || '';
          bodyContent.push(imgEl);
        }
        const cta = mobilePanel.querySelector('a.btn-kr');
        if (cta) {
          const link = document.createElement('a');
          link.href = cta.href;
          link.textContent = cta.textContent.trim();
          bodyContent.push(link);
        }
      }
    }

    // Each row: [title, body content]
    cells.push([titleNode, bodyContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-industries', cells });

  // Place the section heading before the block if it exists
  if (sectionTitle) {
    const heading = document.createElement('h2');
    heading.textContent = sectionTitle.textContent.trim();
    element.replaceWith(heading, block);
  } else {
    element.replaceWith(block);
  }
}
