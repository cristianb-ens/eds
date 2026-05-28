/* eslint-disable */
/* global WebImporter */

/**
 * Parser for quote-testimonial
 * Base block: quote
 * Source: https://kaufmanrossin.com/
 * Selector: .sbc-content-callout-quote
 * Structure: Row 1 = quote text, Row 2 = attribution
 * Generated: 2026-05-28
 */
export default function parse(element, { document }) {
  // Extract quote text from h2.title (validated against source HTML)
  const quoteHeading = element.querySelector('h2.title, .title-cont h2, [class*="callout-quote"] h2');

  // Extract attribution from p.details (validated against source HTML)
  const attribution = element.querySelector('p.details, .title-cont p, [class*="callout-quote"] p');

  // Build cells to match block library structure:
  // Row 1: quote text
  // Row 2: attribution
  const cells = [];

  // Row 1: Quote text - wrap in paragraph to preserve semantic structure
  if (quoteHeading) {
    const quoteP = document.createElement('p');
    quoteP.textContent = quoteHeading.textContent.trim();
    cells.push([quoteP]);
  }

  // Row 2: Attribution - preserve the strong/emphasis formatting
  if (attribution) {
    cells.push([attribution]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote-testimonial', cells });
  element.replaceWith(block);
}
