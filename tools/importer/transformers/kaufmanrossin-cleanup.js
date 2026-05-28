/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Kaufman Rossin site-wide cleanup.
 * Removes non-authorable content: cookie consent banner, header, footer,
 * announcement bar, reCAPTCHA, Marketo forms, tracking iframes, and other
 * non-authorable elements.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // CookieBot consent dialog (lines 2-998 in cleaned.html)
    WebImporter.DOMUtils.remove(element, [
      '#CybotCookiebotDialog',
      '[class*="CybotCookiebot"]',
    ]);

    // reCAPTCHA widgets (found at lines 3523-3534, 3552-3561)
    WebImporter.DOMUtils.remove(element, [
      '#captcha',
      '.g-recaptcha',
      '.grecaptcha-badge',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Header - site navigation chrome (lines 999-2356)
    // Contains .sbc-kaufman-header with desktop/mobile nav
    WebImporter.DOMUtils.remove(element, ['header']);

    // Announcement wrapper - empty non-authorable bar (line 2357-2358)
    WebImporter.DOMUtils.remove(element, ['.announcement-wrapper']);

    // Footer - site-wide footer with links, form, social (lines 2919+)
    // Selector: section.sbc-kaufman-footer
    WebImporter.DOMUtils.remove(element, ['.sbc-kaufman-footer']);

    // Marketo forms and style loaders (non-authorable marketing automation)
    WebImporter.DOMUtils.remove(element, [
      '#mktoStyleLoaded',
      '.mktoForm',
      '#MktoForms2XDIframe',
    ]);

    // Tracking iframes (DoubleClick, cookiebot SDK, LiveIntent)
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Empty span.epab (non-authorable wrapper, line 997-998)
    WebImporter.DOMUtils.remove(element, ['.epab']);

    // Link elements and noscript tags
    WebImporter.DOMUtils.remove(element, ['link', 'noscript']);

    // reCAPTCHA disclaimer text (inside footer form area)
    WebImporter.DOMUtils.remove(element, ['.mktoCaptchaDisclaimer']);
  }
}
