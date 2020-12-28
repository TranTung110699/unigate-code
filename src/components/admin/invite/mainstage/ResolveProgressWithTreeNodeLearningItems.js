/* eslint-disable react/prop-types,no-unused-vars,jsx-a11y/anchor-is-valid, react/jsx-closing-tag-location */
import React from 'react';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import { ListItem } from 'material-ui/List';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import { renderLearnerInformation } from 'components/admin/invite/utils';

const getToggleStatusByResolveProgress = ({
  resolveProgress,
  treeProgress,
}) => {
  if (!resolveProgress || !treeProgress) {
    return false;
  }

  if (resolveProgress.reset_all) {
    return true;
  }

  if (
    !resolveProgress.learning_items ||
    !Array.isArray(resolveProgress.learning_items)
  ) {
    return false;
  }

  if (resolveProgress.learning_items.includes(treeProgress.iid)) {
    return true;
  }

  if (!treeProgress.children || !Array.isArray(treeProgress.children)) {
    return false;
  }

  let toggle = true;
  treeProgress.children.forEach((progressNode) => {
    if (
      !resolveProgress.learning_items.includes(progressNode && progressNode.iid)
    ) {
      if (
        !getToggleStatusByResolveProgress({
          resolveProgress,
          treeProgress: progressNode,
        })
      ) {
        toggle = false;
      }
    }
  });
  return toggle;
};

const renderProgressNodeInformation = ({
  learner,
  treeProgress,
  resolveProgress,
  resetAll,
  parentNodeType,
  handleResetProgressLearningItem = () => {},
}) => {
  const completionProgress =
    (treeProgress.progress && treeProgress.progress.cp) || 20;
  return (
    <div>
      <div className="col-xs-6 col-sm-2" style={{ minHeight: 60 }}>
        <Icon icon={treeProgress.ntype}>
          &nbsp;
          {t1(treeProgress.ntype)}
        </Icon>
      </div>
      <div className="col-xs-6 col-sm-4">
        {t1(treeProgress.name)}
        <br />
        <span className="text-muted">
          ({treeProgress.code || treeProgress.iid})
        </span>
      </div>
      <div className="col-xs-6 text-center">
        <span className="pull-left">
          {completionProgress > 0 && (
            <span>
              {t1('completion_progress:_%s', [completionProgress])}%
              <LinearProgress mode="determinate" value={completionProgress} />
            </span>
          )}
        </span>
        <span className="pull-right">
          {parentNodeType !== 'course' && (
            <Toggle
              title={t1('reset_progress')}
              onToggle={(event, toggled) =>
                handleResetProgressLearningItem({
                  learnerIid: learner.iid,
                  learningItemIid: treeProgress.iid,
                  resetProgress: toggled,
                })
              }
              disabled={resetAll}
              toggled={
                resetAll ||
                getToggleStatusByResolveProgress({
                  resolveProgress,
                  treeProgress,
                })
              }
            />
          )}
        </span>
      </div>
    </div>
  );
};

const renderProgresssLearningItemsOfTheUserHaveBeenAchieved = ({
  typeLearner,
  learner,
  countRender,
  treeProgresses,
  resolveProgress,
  resetAll,
  subMenu = false,
  parentNodeType,
  handleResetProgressLearningItem = () => {},
}) => {
  if (!Array.isArray(treeProgresses) || !treeProgresses.length) {
    return null;
  }
  return treeProgresses.map((treeProgress) => {
    const listItem = (
      <ListItem
        key={`${typeLearner}-${learner.iid}-${treeProgress.iid}`}
        className={
          subMenu ? 'reset-progress-list-sub-item' : 'reset-progress-list-item'
        }
        style={{ minHeight: 60 }}
        primaryText={renderProgressNodeInformation({
          learner,
          treeProgress,
          resolveProgress,
          resetAll,
          handleResetProgressLearningItem,
          parentNodeType,
        })}
        initiallyOpen={typeLearner === 'user' || countRender === 1}
        nestedItems={
          Array.isArray(treeProgress.children) && treeProgress.children.length
            ? renderProgresssLearningItemsOfTheUserHaveBeenAchieved({
                typeLearner,
                learner,
                countRender,
                treeProgresses: treeProgress.children,
                resolveProgress,
                resetAll:
                  resetAll ||
                  (resolveProgress &&
                    Array.isArray(resolveProgress.learning_items) &&
                    resolveProgress.learning_items.includes(treeProgress.iid)),
                subMenu: true,
                parentNodeType: treeProgress.ntype,
                handleResetProgressLearningItem,
              })
            : []
        }
      />
    );

    return subMenu ? listItem : [listItem, <Divider />];
  });
};

const resolveProgressesWithTreeNodeLearningItems = ({
  typeLearner,
  closeDialog,
  countRender,
  userProgress,
  resolveProgress,
  handleResetProgressLearningItem = () => {},
}) => {
  const nestedItems = renderProgresssLearningItemsOfTheUserHaveBeenAchieved({
    typeLearner,
    learner: userProgress,
    countRender,
    treeProgresses: userProgress.tree_progresses,
    handleResetProgressLearningItem,
    resolveProgress,
    resetAll: resolveProgress && resolveProgress.reset_all,
  });

  return typeLearner === 'user' ? (
    nestedItems
  ) : (
    <ListItem
      style={{ minHeight: 60 }}
      primaryText={renderLearnerInformation({
        learner: userProgress,
        size: 40,
        className: 'reset-progress-user-info',
        rightIcon: (
          <Toggle
            title={t1('reset_all')}
            toggled={getToggleStatusByResolveProgress({
              resolveProgress,
              treeProgress: { children: userProgress.tree_progresses },
            })}
            onToggle={(event, toggled) => {
              handleResetProgressLearningItem({
                learnerIid: userProgress.iid,
                resetProgress: toggled,
              });
            }}
          />
        ),
      })}
      initiallyOpen={countRender === 1}
      nestedItems={nestedItems}
    />
  );
};

export default resolveProgressesWithTreeNodeLearningItems;
