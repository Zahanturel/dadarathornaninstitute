# Annual Reports Audit — `src/data/activities/*.json`

Branch: `content/annual-reports-audit`. Not deployed.

## Source documents

Ramiyar sir sent **two** batches. The second is a subset of the first, and the
first contains three report docs that were not in the folder originally used.

| Ref | Document | Where |
|---|---|---|
| **R24** | `DAI REPORT  24-25 and 25-26.docx` | both batches |
| **R2122** | `DAI REPORT  FOR 2021-22.docx` | **13 Jun 2026 mail only** → `projects/dadarathornaninstitute/ramiyar/` |
| **R2223** | `DAI REPORT  For 2022-23.docx` | **13 Jun 2026 mail only** → same folder |
| **SSC** | `SSC Distinctions June 2026.doc` → `src/data/achievers/ssc.json` (verified) | both |
| **ROSTER** | `Students list 25-26.docx` → `src/data/students/2025-26.json` (verified) | both |

- **13 Jun 2026**, subject *"Re: Dadar Athornan Institute Website — Photos, Logo
  and Content Review"* — 21 files, including R2122 and R2223.
- **18 Aug 2026**, subject *"Re: Finalizing domain transfer + email"*, "The June
  2026 update has to be done on the website, as attached" — 8 files, no report
  docs except R24. This is the set in `projects/refinalizingdomaintransferemail/`.

**There is no 2023-24 report in either batch.** The reports go 2021-22, 2022-23,
then straight to R24. The gap is real.

Line references are `python-docx` paragraph indices over the **full** paragraph
list (blank paragraphs included, which is why the numbers skip). To reproduce:

```python
import docx
for i, p in enumerate(docx.Document(PATH).paragraphs):
    if p.text.strip():
        print(f"[{i:03d}] {p.text.strip()}")
```

---

## 1. Which report section is which academic year

R24 has two sections, headed **"From Jan 2024 to Dec 2025"** `[000]` and **"From
Jan 2025 to Dec 2026"** `[067]`. Both headings are wrong — they overlap by a year
and each names an end date a year too late.

**Section 1 = 2024-25. Section 2 = 2025-26.**

### The decisive evidence: standards against the verified roster

Section 2 states four students' standards. Three match `students/2025-26.json`
exactly; one does not.

| Section 2 `[076]`, `[077]` | `students/2025-26.json` | |
|---|---|---|
| Shahan Bhesadia (Std. IX) | Std IX | ✓ |
| Maidyarem Chinoy (IX) | Std IX | ✓ |
| Ziyan Nalladaru (VIII) | Std VIII | ✓ |
| Zhian M. Turel (Std. IX) | **Std X** | ✗ |

Had Section 2 been 2024-25, all four would sit one standard lower. Three of four
pin it to 2025-26, so **Zhian's "Std. IX" is a single stale value**, copy-pasted
from Section 1 — the same defect as "Total Strength: Same as last year: 14",
which also appears verbatim in both sections.

### Corroboration

| Evidence | Section 1 | Section 2 |
|---|---|---|
| **Zhian's SSC.** SSC lists him as SSC 2026 at 84.00%, so he sat Std X in 2025-26; `students/2026-27.json` then has him in Std XI. | Std IX `[009]`, Assistant Head Boy — correct for 2024-25 | Std X, Head Boy and Mr. DPYA — the natural promotion, and the senior-most boy |
| **Shyamak Sanjana's college year.** SSC 2021 → XI, XII, FYBAF, SYBAF, TYBAF. | "SYBAF" `[013]` = 2024-25 | "TYBAF" `[074]` = 2025-26, matching ROSTER's TY-BAF and `2026-27.json`'s CFA |
| **Departures.** R2223 `[017]` shows the house style: a student who leaves at the start of the window is reported in that year's report and is absent from its roster. | Farsogar left after SSC 2024 | Sarosh and Rushad both left, and both are absent from `students/2025-26.json` ✓ |
| **Film releases** (hard calendar anchors). | "Stree-2" `[027]` released Aug 2024 | "Chhava" `[097]` released Feb 2025; "Jaat" 10 Apr 2025; explicit "18 Dec 24" `[085]` |

### Why the SSC results look off by a year

R2223 is headed *"From June 2022 to May 2023"* yet reports **SSC 2022** `[003]` —
an exam sat in 2021-22 whose result arrived June 2022. R2122 does the same with
SSC 2021. So Ramiyar sir prints an SSC result in the report for the year the
result *arrives*, not the year the exam was sat.

