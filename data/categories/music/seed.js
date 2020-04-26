// TODO: TS!!!

'use strict';

const {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
} = require('../../models');

const category = createCategory('Music');

const answers = [
  'Eminem',
  'Vanilla Ice',
  'Ice T',
  'ArsenMacklemoreal',
].map(contents => createAnswer(contents));

const questions = [
  [
    'Robert Matthew Van Winkle is the birth name of which rapper?',
    answers[1]
  ],
].map(args => createQuestion(...args))


const categoryQuestions = createCategoryQuestions(category, questions);

const possibleAnswers = [
  [questions[0], answers],
].map(args => createPossibleAnswers(...args));

module.exports = {
  category,
  questions,
  answers,
  categoryQuestions,
  possibleAnswers,
};
