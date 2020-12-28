import React from 'react';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import IconMarking from 'material-ui/svg-icons/action/done-all';
import { timestampToDateTimeString } from 'common/utils/Date';
import { t1 } from 'translate';
import Attachments from './Attachments';

export const ScoreDetail = (item) => (
  <div>
    {item.score_detail &&
      Object.values(item.score_detail).map((score) => (
        <p>
          <span>{score.pname}: </span>
          <br />
          <span>{score.weighted}</span>
        </p>
      ))}
  </div>
);

export const ExamDetail = (props) => {
  const { node, item, handleMarkTest } = props;
  return (
    <div>
      <p>
        <Link
          to={Links.previewTake(
            null,
            node.iid,
            { ...item.exam, exam_order: item.order },
            item.user.iid,
            node.syllabus,
          )}
          className="btn btn-sm"
          target="_blank"
        >
          <Icon icon="preview" />
          {t1('preview')}
        </Link>
      </p>
      <p>Exam nth: {item.order}</p>
      <p>{timestampToDateTimeString(item.ts)}</p>
      <p>
        <FlatButton
          label={t1('mark_test')}
          title={t1('mark_test')}
          icon={<IconMarking />}
          onClick={() => {
            handleMarkTest(item, node);
          }}
        />
      </p>
    </div>
  );
};

export const Answer = (item) => (
  <div>
    {item.answer.content && (
      <div>
        <p>{item.answer.content}</p>
      </div>
    )}

    {item.answer.attachments && item.answer.attachments.length && (
      <Attachments attachments={item.answer.attachments} />
    )}
  </div>
);

export const ExamInfo = (item) => (
  <div>
    <Icon icon="exam" />
    <b>{item.exam.name}</b>
    <p>#{item.exam.iid}</p>
  </div>
);
