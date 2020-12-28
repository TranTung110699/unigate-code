import React from 'react';
import { t1 } from 'translate';
import getlodash from 'lodash.get';
import { timestampToDateString } from 'common/utils/Date';
import AntdTable from 'antd/lib/table';
import DisplayHtml from 'components/common/html';

const getDataSourceToRender = (items) => {
  const result = [];

  if (!Array.isArray(items) || !items.length) {
    return [];
  }

  let stt = 0;
  items.forEach(({ forms_of_training, user }) => {
    const userIndex = result.length;
    if (!Array.isArray(forms_of_training) || !forms_of_training.length) {
      return;
    }

    forms_of_training.forEach(
      ({ training_mode, training_level, faculty, major, ico, subjects }) => {
        const formOfTrainingIndex = result.length;
        if (!Array.isArray(subjects) || !subjects.length) {
          return;
        }

        subjects.forEach(({ subject, note }) => {
          result.push({
            user,
            training_mode,
            training_level,
            faculty,
            major,
            ico,
            subject,
            note,
          });
        });

        if (result[formOfTrainingIndex]) {
          result[formOfTrainingIndex].formOfTrainingRowSpan =
            result.length - formOfTrainingIndex;
        }
      },
    );

    if (result[userIndex]) {
      result[userIndex].userRowSpan = result.length - userIndex;
      result[userIndex].stt = ++stt;
    }
  });

  return result;
};

const tableResult = ({ items }) => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  const columns = [
    {
      title: t1('stt'),
      key: 'id',
      render: (text, { stt, userRowSpan }) => ({
        children: stt,
        props: {
          rowSpan: userRowSpan || 0,
        },
      }),
    },
    {
      title: t1('student_information'),
      children: [
        {
          title: t1('student_code'),
          key: 'user.code',
          render: (text, { user, userRowSpan }) => ({
            children: getlodash(user, 'code'),
            props: {
              rowSpan: userRowSpan || 0,
            },
          }),
        },
        {
          title: t1('last_name'),
          render: (text, { user, userRowSpan }) => ({
            children: getlodash(user, 'last_name'),
            props: {
              rowSpan: userRowSpan || 0,
            },
          }),
        },
        {
          title: t1('first_name'),
          render: (text, { user, userRowSpan }) => ({
            children: getlodash(user, 'first_name'),
            props: {
              rowSpan: userRowSpan || 0,
            },
          }),
        },
        {
          title: t1('birthday'),
          render: (text, { user, userRowSpan }) => ({
            children:
              getlodash(user, 'birthday') &&
              timestampToDateString(getlodash(user, 'birthday')),
            props: {
              rowSpan: userRowSpan || 0,
            },
          }),
        },
      ],
    },
    {
      title: t1('form_of_training'),
      children: [
        {
          title: t1('major'),
          render: (text, { major, formOfTrainingRowSpan }) => ({
            children: getlodash(major, 'name'),
            props: {
              rowSpan: formOfTrainingRowSpan || 0,
            },
          }),
        },
        {
          title: t1('training_level'),
          render: (text, { training_level, formOfTrainingRowSpan }) => ({
            children: t1(training_level),
            props: {
              rowSpan: formOfTrainingRowSpan || 0,
            },
          }),
        },
        {
          title: t1('training_mode'),
          render: (text, { training_mode, formOfTrainingRowSpan }) => ({
            children: t1(training_mode),
            props: {
              rowSpan: formOfTrainingRowSpan || 0,
            },
          }),
        },
        {
          title: t1('ico'),
          render: (text, { ico, formOfTrainingRowSpan }) => ({
            children: getlodash(ico, 'name'),
            props: {
              rowSpan: formOfTrainingRowSpan || 0,
            },
          }),
        },
      ],
    },
    {
      title: t1('credit_transfert'),
      render: (text, { subject }) => (
        <div>
          {getlodash(subject, 'name')}{' '}
          <span>(#{getlodash(subject, 'code')})</span>
        </div>
      ),
    },
    {
      title: t1('note'),
      render: (text, { note }) => {
        return <DisplayHtml content={note} />;
      },
    },
  ];

  return (
    <AntdTable
      columns={columns}
      dataSource={getDataSourceToRender(items)}
      bordered
      pagination={false}
      size="middle"
    />
  );
};

export default tableResult;