That is why Section 2 (2025-26) reports **Sarosh's SSC 2025** rather than Zhian's.
Zhian sat SSC in Std X during 2025-26; his 84% was announced in June 2026 and
would appear in a 2026-27 report that does not yet exist.

**This is the ambiguity, and the site no longer reproduces it.** Every SSC line is
now stamped with its exam year, and Zhian's SSC 2026 has been added to 2025-26 —
the year he actually sat it — sourced from SSC, not from R24.

### One caveat that remains

The film anchors show Section 2's *events* run Dec 2024 → Dec 2025, straddling
two academic years: its February and April items (Chhava, Jaat, All Parsi Sports,
the Iran League distribution) fall in 2024-25 by a strict June–May reckoning.
Sections are kept whole, because the roster facts that define the year are
unambiguous and R2223 groups the same way. Re-filing individual events by date
would need Ramiyar sir's confirmation — see §5.

---

## 1a. How SSC results are filed on this page

A boy in Std X during academic year Y sits the SSC examination in the February of
Y+1, so **SSC N belongs to academic year (N-1)/N**:

| SSC | Academic year sat | Student(s) |
|---|---|---|
| 2022 | 2021-22 | Karl Z. Sidhwa, Yazad J. Broacha, Fravash M. Gulestan |
| 2023 | 2022-23 | Varzavand H. Dadachanji, Hormazd K. Fatakia |
| 2024 | 2023-24 | Farsogar J. Bhesadia |
| 2025 | 2024-25 | Sarosh K. Bharucha |
| 2026 | 2025-26 | Zhian M. Turel |

Each is corroborated independently: Karl's cohort left "after June 2022" per
R2223 `[017]`, so they were Std X in 2021-22; Varzavand won a prize in November
2022, so he was a 2022-23 student; Sarosh is absent from `students/2025-26.json`,
so he left at the end of 2024-25; Zhian is Std X in `students/2025-26.json` and
Std XI in `students/2026-27.json`.

**Ramiyar sir writes an SSC result into whichever report he is typing when it
arrives**, which lags it by a year — R2223 is headed "From June 2022 to May 2023"
yet carries SSC 2022. Reproducing that lag would put two different SSC cohorts on
a single year of this page. **Every SSC result is therefore filed under the year
the boy sat the exam**, and each year carries exactly one cohort. The narrative
sections stay where the verified rosters pin them (§1).

---

## 2. Repeated events — genuine vs. copy-paste

| Event | S1 | S2 | Verdict |
|---|---|---|---|
| Iran League Annual Prize Distribution | `[025]`, undated | `[093]`, "Apr 12" | **Genuine in both.** |
| Anand Mela of DPYA School | `[026]` | `[095]` | **Genuine in both.** |
| Return to Roots | `[018]` "(Jan)", "senior students" | `[086]` "(Mar 20)", "from all over the world", "principal and students" | **Genuine in both.** Different dates and wording. |
| Monsoon Walk / Ekadashi Fair / Jamshedi Navroz | `[026]` Monsoon Walk **Jul** | `[096]` Monsoon Walk **Jun** | **Genuine in both.** |
| Musso, Lower Parel | `[028]` "(Oct)" | `[098]` "(23 Sep)" | **Genuine in both.** |
| Internal Bhantar exams, Apr & Nov | `[015]` | `[079]` | **Genuine in both.** Standing exam calendar; the only line the two years still share. |
| DPYA School Sports (Jan) | `[037]` | `[117]` | **Genuine in both.** Different results. |
| All Parsi Sports | `[038]` "(Jan)" | `[120-121]` "Feb 8-9" | **Genuine in both.** |
| CUBS prizes | `[041-044]` | `[118-119]` | **Genuine in both.** |
| Iran League Quiz / Western Vocal / Gujarati Reading | `[048-050]` | `[125-127]` | **Genuine in both.** Different winners. |
| BPA Bhantar | `[055]` "(Feb)" | `[131]` "(Feb 2)" | **Genuine in both.** |
| Empowering Mobeds | `[031-034]` | `[105-106]` | **Genuine in both.** Different activities. |
| **"Total Strength: Same as last year: 14"** | `[013]` | `[074]` | **Copy-paste of the wording**, though the arithmetic holds in both years (2 in, 2 out each time). Rewritten to state the figure directly. See §5. |
| **"Drawing Competition Results are awaited."** | `[051]` | `[128]` | **Copy-paste, and a non-event.** Byte-identical, reports no outcome. **Dropped from both.** |
| **"Zhian M. Turel Std. IX"** | `[009]` | `[076]` | **Copy-paste.** Correct in S1, stale in S2. **Corrected to Std. X in 2025-26** (§1). |

### "Our Very Own" — Ramiyar sir's own duplication

