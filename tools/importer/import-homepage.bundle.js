/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    const heroContainer = element.querySelector(".sbc-hero-homepage-kr__hero");
    const bgImage = heroContainer ? heroContainer.querySelector(":scope > img") : element.querySelector("img");
    const heading = element.querySelector(".sbc-hero-homepage-kr__title, h1");
    const description = element.querySelector(".sbc-hero-homepage-kr__description, .sbc-hero-homepage-kr__content p");
    const buttonsContainer = element.querySelector(".sbc-hero-homepage-kr__buttons");
    const ctaLinks = buttonsContainer ? Array.from(buttonsContainer.querySelectorAll("a")) : Array.from(element.querySelectorAll(".sbc-hero-homepage-kr__content a"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-credentials.js
  function parse2(element, { document }) {
    const label = element.querySelector('.sbc-hero-homepage-kr__credentials__label, [class*="credentials__label"]');
    const items = Array.from(
      element.querySelectorAll(".sbc-hero-homepage-kr__credentials__item")
    );
    const cells = [];
    if (label) {
      const labelP = document.createElement("p");
      labelP.textContent = label.textContent.trim();
      cells.push([labelP]);
    }
    items.forEach((item) => {
      const textSpan = item.querySelector('.sbc-hero-homepage-kr__credentials__text, [class*="credentials__text"]');
      if (textSpan) {
        const p = document.createElement("p");
        p.textContent = textSpan.textContent.trim();
        cells.push([p]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-credentials", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-featured.js
  function parse3(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll(".sbc-kr-family-cards__card");
    cards.forEach((card) => {
      const srOnlyImg = card.querySelector(".sbc-kr-family-cards__card__image img.sr-only");
      const firstImg = card.querySelector(".sbc-kr-family-cards__card__image img:not(.sr-only)");
      const img = srOnlyImg || firstImg;
      const bodyContent = [];
      const labelEl = card.querySelector(".sbc-kr-family-cards__card__label");
      if (labelEl) {
        const labelP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = labelEl.textContent.trim();
        labelP.appendChild(strong);
        bodyContent.push(labelP);
      }
      const description = card.querySelector(".sbc-kr-family-cards__card__description");
      if (description) {
        const descP = document.createElement("p");
        descP.textContent = description.textContent.trim();
        bodyContent.push(descP);
      }
      const ctaTextEl = card.querySelector(".sbc-kr-family-cards__card__cta__text");
      const cardHref = card.getAttribute("href");
      if (ctaTextEl && cardHref) {
        const ctaLink = document.createElement("a");
        ctaLink.href = cardHref;
        ctaLink.textContent = ctaTextEl.textContent.trim();
        const ctaP = document.createElement("p");
        ctaP.appendChild(ctaLink);
        bodyContent.push(ctaP);
      } else if (cardHref) {
        const ctaLink = document.createElement("a");
        ctaLink.href = cardHref;
        ctaLink.textContent = "Learn More";
        const ctaP = document.createElement("p");
        ctaP.appendChild(ctaLink);
        bodyContent.push(ctaP);
      }
      const imageCell = img ? img : document.createElement("span");
      cells.push([imageCell, bodyContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-industries.js
  function parse4(element, { document }) {
    const sectionTitle = element.querySelector(".sbc-industries-accordion-kr__title, h2");
    const accordionItems = element.querySelectorAll(".kr-accordion-item");
    const rightPanels = element.querySelectorAll(".sbc-industries-accordion-kr__right-col .kr-panel");
    const cells = [];
    accordionItems.forEach((item, index) => {
      const titleEl = item.querySelector(".kr-accordion-title");
      const titleText = titleEl ? titleEl.textContent.trim() : "";
      const titleNode = document.createElement("p");
      titleNode.textContent = titleText;
      const bodyContent = [];
      const descriptionP = item.querySelector(".kr-accordion-body > div > p");
      if (descriptionP) {
        const pClone = document.createElement("p");
        pClone.textContent = descriptionP.textContent.trim();
        bodyContent.push(pClone);
      }
      const panel = rightPanels[index];
      if (panel) {
        const img = panel.querySelector("img");
        if (img) {
          const imgEl = document.createElement("img");
          imgEl.src = img.src;
          imgEl.alt = img.alt || "";
          bodyContent.push(imgEl);
        }
        const cta = panel.querySelector("a.btn-kr");
        if (cta) {
          const link = document.createElement("a");
          link.href = cta.href;
          link.textContent = cta.textContent.trim();
          bodyContent.push(link);
        }
      } else {
        const mobilePanel = item.querySelector(".kr-panel-mobile");
        if (mobilePanel) {
          const img = mobilePanel.querySelector("img");
          if (img) {
            const imgEl = document.createElement("img");
            imgEl.src = img.src;
            imgEl.alt = img.alt || "";
            bodyContent.push(imgEl);
          }
          const cta = mobilePanel.querySelector("a.btn-kr");
          if (cta) {
            const link = document.createElement("a");
            link.href = cta.href;
            link.textContent = cta.textContent.trim();
            bodyContent.push(link);
          }
        }
      }
      cells.push([titleNode, bodyContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-industries", cells });
    if (sectionTitle) {
      const heading = document.createElement("h2");
      heading.textContent = sectionTitle.textContent.trim();
      element.replaceWith(heading, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/hero-video.js
  function parse5(element, { document }) {
    let bgImage = null;
    const bgContainer = element.querySelector(".sbc-video-banner-kr__background");
    if (bgContainer) {
      const directImg = bgContainer.querySelector(":scope > img");
      if (directImg) {
        bgImage = directImg;
      } else {
        const allImages = bgContainer.querySelectorAll("img");
        for (const img of allImages) {
          if (!img.closest(".sbc-video-banner-kr__play-wrapper") && !img.closest(".sbc-video-banner-kr__play-btn")) {
            bgImage = img;
            break;
          }
        }
      }
      if (!bgImage) {
        const bgStyle = bgContainer.style && bgContainer.style.backgroundImage;
        if (bgStyle) {
          const urlMatch = bgStyle.match(/url\(['"]?(.*?)['"]?\)/);
          if (urlMatch && urlMatch[1]) {
            bgImage = document.createElement("img");
            bgImage.src = urlMatch[1];
          }
        }
      }
    }
    if (!bgImage) {
      const allElementImages = element.querySelectorAll("img");
      for (const img of allElementImages) {
        if (!img.closest(".sbc-video-banner-kr__card") && !img.closest(".sbc-video-banner-kr__content") && !img.closest(".sbc-video-banner-kr__play-wrapper") && !img.closest(".sbc-video-banner-kr__play-btn") && !img.src.startsWith("data:")) {
          bgImage = img;
          break;
        }
      }
    }
    const heading = element.querySelector(".sbc-video-banner-kr__title, .sbc-video-banner-kr__card h2, .sbc-video-banner-kr__card h1");
    const description = element.querySelector(".sbc-video-banner-kr__description, .sbc-video-banner-kr__card p");
    const cells = [];
    if (bgImage) {
      cells.push([[bgImage]]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-split.js
  function parse6(element, { document }) {
    const isImageLeft = element.classList.contains("sbc-half-image-copy-kr--image-left");
    const imageContainer = element.querySelector(".sbc-half-image-copy-kr__image");
    let img = null;
    if (imageContainer) {
      const srOnlyImg = imageContainer.querySelector("img.sr-only");
      const visibleImg = imageContainer.querySelector("img:not(.sr-only)");
      if (srOnlyImg && visibleImg) {
        visibleImg.alt = srOnlyImg.alt || visibleImg.alt || "";
        img = visibleImg;
      } else {
        img = visibleImg || srOnlyImg || imageContainer.querySelector("img");
      }
    }
    const contentContainer = element.querySelector(".sbc-half-image-copy-kr__content");
    const eyebrow = contentContainer ? contentContainer.querySelector('.sbc-half-image-copy-kr__eyebrow, span[class*="eyebrow"]') : null;
    const heading = contentContainer ? contentContainer.querySelector(".sbc-half-image-copy-kr__title, h2, h3") : null;
    const descriptionEl = contentContainer ? contentContainer.querySelector(".sbc-half-image-copy-kr__text") : null;
    const description = descriptionEl ? descriptionEl.querySelector("p") : null;
    const ctaLinks = contentContainer ? Array.from(contentContainer.querySelectorAll('.sbc-half-image-copy-kr__ctas a, a[class*="btn-kr"]')) : [];
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }
    const contentCell = [];
    if (eyebrow) {
      const eyebrowP = document.createElement("p");
      const em = document.createElement("em");
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
    ctaLinks.forEach((link) => {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.textContent.trim();
      p.appendChild(a);
      contentCell.push(p);
    });
    const cells = [];
    if (isImageLeft) {
      cells.push([imageCell, contentCell]);
    } else {
      cells.push([contentCell, imageCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-split", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-testimonial.js
  function parse7(element, { document }) {
    const quoteHeading = element.querySelector('h2.title, .title-cont h2, [class*="callout-quote"] h2');
    const attribution = element.querySelector('p.details, .title-cont p, [class*="callout-quote"] p');
    const cells = [];
    if (quoteHeading) {
      const quoteP = document.createElement("p");
      quoteP.textContent = quoteHeading.textContent.trim();
      cells.push([quoteP]);
    }
    if (attribution) {
      cells.push([attribution]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "quote-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-locations.js
  function parse8(element, { document }) {
    const items = element.querySelectorAll(".sbc-locations-grid-kr__item");
    const cells = [];
    items.forEach((item) => {
      const link = item.querySelector(".sbc-locations-grid-kr__item__link, a");
      const picture = item.querySelector("picture");
      const img = item.querySelector("img");
      const nameSpan = item.querySelector(".sbc-locations-grid-kr__item__name, span");
      const imageEl = picture || img;
      const nameCell = [];
      if (link && nameSpan) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = nameSpan.textContent.trim();
        nameCell.push(a);
      } else if (nameSpan) {
        nameCell.push(nameSpan);
      }
      if (imageEl) {
        cells.push([[imageEl], nameCell]);
      } else {
        const imgDiv = item.querySelector(".sbc-locations-grid-kr__item__image");
        if (imgDiv) {
          cells.push([[imgDiv], nameCell]);
        } else {
          cells.push([[], nameCell]);
        }
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-locations", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/kaufmanrossin-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#CybotCookiebotDialog",
        '[class*="CybotCookiebot"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#captcha",
        ".g-recaptcha",
        ".grecaptcha-badge"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header"]);
      WebImporter.DOMUtils.remove(element, [".announcement-wrapper"]);
      WebImporter.DOMUtils.remove(element, [".sbc-kaufman-footer"]);
      WebImporter.DOMUtils.remove(element, [
        "#mktoStyleLoaded",
        ".mktoForm",
        "#MktoForms2XDIframe"
      ]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, [".epab"]);
      WebImporter.DOMUtils.remove(element, ["link", "noscript"]);
      WebImporter.DOMUtils.remove(element, [".mktoCaptchaDisclaimer"]);
    }
  }

  // tools/importer/transformers/kaufmanrossin-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section, reverseIndex) => {
        const originalIndex = sections.length - 1 - reverseIndex;
        const selector = section.selector;
        if (!selector) return;
        const sectionEl = element.querySelector(selector);
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadataBlock);
        }
        if (originalIndex > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "cards-credentials": parse2,
    "cards-featured": parse3,
    "accordion-industries": parse4,
    "hero-video": parse5,
    "columns-split": parse6,
    "quote-testimonial": parse7,
    "cards-locations": parse8
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Kaufman Rossin homepage with hero, news cards, industries accordion, video banner, split content columns, testimonial quote, firm family cards, locations grid, and full-width CTA",
    urls: ["https://kaufmanrossin.com/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".sbc-hero-homepage-kr"]
      },
      {
        name: "cards-credentials",
        instances: [".sbc-hero-homepage-kr__credentials"]
      },
      {
        name: "cards-featured",
        instances: [".sbc-kr-family-cards"]
      },
      {
        name: "accordion-industries",
        instances: [".sbc-industries-accordion-kr"]
      },
      {
        name: "hero-video",
        instances: [".sbc-video-banner-kr"]
      },
      {
        name: "columns-split",
        instances: [".sbc-half-image-copy-kr--image-right", ".sbc-half-image-copy-kr--image-left"]
      },
      {
        name: "quote-testimonial",
        instances: [".sbc-content-callout-quote"]
      },
      {
        name: "cards-locations",
        instances: [".sbc-locations-grid-kr"]
      },
      {
        name: "section-cta",
        instances: [".sbc-cta-fullwidth-kr"],
        section: "grey"
      }
    ],
    sections: [
      {
        id: "hero",
        name: "Hero",
        selector: ".sbc-hero-homepage-kr",
        style: null,
        blocks: ["hero-homepage", "cards-credentials"],
        defaultContent: []
      },
      {
        id: "news-cards",
        name: "News Cards",
        selector: "#sbc-kr-family-cards-block_9fe867ec551b0d316b4e866d856711c8",
        style: null,
        blocks: ["cards-featured"],
        defaultContent: []
      },
      {
        id: "featured-industries",
        name: "Featured Industries",
        selector: ".sbc-industries-accordion-kr",
        style: null,
        blocks: ["accordion-industries"],
        defaultContent: []
      },
      {
        id: "video-banner",
        name: "Video Banner",
        selector: ".sbc-video-banner-kr",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "services",
        name: "Services Split Content",
        selector: ".sbc-half-image-copy-kr--image-right",
        style: null,
        blocks: ["columns-split"],
        defaultContent: []
      },
      {
        id: "about",
        name: "About Split Content",
        selector: ".sbc-half-image-copy-kr--image-left",
        style: null,
        blocks: ["columns-split"],
        defaultContent: []
      },
      {
        id: "quote",
        name: "Quote/Testimonial",
        selector: ".sbc-content-callout-quote",
        style: "dark-blue",
        blocks: ["quote-testimonial"],
        defaultContent: []
      },
      {
        id: "firm-family",
        name: "Firm Family Cards",
        selector: "#sbc-kr-family-cards-block_fb043f0b1498e890dfb1c74c9e663634",
        style: null,
        blocks: ["cards-featured"],
        defaultContent: []
      },
      {
        id: "locations",
        name: "Locations",
        selector: ".sbc-locations-grid-kr",
        style: null,
        blocks: ["cards-locations"],
        defaultContent: []
      },
      {
        id: "cta",
        name: "Full-Width CTA",
        selector: ".sbc-cta-fullwidth-kr",
        style: "grey",
        blocks: [],
        defaultContent: [".sbc-cta-fullwidth-kr h2", ".sbc-cta-fullwidth-kr p", ".sbc-cta-fullwidth-kr a"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
      if (blockDef.name.startsWith("section-")) return;
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
