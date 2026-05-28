/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Kaufman Rossin section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for
 * sections with a style property.
 * Runs in afterTransform only; uses payload.template.sections.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section, reverseIndex) => {
      const originalIndex = sections.length - 1 - reverseIndex;
      const selector = section.selector;
      if (!selector) return;

      // Find the section element within the main content
      const sectionEl = element.querySelector(selector);
      if (!sectionEl) return;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadataBlock);
      }

      // Insert <hr> before each section that is not the first
      if (originalIndex > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
