import React from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import get from 'lodash.get';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import LearnerProgress from 'components/admin/enrolment-plan/mainstage/members/search/learner-progress';
import DetailOnDialog from 'components/common/detail-on-dialog';

function Results({ items }) {
  const columns = [
    {
      title: t1('user'),
      key: 'user',
      width: '30%',
      render: (item) => (
        <PreviewUserInDialog user={item} field="name" showAvatar />
      ),
    },
    {
      title: t1('score'),
      children: [
        {
          title: t1('enrolment_plan'),
          key: 'enrolment_plan',
          dataIndex: 'enrollmentPlan',
          align: 'center',
          width: '20%',
          render: (item = {}) => item.name || '-',
        },
        {
          title: t1('score'),
          key: 'score',
          dataIndex: 'progressEp',
          align: 'center',
          width: '20%',
          render: (item) => {
            const totalWeight = get(item, 'total_weight');
            if (totalWeight === undefined) {
              return '-';
            }
            return `${get(item, 'progress', '-')}/${totalWeight}`;
          },
        },
        {
          title: `${t1('passed_courses')}/${t1('total_course')}`,
          key: 'passed',
          dataIndex: 'progressEp',
          align: 'center',
          width: '20%',
          render: (item = {}) => (
            <span>
              {item.totalPassedCourse || 0}/{item.totalCourse || 0}
            </span>
          ),
        },
      ],
    },
    {
      title: t1('detail'),
      key: 'detail',
      align: 'center',
      render: (item) => {
        const enrollmentPlan = get(item, 'enrollmentPlan', {});
        if (!enrollmentPlan.iid) return null;

        return (
          <DetailOnDialog
            dialogKey={`ep_${get(enrollmentPlan, 'iid')}_${get(
              item,
              'iid',
            )}_progress`}
            renderPreview={({ showFull }) => (
              <Icon
                type="eye"
                theme="twoTone"
                onClick={showFull}
                title={t1('learner_progress')}
                style={{ fontSize: '24px' }}
                twoToneColor="#2089E2"
              />
            )}
            renderFull={() => (
              <LearnerProgress
                enrolmentPlan={enrollmentPlan}
                user_iid={get(item, 'iid')}
              />
            )}
            dialogOptionsProperties={{
              title: t1('progress_of_%s', [item.name]),
              handleClose: true,
              width: '80%',
            }}
          />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={false}
      childrenColumnName={null}
      className="white-background"
      rowKey={(item) =>
        `${item.iid}-${get(item, 'processEp.iid', Math.random())}`
      }
      bordered
    />
  );
}

export default Results;
