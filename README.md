# MC Кейк — static design concept

Buildless responsive HTML/CSS/JS. Open via any static HTTP server; all assets and links are relative for GitHub Pages subdirectories.

```sh
python3 -m http.server 8080
```

Entry: `index.html`. No installation or build required. `app.js` uses locally hosted GSAP and ScrollTrigger. The entire hero, exploded cake and constructor are SVG/CSS/JS motion. One stationary generated photo illustrates a possible design. No videos or animated raster sequences.

## Future copies
- `index.html`: replace document title/description, header/footer brand, address, `tel:` link text and number, map URL, contact name, concept disclosures and FAQ references. Search for `MC Кейк`, `Перерва`, `79260826445`, `926 082`.
- `SOURCE.json`: replace verified company identity, sources and factual boundary.
- `style.css`: brand tokens in `:root`, then individual composition if the next company needs a different tone.
- `app.js`: editable names/colors map and cake geometry near the top; constructor presets remain independent from contact data.
- `assets/favicon.svg`: adapt brand emblem. Do not remove font/vendor license notices.

Keep visible demo notices unless a real backend is separately implemented and tested. Never change the success copy to claim real submission while the browser-only handler remains.

## Functional QA selectors
- Constructor: `#create`; `button[data-group=color][data-value=blue]`, then `#builder-next`; `button[data-group=shape][data-value=tiered]`, next; `button[data-group=decor][data-value=candles]`, next. Expect `#builder-result` visible and SVG shape updated. `#builder-back` returns a step. `#builder-reset` restores first step. `#use-concept` puts the current recipe in `#cake-wish` then scrolls to contacts.
- Preset: `.idea-select[data-preset=rose]` selects pink mini cake with bow and opens the constructor section.
- Form: `#customer-name`, `#customer-phone`, `#demo-consent`, `.form-submit`. Empty/invalid must display inline errors. With letters in name, 10–15 phone digits and checked demo acknowledgement, form resets and `#form-success` appears. `#form-reset` makes it usable again.
- Native FAQ: `.faq-list summary`.
- Mobile: `.header-contact` always available; no horizontal scroll at 360/390 px. Header-aware anchors. Reduced motion static scenes and fully usable constructor/form.

## Validation
- JavaScript syntax checked with Node.
- Static HTML: local assets, anchor destinations and ID uniqueness checked.
- Interactive browser QA is conducted by the parent task before publication.

## Motion and audit controls
The footer button «Анимация: вкл.» / «Анимация: выкл.» controls pointer, scroll and interaction animations through one in-memory state. No preference is persisted. System `prefers-reduced-motion` takes precedence and is explained next to the disabled toggle. All features remain usable without movement. Returning with browser Back/Forward restores motion listeners safely.

The default form submit button starts disabled in HTML and becomes active only after JavaScript installs its local `preventDefault` handler, preventing a no-JavaScript GET submission of personal data. The `noscript` message directs visitors to the real phone link.

`AUDIT.json` records the independent source audit. Browser verification belongs to the parent task. The static gallery illustration is locally encoded WebP, 330 KB, with retained alpha and original 1145 × 1374 dimensions; it is never animated.
