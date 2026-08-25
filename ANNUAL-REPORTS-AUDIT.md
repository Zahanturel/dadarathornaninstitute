# Annual Reports Audit — `src/data/activities/*.json`

Branch: `content/annual-reports-audit`. Not deployed.

## Source documents

| Ref | Document | Covers |
|---|---|---|
| **DOC** | `DAI REPORT  24-25 and 25-26.docx` (Ramiyar sir, June 2026) | two sections, see below |
| **OLD** | `activities.htm` from the pre-Astro site, recovered from git commit `fe4c1bd` | tabbed reports 2008 → 2022-23 |
| **SSC** | `src/data/achievers/ssc.json` (already verified against the June 2026 SSC doc) | SSC distinctions |

Line references into **DOC** are non-empty-paragraph indices from `python-docx`
(`[000]` = the first heading). References into **OLD** are given as
`[tab:line]`, e.g. `[2022-23:27]`.

---

## 1. Which report section is which academic year

The two DOC sections are headed **"From Jan 2024 to Dec 2025"** `[000]` and
**"From Jan 2025 to Dec 2026"** `[067]`. Those headings are wrong, they overlap
by a year, and they disagree with the filename. I did not assume the filename
was right either. Five independent lines of internal evidence all converge on
the same answer.

**Section 1 = academic year 2024-25. Section 2 = academic year 2025-26.**

| # | Evidence | Section 1 | Section 2 | Conclusion |
|---|---|---|---|---|
| 1 | **Shyamak Sanjana's college year.** He passed SSC in 2021 (SSC). So: 2021-22 Std XI, 2022-23 Std XII, 2023-24 FYBAF, 2024-25 **SYBAF**, 2025-26 **TYBAF**, 2026-27 CFA. | "SYBAF" `[013]` | "TYBAF" `[074]` | S1 = 2024-25, S2 = 2025-26. Confirmed by `students/2026-27.json` listing him as CFA. |
| 2 | **Zhian M. Turel's standard.** SSC lists him as SSC 2026, so he sat Std X in 2025-26 and Std IX in 2024-25. `students/2025-26.json` has him in Std X. | "Std. IX" `[009]` — correct for 2024-25 | "Std. IX" `[076]` — **wrong**, he was Std X | S1 = 2024-25. S2's "Std. IX" is the copy-paste error (see §4). |
| 3 | **SSC result reported.** OLD files SSC-year *N* under tab *N*/(N+1) — e.g. "SSC: 2022" sits under tab `2022-23` `[2022-23:02]`. | Farsogar Bhesadia 89.60% `[004]` = SSC **2024** | Sarosh Bharucha 93.00% `[070]` = SSC **2025** | Same convention gives S1 = 2024-25, S2 = 2025-26. |
| 4 | **Admissions vs. roster.** New admissions join in June. `students/2025-26.json`: twins in Std I, Jahaun Sinor in Std II. | Jahaun Sinor Std I `[002]` → joined Jun 2024 | Twins Std I `[069]` → joined Jun 2025 | S1 = 2024-25, S2 = 2025-26. |
| 5 | **Film release dates** (hard calendar anchors). | "Stree-2" `[027]` released Aug 2024, seen Sep → **Sep 2024** | "Chhava" `[097]` released Feb 2025, seen 26 Feb → **Feb 2025**; "Jaat" released 10 Apr 2025 `[097]`; explicit "18 Dec 24" `[085]` | S1 sits in calendar 2024, S2 in calendar 2025. |

### The caveat worth knowing

Evidence #5 shows the Principal writes these reports on a **calendar-year**
basis (S1 ≈ Jan–Dec 2024, S2 ≈ Dec 2024–Dec 2025), not on a June–May academic
year. So a strict June–May reading would push roughly the Jan–May portion of
each section into the previous academic year — S2's Chhava (Feb 2025), Jaat
(Apr 2025) and the 18 Dec 2024 visit technically fall in academic 2024-25.

I kept each section whole under one heading rather than splitting it, because
(a) the roster facts that define the year — admissions, strength, standards,
SSC — are unambiguously 2024-25 and 2025-26 respectively, (b) OLD used exactly
the same whole-section convention (its `2022-23` tab runs Jun 2022 → Apr 2023),
and (c) splitting would misattribute events the Principal deliberately grouped.
**The existing file-to-year assignment was therefore already correct** — the
duplication problem had a different cause.

