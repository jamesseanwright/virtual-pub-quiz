/*
  Conventions:
  Core table names: singular
  Relating/link table names: plural
*/

create schema if not exists pubquiz;

create table if not exists pubquiz.category (
  id uuid primary key not null,
  display_name text not null
  questions uuid not null references pubquiz.category_questions(category_id)
);

create table if not exists pubquiz.question (
  id uuid primary key not null,
  contents text not null,
  correct_answer uuid not null references pubquiz.answer(id),
  possible_answers uuid not null references pubquiz.possible_answers(question_id)
);

create table if not exists pubquiz.category_questions (
  id uuid primary key not null,
  question_id uuid not null,
);

create table if not exists pubquiz.answer (
  id uuid primary key not null,
  contents text not null
);

create table if not exists pubquiz.possible_answer (
  id uuid primary key not null,
  question_id uuid not null,
  answer_id uuid not null
);