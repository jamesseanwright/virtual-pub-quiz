'use strict';

const {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
} = require('../../models');

const category = createCategory('Sports');

const questions = [
  [
    'Who won the Football League First Division in the 1985-86 season?',
    'b0b5e503-b3df-4773-866d-c2cfc0c47f22',
  ],
  [
    'Which football club was first known as Dial Square?',
    'b3513fb0-2a2b-4df7-884c-7298789e4ad1'
  ],
].map(args => createQuestion(...args));

const answers = [
  'Liverpool',
  'Everton',
  'Aston Villa',
  'Arsenal',
].map(contents => createAnswer(contents));

const categoryQuestions = createCategoryQuestions(category, questions);

const possibleAnswers = [
  [questions[0], answers],
  [questions[1], answers],
].map(args => createPossibleAnswers(...args));

module.exports = {
  category,
  questions,
  answers,
  categoryQuestions,
  possibleAnswers,
};
