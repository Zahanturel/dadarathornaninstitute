# DAI Website — Review Guide (June 2026)

**Preview URL (current):** https://zahanturel.github.io/dadarathornaninstitute/

**Custom domain:** `dadarathornaninstitute.org` — not connected yet; still serving an older site until transfer. Deploy pipeline publishes to GitHub Pages only.

This document summarizes what changed for review by the site owner and Er. Dr. Ramiyar P. Karanjia.

---

## What Changed (Summary)

### Content updated to June 2026 materials
- **Students:** Current list is 2025–26; 2023–24 archived at `/students/2023-24`
- **Achievers:** SSC through 2026; updated Nirang-din counts; Nirang-din table shown first
- **Books:** 20 titles with June 2026 prices; note that books must be bought at Institute (no courier)
- **Donation schemes:** Updated amounts (part sponsorship ₹50,000; Baj-Rojgar ₹60,000; revised meal prices)
- **Mandal:** June 2026 Board of Trustees and office bearers
- **Annual reports:** Added 2023–24, 2024–25, 2025–26; all prior years preserved

### New pages
| Page | URL |
|------|-----|
| Donate | `/donate` |
| Our Logo | `/logo` |
| Photo Gallery | `/gallery` |
| Education & Syllabus | `/education` |
| Ex-Students | `/ex-students` |
| Downloads | `/downloads` |
| Students archive | `/students/2023-24` |

### Navigation (5 sections + Contact)
- **Donate** — schemes, bank details, receipt instructions
- **Admissions**
- **Institute** — History, Logo, Gallery, Mandal, Education
- **Community** — Achievers, Students, Ex-Students, Books, Downloads
- **Reports** — annual activities by year
- **Contact**

### Homepage
- Official logo and building photo in hero
- Three paths: Donate, Admissions, Explore Archive
- Latest highlights from 2025–26 report

### Assets added
- Official colour logo (`public/images/logo.jpg`)
- 7 gallery photos including 1983 group photo
- Syllabus DOC files in `public/downloads/syllabus/`
- Updated alumni XLS (`public/dai_alumni_complete_list_jul_12.xls`)

### Redirect
- `/help` redirects to `/donate` (bookmarks preserved)

---

## Items for Ramiyar Sir to Confirm

1. **Ex-students contacts** — Phone numbers and emails from the original doc are **not** published. Only name, years at institute, and present status are shown. Contact institute for details. Confirm if this is acceptable or if full contacts should be published.

2. **Student photos** — Not included in this version. Confirm if student photos should be added in future.

3. **Brochure** — 2022 brochure remains available on Downloads only (not featured on homepage). Confirm if a new 2026 brochure is planned.

4. **Annual updates** — Content is stored in `src/data/` JSON files. Each year, updated Word docs can be converted to JSON and the site redeployed. Discuss whether a self-upload system is desired at your visit.

5. **Ex-students list** — Current online list is partial (from August 2016 doc). Confirm if a fuller updated list exists.

---

## Review Checklist

### Donors
- [ ] Donation scheme amounts correct
- [ ] Bank details (India + FCRA) correct
- [ ] Receipt instructions clear

### Parents
- [ ] Admissions information accurate
- [ ] Student list 2025–26 correct
- [ ] Syllabus downloads work

### Archive
- [ ] Full history text preserved on History page
- [ ] All annual report years present
- [ ] Alumni XLS downloads correctly
- [ ] Gallery photos and captions acceptable
- [ ] Logo explanation text accurate

---

## Technical Notes

- Static site (Astro) — no database or admin panel
- Deploys automatically on push to `main` via GitHub Actions
- All yearly-changing content lives in `src/data/` for easy updates
