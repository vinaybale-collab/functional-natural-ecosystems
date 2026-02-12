# Deep Validation Audit Report

Generated: 2026-02-12T16:44:04

## Summary

- Landscapes: **22199**
- Indicators: **73**
- Total issues: **1370**
- Severity breakdown: `{'low': 1370, 'high': 0, 'medium': 0}`
- Category breakdown: `{'cross_indicator': 1369, 'coverage': 1}`

## Highest-Priority Fix Queue

1. Raise low-coverage indicators (<60%) where model impact is high (ESVD, WorldPop, Aqueduct gaps by geography).
2. Resolve cross-indicator consistency breaches (elevation ordering/range and land-cover sum anomalies).

## Top Problem Indicators

- `natural_cover_pct`: 1369 issues
- `pa_area_sqkm`: 1 issues

## Next Tasks

1. Calibrate dimension weights/transform logic using pilot deltas and rerun `s06` + `s07`.
2. Add automated quality gate that fails pipeline on new high-severity issues.
3. Wire frontend to audit metadata (data freshness, coverage confidence by indicator).