# Functional Natural Ecosystems (FNE) - Methodology & Implementation Plan

**Version:** 1.0
**Date:** 8 February 2026
**Initiative by:** Rainmatter Foundation, Conservation & Restoration Division
**Conceived by:** Sidharth Rao

---

## TABLE OF CONTENTS

### PART A: THE WHY AND THE WHAT
1. [Why Functional Natural Ecosystems?](#1-why-functional-natural-ecosystems)
2. [What the FNE Framework Intends to Showcase](#2-what-the-fne-framework-intends-to-showcase)
3. [Who Will Use This and How](#3-who-will-use-this-and-how)
4. [How This Data Empowers People](#4-how-this-data-empowers-people)
5. [What It Will Look Like](#5-what-it-will-look-like)
6. [The Conceptual Framework](#6-the-conceptual-framework)
7. [The Seven Dimensions of Ecosystem Functionality](#7-the-seven-dimensions-of-ecosystem-functionality)

### PART B: THE HOW
8. [Landscape Definition Methodology](#8-landscape-definition-methodology)
9. [Data Sources & Processing](#9-data-sources--processing)
10. [Dimension Scoring Methodology](#10-dimension-scoring-methodology)
11. [Overall FNE Score Computation](#11-overall-fne-score-computation)
12. [AI Report Generation Methodology](#12-ai-report-generation-methodology)
13. [Implementation Plan - Phase 1: Data Pipeline](#13-implementation-plan---phase-1-data-pipeline)
14. [Implementation Plan - Phase 2: Scoring Engine](#14-implementation-plan---phase-2-scoring-engine)
15. [Implementation Plan - Phase 3: Frontend Dashboard](#15-implementation-plan---phase-3-frontend-dashboard)
16. [API Specification](#16-api-specification)
17. [Database Schema](#17-database-schema)
18. [Quality Assurance & Validation](#18-quality-assurance--validation)
19. [Scalability Considerations](#19-scalability-considerations)

---

# PART A: THE WHY AND THE WHAT

---

## 1. WHY FUNCTIONAL NATURAL ECOSYSTEMS?

### 1.1 The Problem We Are Solving

India's ecosystems are in crisis, but we lack a coherent way to talk about it. Today, when people discuss environmental health, the conversation fragments into isolated metrics: carbon sequestration numbers, species counts, air quality indices, water tables. Each tells a piece of the story, but none tells the whole story. It is, as Sid Rao puts it, like going to a doctor and only getting your kidneys tested, or only checking if your toes are in good shape -- when what you actually need is a full-body checkup.

The consequences of this fragmented view are severe. When a state government proposes a new highway through the Western Ghats, the environmental impact assessment looks at the immediate corridor -- how many trees will be cut, which species might be displaced. But nobody can tell you what happens to the Western Ghats as a whole. Nobody can show you that this highway, combined with three existing dams, a growing town, and declining traditional practices, is pushing an entire ecosystem past a tipping point. There is no meta-level view.

Meanwhile, conservation organizations fight one-off battles -- "don't plant trees in grasslands," "plant only native species," "protect this corridor" -- but cannot articulate the larger picture of ecosystem functionality that ties all of these together. Funders allocate money without understanding which landscapes are most fragile, most resilient, or most in need. Decision-makers at every level -- from Panchayat presidents to state environment secretaries -- lack a simple, accessible way to understand the health of the natural systems they govern.

### 1.2 Why "Functional" Matters

The word "functional" is deliberate and central to this framework. Previous approaches to ecosystem assessment have focused on counting things: How many species? How many hectares of forest? How much carbon stored? These metrics, while valuable, miss the point. An ecosystem is not a warehouse of assets to be inventoried -- it is a living system defined by relationships and interactions.

Consider two mangrove systems of the same size and age. One is a natural mangrove that has evolved over decades; the other is a plantation mangrove planted in rows. By conventional metrics -- hectares, species count, carbon storage -- they might score similarly. But when a storm surge hits, the natural mangrove absorbs, bends, and dissipates the energy far more effectively than the plantation. The functionality is different because the relationships within the system are different -- the root networks, the species interactions, the sediment dynamics, the microbial communities.

This is what the FNE framework captures. It asks not "what is there?" but "how well is it working?" The answer lies in three fundamental sets of relationships:

1. **Human-Nature Relationships**: Are the people who live in and around this ecosystem engaged in reciprocal stewardship? Do they have traditional practices that sustain the landscape? Are they benefiting from the ecosystem in ways that incentivize its protection? Or are they disconnected, extractive, or in conflict with the natural system?

2. **Nature-to-Nature Relationships**: Are species interacting in ways that sustain ecosystem function? Are pollinators reaching the plants that need them? Are predator-prey dynamics intact? Can animals move between habitat patches? Or have these relationships been severed by fragmentation, invasive species, or habitat degradation?

3. **Nature-to-Abiotic Relationships**: Are the living and non-living components of the ecosystem in balance? Is the water cycle intact -- rainfall absorbed, groundwater recharged, streams flowing? Is the soil healthy -- nutrients cycling, erosion controlled? Or have these relationships been disrupted by deforestation, pollution, or overextraction?

When you look at ecosystems through the lens of relationships, you cut through the noise of isolated metrics and get to the heart of what makes a landscape functional or dysfunctional. A forest with 764 bird species is not necessarily healthier than one with 500, if the interactions between those birds and their habitat are degrading. A river with low pollution is not necessarily healthy if its flow regime has been destroyed by upstream dams.

### 1.3 Why Now

Several converging factors make this the right time to build such a tool:

- **Data availability has transformed**: Satellite imagery (ESA WorldCover at 10m resolution), global biodiversity databases (GBIF with billions of occurrence records), water risk models (WRI Aqueduct), and biodiversity baselines (GLOBIO) now provide coverage that was unthinkable a decade ago. We can assess landscapes at scale.

- **AI can synthesize qualitative knowledge**: Research publications, anthropological studies, government reports, and news articles contain vast qualitative knowledge about human-nature relationships that was previously impossible to process at scale. Large language models can now read, synthesize, and integrate this knowledge with quantitative data.

- **The policy window is open**: India's environmental governance is increasingly looking for landscape-level frameworks -- from the National Mission for Green India to state-level biodiversity strategies. The language of "ecosystem services" and "nature-based solutions" has entered mainstream policy discourse. But the tools to operationalize these concepts at the landscape level are missing.

- **Existing frameworks fall short**: Frameworks like TGPS (from Auroville) require a pristine reference ecosystem for each ecoregion -- references that often don't exist. The State of Nature metrics (Nature Positive Initiative) focus on global-level indicators that are too coarse for landscape decisions. Carbon accounting treats ecosystems as carbon sinks rather than living systems. None of them center relationships and functionality the way FNE does.

### 1.4 The Vision

Rainmatter Foundation's vision is that every ecosystem should be a functional natural ecosystem at its best -- whatever that best is. A 10 on 10. In reality, most ecosystems are going in the opposite direction. The FNE tool is the instrument that makes this visible, comparable, and actionable.

It is not a tool for winning scientific arguments about decimal precision. It is a sense-making tool. If you know intrinsically that Agumbe is healthier than Bannerghatta, the tool should reflect that, explain why, and help decision-makers understand what it would take to move Bannerghatta from a 3.8 to a 5.0 -- or what it would cost to let Agumbe slide from an 8.3 to a 6.0.

---

## 2. WHAT THE FNE FRAMEWORK INTENDS TO SHOWCASE

### 2.1 A Snapshot of Ecosystem Health

For any landscape in India, the FNE tool will provide:

- **An overall functionality score (0-10)**: A single number that captures the holistic health of the ecosystem. Not precise to the decimal, but accurate enough to compare landscapes, track trajectories, and flag crises.

- **Seven dimension scores**: Breaking the overall score into its components -- biodiversity, connectivity, ecosystem services, climate resilience, community-nature reciprocity, abiotic integrity, and anthropogenic pressure. Each dimension tells a different part of the story.

- **A deep written assessment (3-4 pages per landscape)**: Not just numbers but explanations. Why does Kodagu score 6.2? Because coffee agroforestry maintains moderate biodiversity but connectivity is declining due to road expansion, and community stewardship traditions are weakening as younger generations move to cities. The report cites specific data points, research papers, and observed trends.

- **Tradeoff visibility**: When a new dam is proposed, the tool should make visible what happens to the landscape's scores. You're not saying "don't build the dam" -- you're saying "here is what you are trading off, and here is where this landscape will land on the scale if you proceed."

### 2.2 Comparative Analysis

The tool enables direct comparison between landscapes:

- **Agumbe vs. Bannerghatta**: Why is one an 8.3 and the other a 3.8? The dimension breakdown shows that Bannerghatta suffers from terrible connectivity (hemmed in by Bangalore's urban sprawl), poor community-nature relationships (urban populations disconnected from the forest), and extreme anthropogenic pressure -- while its raw biodiversity is still moderate thanks to the national park core.

- **Regional patterns**: Looking at all of Karnataka's landscapes together reveals corridors of high functionality (the Western Ghats spine) vs. zones of collapse (the northern Deccan plateau), helping prioritize where conservation investment delivers the most impact.

- **Temporal trajectories**: When scores are updated annually with new data, the tool shows which landscapes are improving and which are declining -- and whether interventions are working.

### 2.3 What This Is NOT

It is critical to be clear about what the FNE framework does not claim to be:

- **Not a regulatory instrument**: Scores are indicative, not legally binding. They are meant to inform decisions, not dictate them.
- **Not a precision measurement**: The difference between 6.2 and 6.4 is not meaningful. The difference between 6.2 and 3.8 is.
- **Not a biodiversity census**: This is not about counting species or hectares. It is about assessing the functionality of relationships within ecosystems.
- **Not a replacement for field work**: The tool synthesizes available data and research. It does not replace on-the-ground ecological surveys, but it provides context for them and helps prioritize where they are most needed.

---

## 3. WHO WILL USE THIS AND HOW

### 3.1 Government Decision-Makers

**Who**: District collectors, state environment secretaries, forest department officials, members of State Biodiversity Boards, planners at NITI Aayog and Ministry of Environment.

**How they will use it**:
- **Infrastructure planning**: Before approving a highway, dam, railway, or industrial corridor, officials can see the FNE scores of affected landscapes. A highway through a landscape scoring 7.5 with high connectivity is a fundamentally different decision than one through a landscape already at 3.2. The tool makes the ecological stakes visible before the decision is made.
- **Prioritizing conservation investment**: State biodiversity boards can identify which landscapes are most critical (high ecological value but declining trajectory) and allocate resources accordingly.
- **Monitoring environmental programs**: After a reforestation or watershed program is implemented, re-running the FNE assessment shows whether functionality actually improved -- not just whether trees were planted.
- **Environmental clearance context**: EIA processes today are project-specific. The FNE tool provides the landscape-level context that is currently missing -- showing cumulative impacts across a region.

### 3.2 Philanthropic and Private Funders

**Who**: Foundations like Rainmatter, Rohini Nilekani Philanthropies, Azim Premji Foundation; corporate CSR departments; impact investors focused on nature-positive outcomes.

**How they will use it**:
- **Where to invest**: Funders can identify landscapes where their investment will have the highest impact -- either preserving high-functioning landscapes at risk or restoring degraded landscapes with recovery potential.
- **Evaluating grantees**: If a conservation organization claims to be improving ecosystem health in a specific landscape, the FNE score provides an independent benchmark. Is the landscape actually improving? Are the dimensions they're targeting showing movement?
- **Portfolio-level analysis**: A funder supporting 20 conservation projects across India can see all of them on one dashboard, compare their landscapes, and understand the collective impact.

### 3.3 Conservation Organizations

**Who**: Wildlife Conservation Society (WCS), Nature Conservation Foundation (NCF), Ashoka Trust for Research in Ecology and Environment (ATREE), Foundation for Ecological Security (FES), Wildlife Trust of India (WTI), and hundreds of smaller field organizations.

**How they will use it**:
- **Strategic planning**: Understand the broader landscape context of their work. An organization protecting a specific forest corridor can see how that corridor connects to surrounding landscapes and what the cumulative pressures are.
- **Communicating impact**: Translate complex ecological work into a language that funders, governments, and the public can understand. "We improved connectivity in this landscape from 4.2 to 5.8 over five years" is more compelling than technical reports.
- **Identifying gaps**: The dimension breakdown reveals which aspects of ecosystem health are most neglected in a landscape -- if community-nature reciprocity is the weakest dimension, that points to a need for community engagement programs rather than more tree planting.

### 3.4 Research Organizations and Think Tanks

**Who**: ATREE, Indian Institute of Science (IISc), Wildlife Institute of India (WII), Centre for Ecological Sciences, international research bodies.

**How they will use it**:
- **Research prioritization**: Identify landscapes with significant data gaps (low confidence scores) that need field research.
- **Hypothesis generation**: Cross-landscape comparisons can reveal patterns -- why do landscapes with indigenous communities consistently score higher on climate resilience? What's the relationship between road density and biodiversity decline across different ecoregions?
- **Validating frameworks**: Test the FNE scoring methodology against field data, improving the framework over time.

### 3.5 Media and Public Awareness

**Who**: Environmental journalists, documentary makers, educators, concerned citizens.

**How they will use it**:
- **Story identification**: Journalists can identify landscapes in crisis (rapidly declining scores) or success stories (improving scores) and investigate further.
- **Public communication**: A color-coded map of India showing ecosystem health is immediately understandable to any audience. It shifts the narrative from abstract environmental statistics to tangible, place-based understanding.

---

## 4. HOW THIS DATA EMPOWERS PEOPLE

### 4.1 From Invisible to Visible

Today, the health of India's ecosystems is largely invisible to the people making decisions about them. A district collector approving a mining lease has no dashboard showing the cumulative ecological impact of all mining, construction, and deforestation in that district. A state government expanding a highway network has no tool showing which routes would cause the least ecological damage. A funder choosing between two conservation proposals has no standardized way to compare the landscapes they operate in.

The FNE tool makes the invisible visible. It takes data that already exists -- in satellite imagery, in global databases, in research publications, in community knowledge -- and synthesizes it into an accessible, comparable, actionable format. The data was always there. What was missing was the sense-making layer.

### 4.2 From Reactive to Proactive

Most environmental decision-making in India is reactive. A crisis happens -- a species goes locally extinct, a river dries up, floods devastate a community -- and then action follows. The FNE tool enables proactive decision-making by showing trajectories. If a landscape is scoring 5.2 but declining at a rate that will push it below 3.0 within a decade, that's a signal to act now, before the crisis manifests. The tool turns slow-moving ecological decline into an early warning system.

### 4.3 From Siloed to Holistic

Environmental interventions today are typically siloed: one organization plants trees, another monitors water quality, another counts wildlife, another works with communities. Each sees their piece but not the whole picture. The FNE framework forces a holistic view by assessing all seven dimensions simultaneously. This reveals surprising connections: perhaps a landscape's biodiversity is declining not because of poaching but because of water stress (abiotic integrity) that's reducing forest productivity (ecosystem services) that's breaking habitat connectivity (ecological connectivity). The root cause is different from what a siloed analysis would suggest, and the intervention should be different too.

### 4.4 From Expert-Only to Democratized

Ecosystem health assessment has traditionally been the domain of ecologists and environmental scientists. The FNE tool democratizes this knowledge. A Panchayat president, a corporate sustainability officer, a school teacher, or a citizen activist should be able to open the tool, find their landscape, and understand its health in plain language. The 3-4 page reports are written for informed non-specialists, not for peer-reviewed journals. The scores are intuitive. The comparisons are visual. The tool respects the complexity of ecology while making it accessible.

### 4.5 From One-Time to Continuous

Unlike static reports (which are outdated by the time they're published), the FNE tool is designed for continuous updating. As new satellite data arrives, as new species observations are recorded, as new research is published, scores can be refreshed. This transforms ecosystem assessment from a one-time exercise into an ongoing monitoring system -- a vital sign tracker for landscapes.

---

## 5. WHAT IT WILL LOOK LIKE

### 5.1 The Landing Experience

When a user opens the FNE dashboard, they see:

- **A map of India** with every landscape polygon colored from red (collapsed/critical) through yellow (stressed/moderate) to green (good/excellent). The Western Ghats glow green. The heavily industrialized belts show red. The agricultural plains show yellow and orange. The pattern is immediately intuitive.
- **A search bar** where you can type "Agumbe" or "Kodagu" or "Karnataka" and jump directly to a landscape.
- **A scrollable list** of all landscapes, sortable by overall score, by state, by any dimension. The worst-performing landscapes are easy to find. So are the best.

### 5.2 The Landscape Detail View

Click on any landscape and you see:

- **A large, prominent FNE score** (e.g., "6.2 / 10 -- Moderate") with a color indicator
- **A radar chart** showing all seven dimensions at a glance -- the shape of the chart immediately reveals whether the landscape is balanced or has severe weaknesses
- **Seven dimension cards**, each showing the score, key drivers, and a one-line summary (e.g., "Ecological Connectivity: 4.1 -- Severe fragmentation from highway expansion and forest loss")
- **Weight adjustment sliders** -- seven sliders (one per dimension) that let the user re-weight the overall score in real-time. A water-focused funder might weight Abiotic Integrity higher; a biodiversity-focused funder might weight Wild Biodiversity higher. The overall score recalculates instantly.
- **The full 3-4 page report** -- expandable, with executive summary, dimension-by-dimension analysis, key strengths, critical concerns, priority actions, and data sources
- **A mini-map** showing this landscape in geographic context with neighboring landscapes

### 5.3 The Comparison View

Select two landscapes and see:

- **Side-by-side radar charts** overlaid on each other -- the shapes immediately show where one landscape outperforms the other
- **A dimension-by-dimension comparison table** with color-coded differences
- **A narrative summary** explaining the key differences and what drives them

### 5.4 The Polygon Drawing Feature

Draw a custom polygon on the map (e.g., around a proposed highway route, a district boundary, or a river basin) and the tool identifies all landscapes that intersect with it, showing their scores and highlighting which would be most affected.

---

## 6. THE CONCEPTUAL FRAMEWORK

### 6.1 What is a Functional Natural Ecosystem?

A Functional Natural Ecosystem is a place -- an ecoregion, bioregion, or landscape -- where the interactions and relationships between all components of the system are working well enough to sustain ecological health and deliver ecosystem services. The components include trees, water, soil, wildlife, microorganisms, and humans. "Functional" means these components are not just present but actively interacting in ways that maintain the system's integrity.

Every ecosystem keeps changing. As humans do things to ecosystems -- build roads, clear forests, dam rivers, introduce species, pollute water -- the functionality reduces. Some changes are reversible; others cross thresholds beyond which recovery becomes impossible without massive intervention. The FNE framework captures where a landscape sits on this spectrum at any given moment.

### 6.2 The Three Core Relationships

Everything in the FNE framework comes back to three sets of relationships:

**Human-Nature Relationships**
The people of Malnad (the hill country of Karnataka's Western Ghats) call the king cobra their cousin. They have traditional practices for coexisting with snakes, they put resources back into the landscape, there is a reciprocity between the human community and the natural system. This is why Agumbe scores high on Community-Nature Reciprocity. Contrast this with Bangalore's relationship to Bannerghatta National Park -- the city's residents are disconnected from the forest, there is no reciprocity, and the park is viewed as an obstacle to real estate development rather than a partner in quality of life.

**Nature-to-Nature Relationships**
If you had 100 pollinators per acre and it dropped to 40, pollination services have reduced. If a highway fragments a forest corridor and lion-tailed macaques can no longer move between habitat patches, genetic exchange stops and populations become vulnerable. These nature-to-nature relationships -- predator-prey dynamics, seed dispersal networks, mycorrhizal fungal connections, migratory routes -- are what make an ecosystem function. Counting species tells you what's there; measuring relationships tells you how well it's working.

**Nature-to-Abiotic Relationships**
A natural mangrove interacts with sediment, tidal flows, and storm surges in fundamentally different ways than a planted mangrove plantation. A forest with intact soil microbiome cycles nutrients differently than a degraded one. These relationships between living systems and their physical environment -- water, soil, minerals, climate -- determine the ecosystem's ability to regulate itself and provide services.

### 6.3 The Scoring Scale

| Score Range | Label | Meaning |
|------------|-------|---------|
| 0.0 - 1.0 | Collapsed | Ecosystem has lost fundamental structure and function. Cannot recover without massive, sustained intervention. Relationships have effectively ceased. |
| 1.0 - 3.0 | Critical | Severely degraded. Key functions failing. Some species and relationships persist but the system is in freefall. Urgent intervention needed to prevent collapse. |
| 3.0 - 5.0 | Stressed | Functioning under significant pressure. Declining trajectory. Ecosystem services noticeably compromised. The minimum viable threshold (3.0) represents the point below which core functions fail irreversibly. |
| 5.0 - 7.0 | Moderate | Functioning with notable pressures. Some services intact, others degraded. Mixed trajectory -- could improve or decline depending on decisions made. Most real-world landscapes in India fall in this range. |
| 7.0 - 8.0 | Good | Largely functional. Minor pressures exist but do not threaten core relationships. Most ecosystem services intact. This is a realistic aspirational target for restoration. |
| 8.0 - 9.0 | Excellent | Highly functional. The best real-world examples of this ecosystem type. Strong biodiversity, intact services, healthy human-nature relationships. The 8.0 mark represents the "best current example" reference point. |
| 9.0 - 10.0 | Pristine (theoretical) | Near-perfect functionality. Practically unachievable in the current era. 10/10 is a theoretical ideal -- the ecological potential of this ecosystem type if all relationships were at their optimum. |

### 6.4 Three Reference Points

For every ecosystem type, the scoring is anchored by three reference points:

- **10/10 -- Ecological Potential**: What this ecosystem type could theoretically be at its absolute best. This is the unachievable utopia -- a thought experiment, not a target. It exists so that the scale has a ceiling and every score can be understood as a fraction of potential.

- **8/10 -- Best Current Example**: The best real-world instance of this ecosystem type that exists today. For a tropical moist forest in the Western Ghats, this might be the core area of Silent Valley or the least disturbed parts of Agumbe. This is the realistic aspirational target -- proof that this level of functionality is possible.

- **3/10 -- Minimum Viable Threshold**: The point below which the ecosystem cannot sustain its core functions. Below 3, you are not dealing with a degraded ecosystem but a collapsed one -- recovery requires not just removing pressures but actively rebuilding the system from scratch.

These reference points ensure that scores are ecologically meaningful. A score of 6.0 means "functioning but under pressure, roughly midway between collapse and the best we've seen." This is more useful than an abstract number without anchoring.

---

## 7. THE SEVEN DIMENSIONS OF ECOSYSTEM FUNCTIONALITY

Each dimension represents a critical aspect of how well an ecosystem's relationships are functioning. Together, they provide a comprehensive picture.

### 7.1 Wild Biodiversity

**What it measures**: The richness, diversity, and functional completeness of native species in the landscape.

**Why it matters**: Biodiversity is not a checklist -- it is the fabric of nature-to-nature relationships. Every species plays roles in pollination, seed dispersal, pest control, nutrient cycling, or predator-prey dynamics. When species are lost, these relationships break down. A forest that looks green but has lost its hornbills has lost its primary seed disperser; the forest's ability to regenerate is silently compromised.

**What drives it up**: High mean species abundance, diverse taxonomic groups present (birds, mammals, amphibians, plants, insects), presence of apex predators indicating intact food webs, low invasive species pressure, large protected area coverage.

**What drives it down**: Habitat loss reducing viable populations, invasive species displacing natives, overexploitation (hunting, overfishing, NTFP overextraction), pollution affecting sensitive species, fragmentation isolating populations below minimum viability.

### 7.2 Ecological Connectivity

**What it measures**: How well habitat patches are connected, enabling wildlife movement, migration, genetic exchange, and ecological processes to flow across the landscape.

**Why it matters**: Even a perfectly healthy habitat patch will degrade over time if it is isolated. Animals need corridors to move between breeding grounds, seasonal ranges, and genetic pools. Plants need connected landscapes for seed dispersal. Rivers need unbroken flows for fish migration and nutrient transport. Connectivity is the circulatory system of a landscape -- when it is severed, even healthy organs (habitat patches) begin to die.

**What drives it up**: Large, contiguous habitat patches, intact forest corridors between protected areas, low road density, minimal fragmentation by infrastructure, rivers flowing freely without major dams or diversions.

**What drives it down**: Highway and railway construction cutting through habitats, urban expansion fragmenting landscapes, deforestation creating gaps between patches, dams blocking river connectivity, fencing preventing wildlife movement.

### 7.3 Ecosystem Services

**What it measures**: The tangible benefits that the ecosystem provides to human communities and the broader environment -- provisioning (food, water, timber, medicinal plants), regulating (flood control, pollination, climate regulation, water purification), and cultural (spiritual value, recreation, aesthetic beauty, traditional knowledge).

**Why it matters**: Ecosystem services are the translation of ecological functionality into human well-being. When an ecosystem is functional, it delivers clean water to downstream communities, pollinates crops in surrounding farmlands, regulates local climate, prevents flooding, and provides livelihoods. When functionality degrades, these services fail -- and the costs are borne by the most vulnerable communities.

**What drives it up**: High vegetation productivity (dense, healthy green cover), intact water regulation (forests absorbing rainfall, recharging groundwater, releasing water slowly), diverse provisioning resources, functioning pollination networks, high cultural and spiritual value recognized by communities.

**What drives it down**: Deforestation reducing water regulation, overextraction depleting provisioning services, pollution degrading water quality, loss of pollinators threatening crop yields, cultural disconnection reducing perceived value.

### 7.4 Climate Resilience

**What it measures**: The ecosystem's ability to absorb, adapt to, and recover from climate-related disturbances -- droughts, floods, heat waves, cyclones, changing rainfall patterns.

**Why it matters**: Climate change is already altering India's ecosystems. Landscapes that are resilient can absorb shocks and bounce back; fragile landscapes collapse. Resilience is determined by diversity (of species, habitats, and elevation zones), the naturalness of the ecosystem (natural systems are far more resilient than plantations), and the intactness of recovery mechanisms.

**What drives it up**: Topographic diversity (multiple elevation zones creating microclimatic refugia), high vegetation type diversity, natural (not planted) ecosystems, intact soil and water systems enabling post-disturbance recovery, low drought risk, stable seasonal patterns.

**What drives it down**: Monoculture plantations replacing diverse natural forests, loss of elevation diversity (e.g., lowland clearing leaving only mountaintops), degraded soils unable to absorb disturbances, extreme water variability, historical evidence of non-recovery from past disturbances.

### 7.5 Community-Nature Reciprocity

**What it measures**: The quality and depth of the relationship between human communities and the natural system they live in or adjacent to. This is the most uniquely "FNE" dimension -- the one that most existing frameworks neglect.

**Why it matters**: This is Sid Rao's core insight -- that ecosystems function best where humans are in reciprocal relationship with nature, not in opposition to it. Places with indigenous communities who have sustained traditional ecological practices for generations consistently show better ecosystem functionality than places where humans are disconnected, extractive, or absent. This is not sentimentality -- it is empirically observable. The people of Malnad, who worship snakes and sustain traditional agroforestry, have maintained a more functional landscape than the urban fringes of Bangalore where the same ecoregion has collapsed.

**What drives it up**: Documented traditional ecological practices, sacred groves and community-conserved areas, community-based natural resource management, low human-wildlife conflict (indicating coexistence), livelihood systems that depend on and sustain ecosystem health, cultural practices involving nature worship or reciprocity, research publications documenting positive human-nature relationships.

**What drives it down**: Urban disconnection from nature, loss of traditional knowledge as younger generations migrate, high human-wildlife conflict (indicating breakdown of coexistence), purely extractive livelihood patterns (mining, industrial agriculture with no stewardship), absence of community institutions for natural resource governance.

### 7.6 Abiotic Integrity

**What it measures**: The health of the non-living components of the ecosystem -- water systems, soil, air -- and the integrity of the relationships between living systems and these abiotic foundations.

**Why it matters**: Every living thing in an ecosystem depends on water, soil, and air. When groundwater tables collapse, forests die. When soil erodes, nothing can grow. When air quality degrades, sensitive species disappear. Abiotic integrity is the foundation on which all other dimensions rest -- it is the stage on which the ecological drama plays out. A landscape with collapsing water systems will inevitably see biodiversity decline, ecosystem services fail, and resilience vanish.

**What drives it up**: Low water stress, stable groundwater tables, low seasonal water variability, healthy soil (indicated by good vegetation cover on appropriate slopes), low flood risk (indicating intact natural water management), good air quality.

**What drives it down**: Groundwater overextraction (common in agricultural belts), river damming altering flow regimes, industrial pollution degrading water and air quality, deforestation causing soil erosion and water runoff, mining stripping topsoil, salinization from improper irrigation.

### 7.7 Anthropogenic Pressure

**What it measures**: The intensity, extent, and trajectory of human modification and encroachment on the ecosystem. This is an inverse dimension -- higher pressure means lower scores.

**Why it matters**: Human modification is the primary driver of ecosystem degradation globally. Roads fragment habitats, cities consume landscapes, agriculture simplifies ecosystems, mines scar terrain, and industrial activity pollutes water and air. Measuring anthropogenic pressure separately from its consequences (which are captured in the other six dimensions) provides a leading indicator -- pressure is the cause; the other dimensions measure the effects. A landscape might still score moderately well on biodiversity, but if anthropogenic pressure is rapidly increasing, decline is imminent.

**What drives the score up (lower pressure)**: Low human modification index, low road density, low population density, stable or declining land use change, no major infrastructure projects planned or underway, large distance from urban centers.

**What drives the score down (higher pressure)**: High human modification, dense road networks, rapid urbanization, accelerating forest loss, active mining or industrial projects, proposed infrastructure (highways, railways, dams), high and growing population density.

---

# PART B: THE HOW

---

## 8. LANDSCAPE DEFINITION METHODOLOGY

### 8.1 Principles

A "landscape" in the FNE tool must be:
- **Ecologically coherent**: Dominated by a single ecoregion/biome type, or a recognizable ecological transition
- **Appropriately sized**: 200-2000 sq km (target 200-540 sq km). Large enough to have meaningful ecological dynamics, small enough to be relatively homogeneous
- **Recognizable**: Named after the most well-known feature (national park, geographic region, cultural area)
- **Bounded by real features**: Rivers, mountain ridges, major roads, land use transitions -- not arbitrary grid lines

### 8.2 Algorithm for Landscape Delineation

```
Step 1: Load base layers
    - WWF Ecoregions 2017 (846 ecoregions globally, ~51 in India)
    - WDPA protected areas (national parks, wildlife sanctuaries as cores)
    - ESA WorldCover 10m (land cover classification)
    - SRTM 30m (elevation)
    - GRIP4 road density
    - Administrative boundaries (state, district)

Step 2: Create Protected Area Cores
    - Every national park and wildlife sanctuary > 100 sq km becomes a landscape core
    - Buffer by 5 km to include immediate surroundings
    - Name: "[Protected Area Name] Complex"

Step 3: Subdivide remaining ecoregion areas
    For each ecoregion polygon in India:
        a. If area < 2000 sq km: keep as single landscape
        b. If area > 2000 sq km:
            i.   Compute elevation zones (lowland/mid-elevation/montane using natural breaks)
            ii.  Compute dominant land cover clusters (forest-dominant, agriculture-dominant, mixed)
            iii. Use major roads (highway-class from GRIP4) as natural dividers
            iv.  Use district boundaries as tiebreakers
            v.   Apply connected-component analysis to identify contiguous landscape units
            vi.  If any resulting unit > 2000 sq km, subdivide further
            vii. If any resulting unit < 50 sq km, merge with nearest similar unit

Step 4: Name landscapes
    - Use protected area names where applicable
    - Use geographic/cultural names from gazetteers
    - Fallback: "[District] [Ecoregion] [Elevation zone]" (e.g., "Shimoga Western Ghats Lowland")

Step 5: Assign metadata
    - landscape_id (unique)
    - name
    - state
    - district(s)
    - ecoregion
    - biome
    - area_sqkm
    - centroid_lat, centroid_lon
    - geometry (polygon)

Step 6: Quality check
    - Visual review of boundaries on map
    - Cross-reference with known landscapes (Agumbe, Kodagu, BRT Hills, etc.)
    - Ensure no gaps or overlaps
```

### 8.3 Polygon Drawing Feature (User-Initiated)

When a user draws a polygon on the map:
1. Compute spatial intersection with all pre-defined landscape boundaries
2. Return all landscapes that have > 20% overlap with the drawn polygon
3. Display as a list with FNE scores, sorted by overlap percentage

---

## 9. DATA SOURCES & PROCESSING

### 9.1 Raster Data Processing

For each raster dataset, the processing pipeline:

#### GLOBIO4 MSA (Mean Species Abundance)
- **Input**: TerrestrialMSA_2015_World.tif (global, ~300m resolution)
- **Processing**:
  - Clip to India boundary
  - For each landscape polygon: compute zonal statistics (mean, min, max, std)
  - MSA value range: 0 (no biodiversity) to 1 (pristine)
- **Output**: mean_msa, min_msa, max_msa, std_msa per landscape
- **Maps to**: Wild Biodiversity dimension

#### WRI Aqueduct 4.0
- **Input**: Aqueduct40_baseline_annual CSV (global, sub-basin level)
- **Processing**:
  - Filter to India records (using country code IND or spatial join)
  - For each landscape polygon: spatial join with Aqueduct sub-basins
  - Extract: bws_score (water stress), bwd_score (water depletion), iav_score (interannual variability), sev_score (seasonal variability), gtd_score (groundwater decline), drr_score (drought risk), rfr_score (flood risk)
- **Output**: All water risk scores per landscape (0-5 scale each)
- **Maps to**: Abiotic Integrity dimension

#### ESA WorldCover 2021
- **Input**: 3x3 degree GeoTIFF tiles (10m resolution, 11 land cover classes)
- **Processing**:
  - Mosaic tiles covering India
  - For each landscape polygon: compute class distribution
  - Classes: Tree cover (10), Shrubland (20), Grassland (30), Cropland (40), Built-up (50), Bare (60), Snow/Ice (70), Water (80), Herbaceous wetland (90), Mangroves (95), Moss/lichen (100)
  - Compute: forest_pct, cropland_pct, builtup_pct, wetland_pct, grassland_pct
  - Compute: land_cover_diversity (Shannon diversity index across classes)
  - Compute: habitat_patch_count, mean_patch_size, largest_patch_index (fragmentation metrics)
- **Output**: Land cover percentages, diversity index, fragmentation metrics per landscape
- **Maps to**: Ecological Connectivity, Ecosystem Services, Anthropogenic Pressure

#### Hansen Global Forest Change 2000-2024
- **Input**: treecover2000, lossyear, gain GeoTIFF tiles (30m resolution)
- **Processing**:
  - Mosaic tiles for India
  - For each landscape polygon:
    - Compute tree cover in 2000 (% of pixels with treecover > 30%)
    - Compute total forest loss 2001-2024 (sum of lossyear pixels)
    - Compute forest loss by year (for trend analysis)
    - Compute forest gain (sum of gain pixels)
    - Compute net forest change = gain - loss
    - Compute annual loss rate = total loss / 24 years / forest area in 2000
    - Compute current forest cover estimate = treecover2000 - loss + gain
- **Output**: forest_cover_2000_pct, total_loss_ha, total_gain_ha, net_change_ha, annual_loss_rate, loss_trend (accelerating/decelerating/stable), current_forest_cover_pct
- **Maps to**: Ecological Connectivity, Anthropogenic Pressure, Climate Resilience

#### WorldPop Population Density
- **Input**: ind_pd_2020_1km.tif (India, 1km resolution)
- **Processing**:
  - For each landscape: compute mean, max, total population density
- **Output**: mean_pop_density, max_pop_density, total_population_estimate
- **Maps to**: Anthropogenic Pressure, Community-Nature Reciprocity (inverse)

#### Global Human Modification (gHM) 2022
- **Input**: HMv20240801_2022s_AA_300.tif (global, 300m resolution) + individual threat layers
- **Processing**:
  - Clip to India
  - For each landscape: compute mean gHM (0-1 scale)
  - If individual layers available: compute mean agriculture pressure, transportation, built-up, energy/mining separately
- **Output**: mean_ghm, mean_agriculture_pressure, mean_transportation_pressure, mean_builtup_pressure per landscape
- **Maps to**: Anthropogenic Pressure (this is essentially a pre-built composite indicator)

#### SRTM Elevation
- **Input**: GeoTIFF tiles (30m resolution, 8 chunks for India)
- **Processing**:
  - Mosaic tiles
  - For each landscape: compute mean_elevation, min_elevation, max_elevation, elevation_range, elevation_std
  - Compute slope from DEM (mean_slope, max_slope)
  - Elevation diversity = elevation_range / area (proxy for topographic complexity)
- **Output**: Elevation and slope statistics per landscape
- **Maps to**: Climate Resilience, Abiotic Integrity

#### MODIS NDVI
- **Input**: MOD13A2 GeoTIFF (India, 1km, 16-day composites for 2023-2024)
- **Processing**:
  - Compute annual mean NDVI per pixel (average of all 16-day composites)
  - Compute NDVI seasonal variability (coefficient of variation)
  - For each landscape: compute mean_ndvi, ndvi_cv (seasonal variability), ndvi_trend (comparing 2023 vs 2024)
- **Output**: mean_ndvi, ndvi_seasonal_variability, ndvi_trend per landscape
- **Maps to**: Ecosystem Services, Climate Resilience

### 9.2 Vector/Tabular Data Processing

#### WDPA Protected Areas
- **Input**: India shapefiles (points + polygons)
- **Processing**:
  - Spatial join with landscape polygons
  - For each landscape: count PAs, total PA area within landscape, PA coverage percentage
  - Extract IUCN categories (Ia, Ib, II, III, IV, V, VI)
  - Compute weighted PA score (higher weight for stricter protection categories)
- **Output**: pa_count, pa_area_ha, pa_coverage_pct, pa_weighted_score per landscape
- **Maps to**: Ecological Connectivity, Wild Biodiversity

#### GBIF Species Occurrences
- **Input**: India occurrences CSV (with lat/lon, species name, taxonomic group)
- **Processing**:
  - Spatial join with landscape polygons (assign each occurrence to a landscape)
  - For each landscape:
    - Count unique species (species_richness)
    - Count by taxonomic group (bird_species, mammal_species, plant_species, etc.)
    - Count threatened species (cross-reference with IUCN status in GBIF data)
    - Count endemic species (if flagged in data)
    - Compute observation density (observations per sq km -- proxy for survey effort)
  - Normalize by survey effort where possible
- **Output**: species_richness, bird_richness, mammal_richness, threatened_species_count, observation_density per landscape
- **Maps to**: Wild Biodiversity

#### ESVD Ecosystem Services Valuations
- **Input**: ESVD CSV (12,390 records, 310 India)
- **Processing**:
  - Filter to India records
  - For each landscape:
    - Match by proximity (lat/lon within landscape polygon)
    - Match by biome (ESVD biome matches landscape ecoregion)
    - Extract ecosystem service valuations (Int$/ha/year) by service type
    - Compute total ecosystem service value per hectare
  - Where no direct match: use biome-level India average
  - Where no India data: use global biome average (marked as low confidence)
- **Output**: total_es_value_per_ha, provisioning_value, regulating_value, cultural_value, matching_study_count per landscape
- **Maps to**: Ecosystem Services

#### GRIP4 Road Density
- **Input**: grip4_total_dens_m_km2.asc (global, ~10km resolution)
- **Processing**:
  - For each landscape: compute mean road density (meters of road per sq km)
- **Output**: mean_road_density per landscape
- **Maps to**: Ecological Connectivity, Anthropogenic Pressure

---

## 10. DIMENSION SCORING METHODOLOGY

### 10.1 General Approach

Each dimension score (0-10) is derived through a two-stage process:

**Stage 1: Quantitative Base Score (0-10)**
Computed from the available quantitative indicators using normalization and weighted combination.

**Stage 2: AI Adjustment (-2 to +2)**
AI reviews qualitative data (research papers, news, cultural information) and adjusts the base score by up to 2 points in either direction, with written justification.

**Final Dimension Score** = Clamp(Quantitative Base + AI Adjustment, 0, 10)

### 10.2 Quantitative Scoring Per Dimension

#### Dimension 1: Wild Biodiversity (0-10)

```
Indicators:
  A = mean_msa (GLOBIO, 0-1 scale) -> rescale to 0-10
  B = species_richness (GBIF) -> percentile rank across all landscapes -> rescale to 0-10
  C = threatened_species_count -> inverse percentile (more threatened = lower score) -> 0-10
  D = pa_coverage_pct (WDPA) -> rescale (0% = 0, 100% = 10)

Formula:
  Biodiversity_Base = 0.35*A + 0.30*B + 0.20*C + 0.15*D

Note: Weights within a dimension are fixed (not user-adjustable).
User-adjustable weights only apply to how the 7 dimensions combine into the overall score.
```

#### Dimension 2: Ecological Connectivity (0-10)

```
Indicators:
  A = largest_patch_index (WorldCover) -> percentile -> 0-10
  B = mean_road_density (GRIP4) -> inverse percentile (less road = better) -> 0-10
  C = pa_coverage_pct (WDPA) -> 0-10
  D = forest_loss_rate (Hansen) -> inverse (less loss = better) -> 0-10
  E = forest_cover_pct (WorldCover) -> rescale -> 0-10

Formula:
  Connectivity_Base = 0.25*A + 0.20*B + 0.15*C + 0.20*D + 0.20*E
```

#### Dimension 3: Ecosystem Services (0-10)

```
Indicators:
  A = mean_ndvi (MODIS) -> rescale to 0-10 (0=barren, 0.8+=lush)
  B = total_es_value_per_ha (ESVD) -> percentile -> 0-10
  C = forest_cover_pct (WorldCover) -> proxy for regulating services -> 0-10
  D = water_stress_score (Aqueduct) -> inverse (lower stress = better services) -> 0-10

Formula:
  EcoServices_Base = 0.30*A + 0.25*B + 0.25*C + 0.20*D
```

#### Dimension 4: Climate Resilience (0-10)

```
Indicators:
  A = elevation_range (SRTM) -> rescale (more range = more diverse microclimates) -> 0-10
  B = land_cover_diversity (WorldCover Shannon index) -> rescale -> 0-10
  C = drought_risk_score (Aqueduct) -> inverse -> 0-10
  D = forest_gain_loss_ratio (Hansen gain/loss) -> rescale -> 0-10
  E = ndvi_seasonal_variability (MODIS CV) -> inverse (lower CV = more stable) -> 0-10

Formula:
  Resilience_Base = 0.20*A + 0.20*B + 0.20*C + 0.20*D + 0.20*E
```

#### Dimension 5: Community-Nature Reciprocity (0-10)

```
Indicators:
  A = pop_density (WorldPop) -> non-linear transform (very high = bad, very low = neutral, moderate indigenous = good)
  B = pa_coverage_pct (WDPA community reserves/OECMs) -> 0-10
  C = matching_esvd_cultural_value (ESVD cultural service records) -> 0-10

Note: This dimension relies HEAVILY on AI qualitative assessment (Stage 2).
The quantitative base provides only a rough starting point (weight 40%).
AI adjustment is given more latitude here (up to +/- 3 points).

Formula:
  Reciprocity_Base = 0.30*A + 0.35*B + 0.35*C
  (This will typically be 3-6, with AI doing heavy lifting based on qualitative research)
```

#### Dimension 6: Abiotic Integrity (0-10)

```
Indicators:
  A = water_stress_score (Aqueduct bws) -> inverse -> 0-10
  B = groundwater_decline_score (Aqueduct gtd) -> inverse -> 0-10
  C = flood_risk_score (Aqueduct rfr) -> inverse -> 0-10
  D = mean_slope (SRTM) -> proxy for soil erosion potential -> moderate = good -> 0-10
  E = seasonal_water_variability (Aqueduct sev) -> inverse -> 0-10

Formula:
  Abiotic_Base = 0.25*A + 0.20*B + 0.15*C + 0.15*D + 0.25*E
```

#### Dimension 7: Anthropogenic Pressure (0-10)

```
Note: This dimension is INVERTED -- higher raw pressure = LOWER score.

Indicators:
  A = mean_ghm (gHM, 0-1) -> invert and rescale: (1 - ghm) * 10
  B = mean_road_density (GRIP4) -> inverse percentile -> 0-10
  C = pop_density (WorldPop) -> inverse log-transform -> 0-10
  D = forest_loss_rate (Hansen) -> inverse -> 0-10
  E = builtup_pct (WorldCover) -> inverse -> 0-10

Formula:
  Pressure_Base = 0.30*A + 0.15*B + 0.20*C + 0.20*D + 0.15*E
```

### 10.3 Normalization Strategy

All percentile-based indicators are computed across the full set of Indian landscapes:
- Rank each landscape on each indicator
- Convert to percentile (0-100)
- Rescale to 0-10

This means scores are **relative** -- a landscape's score reflects how it compares to all other Indian landscapes, not an absolute standard. This aligns with Sid's philosophy of comparative accuracy.

### 10.4 Confidence Scoring

Each dimension score gets a confidence level:

| Confidence | Criteria |
|-----------|---------|
| **High** | 3+ quantitative indicators available with good spatial coverage + qualitative data found |
| **Medium** | 2+ quantitative indicators available, some gaps, limited qualitative data |
| **Low** | 1 or fewer quantitative indicators, heavy reliance on AI qualitative assessment or biome-level proxies |

---

## 11. OVERALL FNE SCORE COMPUTATION

### 11.1 Default (Equal Weights)

```
FNE_Score = (1/7) * (Biodiversity + Connectivity + EcoServices + Resilience + Reciprocity + Abiotic + Pressure)
```

### 11.2 User-Adjusted Weights

The frontend provides 7 sliders (default value 1.0 each, adjustable 0-3).

```
weights = [w1, w2, w3, w4, w5, w6, w7]  // user-set
normalized_weights = [wi / sum(weights) for wi in weights]
FNE_Score = sum(normalized_weights[i] * dimension_scores[i] for i in 0..6)
```

The recalculation happens **client-side** in real-time as the user moves sliders. No API call needed.

---

## 6. AI REPORT GENERATION METHODOLOGY

### 6.1 Per-Landscape Report Structure

Each landscape gets a 3-4 page report with this structure:

```
# [Landscape Name] - FNE Assessment Report

## Executive Summary
- Overall FNE score: X.X / 10 ([Label])
- One paragraph summarizing the landscape's health, trajectory, and critical issues
- Key finding: one sentence headline

## Landscape Profile
- Location: [State, District, Ecoregion]
- Area: X sq km
- Biome: [Biome type]
- Key features: [Notable geographic/ecological features]
- Human context: [Population, major settlements, livelihoods]

## Dimension Scores

### 1. Wild Biodiversity: X.X / 10
- Key drivers: [what's pushing score up/down]
- Data highlights: [specific numbers -- MSA value, species count, threatened species]
- Qualitative findings: [from research papers, reports]

### 2. Ecological Connectivity: X.X / 10
[same structure]

### 3. Ecosystem Services: X.X / 10
[same structure]

### 4. Climate Resilience: X.X / 10
[same structure]

### 5. Community-Nature Reciprocity: X.X / 10
[same structure]

### 6. Abiotic Integrity: X.X / 10
[same structure]

### 7. Anthropogenic Pressure: X.X / 10
[same structure]

## Key Strengths
- Bullet list of what's working well

## Critical Concerns
- Bullet list of what's deteriorating or at risk

## Priority Actions
- Ranked list of recommended interventions

## Data Sources & Methodology Note
- List of all data sources used for this landscape
- Any data gaps flagged
- Confidence level explanation
```

### 6.2 AI Prompt Template

For each landscape, the Claude API receives:

```
You are an ecosystem health assessment expert. Analyze the following landscape
and generate dimension scores and a detailed report.

LANDSCAPE: [Name], [State], [Ecoregion]
AREA: [X] sq km
COORDINATES: [centroid lat/lon]

QUANTITATIVE INDICATORS:
[All indicators from data pipeline, formatted as a table]

EXISTING STUDIES ABOUT THIS AREA:
[ESVD matching records]
[GBIF species highlights]

QUALITATIVE RESEARCH FINDINGS:
[Results from web search for research papers about this landscape]
[Results from news search about recent developments]
[Any anthropological/cultural studies found]

SCORING RUBRIC:
[The 0-10 scale definition from Section 1.2]

INSTRUCTIONS:
1. For each of the 7 dimensions, provide:
   - A score (0-10, one decimal place)
   - A confidence level (HIGH/MEDIUM/LOW)
   - Top 3 drivers for this score
   - A 2-3 sentence justification referencing specific data points
2. Generate a complete landscape report following the template below.
3. Be specific -- cite actual numbers, actual species names, actual project names.
4. Where data is missing, say so explicitly rather than guessing.
5. The score should reflect COMPARATIVE position relative to other Indian landscapes.

[Report template inserted here]
```

### 6.3 Batch Processing Strategy

For processing all landscapes across India:
1. Process in batches of 20 landscapes
2. Review first batch manually for quality and consistency
3. Adjust prompt if needed
4. Process remaining batches
5. Spot-check 10% of outputs
6. Store all reports in database with generation metadata (model version, date, prompt version)

---

## 7. IMPLEMENTATION PLAN - PHASE 1: DATA PIPELINE

### Step 1.1: Project Setup
- Initialize Python project with dependencies (geopandas, rasterio, rasterstats, shapely, fiona, pandas, numpy, sqlalchemy, psycopg2)
- Set up PostgreSQL + PostGIS database
- Create directory structure for raw data, processed data, outputs
- Create configuration file with file paths and parameters

### Step 1.2: Data Ingestion
- Unzip all datasets to organized directories
- Validate each dataset (check projections, extents, resolution)
- Clip global rasters to India bounding box (saves processing time for all subsequent steps)
- Convert any non-standard formats (ASCII to GeoTIFF, GDB to Shapefile if needed)
- Load Aqueduct CSV and ESVD CSV into database tables

### Step 1.3: Landscape Boundary Generation
- Implement the algorithm from Section 2.2
- Generate landscape polygons for all of India
- Quality check: visualize on map, review sample areas
- Load into PostGIS as the `landscapes` table

### Step 1.4: Zonal Statistics Extraction
- For each raster dataset, compute zonal statistics for all landscape polygons
- Use rasterstats library for efficient extraction
- Store results in `landscape_indicators` table
- This is the most computationally intensive step (especially WorldCover at 10m)

### Step 1.5: Vector/Tabular Processing
- Process WDPA: spatial join with landscapes, compute PA metrics
- Process GBIF: spatial join occurrences to landscapes, compute biodiversity metrics
- Process ESVD: match studies to landscapes by location and biome
- Process GRIP4: zonal statistics for road density
- Store all results in `landscape_indicators` table

### Step 1.6: Validation
- Spot-check indicator values for known landscapes (Agumbe, Kodagu, Bannerghatta)
- Verify that relative rankings make sense (Agumbe should have better biodiversity than Bannerghatta)
- Check for nulls, outliers, impossible values
- Document data coverage per landscape (% of indicators with data)

### Estimated Output
- ~500-1500 landscape polygons covering India
- ~30-40 quantitative indicators per landscape
- All stored in PostGIS database

---

## 8. IMPLEMENTATION PLAN - PHASE 2: SCORING ENGINE

### Step 2.1: Quantitative Score Computation
- Implement the scoring formulas from Section 4.2
- Compute percentile ranks across all landscapes for each indicator
- Compute base scores for all 7 dimensions for all landscapes
- Store in `landscape_scores` table

### Step 2.2: Qualitative Data Collection
- For each landscape, compile a research brief:
  - Search for academic papers about the region (use AI web search or pre-compiled database)
  - Search for news articles about recent developments
  - Search for government reports or EIA documents
  - Compile cultural/anthropological references
- Store qualitative briefs in `landscape_qualitative` table

### Step 2.3: AI Score Adjustment & Report Generation
- Set up Claude API integration
- Create prompt templates (Section 6.2)
- For each landscape:
  - Compile quantitative profile + qualitative brief
  - Call Claude API with structured prompt
  - Parse response: extract adjusted dimension scores + full report
  - Validate: ensure scores are within bounds, report follows template
  - Store in `landscape_scores` (adjusted) and `landscape_reports`
- Process in batches with manual review checkpoints

### Step 2.4: Build FastAPI Backend
- Implement REST API endpoints (Section 10)
- Serve landscape data, scores, reports from PostGIS
- Implement spatial query for polygon intersection
- Implement comparison endpoint
- Add caching for frequently accessed landscapes
- Deploy locally or on cloud

### Estimated Output
- 7 dimension scores + overall score per landscape
- 3-4 page report per landscape
- Working REST API

---

## 9. IMPLEMENTATION PLAN - PHASE 3: FRONTEND DASHBOARD

### Owned by Gemini (see Handoff Document Section 10 for details)

### Key Requirements
1. React app with React Router
2. Interactive map (Leaflet/MapLibre GL) with:
   - Landscape polygons color-coded by FNE score
   - Polygon drawing tool
   - Click-to-detail navigation
3. Landscape detail page with:
   - Score display, radar chart, dimension cards
   - Weight adjustment sliders (real-time recalculation)
   - Full report (markdown to HTML)
4. Comparison page (2 landscapes side-by-side)
5. Search and filter (by name, state, ecoregion, score range)
6. Responsive design
7. Design reference: existing index.html prototype

### Gemini Needs from Phase 2
- API specification document
- Sample GeoJSON (5-10 landscape polygons)
- Sample JSON responses (scores, reports)
- The index.html prototype file

---

## 10. API SPECIFICATION

### Endpoints

#### GET /api/landscapes
List all landscapes with basic info and overall scores.

```json
// Query parameters:
// ?state=Karnataka&min_score=5.0&max_score=10.0&sort=score_desc&page=1&per_page=50

// Response:
{
  "total": 1247,
  "page": 1,
  "per_page": 50,
  "landscapes": [
    {
      "id": "ls_001",
      "name": "Agumbe Rainforest",
      "state": "Karnataka",
      "district": "Shimoga",
      "ecoregion": "North Western Ghats Moist Deciduous Forests",
      "area_sqkm": 312,
      "centroid": [75.09, 13.50],
      "fne_score": 8.3,
      "score_label": "Excellent",
      "dimension_scores": {
        "wild_biodiversity": 8.7,
        "ecological_connectivity": 8.1,
        "ecosystem_services": 8.5,
        "climate_resilience": 8.0,
        "community_nature_reciprocity": 8.8,
        "abiotic_integrity": 7.9,
        "anthropogenic_pressure": 8.1
      },
      "confidence": "HIGH"
    }
  ]
}
```

#### GET /api/landscapes/{id}
Full landscape detail including scores, drivers, and report.

```json
{
  "id": "ls_001",
  "name": "Agumbe Rainforest",
  "state": "Karnataka",
  "district": "Shimoga",
  "ecoregion": "North Western Ghats Moist Deciduous Forests",
  "biome": "Tropical and Subtropical Moist Broadleaf Forests",
  "area_sqkm": 312,
  "centroid": [75.09, 13.50],
  "geometry": { "type": "Polygon", "coordinates": [...] },
  "fne_score": 8.3,
  "score_label": "Excellent",
  "dimensions": [
    {
      "name": "Wild Biodiversity",
      "score": 8.7,
      "confidence": "HIGH",
      "drivers": [
        {"name": "Mean Species Abundance", "value": 0.82, "unit": "MSA", "source": "GLOBIO4"},
        {"name": "Species Richness", "value": 487, "unit": "species", "source": "GBIF"},
        {"name": "Threatened Species", "value": 23, "unit": "species", "source": "GBIF/IUCN"}
      ],
      "justification": "Agumbe's rainforest supports exceptionally high biodiversity..."
    }
    // ... 6 more dimensions
  ],
  "report": "# Agumbe Rainforest - FNE Assessment Report\n\n## Executive Summary\n...",
  "report_generated_date": "2026-02-15",
  "data_sources": ["GLOBIO4", "GBIF", "WRI Aqueduct", "ESA WorldCover", "Hansen GFC", "WDPA", "ESVD"],
  "key_strengths": ["Exceptional bird diversity", "Strong community conservation tradition"],
  "critical_concerns": ["Increasing tourism pressure", "Climate change affecting rainfall patterns"],
  "priority_actions": ["Maintain habitat corridor to Kudremukh", "Support traditional rainforest stewardship practices"]
}
```

#### POST /api/landscapes/within-polygon
Find landscapes within a user-drawn polygon.

```json
// Request:
{
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[74.5, 12.0], [76.0, 12.0], [76.0, 14.0], [74.5, 14.0], [74.5, 12.0]]]
  }
}

// Response:
{
  "landscapes": [
    {"id": "ls_001", "name": "Agumbe Rainforest", "overlap_pct": 100, "fne_score": 8.3},
    {"id": "ls_002", "name": "Kodagu Coffee Region", "overlap_pct": 85, "fne_score": 6.2}
  ]
}
```

#### GET /api/landscapes/{id}/compare/{id2}
Compare two landscapes.

```json
{
  "landscape_1": { /* full landscape object */ },
  "landscape_2": { /* full landscape object */ },
  "comparison": {
    "overall_difference": 2.1,
    "better_landscape": "ls_001",
    "dimension_comparison": [
      {"dimension": "Wild Biodiversity", "ls1_score": 8.7, "ls2_score": 6.5, "difference": 2.2},
      // ...
    ],
    "summary": "Agumbe Rainforest significantly outperforms Kodagu Coffee Region..."
  }
}
```

#### GET /api/landscapes/geojson
Return all landscape boundaries as GeoJSON for map rendering.

```json
// Query: ?state=Karnataka (optional filter)
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "ls_001",
        "name": "Agumbe Rainforest",
        "fne_score": 8.3,
        "score_label": "Excellent"
      },
      "geometry": { "type": "Polygon", "coordinates": [...] }
    }
  ]
}
```

---

## 11. DATABASE SCHEMA

```sql
-- Core tables

CREATE TABLE landscapes (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    state VARCHAR(100),
    district VARCHAR(200),
    ecoregion VARCHAR(200),
    biome VARCHAR(200),
    area_sqkm FLOAT,
    centroid_lat FLOAT,
    centroid_lon FLOAT,
    geometry GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_landscapes_geom ON landscapes USING GIST(geometry);
CREATE INDEX idx_landscapes_state ON landscapes(state);
CREATE INDEX idx_landscapes_ecoregion ON landscapes(ecoregion);

CREATE TABLE landscape_indicators (
    id SERIAL PRIMARY KEY,
    landscape_id VARCHAR(20) REFERENCES landscapes(id),
    indicator_name VARCHAR(100) NOT NULL,
    indicator_value FLOAT,
    unit VARCHAR(50),
    source VARCHAR(100),
    source_year INTEGER,
    confidence VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(landscape_id, indicator_name)
);

CREATE INDEX idx_indicators_landscape ON landscape_indicators(landscape_id);

CREATE TABLE landscape_scores (
    id SERIAL PRIMARY KEY,
    landscape_id VARCHAR(20) REFERENCES landscapes(id),
    dimension VARCHAR(50) NOT NULL,
    quantitative_base_score FLOAT,
    ai_adjustment FLOAT,
    final_score FLOAT,
    confidence VARCHAR(20),
    top_drivers JSONB,
    justification TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(landscape_id, dimension)
);

CREATE INDEX idx_scores_landscape ON landscape_scores(landscape_id);

CREATE TABLE landscape_reports (
    id SERIAL PRIMARY KEY,
    landscape_id VARCHAR(20) REFERENCES landscapes(id) UNIQUE,
    overall_fne_score FLOAT,
    score_label VARCHAR(50),
    report_markdown TEXT,
    key_strengths JSONB,
    critical_concerns JSONB,
    priority_actions JSONB,
    data_sources JSONB,
    ai_model_version VARCHAR(50),
    prompt_version VARCHAR(20),
    generated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE landscape_qualitative (
    id SERIAL PRIMARY KEY,
    landscape_id VARCHAR(20) REFERENCES landscapes(id),
    source_type VARCHAR(50), -- 'research_paper', 'news', 'government_report', 'anthropological'
    title VARCHAR(500),
    summary TEXT,
    url VARCHAR(1000),
    relevance_score FLOAT,
    collected_at TIMESTAMP DEFAULT NOW()
);

-- ESVD reference table
CREATE TABLE esvd_studies (
    value_id INTEGER PRIMARY KEY,
    study_id INTEGER,
    biome VARCHAR(200),
    ecosystem VARCHAR(200),
    ecosystem_service VARCHAR(200),
    country VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    value_intl_dollar_per_ha_yr FLOAT,
    authors VARCHAR(500),
    title VARCHAR(500),
    year_published INTEGER,
    geometry GEOMETRY(Point, 4326)
);

CREATE INDEX idx_esvd_geom ON esvd_studies USING GIST(geometry);
```

---

## 12. QUALITY ASSURANCE & VALIDATION

### 12.1 Pilot Validation (Before Full Run)

Select 5 well-known landscapes for pilot validation:
1. **Agumbe Rainforest** (expected: high score, 7.5-8.5)
2. **Kodagu Coffee Region** (expected: moderate, 5.5-6.5)
3. **Bannerghatta Periphery** (expected: low, 3.0-4.5)
4. **BRT Hills** (expected: moderate-high, 6.0-7.5)
5. **Dandeli-Anshi** (expected: high, 7.0-8.0)

For each pilot landscape:
- Manually review all quantitative indicators for correctness
- Read the AI-generated report and verify factual claims
- Compare scores against expert intuition (Sid Rao's assessments)
- Adjust scoring formulas or AI prompts if needed

### 12.2 Consistency Checks

- No landscape should score > 9.0 overall (per Sid: 10 is unachievable)
- Urban-adjacent landscapes should score lower on Anthropogenic Pressure
- Protected area cores should score higher on Wild Biodiversity
- Western Ghats landscapes should generally score higher than Deccan Plateau
- Heavily irrigated agricultural areas should have low Abiotic Integrity (water stress)

### 12.3 Edge Case Handling

- **No GBIF data**: Some remote landscapes may have zero species occurrences. Flag as "insufficient data" for Wild Biodiversity rather than scoring 0.
- **No ESVD match**: Use biome-level average, flag as low confidence.
- **Coastal/marine boundaries**: Clip landscapes to land area only; exclude ocean pixels from zonal statistics.
- **Urban landscapes**: Very high human modification landscapes may score near 0 on multiple dimensions. This is correct behavior -- flag but don't artificially inflate.

---

## 13. SCALABILITY CONSIDERATIONS

### 13.1 Computational

- WorldCover at 10m and Hansen at 30m are the heaviest rasters. Pre-clip to India and process in parallel by landscape.
- GBIF India dataset may have 50M+ records. Pre-index by spatial grid before joining to landscapes.
- Consider using Dask or multiprocessing for parallel zonal statistics.

### 13.2 Storage

- Estimated database size: ~500 MB for indicators + scores, ~200 MB for landscape geometries, ~500 MB for reports (text)
- Raw raster data: ~30-40 GB (keep as reference, not in database)
- Total: ~1.2 GB database + 30-40 GB raw files

### 13.3 API Performance

- Cache the GeoJSON endpoint (landscape boundaries change infrequently)
- Pre-compute the landscapes list endpoint (with scores) as a materialized view
- Reports are static text -- serve from cache after first load
- Polygon intersection queries are fast with PostGIS GIST index

### 13.4 Future Expansion

- **Temporal tracking**: Re-run scoring annually as new data arrives (Hansen, WorldCover updates, new GBIF records)
- **Drill-down**: Allow sub-landscape analysis for Panchayat-level insights (future phase per Sid)
- **Additional countries**: Framework is not India-specific; the methodology applies to any geography with these datasets
- **User contributions**: Allow field researchers to submit qualitative data that adjusts scores (long-term)
