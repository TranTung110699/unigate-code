import React, { Component } from 'react';
import { portals } from 'components/common/portal';
import Affix from 'antd/lib/affix';
import './stylesheet.scss';
import withStickyHeaderInfo from 'common/hoc/withStickyHeaderInfo';
import lodashGet from 'lodash.get';
import { isSmallScreen } from 'common';
import { connect } from 'react-redux';
import { steps } from 'common/learn/exercise';
import styled from 'styled-components';

const cssClass = 'learn-sub-board';

const SubboardContent = styled.div`
  ${(props) =>
    props.showBackground
      ? 'box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);background: #fff;'
      : ''}
`;

class SubBoard extends Component {
  render() {
    const { learnItem, stickyHeaderInfo, learnItemInfo } = this.props;

    if (
      !isSmallScreen &&
      (learnItem.ntype === 'exercise' || learnItem.ntype === 'survey')
    ) {
      return (
        <Affix
          offsetTop={lodashGet(stickyHeaderInfo, 'height')}
          className={cssClass}
        >
          <SubboardContent
            className={`${cssClass}__content`}
            showBackground={
              ![steps.RESULT, steps.FINISHED, steps.NOT_STARTED].includes(
                lodashGet(learnItemInfo, 'step'),
              )
            }
          >
            <div id={portals.EXERCISE_TIMER} />
            <div id={portals.QUESTION_NAVIGATIONS} />
            <div id={portals.EXERCISE_FINISH_BUTTON} />
          </SubboardContent>
        </Affix>
      );
    }

    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    learnItemInfo: lodashGet(state, `learn.info.${props.learnItem.iid}`),
  };
};

export default connect(mapStateToProps)(withStickyHeaderInfo()(SubBoard));