The 25 September Mazda Multimedia feature appears in **both R2122 `[016]` and
R2223 `[032]`** — one event, printed in two of his reports. I had earlier treated
the 2022-23 copy as an old-site artefact and removed it; that was wrong, and it
has been **restored to 2022-23**. Both years now carry it, as his documents do.
Flagged in §5 for him to say which year it belongs to.

---

## 3. Item-to-source table

### 2025-26 — from **R24 Section 2** (`[067]`–`[132]`) unless noted

| # | Item (opening words) | Source |
|---|---|---|
| 1 | NEW ADMISSIONS: twins Mizan and Miran… | `[069]` |
| 2 | **SSC 2025 results: Sarosh K. Bharucha…** | `[070]`, year-stamped |
| 3 | Navar: Maidhyarem K. Chinoy… | `[071]` |
| 4 | Maratab: Berjis K. Bharda… | `[072]` |
| 5 | 2 students left… | `[073]` |
| 6 | Total Strength… 14 | `[074]` |
| 7 | **Er. Zhian M. Turel (Std. X) … Head Boy … Mr. DPYA** | `[076]`, **standard corrected** (§1) |
| 8 | **Er. Zhian M. Turel appeared for SSC in Std. X … 84.00%** | **SSC + ROSTER**, not in R24 (§1) |
| 9 | Er. Shahan Bhesadia … Learning Disability | `[077]` |
| 10 | Internal Bhantar exams | `[079]` |
| 11 | New weekly Spoken English classes | `[081]` |
| 12 | Visitors: Dastur Mehraban Poladi … (18 Dec 2024) | `[084]`, `[085]` |
| 13 | Visitors: Return to Roots (20 Mar) | `[086]` |
| 14 | Visitors: Asiatic Society, "The Geography of Belief" | `[087]` |
| 15 | Public launch of the film "Mobeds" | `[088]` |
| 16 | Institute painted; roof work | `[089]`, `[090]` |
| 17 | Iran League Prize Distribution (12 Apr) | `[093]` |
| 18 | Zoroastrian Saga Programme | `[094]` |
| 19 | Fun outings: Anand Mela, Pawana Lake… | `[095]`, `[096]` |
| 20 | Movies: "Chhava" / "Jaat" / "Mufasa" | `[097]` |
| 21 | School picnics: Kidzania / Musso | `[098]` |
| 22 | Khordad Sal — "Lage raho Bomanji" | `[099]` |
| 23 | Outdoor walk, McDonald's (30 Aug) | `[102]` |
| 24 | Nirang-din at Banaji Limji (18 Jan) | `[100]` |
| 25 | Narielwala Salgreh Jashan (14 Apr) | `[101]` |
| 26 | Empowering Mobeds: M.F. Cama / Alpaiwala | `[105]`, `[106]` |
| 27 | Gifts: oven / Aquaguard | `[109]`, `[110]` |
| 28 | Gifts: clothes / toys / football / T-shirts | `[111]`–`[114]` |
| 29 | DPYA School Sports (Jan) | `[117]` |
| 30 | CUBS: Yazdan Panthaki / Jehaun Sinor | `[118]`, `[119]` |
| 31 | All Parsi Sports (8–9 Feb) | `[120]`, `[121]` |
| 32 | Iran League Religious Quiz (Jan) | `[125]` |
| 33 | Iran League Western Vocal (30 Nov) | `[126]` |
| 34 | Iran League Gujarati Reading (Sep) | `[127]` |
| 35 | Monajat Competition (14 Dec) | `[129]` |
| 36 | Shahnameh Competition | `[130]` |
| 37 | BPA Bhantar (2 Feb) | `[131]` |
| 38 | DPYA English Elocution | `[132]` |
| — | *Drawing Competition — results awaited* | `[128]` **dropped**, §2 |

### 2024-25 — all from **R24 Section 1** (`[000]`–`[064]`)

