/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-locations
 * Base block: cards
 * Source: https://kaufmanrossin.com/
 * Selector: .sbc-locations-grid-kr
 * Generated: 2026-05-28
 *
 * Extracts a grid of location items with circular images and location names.
 * Each location becomes one row with 2 columns: [image] | [linked location name]
 */
export default function parse(element, { document }) {
  // Find all location items in the grid
  const items = element.querySelectorAll('.sbc-locations-grid-kr__item');

  const cells = [];

  items.forEach((item) => {
    const link = item.querySelector('.sbc-locations-grid-kr__item__link, a');
    // Look for picture element first (browser-optimized), then fall back to img
    const picture = item.querySelector('picture');
    const img = item.querySelector('img');
    const nameSpan = item.querySelector('.sbc-locations-grid-kr__item__name, span');

    // Column 1: the image (use picture element if available, otherwise img)
    const imageEl = picture || img;

    // Column 2: the location name wrapped in a link
    const nameCell = [];
    if (link && nameSpan) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = nameSpan.textContent.trim();
      nameCell.push(a);
    } else if (nameSpan) {
      nameCell.push(nameSpan);
    }

    if (imageEl) {
      cells.push([[imageEl], nameCell]);
    } else {
      // Fallback: create an img element from the source HTML structure
      const imgDiv = item.querySelector('.sbc-locations-grid-kr__item__image');
      if (imgDiv) {
        cells.push([[imgDiv], nameCell]);
      } else {
        cells.push([[], nameCell]);
      }
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-locations', cells });
  element.replaceWith(block);
}
