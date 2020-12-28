import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
import AntdTable from 'antd/lib/table';
import { timestampToDateString } from 'common/utils/Date';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Tabs from 'antd/lib/tabs';
import QuestionReports from '../reports';

const columns = () => [
  {
    title: t1('user'),
    render: ({ user }) => {
      return {
        children: get(user, 'name'),
        props: {
          // colSpan: isHeader ? numberOfParts + 2 : 1,
        },
      };
    },
  },
  {
    title: t1('score'),
    render: ({ score }) => {
      return {
        children: typeof score !== 'undefined' ? score : '',
        props: {
          // colSpan: isHeader ? numberOfParts + 2 : 1,
        },
      };
    },
  },
  {
    title: t1('marking_time'),
    render: ({ marking_ts }) => {
      return {
        children: marking_ts && timestampToDateString(marking_ts),
        props: {
          // colSpan: isHeader ? numberOfParts + 2 : 1,
        },
      };
    },
  },
];

const renderResultsComponent = ({
  dataSource = [],
  viewDetailMarked = () => {},
}) => {
  return (
    <AntdTable
      className="white-background"
      dataSource={dataSource}
      columns={columns()}
      indentSize={0}
      pagination={false}
      expandIcon={({ onExpand, expanded, record }) => (
        <Icon
          type={expanded ? 'eye-invisible' : 'eye'}
          onClick={(e) => onExpand(record, e)}
        />
      )}
      expandedRowRender={(record) => {
        const detail = get(record, 'score_by_rubric.detail', []);
        return viewDetailMarked(detail);
      }}
      size="middle"
    />
  );
};

const PeerAssessment = ({
  courseIid,
  question,
  questionId,
  takeId,
  viewDetailMarked = () => {},
  rubricIidsToShowMarking = null,
}) => {
  return (
    <Tabs defaultActiveKey="overall">
      <Tabs.TabPane
        tab={
          <span>
            <Icon type="bar-chart" />
            {t1('peer_assessment_overall')}
          </span>
        }
        key="overall"
      >
        <QuestionReports
          peerMarking
          takeId={takeId}
          question={question}
          courseIid={courseIid}
          rubricIidsToShowMarking={rubricIidsToShowMarking}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={
          <span>
            <Icon type="user" />
            {t1('peer_assessment_details')}
          </span>
        }
        key="detail"
      >
        <SearchWrapper
          showResult
          showQueryField={false}
          showSearchButton={false}
          formid={`peer_assessment_${takeId}`}
          hiddenFields={{
            question_iid: questionId,
            take_id: takeId,
          }}
          alternativeApi="/take/api/get-all-peer-assessment"
          renderResultsComponent={(items) =>
            renderResultsComponent({
              dataSource: Array.isArray(items) ? items : [],
              viewDetailMarked,
            })
          }
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PeerAssessment;
