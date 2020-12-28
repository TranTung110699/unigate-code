import XLSX from 'xlsx';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import { t1 } from 'translate';
import getLodash from 'lodash.get';

const exportOpenEndedAnswers = (take) => {
  const answers = getLodash(take, 'answers');

  const paperTreeView = getLodash(take, 'paper_detail.tree_view');
  console.log(paperTreeView);

  let aoa = [];
  aoa.push(['stt', t1('question_content'), t1('user_answer')]);
  let i = 0;
  if (paperTreeView && paperTreeView.children) {
    paperTreeView.children.map((exercise, index) => {
      exercise &&
        exercise.children &&
        exercise.children.map((question) => {
          if (question.type == questionTypes.TYPE_OPEN_ENDED) {
            i++;
            aoa.push([
              i,
              question.content || 'content',
              getLodash(answers[question.id], 'answer.content') || 'answer',
            ]);
          }
        });
    });
  }

  console.log(aoa);

  //
  //
  // let aoa = [
  //   ["This",   "is",     "a",    "Test"],
  //   ["வணக்கம்", "สวัสดี", "你好", "가지마"],
  //   [1,        2,        3,      4],
  //   ["Click",  "to",     "edit", "cells"]
  // ];
  // let html = XLSX.utils.aoa_to_sheet
  let ws = XLSX.utils.aoa_to_sheet(aoa);
  let html = XLSX.utils.sheet_to_html(ws);
  console.log({ html });

  let wsName = 'new sheet';
  let wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, wsName);

  // XLSX.utils.
  // var wb = XLSX.utils.aoa_to_sheet(aoa, {sheet:"Sheet JS"});
  // return XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'base64'});

  return XLSX.writeFile(wb, 'SheetJSTableExport.xlsx');
};

export default exportOpenEndedAnswers;
