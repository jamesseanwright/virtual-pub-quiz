// TODO: TS!!!

'use strict';

const {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
} = require('../../models');

const category = createCategory('Sports');

const answers = [
  'Liverpool',
  'Everton',
  'Aston Villa',
  'Arsenal',
].map(contents => createAnswer(contents));

const questions = [
  [
    'Who won the Football League First Division in the 1985-86 season?',
    answers[0], // TODO: function to select correct answer and 3 others, all in shuffled order
  ],
  [
    'Which football club was first known as Dial Square?',
    answers[3],
  ],
].map(args => createQuestion(...args));

const categoryQuestions = createCategoryQuestions(category, questions);

const possibleAnswers = [
  ...createPossibleAnswers(questions[0], answers),
  ...createPossibleAnswers(questions[1], answers),
];

module.exports = {
  category,
  questions,
  answers,
  categoryQuestions,
  possibleAnswers,
};