| # | Item | R24 line |
|---|---|---|
| 1 | NEW ADMISSIONS: Jahaun Porus Sinor… | `[002]` |
| 2 | **SSC 2024 results: Farsogar J. Bhesadia…** | `[004]`, year-stamped |
| 3 | Navar: Shahan J. Bhesadia | `[006]` |
| 4 | Maratab: Sarosh K. Bharucha | `[007]` |
| 5 | Er. Zhian M. Turel (Std. IX) … Assistant Head Boy | `[009]` — correct as written |
| 6 | 2 students left | `[011]` |
| 7 | Total Strength … 14 | `[013]` |
| 8 | Internal Bhantar exams | `[015]` |
| 9 | Visitors: Return to Roots (Jan) | `[018]` |
| 10 | Visitors: Mrs. Briana Blasko | `[019]` |
| 11 | Gifts: 6 new computers | `[022]` |
| 12 | Iran League Prize Distribution | `[025]` |
| 13 | Fun outings: Anand Mela… | `[026]` |
| 14 | Movie "Stree-2" (Sep) | `[027]` |
| 15 | School picnics; Film Museum | `[028]` |
| 16 | Empowering Mobeds: Wellness, workshop | `[031]`, `[032]` |
| 17 | Dasturji Firoze Kotwal's talk | `[034]` |
| 18 | DPYA School Sports (Jan) | `[037]` |
| 19 | All Parsi Sports (Jan) | `[038]` |
| 20 | CUBS: Yazdan / Pashang | `[041]`, `[042]` |
| 21 | CUBS: Delyaz / Kaiwan | `[043]`, `[044]` |
| 22 | Religious Quiz (Jan) | `[048]` |
| 23 | Western Vocal (Dec) | `[049]` |
| 24 | Gujarati Reading (Sep) | `[050]` |
| 25 | All Parsi Elocution (Jan) | `[053]` |
| 26 | BPA Bhantar (Feb) | `[055]` |
| 27 | Creative Child Genius | `[057]` |
| 28 | Turbulence (Jun) | `[059]` |
| 29 | ZOSTA "Monsoon Magic" (Jul) | `[061]` |
| 30 | English Poem recitation (Jul) | `[062]` |
| 31 | Scouts Snacks-making | `[064]` |
| — | *Drawing Competition — results awaited* | `[051]` **dropped**, §2 |

### 2022-23 — all 27 items from **R2223**

Verified programmatically: every content paragraph of R2223 is covered by a JSON
item. Source paragraphs, in order: `[002]`, `[003]`+`[004]`, `[005]`+`[006]`,
`[007]`, `[008]`–`[010]`, `[013]`–`[015]`, `[017]`, `[019]`, `[022]`, `[023]`,
`[024]`, `[025]`, `[028]`, `[029]`, `[030]`, `[031]`, `[032]`, `[033]`, `[034]`,
`[035]`, `[036]`, `[037]`, `[040]`, `[041]`, `[042]`+`[043]`, `[050]`, `[051]`.
(`[046]`–`[049]` are a duplicate COMPETITIONS block within his own document.)

### 2021-22 — all 14 items from **R2122**

Verified the same way. Source paragraphs `[002]`–`[007]` and `[010]`–`[017]`.

### 2023-24 — one item

| # | Item | Source |
|---|---|---|
| 1 | SSC 2023: Varzavand Hormaz Dadachanji (87.88%), Hormazd Kerman Fatakia (88.00%, LD). | **SSC**, entries `year: "2023"` |

---

## 4. Removed: invented content that was live on the site

The 2021-22 / 2022-23 / 2023-24 files were created in commit `027c624`, in the
same batch as `2008.json`–`2019.json`. Those 2008–2019 files were boilerplate and
Ramiyar sir had them deleted in `3b35400`. The three survivors were never
re-examined.

- **2021-22 and 2022-23 are now sourced directly from R2122 and R2223.** Their
  factual lines had been degraded to generic sentences with filler added on top.
- **2023-24 was invented.** No 2023-24 report exists in either of Ramiyar sir's
  mails, and the old site's tabs stop at 2022-23 with zero occurrences of "2023-24"
  or "2024". Only the SSC line, traceable to SSC, survives.

| Year | Deleted line | Why |
|---|---|---|
| 2021-22 | "Annual Jashan and prize-giving ceremony conducted." | No Jashan or prize-giving in R2122. That year was largely online because of Covid; the comparable event was an *online farewell party*. |
| 2021-22 | "Religious and Avesta classes continued throughout the year." | Filler. R2122 says classes ran **online** — now stated accurately. |
| 2022-23 | "Annual Jashan celebrated with full priestly rituals." | Identical to the 2023-24 line. The real event is the **Annual Day of 17 December** `[033]`, now restored in full; it is not a Jashan. |
| 2022-23 | "Prize-giving ceremony held to felicitate students…" | Identical to the 2023-24 line. Prizes were distributed at the 17 December Annual Day by Mrs. Dinmeher Bunshah — now stated accurately. |
| 2022-23 | "Navar ceremonies conducted for students during the year." | Content-free paraphrase of seven named Navars and Maratabs `[005]`–`[010]`, now restored. |
| 2023-24 | "Annual Jashan celebrated with full priestly rituals." | Invented; no source. |
| 2023-24 | "Prize-giving ceremony held to felicitate students…" | Invented; no source. |
| 2023-24 | "Religious education, Avesta classes and scriptural training continued…" | Invented; no source. |
| 2023-24 | "Navar ceremonies and institute activities conducted during the year." | Invented; no source. |

