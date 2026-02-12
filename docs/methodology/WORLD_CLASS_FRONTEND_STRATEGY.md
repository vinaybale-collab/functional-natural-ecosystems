# FNE Frontend: World-Class Design Philosophy and Storytelling Blueprint

## 1) Product Positioning

### What this product is
FNE is not just a map and not just a dashboard. It is a decision narrative system for landscapes. It needs to help users answer three questions quickly and confidently:

1. What is the health of this landscape?
2. Why is the score what it is?
3. What should we do next?

### What this product is not
1. It is not a black-box scoring tool where users must trust numbers without context.
2. It is not a generic BI dashboard with disconnected charts.
3. It is not a scientific paper viewer that overwhelms non-technical users.

### Design principle
Every screen must do all three:
1. Show status.
2. Show evidence.
3. Show action implication.

## 2) Narrative Philosophy

### Core narrative arc
The interface should tell this story in sequence:

1. Discover: "Where are the landscapes and what is their broad status?"
2. Understand: "What is happening in this specific landscape?"
3. Diagnose: "Which dimensions and indicators drive this score?"
4. Compare: "What is better or worse between two places and why?"
5. Decide: "What should be prioritized and what confidence do we have?"

### Storytelling stance
1. Human-first language before technical terms.
2. Progressive disclosure: simple top layer, deep details on demand.
3. Trust through provenance: always show where values came from and whether they are observed or imputed.
4. Explicit uncertainty: confidence is a feature, not a disclaimer.

## 3) Information Architecture

### Primary routes
1. `/` Landing: purpose, trust, and entry points.
2. `/app` Explore Dashboard: map + ranked landscape list + filter controls.
3. `/landscape/:id` Landscape Detail: score explanation, drivers, confidence, provenance, action cues.
4. `/compare/:id1/:id2` Comparison: directional differences with map context.
5. `/methodology` Deep Method: full scoring and confidence logic with worked example.
6. `/datasets` Data Guide: plain-English explanation of each dataset and what it influences.

### Navigation model
1. Always-visible top nav for non-map pages.
2. Dashboard map keeps focus on exploration with minimal chrome.
3. Strong back-paths: every deep page has clear return to explore and compare.

## 4) Experience Flows

### A) Explore flow
1. User opens `/app`.
2. User sees India map with landscape polygons and score colors.
3. User filters by state, score range, and search.
4. User clicks a polygon or list card.
5. User enters detail page with preserved context.

#### Key design choices
1. Map and list are coupled: selecting one highlights the other.
2. Colors communicate score classes consistently across all pages.
3. Empty/error states are informative and actionable.

### B) Landscape detail flow
1. User sees overall score first.
2. User sees dimension breakdown second.
3. User sees confidence and provenance third.
4. User sees methodology links and actions fourth.

#### Confidence module (must-have)
For each dimension:
1. Confidence level (HIGH/MEDIUM/LOW).
2. One-line reason in plain language.
3. Count of observed vs imputed driver indicators.
4. Link to provenance table rows used in that dimension.

#### Provenance module (must-have)
Indicator-level table fields:
1. Indicator name.
2. Value.
3. Source dataset.
4. Data status: Observed or Imputed.
5. Imputation level.
6. Confidence value.

### C) Comparison flow
1. User selects two landscapes from dashboard compare mode.
2. Comparison page shows:
   - Overall difference (signed and absolute).
   - Dimension-by-dimension directional bars.
   - Side-by-side map context.
3. User can jump from any dimension to indicator evidence.

#### Key design choices
1. Differences must be directional, not just absolute.
2. The page must answer "who is better and why" in one screen.
3. Comparative confidence should be visible to avoid over-trusting low-quality differences.

## 5) Data Presentation Strategy

### Layer 1: Decision-ready summary
1. Overall score.
2. Score class label.
3. Top 3 strengths.
4. Top 3 concerns.

### Layer 2: Dimension diagnostics
1. Seven dimensions with scores.
2. Driver indicators and units.
3. Confidence reason.

### Layer 3: Raw evidence
1. Full indicator provenance table.
2. Imputation metadata.
3. Dataset references and links.

### Design constraint
No score should be shown without a path to evidence.

## 6) Visual System Direction

### Aesthetic
"Scientific editorial" rather than "startup dashboard".

1. Clean white and muted neutral base.
2. Strong typography contrast for hierarchy.
3. Limited accent palette tied to score semantics.
4. Subtle motion to guide attention, not distract.

### Typography
1. Display: expressive serif for identity.
2. UI body: clean sans for readability.
3. Numeric data: monospaced for clarity and trust.

### Color semantics
1. Same score color mapping across map, badges, bars, legends.
2. Confidence uses separate semantic channel, not the same as score color.
3. Imputed values have explicit badge style and icon treatment.

## 7) Trust and Transparency Framework

### Confidence as first-class UI object
Confidence is not buried in methodology. It appears next to important numbers.

### Provenance as default visibility
1. Detail pages include provenance by default.
2. Users can filter provenance table by observed/imputed.
3. Export includes provenance and confidence fields.

### Data quality communication
1. "Observed" means direct extraction from source dataset.
2. "Imputed" means fallback estimate using explicit rule level.
3. Tooltips define all terms in simple language.

## 8) Accessibility and Performance

### Accessibility
1. High contrast score text and labels.
2. Keyboard navigable controls and tables.
3. ARIA labels for map controls and chart summaries.
4. Non-color cues for score classes.

### Performance
1. Paginated list fetches.
2. GeoJSON simplification strategy if needed.
3. Lazy rendering of heavy charts/tables.
4. Caching for repeated API calls.

## 9) "World-Class" Success Metrics

### Usability metrics
1. Time to find a landscape under 20 seconds.
2. Time to explain a score under 60 seconds.
3. Time to compare two landscapes under 90 seconds.

### Trust metrics
1. Users can identify whether a key score driver is observed or imputed.
2. Users can identify source dataset for any visible indicator.
3. Users can describe confidence reason in plain language.

### Product outcomes
1. Faster policy or investment prioritization decisions.
2. Better quality discussions about interventions.
3. Fewer "black box" objections from expert reviewers.

## 10) Immediate Implementation Plan

### Phase A: Foundation (current)
1. Add Methodology and Datasets pages.
2. Add site-level navigation consistency.
3. Ensure API contract supports confidence reasoning and indicator provenance.

### Phase B: Core trust UX
1. Add confidence reasoning blocks in detail page.
2. Add provenance table in detail page.
3. Add directional compare deltas and confidence context.

### Phase C: Polish and storytelling
1. Strength/concern narrative auto-sections.
2. Better map legends and filtering language.
3. Export-ready views.

### Phase D: Launch readiness
1. Content QA.
2. Cross-browser QA.
3. GitHub Pages deployment and verification.

## 11) Worked User Story Example

"I am a funder evaluating where to support restoration next quarter."

1. I open Explore and filter Karnataka + lower-score ranges.
2. I shortlist two landscapes and open Compare.
3. I see one has better biodiversity but lower confidence due to imputed water signals.
4. I open Detail and verify provenance for key indicators.
5. I move to Methodology to understand the exact scoring rationale.
6. I make a decision with both score and confidence in view.

This is the behavior the frontend must make easy.

---

This blueprint is the source-of-truth design philosophy for frontend implementation.
