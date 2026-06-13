# Question Variety Report — 2026-06-14

## What was done
- `tools/verify-topic-question-variety.mjs` (`verify:variety`): loads engines,
  samples real output, and gates every active topic on 4 structurally-distinct
  qtypes, >=3 documented families (major topics >=5), balanced TF, smart MCQ
  (1 correct, >=3 choices), mistake-with-correction, required visual, and full
  pedagogic metadata.

## Coverage (after this sprint)
- topicsChecked: 41
- topicsWith4Qtypes: 41
- topicsWith3Families: 41
- topicsWith5Families: 6 (major: N7-04, A7-01, A8-02, G7-01, G8-01, U7-01)
- topicsWithLearningGoal / TeacherPurpose / Misconception / FollowUps: 41 each
- topicsMissingVariety: 0
- fallbackTopicsStillGeneric: 9
- dedicatedEnginesAdded: 41

## Tests
verify:variety -> TOPIC_VARIETY_PASS. stress: 2050 generations, 0 fails,
now also gating pedagogic meta + >=6 distinct questions/topic.

## What remains
- The 9 remaining fallbacks are not held to the >=3-families bar (documented as
  fallback, served by the generic renderer).

## Recommended progress
Variety + pedagogy gate: complete for the 41 active engines.
