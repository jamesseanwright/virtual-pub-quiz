'use strict';

const { v4 } = require('uuid');

const toSqlString = val => {
  // To avoid double serialisation
  const isSerialised = val.match(/^'(.*)'$/);

  return isSerialised ? val : `'${val}'`;
};

const serialiseValues = items => items.map(toSqlString);

/* This is a 2D array as our query builder
 * creates insert queries based upon multiple
 * rows of values */
const createCategory = displayName => [serialiseValues([
  v4(),
  displayName,
])];

const createQuestion = (contents, [answerId]) => serialiseValues([
  v4(),
  'multiple_choice', // TODO: support other question types!
  contents,
  answerId,
]);

const createAnswer = contents => serialiseValues([
  v4(),
  contents,
]);

const createCategoryQuestions = ([[categoryId]], questions) =>
  questions.map(([questionId]) => serialiseValues([
    v4(),
    categoryId,
    questionId,
  ]));

const createPossibleAnswers = ([questionId], answers) =>
  answers.map(([answerId]) => serialiseValues([
    v4(),
    questionId,
    answerId,
  ]));

module.exports = {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
};
