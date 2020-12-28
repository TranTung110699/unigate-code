import React, { Component } from 'react';
import { t1 } from 'translate/index';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import RubricScore from 'components/learn/viewer/user-rubric-score/index';
import Icon from 'antd/lib/icon';
import PassedIcon from 'components/admin/course/mainstage/score-and-marking/score-by-rubric/PassFailIcon';

// props: item, score, passed
class ScoreAndPassing extends Component {
  render() {
    const { item, mode } = this.props;
    const score =
      this.props.score ||
      lodashGet(item, 'p') ||
      lodashGet(item, 'progress') ||
      '0';
    const passed =
      this.props.passed || lodashGet(item, 'passed') || lodashGet(item, 'pf');
    let title = t1('click_to_view_detailed_rubric_score');
    if (passed) title = `${t1('you_have_passed_course')}. {title}`;

    const styles =
      mode == 'overview'
        ? {
            fontSize: '200%',
          }
        : {};

    return (
      <div>
        {mode != 'grid' ? <span>{t1('your_score')} : </span> : null}
        <span style={styles}>
          {score}
          <sup>đ</sup>
        </span>
        <span className="text-muted">/100</span>{' '}
        {lodashGet(item, 'rubric_iid') ? (
          <DetailOnDialog
            renderPreview={({ showFull }) => (
              <span onClick={showFull} title={title} className="cursor-pointer">
                {passed ? (
                  <PassedIcon passed={1} />
                ) : (
                  <Icon type="question-circle" />
                )}
              </span>
            )}
            renderFull={({ closeDialog }) => (
              <RubricScore
                itemIid={lodashGet(item, 'iid')}
                itemNtype={lodashGet(item, 'ntype')}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default ScoreAndPassing;
