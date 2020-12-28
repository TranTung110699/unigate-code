/* eslint-disable react/prop-types,no-unused-vars,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { List } from 'material-ui/List';
import ResolveProgressWithTreeNodeLearningItems from './ResolveProgressWithTreeNodeLearningItems';

class ResetProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      resolveProgresses: null,
    };
  }

  resolveResetProgressLearningItem = ({
    learnerIid,
    learningItemIid = null,
    resetProgress,
  }) => {
    const resolveProgresses =
      this.state.resolveProgresses || this.props.resolveProgresses || {};
    const resolveProgressOfUser = resolveProgresses[learnerIid] || {};
    if (learningItemIid) {
      let learningItems = resolveProgressOfUser.learning_items || [];
      if (
        resetProgress &&
        !(
          learningItems.includes(learningItemIid) ||
          learningItems.includes(String(learnerIid))
        )
      ) {
        learningItems.push(learningItemIid);
      } else if (learningItems.length) {
        learningItems = learningItems.filter(
          (iid) => !(iid === learningItemIid || iid === String(learnerIid)),
        );
      }
      resolveProgressOfUser.learning_items = learningItems;
    } else {
      resolveProgressOfUser.reset_all = resetProgress ? 1 : 0;
    }
    resolveProgresses[learnerIid] = resolveProgressOfUser;

    this.setState({
      resolveProgresses,
    });

    if (this.props.resolveResetProgressLearningItem) {
      this.props.resolveResetProgressLearningItem(resolveProgresses);
    }
  };

  renderResultComponent = (items) => {
    this.setState({ items });
  };

  renderContentDisplay = () => {
    const items = this.state.items;
    if (!Array.isArray(items)) {
      return <CircularProgress size={80} thickness={5} />;
    }
    if (Array.isArray(items) && !items.length) {
      return (
        <h1 className="text-center">{t1('no_ongoing_course(s)_found')}</h1>
      );
    }

    const resolveProgresses =
      this.state.resolveProgresses || this.props.resolveProgresses || {};

    return (
      <List>
        {items.map((userProgress, index) => (
          <ResolveProgressWithTreeNodeLearningItems
            key={index}
            {...this.props}
            typeLearner={this.props.learner && this.props.learner.type}
            resolveProgress={resolveProgresses[userProgress.iid]}
            userProgress={userProgress}
            countRender={items.length}
            handleResetProgressLearningItem={
              this.resolveResetProgressLearningItem
            }
          />
        ))}
      </List>
    );
  };

  render() {
    const { learner, learningItems } = this.props;
    const hiddenFields = {
      learner_iid: learner && learner.iid,
      learner_type: learner && learner.type,
      learning_items: learningItems,
      get_detail: 1,
    };

    return (
      <div>
        {this.renderContentDisplay()}
        <SearchWrapper
          showResult
          hiddenFields={hiddenFields}
          autoSearchWhenStart={this.state.loading}
          alternativeApi={apiUrls.get_progress_with_learning_items_of_learner}
          formid={`progress-with-learning-items-of-learner-${learner &&
            learner.iid}`}
          renderResultsComponent={this.renderResultComponent}
        />
      </div>
    );
  }
}

export default ResetProgress;