### What actually caused the "near-duplicate" appearance

Not a year-mapping error. The previous JSON compressed each section's
distinguishing detail out of existence — every competition collapsed to
`"Competitions: Iran League Religious Quiz, Western Vocal, Gujarati Reading …
— Institute students won prizes."` in *both* years. The prize-winner names are
what differ between the years, and they had all been stripped. Restoring the
per-event detail from DOC makes the two years plainly distinct (2024-25 now has
31 items, 2025-26 has 37, sharing no identical line).

---

## 2. Repeated events — genuine vs. copy-paste

| Event | S1 | S2 | Verdict |
|---|---|---|---|
| Iran League Annual Prize Distribution | `[025]`, undated | `[093]`, "Apr 12" | **Genuine in both.** Recurring annual event; S2 carries a specific date. S1 is undated — see §5. |
| Anand Mela of DPYA School | `[026]` | `[095]` | **Genuine in both.** Annual school event. |
| Return to Roots | `[018]` "(Jan)", ~30 youths, "interact with the senior students" | `[086]` "(Mar 20)", ~30 youths "from all over the world", "interact with the principal and students" | **Genuine in both.** Different dates and different wording — two separate visits, not a paste. |
| Monsoon Walk / Ekadashi Fair / Jamshedi Navroz | `[026]` Monsoon Walk **Jul** | `[096]` Monsoon Walk **Jun** | **Genuine in both.** Annual; the differing month shows they were re-entered, not pasted. |
| Musso, Lower Parel | `[028]` "(Oct)" | `[098]` "(23 Sep)" | **Genuine in both.** Different dates. |
| Internal Bhantar exams, Apr & Nov | `[015]` | `[079]` | **Genuine in both.** Standing internal exam calendar. |
| DPYA School Sports (Jan) | `[037]` | `[117]` | **Genuine in both.** Completely different results. |
| All Parsi Sports | `[038]` "(Jan)" | `[120-121]` "Feb 8-9" | **Genuine in both.** Different dates and results. |
| CUBS prizes | `[041-044]` | `[118-119]` | **Genuine in both.** Different winners. |
| Iran League Religious Quiz / Western Vocal / Gujarati Reading | `[048-050]` | `[125-127]` | **Genuine in both.** Different winners each year. |
| BPA Bhantar competition | `[055]` "(Feb)" | `[131]` "(Feb 2)" | **Genuine in both.** Different winners. |
| Empowering Mobeds | `[031-034]` Wellness, posture workshop, Kotwal talk | `[105-106]` M.F. Cama and Alpaiwala field trips | **Genuine in both.** Entirely different activities. |
| **"Drawing Competition Results are awaited. Names not yet announced."** | `[051]` | `[128]` | **Copy-paste, and a non-event.** Byte-identical in both sections and reports no outcome. **Dropped from both years.** If the results have since been announced, they can be added; see §5. |

So in DOC: one true copy-paste (`Drawing Competition`), everything else
genuinely recurred with different dates, winners or content.

One further repeat is worth stating plainly: **"Internal Bhantar exams in April
and November"** is word-for-word identical in the two sections (`[015]`,
`[079]`) and is the only line the 2024-25 and 2025-26 files still share. That is
correct — it is a standing exam calendar that genuinely ran in both years, and
there is no additional detail in the source to distinguish them.

### A third copy-paste, in the old site

**"On 25th September, the Dadar Athornan Institute was featured in Mazda
Multimedia's bi-monthly YouTube programme 'Our Very Own'"** appears in **both**
the `2021-22` and `2022-23` tabs of OLD. It is a single event, so one of the two
is wrong. Evidence places it in **2021**: in the 2021-22 tab the sentence sits
*inside the same authored paragraph* as the 6 September Nutri-Bag entry and the
3 October Zoom webinar, forming one chronological autumn-2021 block, whereas in
the 2022-23 tab it is a detached standalone line. (That tab is demonstrably
sloppy — it also repeats its entire `COMPETITIONS` block twice.) **Kept in
2021-22, removed from 2022-23.** Flagged in §5.

---

## 3. Item-to-source table

Every item in every file, with its source line. No item is present that is not
listed here.

### 2024-25 — all items from **DOC Section 1** (`[000]`–`[064]`)

