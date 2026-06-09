# Project Rules — Targilim Hebrew Math Exercise Generator

Repository: `yanivmizrachiy/targilim`

Hebrew project name: `תרגילים`

Date context: 2026-06-09, Tuesday.

## 1. Purpose of this file

`RULES.md` is the binding source of truth for this repository.

All core requirements and the master prompt for Claude must live here.

ChatGPT's role is only to help Yaniv write and organize requirements and prompts.

Claude's role is to inspect, plan, organize, build, test, document, maintain, and update the repository.

Claude must not assume that ChatGPT already designed the final repository architecture.

Claude must not assume that the current repository is already clean, final, or production-ready.

## 2. Current true repository status

The repository currently contains:

- `RULES.md` — this binding requirements and Claude prompt file.
- `README.md` — short project overview.
- `PROJECT_STATUS.md` — current factual status.
- 10 real source PDF files under `sources/intake/2026-06-09/`.
- 10 preserved original PDF copies under `sources/intake/2026-06-09/originals/`.
- Additional documentation/planning files that may have been created earlier.
- Possible old leftover files from the previous repository conversion.

Important clarification:

- There are 10 real learning/source files.
- There may be 20 PDF entries because each source may exist once in an organized folder and once as a preserved original.
- The preserved originals are safety copies, not separate curriculum sources.
- Claude must learn the 10 real source files only.

Current status:

- Source PDFs uploaded: yes.
- Source PDF upload verification: yes.
- Claude source learning: not started.
- Curriculum map: not started.
- Question-pattern index: not started.
- Exercise generator: not started.
- Copy-as-image: not implemented.
- Print/export: not implemented.
- Public production link: not implemented.
- Private analytics/admin dashboard: not implemented.

## 3. Non-negotiable role definition

Yaniv provides requirements.

ChatGPT organizes requirements and writes prompts.

Claude does the repository work.

Claude must:

- audit the repository;
- plan the repository structure;
- decide what should stay;
- propose what should be archived or deleted;
- build the real product after approval;
- update the repository;
- run checks;
- report progress truthfully.

Claude must not delete files, remove old work, or perform destructive cleanup without Yaniv's explicit approval.

## 4. Immediate instruction to Claude

Claude must not start coding the generator immediately.

Claude must not create generated exercises yet.

Claude must not create demo questions.

Claude must not create fake data.

Claude must not create fake buttons.

Claude must not create fake success messages.

Claude must not create UI that only looks like it works.

First, Claude must audit the repository and deeply learn the 10 real source files.

## 5. Repository audit requirement

Claude's first task is a repository audit.

Claude must identify:

1. Essential files.
2. Source files.
3. Old leftover files.
4. Duplicate planning files.
5. Documentation-only files.
6. Files that should remain untouched for now.
7. Files that should be archived later.
8. Files that should be deleted only after approval.
9. Files that should become part of the final product.
10. Documents that need synchronization.

Claude must not delete anything during the audit.

Claude must write a clear cleanup and implementation plan and wait for Yaniv's approval before destructive cleanup.

## 6. Deep source-learning requirement

Claude must study all 10 real source PDF files deeply before building anything.

For each source file, Claude must extract:

- grade level;
- mathematical domain;
- topic;
- subtopic;
- skills;
- prerequisite knowledge;
- example questions;
- question types;
- question structures;
- wording patterns;
- diagrams;
- drawings;
- tables;
- charts;
- graphs;
- coordinate systems;
- number lines;
- geometry representations;
- algebraic representations;
- statistical representations;
- probability representations;
- mathematical notation requirements;
- Hebrew wording and punctuation patterns;
- teacher-editable parameters;
- safe variation rules;
- answer logic;
- common errors or misconceptions if visible;
- printable worksheet opportunities.

Claude must not skim.

Claude must not guess.

Claude must not invent curriculum content.

Claude must not use general curriculum knowledge unless Yaniv later explicitly supplies or approves it.

If grade 9 material is missing from the uploaded sources, Claude must report it clearly and must not invent grade 9 curriculum.

## 7. Curriculum understanding requirement

Before generating any exercise, Claude must know exactly:

