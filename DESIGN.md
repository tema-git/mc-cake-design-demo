# MC Кейк — design and interaction system

## Purpose and original concept
A Moscow cake atelier concept for people choosing a celebration cake. The main task is to find a visual direction, make a three-stage concept, then contact the real business by phone. The form is a browser-only demonstration, never an order submission.

Fashion pâtisserie: cobalt ink on buttercream, expressive Cyrillic serif, lacquered cherry details, a sculptural cake built with SVG geometry. Layout alternates an asymmetric large hero, a quiet editorial introduction, staggered arched ideas, an exploded cake scene, a blue interactive studio, FAQ and contact spread. This avoids a repeated uniform card-grid landing page.

## References actually consulted
- https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24 — Adam Lippes: editorial image proportions, asymmetry and whitespace. Used as interpreted composition guidance; no original brand assets or paid export imported. Deliberately changed monochrome to saturated cobalt and cherry; increased labels and controls.
- https://21st.dev/@ruixen.ui/components/animated-feature-spotlight3d — inspected public explanation and available usage source for depth on decorative product layers. Implemented original vanilla GSAP/SVG behavior; no React component copied, no registry install, no hosted generation.
- https://motionsites.ai/lesson/build-scroll-animated-website-with-ai — public lesson's principle of a coherent visual story synchronized to native scroll. Implemented original SVG layer assembly, not the page's video or copied prompt; no video, frame cache or animation image sequence.
- The parent consulted the three source guides in the user’s source-guided-web-design skill. Persistent user requirements override small type, weak actions or nontransparent selection in references.

The source browsing is reference research, not a claim that the remote demos were interactively tested. Browser QA is performed on this original site by the parent task.

## Tokens
- `--blue #213dd5`: identity, text, filled actions and studio/footer surface.
- `--deep #172798`: active action color.
- `--cream #fff8e7`: main canvas and text on blue.
- `--butter #ffe9a1`: assembly canvas and primary studio actions.
- `--cherry #a41437`: calls, hero action, cherry geometry and selection on light surfaces.
- `--rose #edb5c8`: illustrated inspiration variant.
- Cormorant Garamond 500: expressive identity and large Cyrillic headings. Manrope 400–600: body, controls and labels. Local WOFF2 and SIL OFL licenses included.
- Body 18 px; desktop nav/buttons/labels 16 px; secondary descriptions 14 px. Mobile retains readable controls and 18 px main text.
- Main width uses 5.2vw gutters capped at 92 px. Desktop heading hierarchy 84–160 px hero / 58–108 px section. Mobile heading scale responds to width without overflow.

## Motion is code
The hero is procedural SVG (`cakeSVG` in app.js), assembled from gradient cylinders, ellipses, ridges, cream piping, cherries, satin bow paths and cake plate. The builder re-renders the same geometry for 27 combinations. No video, bitmap animation, filmstrip or frame sequence is used.

The generated raster asset `hero-cake.webp` is a stationary illustrated idea in the first gallery card only. It is explicitly excluded from pointer/scroll transforms and not used as the source of motion. Image is generated art, not a real portfolio photograph.

## Section interaction map
| Section | Trigger and changing decoration | Bounds / input alternatives | Reduced motion |
| --- | --- | --- | --- |
| Hero | Pointer separately moves cherries, ribbon and cylinder orientation; scroll changes orbit and circular stamp | Maximum about 10 px on detail; all navigation and CTA targets stable; touch sees complete illustration | Static final cake geometry |
| Ribbon | Native scroll scrubs text strip horizontally | No drag or scroll lock; decorative aria-hidden content | Static strip |
| Introduction | Early section entry moves/rotates cherry; pointer gives bounded depth | Text stable; no required hover action | Static cherry |
| Ideas | Early scroll rotates and scales SVG arches into place; pointer moves SVG cake detail | Buttons stay outside animated artwork; touch can select preset; static raster exempt | Static artwork, preset action retained |
| Layer story | Top enters at viewport bottom; six widely separated SVG layers converge with scrub; labels and halo settle | No pinning. Reversible native scrolling. Mobile smaller travel. All layers remain visible | Assembled layer cake |
| Constructor | Color, shape, decor replace SVG geometry; components settle individually; finishing turns decorative orbit | Native buttons, Tab/Enter, tap; result and reset; stable wrappers | Immediate state changes with same results |
| FAQ | Scroll/pointer move cherry geometry; native details reveal answers | Native summary keyboard and touch; arrow vector | Details still expand without motion |
| Contacts | Scroll/pointer changes decorative bow | Fields, phone, map and submit remain stable | Static bow |
| Footer | Scroll shifts large decorative wordmark slightly | Footer links outside transformed wordmark | Static wordmark |

## Accessibility and safety
Sticky header and explicit Contacts remain visible on mobile. Anchors account for header height. Native scrolling, copyable text, system cursor and touch are preserved. Selection changes text color only, including explicit contrast overrides for blue and butter actions. Service icons are SVG with fixed dimensions. CTA arrows start northeast and face east on hover/focus; scroll never targets arrows.

Form errors associate with fields and focus the first invalid field. Success immediately resets entered values, explains no data was sent, offers a real phone call and can restart. There is no analytics, localStorage, sessionStorage, network form endpoint or personal-data persistence. Constructor result is only passed into the in-memory textarea when requested.

Real company facts are limited to name, category, published phone and address. No business hours, production claims, real prices, delivery guarantees, stock, reviews or testimonials are invented. Noindex and visible concept disclosure included.

## Final accessibility pass
One accessible footer toggle pauses all code motion, including scroll, pointer and constructor feedback. System reduced motion always wins. Disabling clears GSAP contexts and pending interaction tweens; browser back/forward restores the chosen in-memory state. Native scrolling stays available. Inactive step labels now have 5.25:1 contrast on cobalt; placeholders are above 5:1. Every focusable control has a sticky-header offset. No new automatic loops were added.