Year rationale is uniform: Section 1 = 2024-25 per §1. Ordered as in the file.

| # | Item (opening words) | DOC line |
|---|---|---|
| 1 | NEW ADMISSIONS: Jahaun Porus Sinor… | `[002]` |
| 2 | SSC: 1 student — Farsogar J. Bhesadia… | `[004]` |
| 3 | Navar: Shahan J. Bhesadia… | `[006]` |
| 4 | Maratab: Sarosh K. Bharucha… | `[007]` |
| 5 | Er. Zhian M. Turel (Std. IX) … Assistant Head Boy | `[009]` |
| 6 | 2 students left… | `[011]` |
| 7 | Total Strength: same as last year — 14… | `[013]` |
| 8 | Internal Bhantar exams… | `[015]` |
| 9 | Visitors: 30 youths … Return to Roots | `[018]` |
| 10 | Visitors: Mrs. Briana Blasko… | `[019]` |
| 11 | Gifts from donors: 6 new computers… | `[022]` |
| 12 | Iran League Annual Prize Distribution… | `[025]` |
| 13 | Fun outings: Anand Mela… | `[026]` |
| 14 | Movie "Stree-2" at Chitra (Sep). | `[027]` |
| 15 | School picnics … Musso / Monteira Villa / Film Museum | `[028]` |
| 16 | Empowering Mobeds: Wellness Programme… | `[031]`, `[032]` |
| 17 | Navar students … Dasturji Firoze Kotwal's talk | `[034]` |
| 18 | DPYA School Sports (Jan)… | `[037]` |
| 19 | All Parsi Sports (Jan)… | `[038]` |
| 20 | CUBS prizes (Jun): Yazdan / Pashang | `[041]`, `[042]` |
| 21 | CUBS prizes (Jun): Delyaz / Kaiwan | `[043]`, `[044]` |
| 22 | Iran League Religious Quiz (Jan)… | `[048]` |
| 23 | Iran League Western Vocal (Dec)… | `[049]` |
| 24 | Iran League Gujarati Reading (Sep)… | `[050]` |
| 25 | All Parsi Elocution … Malcolm Baug (Jan) | `[053]` |
| 26 | BPA Bhantar competition (Feb)… | `[055]` |
| 27 | Creative Child Genius Competition… | `[057]` |
| 28 | Turbulence Inter-school Festival (Jun)… | `[059]` |
| 29 | ZOSTA "Monsoon Magic" (Jul)… | `[061]` |
| 30 | English Poem recitation (Jul)… | `[062]` |
| 31 | Scouts Snacks-making… | `[064]` |
| — | *Drawing Competition — results awaited* | `[051]` **dropped**, see §2 |

### 2025-26 — all items from **DOC Section 2** (`[067]`–`[132]`)

