/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-video
 * Base block: hero
 * Source: https://kaufmanrossin.com/
 * Selector: .sbc-video-banner-kr
 * Generated: 2026-05-28
 *
 * Full-width hero with background image and video playback.
 * Row 1: background image
 * Row 2: heading and description text (content card overlay)
 */
export default function parse(element, { document }) {
  // Extract background image from the banner
  // Strategy 1: Look for img directly in background container (not inside play button)
  // Strategy 2: Check for background-image CSS on the background container
  // Strategy 3: Look for img anywhere in the element that's not in content/play areas
  let bgImage = null;
  const bgContainer = element.querySelector('.sbc-video-banner-kr__background');
  if (bgContainer) {
    // Try direct img child first
    const directImg = bgContainer.querySelector(':scope > img');
    if (directImg) {
      bgImage = directImg;
    } else {
      // Try any img not inside play wrapper
      const allImages = bgContainer.querySelectorAll('img');
      for (const img of allImages) {
        if (!img.closest('.sbc-video-banner-kr__play-wrapper') && !img.closest('.sbc-video-banner-kr__play-btn')) {
          bgImage = img;
          break;
        }
      }
    }
    // If no img found, check for background-image style
    if (!bgImage) {
      const bgStyle = bgContainer.style && bgContainer.style.backgroundImage;
      if (bgStyle) {
        const urlMatch = bgStyle.match(/url\(['"]?(.*?)['"]?\)/);
        if (urlMatch && urlMatch[1]) {
          bgImage = document.createElement('img');
          bgImage.src = urlMatch[1];
        }
      }
    }
  }
  // Fallback: look for any non-SVG img in the element not inside content card or play button
  if (!bgImage) {
    const allElementImages = element.querySelectorAll('img');
    for (const img of allElementImages) {
      if (!img.closest('.sbc-video-banner-kr__card') && !img.closest('.sbc-video-banner-kr__content') && !img.closest('.sbc-video-banner-kr__play-wrapper') && !img.closest('.sbc-video-banner-kr__play-btn') && !img.src.startsWith('data:')) {
        bgImage = img;
        break;
      }
    }
  }

  // Extract heading from content card
  const heading = element.querySelector('.sbc-video-banner-kr__title, .sbc-video-banner-kr__card h2, .sbc-video-banner-kr__card h1');

  // Extract description from content card
  const description = element.querySelector('.sbc-video-banner-kr__description, .sbc-video-banner-kr__card p');

  // Build cells to match block library structure (1 column, multiple rows):
  // Row 1: background image
  // Row 2: heading + description text (combined in single cell)
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([[bgImage]]);
  }

  // Row 2: Content card (heading + description combined in one cell)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);

  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
