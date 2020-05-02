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

const artists = [
  'Eminem',
  'Vanilla Ice',
  'Ice T',
  'Macklemore',
].map(contents => createAnswer(contents));

const albums = [
  'Rumours (Fleetwood Mac)',
  'The Wall (Pink Floyd)',
  'Hotel California (Eagles)',
  'Led Zeppelin IV (Led Zeppelin)',
].map(contents => createAnswer(contents));

const answers = [
  ...artists,
  ...albums,
];

const questions = [
  [
    'Robert Matthew Van Winkle is the birth name of which rapper?',
    artists[1],
  ],
  [
    'Which 70s album has sold the most certified copies as of 2020?',
    albums[2]
  ]
].map(args => createQuestion(...args))

const categoryQuestions = createCategoryQuestions(category, questions);

const possibleAnswers = [
  ...createPossibleAnswers(questions[0], artists),
  ...createPossibleAnswers(questions[1], albums),
];

module.exports = {
  category,
  questions,
  answers,
  categoryQuestions,
  possibleAnswers,
};