| # | Item (opening words) | DOC line |
|---|---|---|
| 1 | NEW ADMISSIONS: twins Mizan and Miran… | `[069]` |
| 2 | SSC: 1 student — Sarosh K. Bharucha… | `[070]` |
| 3 | Navar: Maidhyarem K. Chinoy… | `[071]` |
| 4 | Maratab: Berjis K. Bharda… | `[072]` |
| 5 | 2 students left… | `[073]` |
| 6 | Total Strength: same as last year — 14… | `[074]` |
| 7 | Er. Zhian M. Turel (Std. IX) … Head Boy … Mr. DPYA | `[076]` |
| 8 | Er. Shahan Bhesadia … Learning Disability | `[077]` |
| 9 | Internal Bhantar exams… | `[079]` |
| 10 | New weekly classes for Spoken English… | `[081]` |
| 11 | Visitors: Dastur Mehraban Poladi … (18 Dec 2024) | `[084]`, `[085]` |
| 12 | Visitors: about 30 youths … Return to Roots (20 Mar) | `[086]` |
| 13 | Visitors: … Asiatic Society … "The Geography of Belief" | `[087]` |
| 14 | Public launch of the film "Mobeds"… | `[088]` |
| 15 | In April and May the entire Institute was painted… | `[089]`, `[090]` |
| 16 | Iran League Annual Prize Distribution (12 Apr) | `[093]` |
| 17 | Zoroastrian Saga Programme (11 and 13 Apr) | `[094]` |
| 18 | Fun outings: Anand Mela … Pawana Lake… | `[095]`, `[096]` |
| 19 | Movies: "Chhava" / "Jaat" / "Mufasa" | `[097]` |
| 20 | School picnics: Kidzania / Musso | `[098]` |
| 21 | On Khordad Sal … "Lage raho Bomanji" | `[099]` |
| 22 | An outdoor walk … McDonald's (30 Aug) | `[102]` |
| 23 | All Navar students … Nirang-din … Banaji Limji (18 Jan) | `[100]` |
| 24 | Participated in the Narielwala … Salgreh Jashan (14 Apr) | `[101]` |
| 25 | Empowering Mobeds: M.F. Cama / Alpaiwala | `[105]`, `[106]` |
| 26 | Gifts: oven / Aquaguard | `[109]`, `[110]` |
| 27 | Gifts: formal clothes / toys / football / T-shirts | `[111]`–`[114]` |
| 28 | DPYA School Sports (Jan)… | `[117]` |
| 29 | CUBS: Yazdan Panthaki / Jehaun Sinor | `[118]`, `[119]` |
| 30 | All Parsi Sports (8–9 Feb)… | `[120]`, `[121]` |
| 31 | Iran League Religious Quiz (Jan)… | `[125]` |
| 32 | Iran League Western Vocal (30 Nov)… | `[126]` |
| 33 | Iran League Gujarati Reading (Sep)… | `[127]` |
| 34 | Monajat Competition (14 Dec)… | `[129]` |
| 35 | Shahnameh Competition… | `[130]` |
| 36 | BPA Bhantar competition (2 Feb)… | `[131]` |
| 37 | DPYA School English Elocution… | `[132]` |
| — | *Drawing Competition — results awaited* | `[128]` **dropped**, see §2 |

### 2022-23 — all items from **OLD**, tab `2022-23`

Year assignment is the old site's own tab label; its contents run Jun 2022 →
Apr 2023, which is consistent with academic year 2022-23.

| # | Item | OLD line |
|---|---|---|
| 1 | NEW ADMISSIONS (June 2022)… | `[2022-23:01]` |
| 2 | SSC 2022 … Karl Sidhwa stood second | `[2022-23:02]`, `[2022-23:03]` |
| 3 | Navar (May 2022)… | `[2022-23:04]`, `[2022-23:05]` |
| 4 | Maratab (May 2022)… | `[2022-23:06]` |
| 5 | Navar / Maratab (May 2023)… | `[2022-23:07]`–`[2022-23:09]` |
| 6 | Staff changes… | `[2022-23:10]`–`[2022-23:13]` |
| 7 | 4 withdrawals after June 2022… | `[2022-23:14]` |
| 8 | Total Strength 2022-23: 14 students… | `[2022-23:15]` |
| 9 | 4 June 2022: Institute re-opened after Covid | `[2022-23:22]` |
| 10 | September 2022 — gifts from donors… | `[2022-23:23]` |
| 11 | Fun outings: Ekadashi Fair, 3 nature walks | `[2022-23:24]` |
| 12 | Gujarati play … "Brahmastra 3D" | `[2022-23:25]` |
| 13 | 17 December: Annual Day of the Institute… | `[2022-23:27]` |
| 14 | 21 January: field trip to Doongerwadi… | `[2022-23:28]` |
| 15 | 29 January: meeting … WZO Trust scheme | `[2022-23:29]` |
| 16 | 21 February: Della Adventures, Khandala | `[2022-23:30]` |
| 17 | 21 April: Dasturji Dr. Jamasp Jamasp Asa | `[2022-23:31]` |
| 18 | 29 January — Cub Scouts Sports… | `[2022-23:33]` |
| 19 | 19 February — All Parsi Sports… | `[2022-23:34]` |
| 20 | 26 February — Creative Child Genius… | `[2022-23:35]`, `[2022-23:36]` |
| 21 | Iran League competitions Jul–Dec 2022 | `[2022-23:38]` |
| 22 | Gujarati Reading (12 Nov 2022)… | `[2022-23:39]` |
| 23 | Western Vocal (19 Nov 2022)… | `[2022-23:40]` |
| 24 | Monajat (10 Dec 2022)… | `[2022-23:41]` |
| 25 | Shahnameh (21 Jan 2023)… | `[2022-23:42]` |
| 26 | Religious Quiz (4 Feb 2023)… | `[2022-23:43]` |
| — | *25 September … "Our Very Own"* | `[2022-23:26]` **dropped** as a duplicate of the 2021-22 entry, see §2 |

