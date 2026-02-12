# Functional Natural Ecosystems

Self-contained publication repository for the Functional Natural Ecosystems (FNE) project.

This repo includes:

- `webapp/`: production-ready React + Vite dashboard frontend
- `data/final/`: final database outputs used for analysis and scoring
- `docs/methodology/`: methodology, handoff, and execution context documents
- `.github/workflows/`: GitHub Pages deployment workflow

## Repository Structure

```text
functional-natural-ecosystems/
  webapp/
  data/final/
  docs/methodology/
  .github/workflows/
```

## What Is Included In `data/final`

- `landscape_indicators.csv`
- `landscape_scores.csv`
- deep validation outputs
- pilot validation/calibration outputs
- indicator usage coverage reports

## Local Run (Web App)

```bash
cd webapp
npm ci
npx vite
```

## Build (Web App)

```bash
cd webapp
npm ci
npx vite build
```

## GitHub Pages Deployment

Push to `main` and GitHub Actions deploys `webapp/dist` automatically.

After first push:

1. Open repository `Settings`
2. Open `Pages`
3. Set source to `GitHub Actions`
4. Re-run workflow if needed

## Security/Sanitization

- Local machine absolute paths are redacted from publication docs.
- API keys are redacted from publication docs.
- Heavy raw rasters are intentionally excluded to keep this repo practical.
