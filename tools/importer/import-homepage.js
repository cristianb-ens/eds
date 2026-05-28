/* eslint-disable */
/* global WebImporter */

import heroHomepageParser from './parsers/hero-homepage.js';
import cardsCredentialsParser from './parsers/cards-credentials.js';
import cardsFeaturedParser from './parsers/cards-featured.js';
import accordionIndustriesParser from './parsers/accordion-industries.js';
import heroVideoParser from './parsers/hero-video.js';
import columnsSplitParser from './parsers/columns-split.js';
import quoteTestimonialParser from './parsers/quote-testimonial.js';
import cardsLocationsParser from './parsers/cards-locations.js';

import cleanupTransformer from './transformers/kaufmanrossin-cleanup.js';
import sectionsTransformer from './transformers/kaufmanrossin-sections.js';

const parsers = {
  'hero-homepage': heroHomepageParser,
  'cards-credentials': cardsCredentialsParser,
  'cards-featured': cardsFeaturedParser,
  'accordion-industries': accordionIndustriesParser,
  'hero-video': heroVideoParser,
  'columns-split': columnsSplitParser,
  'quote-testimonial': quoteTestimonialParser,
  'cards-locations': cardsLocationsParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Kaufman Rossin homepage with hero, news cards, industries accordion, video banner, split content columns, testimonial quote, firm family cards, locations grid, and full-width CTA',
  urls: ['https://kaufmanrossin.com/'],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.sbc-hero-homepage-kr'],
    },
    {
      name: 'cards-credentials',
      instances: ['.sbc-hero-homepage-kr__credentials'],
    },
    {
      name: 'cards-featured',
      instances: ['.sbc-kr-family-cards'],
    },
    {
      name: 'accordion-industries',
      instances: ['.sbc-industries-accordion-kr'],
    },
    {
      name: 'hero-video',
      instances: ['.sbc-video-banner-kr'],
    },
    {
      name: 'columns-split',
      instances: ['.sbc-half-image-copy-kr--image-right', '.sbc-half-image-copy-kr--image-left'],
    },
    {
      name: 'quote-testimonial',
      instances: ['.sbc-content-callout-quote'],
    },
    {
      name: 'cards-locations',
      instances: ['.sbc-locations-grid-kr'],
    },
    {
      name: 'section-cta',
      instances: ['.sbc-cta-fullwidth-kr'],
      section: 'grey',
    },
  ],
  sections: [
    {
      id: 'hero',
      name: 'Hero',
      selector: '.sbc-hero-homepage-kr',
      style: null,
      blocks: ['hero-homepage', 'cards-credentials'],
      defaultContent: [],
    },
    {
      id: 'news-cards',
      name: 'News Cards',
      selector: '#sbc-kr-family-cards-block_9fe867ec551b0d316b4e866d856711c8',
      style: null,
      blocks: ['cards-featured'],
      defaultContent: [],
    },
    {
      id: 'featured-industries',
      name: 'Featured Industries',
      selector: '.sbc-industries-accordion-kr',
      style: null,
      blocks: ['accordion-industries'],
      defaultContent: [],
    },
    {
      id: 'video-banner',
      name: 'Video Banner',
      selector: '.sbc-video-banner-kr',
      style: null,
      blocks: ['hero-video'],
      defaultContent: [],
    },
    {
      id: 'services',
      name: 'Services Split Content',
      selector: '.sbc-half-image-copy-kr--image-right',
      style: null,
      blocks: ['columns-split'],
      defaultContent: [],
    },
    {
      id: 'about',
      name: 'About Split Content',
      selector: '.sbc-half-image-copy-kr--image-left',
      style: null,
      blocks: ['columns-split'],
      defaultContent: [],
    },
    {
      id: 'quote',
      name: 'Quote/Testimonial',
      selector: '.sbc-content-callout-quote',
      style: 'dark-blue',
      blocks: ['quote-testimonial'],
      defaultContent: [],
    },
    {
      id: 'firm-family',
      name: 'Firm Family Cards',
      selector: '#sbc-kr-family-cards-block_fb043f0b1498e890dfb1c74c9e663634',
      style: null,
      blocks: ['cards-featured'],
      defaultContent: [],
    },
    {
      id: 'locations',
      name: 'Locations',
      selector: '.sbc-locations-grid-kr',
      style: null,
      blocks: ['cards-locations'],
      defaultContent: [],
    },
    {
      id: 'cta',
      name: 'Full-Width CTA',
      selector: '.sbc-cta-fullwidth-kr',
      style: 'grey',
      blocks: [],
      defaultContent: ['.sbc-cta-fullwidth-kr h2', '.sbc-cta-fullwidth-kr p', '.sbc-cta-fullwidth-kr a'],
    },
  ],
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    if (blockDef.name.startsWith('section-')) return;
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
