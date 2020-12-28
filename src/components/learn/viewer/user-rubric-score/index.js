import React from 'react';
import fetchData from 'components/common/fetchData';
import lGet from 'lodash.get';
import lodashGet from 'lodash.get';
import withUserInfo from 'common/hoc/withUserInfo';
import Skeleton from 'antd/lib/skeleton';
import DisplayHtml from 'components/common/html/index';
import Descriptions from 'antd/lib/descriptions';
import { t1 } from 'translate/index';
import Warning from '../../../common/Warning';
import RubricScoreTable from './ScoreTable';
import PassFailIcon from 'components/admin/course/mainstage/score-and-marking/score-by-rubric/PassFailIcon';
import RubricDescription from './RubricDescription';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import IconHelp from 'components/common/Icon/Help';

const dialogOptionsProperties = {
  width: '40%',
  handleClose: true,
  minHeight: '300px',
};

const warningLabel = (itemNtype) => {
  switch (itemNtype) {
    case 'course':
      return t1('this_course_does_not_have_rubric');
    case 'enrolment-plan':
      return t1('this_enrolment_plan_does_not_have_rubric');
    case 'training-plan':
      return t1('this_training_plan_does_not_have_rubric');
    default:
      return t1('this_item_does_not_have_rubric');
  }
};

function UserRubricScore({
  itemIid,
  itemNtype,
  itemRubricScore,
  loadingStatus,
  className,
}) {
  if (loadingStatus !== 'finished' && !itemRubricScore)
    return <Skeleton active />;

  const rubricIid = lodashGet(itemRubricScore, 'iid');
  const passed = lodashGet(itemRubricScore, 'passed');
  const score = lodashGet(itemRubricScore, 'score');
  const cp = lodashGet(itemRubricScore, 'cp');

  if (!rubricIid)
    return (
      <div className="p-10">
        <Warning>{warningLabel(itemNtype)}</Warning>
      </div>
    );

  return (
    <div className={`p-10 ${className} white-background p-b-30`}>
      <div>
        <h1>
          {itemNtype === 'course'
            ? t1(`course_overall_score`)
            : itemNtype == 'enrolment-plan'
            ? t1('enrolment_plan_overall_score')
            : t1('overall_score')}
        </h1>
        <Descriptions column={1} bordered>
          <Descriptions.Item
            label={
              itemNtype === 'course'
                ? t1(`course_score`)
                : itemNtype == 'enrolment-plan'
                ? t1('enrolment_plan_score')
                : t1('score')
            }
          >
            <strong>{score}</strong>/100
          </Descriptions.Item>

          <Descriptions.Item label={t1('completion_progress')}>
            <strong>{cp}%</strong>
          </Descriptions.Item>

          {(passed || passed === 0) && (
            <Descriptions.Item label={t1('passed')}>
              <PassFailIcon passed={passed || 0} />{' '}
              <DetailOnDialog
                dialogKey={`rubrid-pass-${rubricIid}`}
                renderPreview={({ showFull }) => (
                  <span
                    onClick={showFull}
                    title={t1('click_to_view_minimum_passing_score')}
                    className="cursor-pointer"
                  >
                    <IconHelp />
                  </span>
                )}
                renderFull={({ closeDialog }) => (
                  <div>
                    <h1>{t1('rubric_detailed_description')}</h1>
                    <RubricDescription
                      itemIid={itemIid}
                      itemNtype={itemNtype}
                      rubric={lodashGet(itemRubricScore, 'rubric')}
                      scoreByRubrik={lodashGet(
                        itemRubricScore,
                        'score_by_rubrik',
                      )}
                    />
                  </div>
                )}
                dialogOptionsProperties={dialogOptionsProperties}
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>

      <div className="m-t-30">
        <h1>
          {itemNtype === 'course'
            ? t1(`course_detailed_score`)
            : itemNtype == 'enrolment-plan'
            ? t1('enrolment_plan_detailed_score')
            : t1('overall_score')}
        </h1>
        <RubricScoreTable
          itemIid={itemIid}
          itemNtype={itemNtype}
          rubric={lodashGet(itemRubricScore, 'rubric')}
          scoreByRubrik={lodashGet(itemRubricScore, 'score_by_rubrik')}
        />
      </div>

      <div className="m-t-30">
        <h1>{t1('rubric_detailed_description')}</h1>
        <RubricDescription
          itemIid={itemIid}
          itemNtype={itemNtype}
          rubric={lodashGet(itemRubricScore, 'rubric')}
          scoreByRubrik={lodashGet(itemRubricScore, 'score_by_rubrik')}
        />
      </div>
    </div>
  );
}

export default fetchData((props) => {
  const ntype = lGet(props, 'itemNtype');
  let baseUrl = `/rubrik/api/get-user-score-by-rubric`;

  return {
    baseUrl,
    params: {
      iid: lGet(props, 'itemIid'),
      ntype,
      uiid: lGet(props, 'userInfo.iid'),
      recalculate: 1,
    },
    propKey: 'itemRubricScore',
    fetchCondition: true,
    refetchCondition: (prevProps) => {
      return lGet(props, 'courseIid') !== lGet(prevProps, 'courseIid');
    },
  };
})(withUserInfo(UserRubricScore));
