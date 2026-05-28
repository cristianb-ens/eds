/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-split
 * Base block: columns
 * Description: Two-column split layout with image on one side and text content
 * (eyebrow, heading, paragraph, CTAs) on the other.
 * Source: https://kaufmanrossin.com/
 * Instances: .sbc-half-image-copy-kr--image-right, .sbc-half-image-copy-kr--image-left
 * Generated: 2026-05-28
 */
export default function parse(element, { document }) {
  // Determine if image is on the left or right based on variant class
  const isImageLeft = element.classList.contains('sbc-half-image-copy-kr--image-left');

  // Extract image - prefer the img with alt text (sr-only), fall back to first img
  const imageContainer = element.querySelector('.sbc-half-image-copy-kr__image');
  let img = null;
  if (imageContainer) {
    // The sr-only img has the alt text; the first img is the visible one
    const srOnlyImg = imageContainer.querySelector('img.sr-only');
    const visibleImg = imageContainer.querySelector('img:not(.sr-only)');
    if (srOnlyImg && visibleImg) {
      // Use visible img but ensure alt text from sr-only version
      visibleImg.alt = srOnlyImg.alt || visibleImg.alt || '';
      img = visibleImg;
    } else {
      img = visibleImg || srOnlyImg || imageContainer.querySelector('img');
    }
  }

  // Extract content elements
  const contentContainer = element.querySelector('.sbc-half-image-copy-kr__content');

  const eyebrow = contentContainer ? contentContainer.querySelector('.sbc-half-image-copy-kr__eyebrow, span[class*="eyebrow"]') : null;
  const heading = contentContainer ? contentContainer.querySelector('.sbc-half-image-copy-kr__title, h2, h3') : null;
  const descriptionEl = contentContainer ? contentContainer.querySelector('.sbc-half-image-copy-kr__text') : null;
  const description = descriptionEl ? descriptionEl.querySelector('p') : null;
  const ctaLinks = contentContainer ? Array.from(contentContainer.querySelectorAll('.sbc-half-image-copy-kr__ctas a, a[class*="btn-kr"]')) : [];

  // Build the image cell
  const imageCell = [];
  if (img) {
    imageCell.push(img);
  }

  // Build the content cell
  const contentCell = [];

  // Eyebrow as emphasized paragraph
  if (eyebrow) {
    const eyebrowP = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = eyebrow.textContent.trim();
    eyebrowP.appendChild(em);
    contentCell.push(eyebrowP);
  }

  if (heading) {
    contentCell.push(heading);
  }

  if (description) {
    contentCell.push(description);
  }

  // Add CTA links
  ctaLinks.forEach((link) => {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    p.appendChild(a);
    contentCell.push(p);
  });

  // Build cells: order depends on image position
  // Columns block: single row with 2 cells = 2 columns
  const cells = [];
  if (isImageLeft) {
    cells.push([imageCell, contentCell]);
  } else {
    cells.push([contentCell, imageCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-split', cells });
  element.replaceWith(block);
}