- what is taught in grade 7;
- what is taught in grade 8;
- what is taught in grade 9;
- which domains belong to each grade;
- which topics belong to each domain;
- which skills belong to each topic;
- which source file supports each topic;
- which question types appear in the source files;
- which visual representations are required for each question type.

Every generated exercise must map to:

- grade;
- domain;
- topic;
- subtopic;
- skill;
- source file;
- question pattern;
- expected answer logic.

## 8. Question-pattern extraction requirement

Every question or example in the source materials must be treated as a possible pattern for the future generator.

For each reusable question pattern, Claude must define:

- source file;
- grade;
- domain;
- topic;
- skill;
- question type;
- mathematical idea;
- Hebrew wording template;
- punctuation requirements;
- teacher-changeable parameters;
- safe numerical ranges;
- visual representation type;
- diagram or drawing requirements;
- answer logic;
- validation logic;
- print-layout requirements;
- image-export requirements.

Claude must not copy source examples blindly.

Claude must learn the structure and create configurable, curriculum-based patterns.

## 9. Planning before implementation

After audit and source learning, Claude must write a detailed implementation plan before coding.

The plan must explain:

1. The clean repository structure Claude proposes.
2. Which current files should remain.
3. Which files should be archived or removed only after approval.
4. Where the curriculum knowledge base will be stored.
5. How each PDF source will become structured knowledge.
6. How question patterns will be stored.
7. How exercise templates will be stored.
8. How teacher parameters will be defined.
9. How Hebrew wording templates will be managed.
10. How mathematical logic will be separated from wording.
11. How rendering will be separated from exercise logic.
12. How visual styles will be configured.
13. How diagrams, graphs, tables, coordinate systems, geometry drawings, and number lines will be generated.
14. Which safe rendering/export tools Claude proposes to use.
15. How copy-as-image will work.
16. How download-as-image will work.
17. How A4 print layout will work.
18. How tests and quality checks will work.
19. How future editing by Yaniv will remain easy, safe, and useful.
20. How the public external link will be deployed and maintained.
21. How the site will handle heavy teacher traffic.
22. How private analytics will be implemented so only Yaniv can see site usage.
23. Which mathematical, graphical, automated, and AI-assisted tools Claude needs before implementation.
24. Which tools should be installed, which tools should be avoided, and why.

Do not build until the plan is clear.

If Yaniv explicitly approves implementation, continue in small, verifiable stages.

## 10. Advanced toolchain and automation planning requirement

Claude must think in advance about the strongest safe toolchain for the project.

Claude must not wait for Yaniv to name exact technical packages, mathematical engines, graphics libraries, testing tools, or deployment tools.

Claude must inspect the repository, inspect the source requirements, understand the mathematical needs, and propose the best practical toolchain before implementation.

Claude must plan the toolchain for all major project needs, including:

- PDF/source extraction and source-learning workflow;
- structured curriculum knowledge storage;
- mathematical notation rendering;
- geometry diagrams;
- coordinate systems;
- graphs;
- tables;
- charts;
- number lines;
- algebraic representations;
- probability and statistics visuals;
- Hebrew RTL UI;
- premium visual design;
- worksheet preview rendering;
- copy-as-image;
- download-as-image;
- A4 print export;
- public deployment;
- performance optimization for many teachers;
- private analytics visible only to Yaniv;
- automated tests;
- visual/regression checks;
- Hebrew text validation;
- mathematical validation.

Claude may use terminal commands and install safe dependencies when needed.

Before installing dependencies, Claude must document:

1. the purpose of the dependency;
2. why it is needed;
3. what alternatives were considered;
4. why the selected tool is safe and appropriate;
5. whether it affects deployment;
6. whether it affects privacy or analytics;
7. whether it adds cost, secrets, accounts, or external services;
8. how it will be tested.

Claude must not install random, unnecessary, unsafe, abandoned, unrelated, or unmaintained packages.

Claude must not add tools only because they sound advanced.

Every tool must serve a real project requirement.

Claude must prefer modular, maintainable, replaceable tools over one huge locked-in system.

