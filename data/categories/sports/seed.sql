insert into pubquiz.category
values (
  "f56c71b7-8dea-4abd-b145-638a984d8cd2",
  "Sports",
  "750b2c51-6029-403d-9fd7-1240828253eb"
);

insert into pubquiz.question
values (
  "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c",
  "Who won the Football League First Division in the 1985-86 season?",
  "b0b5e503-b3df-4773-866d-c2cfc0c47f22",
  "CORRECT_ANSWER_JUNCTION_UUID"
);

insert into pubquiz.answer
values
  ("b0b5e503-b3df-4773-866d-c2cfc0c47f22", "Liverpool"),
  ("2d525aef-523d-4f6d-9f15-581c05807e85", "Everton"),
  ("32a8cb99-1592-423c-9e2c-caf5fbeca8f2", "Aston Villa"),
  ("b3513fb0-2a2b-4df7-884c-7298789e4ad1", "Arsenal");

insert into pubquiz.category_questions
values (
  "750b2c51-6029-403d-9fd7-1240828253eb",
  "f56c71b7-8dea-4abd-b145-638a984d8cd2",
  "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c"
);

insert into pubquiz.possible_answers
values
  (
    "86eee3c1-6058-4121-b7d5-a41009941bcc",
    "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c",
    "b0b5e503-b3df-4773-866d-c2cfc0c47f22"
  ),
  (
    "d2802408-22d4-4212-a032-d1c4a62e889c",
    "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c",
    "2d525aef-523d-4f6d-9f15-581c05807e85"
  ),
  (
    "e3c1-6058-4121-b7d5-a41009941bc",
    "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c",
    "32a8cb99-1592-423c-9e2c-caf5fbeca8f2"
  ),
  (
    "00685e5e-f950-430d-972c-18a14dc167c8",
    "c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c",
    "b3513fb0-2a2b-4df7-884c-7298789e4ad1"
  );