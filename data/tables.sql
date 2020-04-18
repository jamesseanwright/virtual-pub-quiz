/*
  Conventions:
  Core table names: singular
  Relating/link table names: plural
*/

create schema if not exists pubquiz;

create table if not exists pubquiz.category (
  id uuid primary key not null,
  display_name text not null,
  questions uuid not null
);

create table if not exists pubquiz.answer (
  id uuid primary key not null,
  contents text not null
);

create table if not exists pubquiz.question (
  id uuid primary key not null,
  contents text not null,
  correct_answer uuid not null
  possible_answers uuid not null
);

create table if not exists pubquiz.category_questions (
  id uuid primary key not null,
  category_id uuid references pubquiz.category(id),
  question_id uuid references pubquiz.question(id)
);

create table if not exists pubquiz.possible_answers (
  id uuid primary key not null,
  question_id uuid references pubquiz.question(id),
  answer_id uuid references pubquiz.answer(id)
);