Claude must keep mathematical logic, visual rendering, Hebrew wording, curriculum knowledge, analytics, and deployment concerns separated.

Claude must be allowed and expected to use automation heavily, but only in a safe, documented, reversible way.

Claude must create real working automation, not pretend automation.

Claude must verify that every installed or configured tool actually works in the project.

If a tool choice is expensive, privacy-sensitive, requires secrets, requires external accounts, or changes the hosting architecture, Claude must stop and ask Yaniv for approval before implementation.

## 11. Automation and execution behavior

Claude must work automatically and intelligently.

Claude must not ask Yaniv routine technical questions when Claude can inspect the repository and decide professionally.

Claude may use terminal commands when needed.

Claude may install safe project dependencies only when necessary and justified.

Claude must document every dependency it adds and why it is needed.

Claude must not install random, unsafe, abandoned, unnecessary, or unrelated packages.

Claude must prefer strong, appropriate tools for:

- mathematical notation;
- SVG rendering;
- geometry drawing;
- coordinate systems;
- graph rendering;
- tables and charts;
- Hebrew RTL layout;
- DOM-to-image or HTML-to-image export;
- clipboard image copy;
- PNG fallback download;
- A4 printing;
- analytics;
- performance monitoring;
- automated validation tests.

If a decision is destructive, risky, privacy-sensitive, cost-sensitive, or changes the product direction, Claude must stop and ask Yaniv for approval.

## 12. Final product requirements

The final generator must be:

- Hebrew-only for all user-facing text;
- RTL;
- based only on Yaniv's supplied source materials and requirements;
- suitable for grades 7, 8, and 9;
- focused only on printable worksheet exercises;
- not a computerized student-assignment system;
- visually premium;
- mathematically accurate;
- easy for teachers to use;
- easy for Yaniv to edit later;
- real and production-ready;
- accessible from a stable public external link.

Every generated exercise must eventually support:

- preview;
- teacher parameter editing;
- correct Hebrew wording;
- correct Hebrew punctuation;
- accurate mathematical answer logic;
- high-quality visual rendering;
- copy as rendered image;
- download as rendered image;
- A4 print-ready layout.

## 13. Public external link and heavy-site requirement

The final website must have a real external public link.

The link must be stable and easy to share with many teachers.

The site must be planned as a heavy real website, not a small demo.

The expected audience may include thousands of teachers.

Claude must plan for:

- reliable hosting;
- fast loading;
- caching;
- asset optimization;
- scalable frontend structure;
- resilient deployment;
- clear build process;
- real production checks;
- no fake online status;
- no demo-only deployment;
- no broken public link.

Claude must decide whether GitHub Pages is enough or whether another deployment architecture is needed.

Claude must justify the deployment choice.

If the selected hosting or analytics solution requires accounts, secrets, paid services, or privacy-sensitive configuration, Claude must clearly explain the tradeoffs and ask Yaniv for approval before implementation.

## 14. Private analytics requirement

Yaniv must be able to know, privately, how the site is being used.

Only Yaniv should see the analytics.

Teachers and public users must not see usage statistics.

The analytics must show, at minimum:

- how many users entered the site;
- when users entered;
- where traffic came from when technically available;
- which pages or generator areas were used;
- how many exercises were generated;
- how many copy-as-image actions were used;
- how many download-as-image actions were used;
- how much the site is used over time.

Claude must implement this honestly, securely, and privately.

Claude must not expose analytics publicly.

Claude must not place analytics secrets in the repository.

Claude must not collect unnecessary personal information.

Claude must prefer privacy-respecting aggregation unless Yaniv explicitly approves more detailed tracking.

Claude must create a private admin/analytics access plan for Yaniv only.

## 15. Hebrew UI requirement

All final product UI must be in Hebrew.

This includes:

- buttons;
- navigation;
- teacher menus;
- cards;
- capsules;
- controls;
- labels;
- error messages;
- empty states;
- export messages;
- print messages;
- analytics/admin dashboard labels.

There must be no English UI labels in the final product.

No `demo`, `placeholder`, `sample`, or fake UI text is allowed.

All capsules, buttons, cards, controls, and menus must be real and functional.

