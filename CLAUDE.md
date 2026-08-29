# Dadar Athornan Institute — website

Astro + Tailwind static site for a real institution, live at
https://dadarathornaninstitute.org. All page content comes from JSON in
`src/data/`; pages under `src/pages/` read it through `src/lib/data.ts`.

## Deploying

**Pushing to `main` auto-deploys to the live public site** via
`.github/workflows/`. Work on a branch and let the maintainer decide when to
merge, unless he has explicitly said to ship. Never touch DNS,
`.github/workflows/`, or `astro.config.mjs` without being asked.

Run `npm run build` before proposing any content change.

## The same fact lives in more than one file — always audit both

`src/data/activities/*.json` (the Annual Reports page) and the
`latestHighlights` array in `src/data/education.json` (the homepage
"Latest from the Institute" panel) **describe the same events**. There is no
code linking them, so they drift silently and the homepage ends up contradicting
the reports.

**Whenever you change an activities file, audit `latestHighlights` in the same
pass, and vice versa.**

`latestHighlights` tracks the **current academic year** — the one
`getCurrentStudentYear()` in `src/lib/data.ts` returns, i.e. the newest file in
`src/data/students/`. That is *not* the same as the newest year in
`activities/`, which is the last year Ramiyar sir has actually written a report
for and normally lags a year behind. Getting these two confused is what put the
previous year's admissions on the homepage.

Check specifically:

- the roster facts (new admissions, strength) come from the **current**
  `students/` file — new admissions are the names in it that are absent from the
  previous year's file;
- the SSC line names the **latest** cohort in `achievers/ssc.json`;
- names, standards and dates match the corresponding `activities/*.json` entry
  word for word;
- no year is asserted that the source document does not actually state;
- nothing is carried over from a previous year that has silently gone stale —
  a Head Boy who has since left school, a Navar or Maratab from an earlier year.
  If there is no current-year source for a line, **drop it and ask**, rather
  than leaving last year's in place.

Before editing either one, read both, and say what you found in the other.

## How SSC results are filed

A boy in Std X during academic year Y sits the SSC examination in the February
of Y+1. **SSC N therefore belongs to academic year (N-1)/N** — SSC 2026 is
2025-26, SSC 2025 is 2024-25, and so on. Each year on the Annual Reports page
carries exactly **one** SSC cohort.

Ramiyar sir's report documents do *not* follow this. He types a result into
whichever report he is writing when it arrives, which lags it by a year — his
2022-23 report is headed "From June 2022 to May 2023" yet carries SSC 2022.
Do not reproduce that lag; it puts two cohorts on one year.

## Everything on the site must trace to a source document

The source documents are Ramiyar sir's mail attachments, held in
`projects/dadarathornaninstitute/ramiyar/` (21 files, 13 Jun 2026) and
`projects/refinalizingdomaintransferemail/` (8 files, 18 Aug 2026 — a subset).
`ANNUAL-REPORTS-AUDIT.md` records which line of which document every activities
entry came from.

An earlier commit filled gaps with invented, plausible-sounding filler
("Annual Jashan celebrated with full priestly rituals", "Prize-giving ceremony
held to felicitate students…") which went live on a real institution's site.
**Never write a fact that is not in a source document.** If a year has no
report, say so on the page and flag it — do not compose one. If a source is
internally inconsistent, reproduce it as written and flag it for the Principal
rather than silently correcting it.

There is no report for **2023-24**; that gap is real, not an oversight.

## Names

Spellings vary across the documents (Berjis/Barjis, Maidyarem/Maidhyarem,
Pashang/Pashaang, Jahaun/Jehaun, Ziyan/Ziyaan, Rushad/Rushaad,
Panthaki/Panthaky). Leave each as the source has it and flag it; the only
site-wide normalisation in force is Zhiyan → **Zhian**.
