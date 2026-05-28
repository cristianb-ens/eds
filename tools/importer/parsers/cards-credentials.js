/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-credentials
 * Base block: cards
 * Source selector: .sbc-hero-homepage-kr__credentials
 * Description: Horizontal row of text-only credential badges/awards.
 *   Each row is one credential item with text content only (no images).
 * Generated: 2026-05-28
 */
export default function parse(element, { document }) {
  // Extract the label (e.g. "RECOGNIZED FOR EXCELLENCE")
  const label = element.querySelector('.sbc-hero-homepage-kr__credentials__label, [class*="credentials__label"]');

  // Extract all credential items (use exact class to avoid matching the __items container)
  const items = Array.from(
    element.querySelectorAll('.sbc-hero-homepage-kr__credentials__item')
  );

  // Build cells array: each credential is one row with text content
  const cells = [];

  // First row: the label text as a standalone row
  if (label) {
    const labelP = document.createElement('p');
    labelP.textContent = label.textContent.trim();
    cells.push([labelP]);
  }

  // Subsequent rows: one per credential item
  items.forEach((item) => {
    const textSpan = item.querySelector('.sbc-hero-homepage-kr__credentials__text, [class*="credentials__text"]');
    if (textSpan) {
      const p = document.createElement('p');
      p.textContent = textSpan.textContent.trim();
      cells.push([p]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-credentials', cells });
  element.replaceWith(block);
}