## 16. Premium design requirement

The site must have premium-quality visual design.

The design must include:

- clean Hebrew typography;
- strong RTL layout;
- readable spacing;
- professional worksheet previews;
- premium visual cards/capsules;
- high-quality buttons;
- varied color palettes;
- special and attractive color options;
- black-and-white print mode;
- grayscale print mode;
- full-color mode;
- high contrast where needed;
- no childish clutter;
- no low-quality graphics.

Graphics must support the mathematics and must never distract from it.

## 17. Mathematical graphics requirement

All mathematical graphics must be accurate and high quality.

The generator must support, when relevant:

- geometry diagrams;
- labeled points;
- segments;
- rays;
- angles;
- polygons;
- circles;
- solids;
- coordinate systems;
- graphs;
- tables;
- charts;
- number lines;
- algebraic representations;
- statistical representations;
- probability visuals.

Drawings must look like professional textbook material.

No cropped labels.

No distorted diagrams.

No fake visuals.

No manually inconsistent drawings.

If a generated question changes numbers or parameters, all diagrams, labels, answers, and wording must update consistently.

## 18. Quality gates

Claude must run deep checks before claiming anything is complete.

Required checks:

1. Source check — every generated item maps to source material.
2. Curriculum check — grade, domain, topic, and skill are valid.
3. Mathematical check — answer logic is correct.
4. Hebrew check — wording, grammar, punctuation, and RTL are correct.
5. UI check — all capsules, buttons, cards, and controls are Hebrew.
6. Rendering check — layout is clean, uncropped, and printable.
7. Diagram check — diagrams and labels match the generated question.
8. Parameter check — teacher edits update all dependent values correctly.
9. Copy-as-image check — image copying works where supported.
10. Fallback check — PNG download works if clipboard image copy is blocked.
11. Print check — A4 output is usable.
12. Analytics privacy check — only Yaniv can see analytics.
13. Performance check — the site remains fast enough for many teachers.
14. Deployment check — the public external link works.
15. Toolchain check — installed tools actually work and are documented.
16. No-demo check — no fake data, fake buttons, fake text, or fake success states.

If any check fails, Claude must report the failure honestly and must not mark the feature complete.

## 19. Work stages

Claude must work in this order:

1. Read `RULES.md`.
2. Audit the repository.
3. Report what exists.
4. Propose cleanup and structure.
5. Verify the 10 real source PDFs.
6. Learn every source file deeply.
7. Build a curriculum map.
8. Extract question patterns.
9. Design the data model.
10. Design the toolchain and automation plan.
11. Design the rendering/export architecture.
12. Design the teacher-editing system.
13. Design the public deployment strategy.
14. Design private analytics for Yaniv only.
15. Ask for approval before major implementation.
16. Implement only after approval.
17. Test deeply.
18. Update documentation truthfully.

## 20. Documentation and status rule

Claude must keep `RULES.md` updated.

Claude must record:

- what Yaniv required;
- what Claude created;
- what Claude changed;
- why each changed file was needed;
- which tools/dependencies were selected;
- why each tool/dependency was selected;
- what was tested;
- what failed;
- what remains;
- blockers;
- next step.

Claude must not create extra planning files unless they are clearly necessary and explained.

Claude must prefer keeping the master requirements and master prompt in `RULES.md`.

## 21. Reporting format

At the end of every Claude work session, Claude must report:

```text
STATUS:
DONE:
FILES INSPECTED:
FILES CHANGED:
WHY EACH FILE WAS CHANGED:
TOOLS CONSIDERED:
TOOLS INSTALLED OR CONFIGURED:
WHY EACH TOOL WAS CHOSEN:
WHAT SHOULD BE CLEANED:
WHAT REMAINS:
BLOCKERS:
NEXT STEP:
PERCENT:
```

Claude must not claim that something works unless it was actually implemented and tested.

## 22. Current completion estimate

Repository organization for source-learning: 93%.

Source PDF upload: 100%.

Claude source learning: 0%.

Toolchain planning: 0%.

Generator implementation: 0%.

Public external link: 0%.

Private analytics: 0%.
