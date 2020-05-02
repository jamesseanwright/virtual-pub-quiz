'use strict';

const { v4 } = require('uuid');

const MAX_POSSIBLE_ANSWERS = 4;

const toSqlString = val => {
  // To avoid double serialisation
  const isSerialised = val.match(/^'(.*)'$/);

  return isSerialised ? val : `'${val}'`;
};

const serialiseValues = items => items.map(toSqlString);

const randomInt = max => Math.round(max * Math.random());

const pickPossibleAnswers = (correctAnswer, allAnswers) => {
  const othersOffset = Math.max(0, randomInt(allAnswers.length - MAX_POSSIBLE_ANSWERS - 1));

  const otherAnswers = allAnswers
    .filter(([id]) => id !== correctAnswer[0])
    .slice(othersOffset, othersOffset + MAX_POSSIBLE_ANSWERS - 1);

  return [correctAnswer, ...otherAnswers]
    .sort(() => randomInt(1.5));
};

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

const createPossibleAnswers = ([questionId, , , correctAnswerId], allAnswers) => {
  const correctAnswer = allAnswers.find(([id]) => id === correctAnswerId);

  return pickPossibleAnswers(correctAnswer, allAnswers)
    .map(([answerId]) => serialiseValues([
      v4(),
      questionId,
      answerId,
    ]));
};

module.exports = {
  createCategory,
  createQuestion,
  createAnswer,
  createCategoryQuestions,
  createPossibleAnswers,
};