### 2021-22 — all items from **OLD**, tab `2021-22`

| # | Item | OLD line |
|---|---|---|
| 1 | 2 new admissions in June 2021… | `[2021-22:01]` |
| 2 | Total Strength 2021-22: 23 students… | `[2021-22:02]` |
| 3 | Navar: Broacha / Fatakia / Karkaria | `[2021-22:03]` |
| 4 | Maratab: Karl Z. Sidhwa | `[2021-22:04]` |
| 5 | Five students passed SSC 2021… | `[2021-22:05]` |
| 6 | Annual exams were taken in an online mode. | `[2021-22:06]` |
| 7 | 13 June online farewell party… | `[2021-22:08]` |
| 8 | Institute functioned in an online mode… | `[2021-22:09]` |
| 9 | An online creative workshop… | `[2021-22:10]` |
| 10 | In the second term … partially with 9 senior students | `[2021-22:11]` |
| 11 | 22 August … Ba-Humata Khordad Sal online programme | `[2021-22:12]` |
| 12 | 6 September … "Nutri-Bag" … Smriti Irani | `[2021-22:13]` |
| 13 | 25 September … "Our Very Own" | `[2021-22:14]` |
| 14 | 3 October … Zoom webinar "Study Skills" | `[2021-22:15]` |

### 2023-24 — one item

| # | Item | Source |
|---|---|---|
| 1 | SSC 2023: Varzavand Hormaz Dadachanji (87.88%), Hormazd Kerman Fatakia (88.00%, LD). | **SSC**, entries `year: "2023"` |

---

## 4. Removed: invented content that was live on the site

