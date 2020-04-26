/*
  Conventions:
  Core table names: singular
  Relating/link table names: plural
*/

create schema if not exists pubquiz;
set schema 'pubquiz';

create type question_type as enum (
  'multiple_choice',
  'free_text',
  'picture'
);

create table if not exists category (
  id uuid primary key not null,
  display_name text not null
);

create table if not exists answer (
  id uuid primary key not null,
  contents text not null
);

create table if not exists question (
  id uuid primary key not null,
  'type' question_type not null,
  contents text not null,
  correct_answer uuid not null
);

create table if not exists category_questions (
  id uuid primary key not null,
  category_id uuid references category(id),
  question_id uuid references question(id)
);

create table if not exists possible_answers (
  id uuid primary key not null,
  question_id uuid references question(id),
  answer_id uuid references answer(id)
);
