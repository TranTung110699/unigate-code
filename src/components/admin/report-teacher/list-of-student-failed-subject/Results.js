import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Icon from 'components/common/Icon';
import { timestampToDateString } from 'common/utils/Date';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import OfflineExamSearch from 'components/admin/offline-exam/search/Layout';
import NewForm from 'components/admin/course/new/Form';
import { examSubTypes } from 'configs/constants';

const getDataSource = (items) => {
  if (!Array.isArray(items) || !items.length) {
    return [];
  }

  return items.reduce((result, { users, ...info }) => {
    const count = Array.isArray(users) && users.length;
    if (!count) {
      return result;
    }
    return result.concat(
      users.map((user, index) => {
        return {
          ...info,
          numberOfStudent: count,
          user,
          rowSpan: index ? 0 : count,
        };
      }),
    );
  }, []);
};

const results = ({ items, page, allowRetaking }) => {
  const position =
    (parseInt(get(page, 'page', 0)) - 1) *
    parseInt(get(page, 'items_per_page', 0));

  const columns = [
    {
      title: t1('stt'),
      key: 'id',
      render: (text, row, index) => ({
        children: index + 1 + position,
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('semester'),
      render: ({ semester, school_year, rowSpan }) => {
        return {
          children: (
            <div>
              {get(semester, 'name')} <br />
              {get(school_year, 'name')}
            </div>
          ),
          props: {
            rowSpan: rowSpan,
          },
        };
      },
    },
    {
      title: t1('subject'),
      render: ({ syllabus, semester, school_year, rowSpan }) => {
        return {
          children: (
            <div>
              {`${get(syllabus, 'name')} (#${get(syllabus, 'code')})  `}
              {allowRetaking > 0 && (
                <DetailOnDialog
                  renderPreview={({ showFull }) => (
                    <Icon
                      icon="book"
                      className="action"
                      onClick={showFull}
                      style={{ fontSize: 20 }}
                      title={t1('offline_exam')}
                    />
                  )}
                  renderFull={() => {
                    const searchFormId = `offline_exam_search_${get(
                      syllabus,
                      'iid',
                    )}`;
                    return (
                      <div>
                        <OfflineExamSearch
                          hiddenFields={{
                            school_year: [get(school_year, 'iid')],
                            semester: [get(semester, 'iid')],
                            credit_syllabus: [get(syllabus, 'iid')],
                          }}
                          classFormFilter="display-none"
                          formid={searchFormId}
                        />
                        <DetailOnDialog
                          renderPreview={({ showFull }) => (
                            <RaisedButton
                              className="m-t-30"
                              label={t1('new_offline_exam')}
                              onClick={showFull}
                            />
                          )}
                          renderFull={({ closeDialog }) => (
                            <NewForm
                              mode="new"
                              step="offline_exam"
                              formid="new_offline_exam"
                              searchFormId={searchFormId}
                              requestSuccessful={closeDialog}
                              hiddenFields={{
                                school_year: get(school_year, 'iid'),
                                semester: get(semester, 'iid'),
                                credit_syllabus: [get(syllabus, 'iid')],
                                exam_sub_type: examSubTypes.FINAL_RESIT,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  }}
                  dialogKey="offline_exam_search"
                  dialogOptionsProperties={{
                    handleClose: true,
                    width: '80%',
                  }}
                />
              )}
            </div>
          ),
          props: {
            rowSpan: rowSpan,
          },
        };
      },
    },
    {
      title: t1('number_of_students'),
      render: ({ numberOfStudent, rowSpan }) => {
        return {
          children: numberOfStudent,
          props: {
            rowSpan: rowSpan,
            className: 'text-center',
          },
        };
      },
    },
    {
      title: t1('student_code'),
      key: 'user',
      dataIndex: 'user.code',
    },
    {
      title: t1('last_name'),
      key: 'user',
      dataIndex: 'user.last_name',
    },
    {
      title: t1('first_name'),
      key: 'user',
      dataIndex: 'user.first_name',
    },
    {
      title: t1('birthday'),
      key: 'user',
      dataIndex: 'user.birthday',
      render: (birthday) => timestampToDateString(birthday),
    },
    {
      title: t1('course'),
      key: 'user',
      dataIndex: 'user.course',
      render: (course) => get(course, 'name'),
    },
    {
      title: t1('training_mode'),
      key: 'training_mode',
      render: (text, row) => {
        const trainingMode = get(row, 'user.training_mode', null);
        const trainingLevel = get(row, 'user.training_level', null);
        if (trainingMode && trainingLevel) {
          return `${t1(trainingMode)}/${t1(trainingLevel)}`;
        }

        if (trainingMode) {
          return t1(trainingMode);
        }

        if (trainingLevel) {
          return t1(trainingLevel);
        }
      },
    },
    {
      title: t1('major'),
      key: 'user',
      dataIndex: 'user.major',
      render: (major) => get(major, 'name'),
    },
    {
      title: t1('ico'),
      key: 'user',
      dataIndex: 'user.ico',
      render: (ico) => get(ico, 'name'),
    },
    {
      title: t1('note'),
      key: 'user',
      dataIndex: 'user.note',
    },
  ];
  return (
    <AntdTable
      columns={columns}
      dataSource={getDataSource(items)}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default results;
