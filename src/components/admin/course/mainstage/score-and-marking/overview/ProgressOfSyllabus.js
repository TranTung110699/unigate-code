import React from 'react';
import get from 'lodash.get';
import HtmlContent from 'components/common/html';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import Loading from 'components/common/loading';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import PassFailIcon from '../score-by-rubric/PassFailIcon';

const getColumns = (progress = {}) => {
  return [
    {
      title: t1('ntype'),
      className: 'text-center',
      render: (row) => t1(row && row.ntype),
    },
    {
      title: t1('name'),
      render: (row) => {
        let name = row && row.name;

        if (!name) {
          name = <HtmlContent content={row && row.content} />;
        }

        return name;
      },
    },
    {
      title: t1('progress'),
      className: 'text-center',
      children: [
        {
          title: t1('completion_progress'),
          className: 'text-center',
          render: (row) => {
            return get(progress, `${get(row, 'iid') || get(row, 'id')}.cp`);
          },
        },
        {
          title: t1('completion_score'),
          className: 'text-center',
          render: (row) => {
            return get(progress, `${get(row, 'iid') || get(row, 'id')}.p`);
          },
        },
        {
          title: t1('passed'),
          className: 'text-center',
          render: (row) => {
            const passed = get(
              progress,
              `${get(row, 'iid') || get(row, 'id')}.pf`,
            );

            return <PassFailIcon passed={passed} />;
          },
        },
      ],
    },
  ];
};

const ProgressOfSyllabus = ({
  syllabusDataLoadingStatus,
  syllabus,
  progress,
}) => {
  if (syllabusDataLoadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!syllabus) {
    return <h3>{t1('there_is_no_data_for_this_report')}</h3>;
  }

  return (
    <Table
      columns={getColumns(progress)}
      dataSource={[syllabus]}
      defaultExpandAllRows
      size="middle"
      pagination={false}
      bordered
    />
  );
};

const fetchSyllabus = (props) => {
  return {
    baseUrl: apiUrls.fetch_node,
    fetchCondition: get(props, 'course.iid'),
    params: {
      iid:
        get(props, 'course.credit_syllabus') || get(props, 'course.syllabus'),
      ntype: 'syllabus',
      depth: -1,
    },
    propKey: 'syllabus',
    loadingStatusPropKey: 'syllabusDataLoadingStatus',
    refetchCondition: () => false,
  };
};

const fetchProgress = (props) => {
  return {
    baseUrl: apiUrls.tracker_progress_get(),
    fetchCondition: !!get(props, 'syllabus.iid'),
    params: {
      tcos: [get(props, 'syllabus.iid')],
      children: 1,
      depth: 8,
      userIid: get(props, 'user.iid'),
    },
    propKey: 'progress',
    loadingStatusPropKey: 'progressDataLoadingStatus',
    refetchCondition: (prevProps) =>
      !get(prevProps, 'syllabus.iid') && get(props, 'syllabus.iid'),
  };
};

export default fetchData(fetchSyllabus)(
  fetchData(fetchProgress)(ProgressOfSyllabus),
);