The 2021-22 / 2022-23 / 2023-24 files were created in commit `027c624`, in the
same batch as `2008.json`–`2019.json`. Those 2008–2019 files were transparent
boilerplate and Ramiyar sir had them deleted in `3b35400` ("drop old-site annual
reports (2008-2019)"). The three surviving files were never re-examined.

**Findings:**

- **2021-22 and 2022-23 were *partly* real.** Their factual lines trace back
  through commit `fa7bbea` to the old site's `activities.htm`, a genuine
  institutional document — but the detail had been stripped and generic
  sentences added on top. I have restored them from OLD in full.
- **2023-24 was invented.** `activities.htm` has tabs for 2022-23 down to 2008
  and **zero** occurrences of the string "2023-24" or even "2024"; there is no
  2023-24 report in the June 2026 source pack either. Only the SSC line is
  sourced (from SSC). The rest is gone.

**Lines deleted as unsourced (were live on dadarathornaninstitute.org):**

| Year | Deleted line | Why |
|---|---|---|
| 2021-22 | "Annual Jashan and prize-giving ceremony conducted." | No Jashan or prize-giving anywhere in the 2021-22 source. That year was largely online because of Covid; the only comparable event was an *online farewell party*. |
| 2021-22 | "Religious and Avesta classes continued throughout the year." | Generic filler. Source says classes ran **online** — now stated accurately. |
| 2022-23 | "Annual Jashan celebrated with full priestly rituals." | Byte-identical to the 2023-24 line. The real event is the **Annual Day of 17 December**, now restored in full. It is not described as a Jashan. |
| 2022-23 | "Prize-giving ceremony held to felicitate students for academic and scriptural achievements." | Byte-identical to the 2023-24 line. Prizes were distributed at the 17 December Annual Day by Mrs. Dinmeher Bunshah — now stated accurately. |
| 2022-23 | "Navar ceremonies conducted for students during the year." | Content-free paraphrase of a specific list of seven named Navars and Maratabs, now restored. |
| 2023-24 | "Annual Jashan celebrated with full priestly rituals." | Invented; no source. |
| 2023-24 | "Prize-giving ceremony held to felicitate students for academic and scriptural achievements." | Invented; no source. |
| 2023-24 | "Religious education, Avesta classes and scriptural training continued throughout the year." | Invented; no source. |
| 2023-24 | "Navar ceremonies and institute activities conducted during the year." | Invented; no source. |

Also corrected, not deleted: 2021-22 said "SSC 2021" listing four students —
the source says **five** passed, and named the fifth (Syamak Adil Dastur,
69.50%). He is legitimately absent from `ssc.json`, which lists only the 75%+
distinctions. The activities entry now says five and names all five. Likewise
2021-22's "New admissions taken in June 2021" dropped both boys' names, which
are in the source; they are restored.

---

## 5. For the Principal — needs confirmation

Nothing in this list has been silently changed. Items 1–3 are the errors you
already identified.

1. **Zhian M. Turel is "Std. IX" in both sections** (`[009]`, `[076]`). He sat
   SSC in 2026, and `students/2025-26.json` has him in Std X, so the Section 2
   entry should almost certainly read **Std. X**. Left as "Std. IX" pending
   confirmation.
2. **"Total Strength: Same as last year: 14" appears in both sections**
   (`[013]`, `[074]`). Worth noting this one is arithmetically consistent —
   both years show 2 joining and 2 leaving, and Shyamak Sanjana correctly moves
   SYBAF → TYBAF — so it may be genuine rather than a paste. Please confirm the
   2024-25 figure independently.
3. **"Drawing Competition — results awaited"** (`[051]`, `[128]`), identical in
   both sections, dropped from both. If results were later announced for either
   year, please send the names.
4. **"Zahan Turel — III"** in the Section 2 Gujarati Reading list `[127]`.
   Zahan M. Turel passed SSC in 2021 and is not on the roster; this is likely a
   slip for **Zhian** Turel. Reproduced verbatim — please confirm.
5. **"Shahan J. Bhesadia"** `[006]` vs. `Shahan Hoshang Bhesadia` in the
   students list — the middle initial should probably be **H**. Reproduced
   verbatim.
6. **Farsogar Bhesadia's All Parsi Sports results** `[038]` list "Shot put –
   III" **twice**. Recorded once. Please confirm nothing else was meant.
7. **Iran League Prize Distribution has no date in Section 1** `[025]` while
   Section 2 gives 12 Apr `[093]`. A date for 2024-25 would be good.
8. **2023-24 has no annual report at all.** The year currently shows a single
   SSC line. Either send the 2023-24 report, or say the word and I will remove
   the year from the page entirely.
9. **"Shyamak Dastur, FY BAF"** in the 2022-23 old-site strength line
   `[2022-23:15]`. The FY/SY/TY sequence for *Shyamak Roomi Sanjana* does not
   fit here, so this is probably **Syamak Adil Dastur** — a different student.
   Reproduced as written.
10. **"Our Very Own" (25 September)** was listed under *both* 2021-22 and
    2022-23 on the old site. I have kept it under **2021-22** on the paragraph
    evidence described in §2 and removed the 2022-23 copy. If it was in fact a
    September 2022 feature, or if the Institute was featured in both years,
    please say so.
11. **Spelling variants left as the source has them.** The only normalisation
    applied was Zhiyan → **Zhian** (already established site-wide by commit
    `3bf9bfc`) and an obvious `Huzan E.` → `Huzan Z.` initial. Still varying
    between documents: Berjis/Barjis Bharda, Maidyarem/Maidhyarem Chinoy,
    Pashang/Pashaang Karanjia, Jahaun/Jehaun Sinor, Ziyan/Ziyaan Nalladaru,
    Rushad/Rushaad/Rushan Katpitia, Panthaki/Panthaky. Say the word and I will
    standardise all of them to the `students/*.json` spellings.

## 6. Not touched

`schemes.json`, `books.json`, `students/*.json`, `achievers/ssc.json` and
`achievers/nirang-din.json` — all previously verified against the June 2026
source documents. The 2020 and 2008–2019 reports on the old site were **not**
re-added, per Ramiyar sir's instruction in `3b35400`; the content still exists
in git at `fe4c1bd:activities.htm` if it is ever wanted.

## 7. Verification

`npm run build` passes — 17 pages built, no errors. `/activities` renders 5
years in order (2025-26 → 2021-22), 109 items total. A scripted check for
identical lines across years leaves exactly one: **"Internal Bhantar exams in
April and November"**, shared by 2024-25 and 2025-26, which is a genuine
recurring event stated identically in both source sections (§2). No other line
repeats within or across years.

Item counts: 2025-26 → 37, 2024-25 → 31, 2023-24 → 1, 2022-23 → 26,
2021-22 → 14.
