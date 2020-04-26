'use strict';

const { v4 } = require('uuid');

/* This is a 2D array as our query builder
 * creates insert queries based upon multiple
 * rows of values */
const createCategory = displayName => [[
  v4(),
  displayName,
]];

const createQuestion = (contents, [answerId]) => [
  v4(),
  'multiple_choice', // TODO: support other question types!
  contents,
  answerId,
];

const createAnswer = contents => [
  v4(),
  contents,
];

const createCategoryQuestions = ([categoryId], questions) =>
  questions.map(([questionId]) => [
    v4(),
    categoryId,
    questionId,
  ]);

const createPossibleAnswers = ([questionId], answers) =>
  answers.map(([answerId]) => [
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
