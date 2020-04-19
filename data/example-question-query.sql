set schema 'pubquiz';

select question.id, question.contents, json_agg(json_build_object('id', answer.id, 'contents', answer.contents)) as possible_answers
from question
inner join possible_answers
on question.id = possible_answers.question_id
inner join answer
on answer.id = possible_answers.answer_id
where question.id = 'c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c'
group by question.id