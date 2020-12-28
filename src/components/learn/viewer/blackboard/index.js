import React from 'react';
import CompleteCourse from 'components/learn/items/exercise/NormalExercise/result/complete-course';
import { isLocked } from '../../common/payment';
import ReactItem from '../../items';
import Payment from '../../payment';
import NotAccessible from '../../not-accessible';
import Loading from 'components/common/loading';
import { statuses as exerciseStatuses } from '../../../../common/learn/exercise';
import screenfull from 'screenfull/dist/screenfull';
import ExamContainerItem from 'components/learn/items/exam-container';

class BlackBoard extends React.Component {
  shouldShowExamContainer = (node, learnInfo) =>
    this.props.isTesting &&
    (!learnInfo ||
      !(
        learnInfo.status === exerciseStatuses.STARTED ||
        (learnInfo.status === exerciseStatuses.DOING && screenfull.isFullscreen)
      ));

  render() {
    const {
      navId,
      tcosPrice,
      itemIid,
      isPreview,
      learnItem,
      learnInfo,
      learnItemAccessibilityInfo,
      displayConfigurationCourse,
      onFinishButtonOnClick,
    } = this.props;

    if (isLocked(isPreview, tcosPrice && tcosPrice[itemIid])) {
      return (
        <div
          className="learn-zone learn-screen"
          style={{ height: 'calc(100vh - 380px)' }}
        >
          <Payment executeOnSuccess={this.props.getTcosPriceOfItems} />
        </div>
      );
    }

    if (
      !learnItemAccessibilityInfo ||
      typeof learnItemAccessibilityInfo.isAccessible !== 'boolean'
    ) {
      return <Loading />;
    }

    if (!learnItemAccessibilityInfo.isAccessible) {
      return (
        <NotAccessible
          className="learn-zone learn-screen"
          itemIid={itemIid}
          navIdToRedirectTo={learnItemAccessibilityInfo.navIdToRedirectTo}
          notLearntIids={learnItemAccessibilityInfo.notLearntIids}
        />
      );
    }

    if (this.shouldShowExamContainer(learnItem, learnInfo)) {
      return (
        <ExamContainerItem
          key={`${navId}-${learnItem.iid}-exam`}
          id={`${navId}-${learnItem.iid}-exam`}
          learnInfo={learnInfo}
        />
      );
    }

    if (displayConfigurationCourse) {
      return (
        <CompleteCourse {...this.props} className="learn-content-border" />
      );
    }

    return (
      <ReactItem
        className="learn-content"
        onFinishButtonOnClick={
          onFinishButtonOnClick && typeof onFinishButtonOnClick === 'function'
            ? onFinishButtonOnClick
            : this.handleNextItemAction
        }
        {...this.props}
      />
    );
  }
}

export default BlackBoard;
