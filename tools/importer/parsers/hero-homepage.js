/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-homepage
 * Base block: hero
 * Source: https://kaufmanrossin.com/
 * Selector: .sbc-hero-homepage-kr
 * Description: Full-width hero banner with background image, heading, text, and CTA buttons.
 *   Row 1: background image
 *   Row 2: text content with heading, paragraph, and links
 * Generated: 2026-05-28
 */
export default function parse(element, { document }) {
  // Extract background image from hero container
  const heroContainer = element.querySelector('.sbc-hero-homepage-kr__hero');
  const bgImage = heroContainer
    ? heroContainer.querySelector(':scope > img')
    : element.querySelector('img');

  // Extract heading (h1 with class sbc-hero-homepage-kr__title)
  const heading = element.querySelector('.sbc-hero-homepage-kr__title, h1');

  // Extract description paragraph
  const description = element.querySelector('.sbc-hero-homepage-kr__description, .sbc-hero-homepage-kr__content p');

  // Extract CTA buttons from buttons container
  const buttonsContainer = element.querySelector('.sbc-hero-homepage-kr__buttons');
  const ctaLinks = buttonsContainer
    ? Array.from(buttonsContainer.querySelectorAll('a'))
    : Array.from(element.querySelectorAll('.sbc-hero-homepage-kr__content a'));

  // Build cells array matching block library structure:
  // Row 1: background image
  // Row 2: heading + description + CTA links
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content cell with heading, description, and CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
