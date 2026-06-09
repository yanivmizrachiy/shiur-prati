# Question Schema Specification

## Purpose

This file defines the required metadata for every generated mathematics question in the Targilim project.

## Rule

No question may be approved unless it can be mapped to the supplied curriculum knowledge base.

## Required fields

Each generated question must include:

- `id`
- `grade`
- `domain`
- `topic`
- `subtopic`
- `skill`
- `prerequisites`
- `difficulty`
- `question_type`
- `representation_type`
- `teacher_parameters`
- `hebrew_prompt`
- `answer`
- `solution_notes`
- `common_misconceptions`
- `curriculum_source_reference`
- `approved_by_user`

## Example structure

```json
{
  "id": "",
  "grade": "ז",
  "domain": "",
  "topic": "",
  "subtopic": "",
  "skill": "",
  "prerequisites": [],
  "difficulty": "",
  "question_type": "",
  "representation_type": "",
  "teacher_parameters": [],
  "hebrew_prompt": "",
  "answer": "",
  "solution_notes": "",
  "common_misconceptions": [],
  "curriculum_source_reference": "",
  "approved_by_user": false
}
```

## Hebrew requirement

The `hebrew_prompt` field must contain the final student-facing question in Hebrew only.

## Approval rule

`approved_by_user` must remain `false` until Yaniv approves the question template or generation rule.
