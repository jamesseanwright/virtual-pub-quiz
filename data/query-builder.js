'use strict';

const { resolve } = require('path');

const [, , seedPath] = process.argv;

const {
  category,
  questions,
  answers,
  categoryQuestions,
  possibleAnswers,
} = require(resolve(process.cwd(), seedPath));

const createInsertQueryBuilder = tableName =>
  rows => `
insert into ${tableName}
values
  ${rows.map(row => `(
    ${row.join(', ')}
  )`).join(',\n  ')};
  `;

const categoryInsertQuery = createInsertQueryBuilder('category');
const questionInsertQuery = createInsertQueryBuilder('question');
const answerInsertQuery = createInsertQueryBuilder('answer');
const categoryQuestionsInsertQuery = createInsertQueryBuilder('category_questions');
const possibleAnswersInsertQuery = createInsertQueryBuilder('possible_answers');

const query = [
  `set schema 'pubquiz';\n`,
  categoryInsertQuery(category),
  questionInsertQuery(questions),
  answerInsertQuery(answers),
  categoryQuestionsInsertQuery(categoryQuestions),
  possibleAnswersInsertQuery(possibleAnswers),
].join('');

console.log(query);