Also corrected: 2021-22 said "SSC 2021" listing four students — R2122 `[006]`
says **five** passed and names the fifth (Syamak Adil Dastur, 69.50%), who is
legitimately absent from `ssc.json` since that lists only 75%+ distinctions. And
"New admissions taken in June 2021" dropped both boys' names, which R2122 `[002]`
gives.

---

## 5. For Ramiyar sir — needs confirmation

1. **Zhian's standard in Section 2** `[076]`. Corrected to **Std. X** on the roster
   evidence in §1. Please confirm.
2. **Zhian's SSC 2026 (84.00%) added to 2025-26**, the year he sat it. R24 does not
   mention it, since his result arrived after the report was written. Please confirm
   you are happy for it to appear under 2025-26 rather than waiting for a 2026-27
   report.
3. **"Total Strength: Same as last year: 14"** appears in both sections `[013]`,
   `[074]`. The arithmetic holds in both years, so it may be genuine. Please confirm
   the 2024-25 figure independently.
4. **"Drawing Competition — results awaited"** `[051]`, `[128]`, identical in both
   sections, dropped from both. If results were announced for either year, please
   send the names.
5. **"Our Very Own" (25 September)** appears in both R2122 `[016]` and R2223 `[032]`.
   It is one event. Currently shown under **both** years, as your documents have it.
   Which year is correct?
6. **"Zahan Turel — III"** in the Section 2 Gujarati Reading list `[127]`. Zahan M.
   Turel passed SSC in 2021 and is not on the roster; likely a slip for **Zhian**.
   Reproduced verbatim.
7. **"Shahan J. Bhesadia"** `[006]` vs. "Shahan Hoshang Bhesadia" on the roster —
   the middle initial should probably be **H**. Reproduced verbatim.
8. **Farsogar's All Parsi Sports results** `[038]` list "Shot put – III" **twice**.
   Recorded once.
9. **No date for the Iran League Prize Distribution in Section 1** `[025]`, while
   Section 2 gives 12 Apr `[093]`.
10. **2023-24 has no report.** The year currently shows a single SSC line. Please
    send the 2023-24 report, or say the word and the year comes off the page.
11. **Section 2's events straddle two academic years.** Its February–April items
    (Chhava, Jaat, All Parsi Sports 8–9 Feb, Iran League 12 Apr, the painting)
    date to early 2025, i.e. academic 2024-25, while its August–December items are
    2025. Kept together under 2025-26 as you grouped them. Say the word and they
    can be re-filed by date.
12. **"Shyamak Dastur, FY BAF"** in R2223 `[019]`. The FY/SY/TY sequence for
    *Shyamak Roomi Sanjana* does not fit, so this is probably **Syamak Adil
    Dastur**. Reproduced as written.
13. **Spelling variants left as written.** Only Zhiyan → **Zhian** (site-wide, per
    commit `3bf9bfc`) and `Huzan E.` → `Huzan Z.` were normalised. Still varying:
    Berjis/Barjis Bharda, Maidyarem/Maidhyarem Chinoy, Pashang/Pashaang Karanjia,
    Jahaun/Jehaun Sinor, Ziyan/Ziyaan Nalladaru, Rushad/Rushaad/Rushan Katpitia,
    Panthaki/Panthaky.

## 6. Not touched

`schemes.json`, `books.json`, `students/*.json`, `achievers/ssc.json`,
`achievers/nirang-din.json` — all previously verified against the June 2026
sources. The 2020 and 2008–2019 old-site reports were **not** re-added, per
Ramiyar sir's instruction in `3b35400`; that content survives in git at
`fe4c1bd:activities.htm`.

## 7. Verification

`npm run build` passes — 17 pages, no errors. `/activities` renders 5 years in
order (2025-26 → 2021-22), **111 items**: 2025-26 → 37, 2024-25 → 31, 2023-24 → 2,
2022-23 → 27, 2021-22 → 14. A scripted check confirms each year carries
exactly one SSC cohort.

A scripted check for identical lines leaves two, both intentional and both matching
the source documents: **"Internal Bhantar exams in April and November"** (2024-25
and 2025-26, a standing exam calendar) and the **"Our Very Own"** line (2021-22 and
2022-23, duplicated in Ramiyar sir's own two reports — item 5 above).

A second scripted check confirms every content paragraph of R2122 and R2223 is
represented in the corresponding JSON file.
