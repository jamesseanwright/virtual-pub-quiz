'use strict';

const { v4 } = require('uuid');

/* This is a 2D array as our query builder
 * creates insert queries based upon multiple
 * rows of values */
const createCategory = displayName => [[
  v4(),
  displayName,
]];

const createQuestion = (contents, correctAnswer) => [
  v4(),
  contents,
  correctAnswer,
];

const createAnswer = contents => [
  v4(),
  contents,
];

const createCategoryQuestions = ({ id: categoryId }, questions) =>
  questions.map(({ id: questionId }) => [
    v4(),
    categoryId,
    questionId,
  ]);

const createPossibleAnswers = ({ id: questionId }, answers) =>
  answers.map(({ id: answerId }) => [
    v4(),
    questionId,
    answerId,
  ]);

module.exports = {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
};
