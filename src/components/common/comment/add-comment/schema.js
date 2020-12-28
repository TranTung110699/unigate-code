import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Avatar from 'components/common/avatar/index';
import Comment from 'antd/lib/comment';

const schema = (formid, values, step, xpath, props) => {
  return {
    content: {
      type: 'text',
      multiLine: true,
      rows: 2,
      hintText: props.userToReply
        ? `${t1('reply')} ${props.userToReply}`
        : t1('enter_comment'),
      fullWidth: true,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['content'],
    },
  ];
};

const layoutFreestyle = ({ groups, submitButton, formValues, ...props }) => {
  const user = get(props, 'layoutOptionsProperties.user');

  return (
    <Comment
      avatar={<Avatar className="avatar" user={user} />}
      content={
        <div className="add-comment">
          <div className="content-wrapper">
            {get(groups, 'default.fieldNames.content')}
          </div>
          {submitButton}
        </div>
      }
      className="add-comment-wrapper"
    />
  );
};

const finalProcessBeforeSubmit = ({ content, ...fullData }) => {
  fullData.comment.content = content;
  return fullData;
};

export default {
  schema,
  ui,
  layout: (step, values, xpath, { user }) => ({
    component: layoutFreestyle,
    freestyle: 1,
    optionsProperties: {
      user,
    },
  }),
  finalProcessBeforeSubmit,
};
