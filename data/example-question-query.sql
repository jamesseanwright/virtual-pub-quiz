select pubquiz.question.id, contents, correct_answer, array_agg(answer_id) as possible_answers
from pubquiz.question
inner join pubquiz.possible_answers
on pubquiz.question.id = pubquiz.possible_answers .question_id
where pubquiz.question.id = 'c78e3ff0-fa3b-4180-a3dd-2fafce95cf9c'
group by pubquiz.question.id