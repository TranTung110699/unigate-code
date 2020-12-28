import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { DefinedUrlParams } from 'routes/links/common';
import LayoutHelper from 'layouts/LayoutHelper';
import Loading from 'components/common/loading';
import fetchData from 'components/common/fetchData';
import contestApiUrls from 'components/admin/contest/endpoints/';
import { t1 } from 'translate';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import { contestLink } from '../routes';
import { secondsToTimeString, timestampToDateString } from 'common/utils/Date';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import Table from 'antd/lib/table';
import Widget from 'components/common/Widget';
import Warning from '../../common/Warning';
import Html from 'components/common/html';

class ExamResult extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    LayoutHelper.useLayout('embedded', this);
  }

  render() {
    const { takeInfo, contestCode, examOrder, courseIid } = this.props;

    if (!takeInfo) {
      return <Loading />;
    }

    const examRoundInfo = lodashGet(takeInfo, 'exam_round_info');

    if (!examRoundInfo)
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h1>
                <Warning>
                  {t1('user_has_not_taken_this_test_yet_or_something_is_wrong')}
                </Warning>
              </h1>
            </div>
          </div>
        </div>
      );

    const canDo = parseInt(lodashGet(examRoundInfo, 'options.can_do'));

    let retakeButton, title;
    if (canDo == 1) {
      retakeButton = null;
      title = t1('congratulations_on_finishing_the_contest');
    } else {
      title = `${t1('you_have_finished_exam_order')}: ${examOrder}`;
      if (examOrder == canDo) {
        retakeButton = (
          <span>{t1('you_have_finished_all_%d_tries', [examOrder])}</span>
        );
      } else {
        retakeButton = (
          <a href={contestLink(contestCode)}>
            <Button type="primary" key="console">
              {t1('test_again')}
            </Button>{' '}
            {canDo - examOrder ? (
              <p>({t1('you_have_%d_more_tries', [canDo - examOrder])})</p>
            ) : null}
          </a>
        );
      }
    }

    const canPreviewTake = !!parseInt(
      lodashGet(examRoundInfo, 'contestants_can_preview_take'),
    );

    let viewDetailButton;
    if (canPreviewTake) {
      const previewUrl = Links.previewTake(lodashGet(takeInfo, 'id'));

      viewDetailButton = (
        <Link to={previewUrl}>
          <Button key="view-take-details">{t1('view_take_details')}</Button>
        </Link>
      );
    } else viewDetailButton = null;

    const dataSource = [
      {
        key: 'score',
        name: t1('score'),
        val: (
          <b>
            {takeInfo.score ? (
              <span>
                {takeInfo.score} / {takeInfo.total_score}
              </span>
            ) : (
              t1('not_yet_marked')
            )}
          </b>
        ),
      },
      {
        key: 'order',
        name: t1('exam_order'),
        val: examOrder,
      },
      {
        key: 'when',
        name: t1('when_exam_was_taken'),
        val: timestampToDateString(takeInfo.finished_time, { showTime: true }),
      },
      {
        key: 'duraction',
        name: t1('time_spent'),
        val: secondsToTimeString(takeInfo.spent_time),
      },
    ];

    const columns = [
      {
        key: 'name',
        dataIndex: 'name',
        width: '30%',
      },
      {
        key: 'val',
        dataIndex: 'val',
      },
    ];

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <Result
              status="success"
              title={<span>{title}</span>}
              subTitle={<div className="text-bold" />}
              extra={[retakeButton]}
            />

            <Widget
              title={
                <span>
                  {t1('take_details')} {viewDetailButton}
                </span>
              }
            >
              <Table
                columns={columns}
                dataSource={dataSource}
                showHeader={false}
                pagination={false}
              />
            </Widget>

            {lodashGet(examRoundInfo, 'description') ? (
              <Widget title={t1('more_exam_description')}>
                <Html content={lodashGet(examRoundInfo, 'description')} />
              </Widget>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;

  const contestCode = lodashGet(
    match,
    `params.${DefinedUrlParams.CONTEST_CODE}`,
  );
  const courseIid = lodashGet(match, `params.${DefinedUrlParams.COURSE_IID}`);

  const examIid = lodashGet(match, `params.${DefinedUrlParams.EXAM_IID}`);
  const examOrder = lodashGet(match, `params.${DefinedUrlParams.EXAM_ORDER}`);
  const userIid = lodashGet(match, `params.${DefinedUrlParams.USER_IID}`);

  return {
    courseIid,
    examIid,
    examOrder,
    userIid,
    contestCode,
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: contestApiUrls.get_take_info_for_preview_by_exam_order,
    params: {
      course: props.courseIid,
      exam_iid: props.examIid,
      uiid: props.userIid || null,
      exam_order: props.examOrder,
    },
    keyState: `result_${props.courseIid}_${props.examIid}_${props.userIid}_${
      props.examOrder
    }`,
    propKey: 'takeInfo',
  }))(ExamResult),
);
