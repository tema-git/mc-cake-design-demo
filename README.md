# MC Кейк — static design concept

Buildless HTML/CSS/JavaScript, local fonts and local GSAP/ScrollTrigger. Open `index.html` through a static HTTP server. All asset URLs are relative for GitHub Pages project hosting. All cake scenes are procedural SVG; no raster or video assets remain.

## Future copies
- `index.html`: title/description, header/footer brand, address, phone text and `tel:` destinations, map URL and contact copy. Search `MC Кейк`, `Перерва`, `79260826445`, `926 082`.
- `SOURCE.json`: company identity, sources and factual boundary. Preserve accurate source notes.
- `style.css`: palette tokens and responsive composition. Maintain readable typography, transparent selection, stable controls and the sticky header.
- `app.js`: `names`, `colors` and `cakeSVG()`; constructor presets are separate from company contact facts.
- `assets/favicon.svg` and `assets/cake-cursor.svg`: optional brand identity changes. Keep font/vendor licenses.
- Footer credit is plain text “Spoki Studio” with no invented link.

Keep the honest demo form disclosure unless a real backend is separately implemented and tested. Do not claim a successful real order while the browser-only handler remains. No fetch, analytics, localStorage or sessionStorage is used.

## QA selectors
- Builder tabs: `#builder-tab-0`, `#builder-tab-1`, `#builder-tab-2`. Direct switching in any order; Left/Right/Home/End use automatic activation. Tab enters the active panel’s options.
- Options: `[data-group=color][data-value=burgundy]`, `[data-group=shape][data-value=tiered]`, `[data-group=decor][data-value=candles]`. All 27 combinations are valid.
- `#builder-next` creates the concept at any time. `#builder-result` remains visible and updates when choices change. `#builder-reset` resets; `#use-concept` fills `#cake-wish`.
- `.idea-select[data-preset=cream|burgundy|rose]` selects the matching code-drawn cake.
- Combobox: `#occasion-combobox`, `#occasion-listbox`, `#occasion-option-0` through `#occasion-option-4`. Arrow/Home/End/typeahead navigate; Enter/Space/Tab commit; Escape/outside cancel. Focus stays on trigger while open, normal Tab navigation is preserved.
- Form: `#customer-name`, `#customer-phone`, `#occasion`, `#demo-consent`, `.form-submit`. Empty/invalid submission gives inline errors. Valid submission resets input and reveals `#form-success`. `#form-reset` restarts with birthday occasion restored.
- Header magnet: `.header-contact` stays stationary; `.contact-face` moves no more than 5 px on fine pointers. It resets on exit/focus and is disabled for system reduced motion/coarse pointers.
- Cursor: only `.hero-code-cake > svg`, `.cake-illustration > svg`, `.cake-preview > svg` receive the cherry cursor.
- Reduced motion: complete static artwork, fully usable constructor/form/dropdown and no smooth scroll. No manual toggle exists.
- Mobile: 320/390 px, no horizontal overflow, Contacts always visible, dropdown within available viewport space, readable 16 px controls.

## Checks
`AUDIT.json` records the current independent source audit. JavaScript syntax, local assets, anchor and ARIA references, ID uniqueness, removed raster usage and no-JavaScript form guard were checked locally. Current browser/visual QA is complete. See QA.json for executed scenarios, viewport coverage and environment limitations.
