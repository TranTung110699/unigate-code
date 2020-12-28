/**
 * Created by hungvo on 11/10/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { t1, t4 } from 'translate';
import IconStar from 'material-ui/svg-icons/action/stars';
import { List, ListItem } from 'material-ui/List';

const keyStateTakeViewer = (item) => `take-viewer-${item && item.iid}`;

class ItemRender extends React.Component {
  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(props) {
    const { dispatch, item } = props;
    // const url = apiUrls.dashboard_configs();
    const url = apiUrls.get_takes_by_course;
    const params = {
      courseIid: item && item.iid,
    };
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: keyStateTakeViewer(item) },
        params,
      ),
    );
  }

  getSecondaryTextItem = (item) => {
    if (typeof item.score !== 'undefined') {
      return t1('score:_%s', [item.score]);
    }
    if (item && item.exam) {
      let waiting = 0;
      if (item && item.answers) {
        item.answers.forEach((question) => {
          if (!question || !question.score) {
            waiting += 1;
          }
        });
      }
      if (waiting) {
        return t1('%s_questions_are_waiting', waiting);
      } else if (item.exam.type !== 'exam') {
        return t1('total_%s_question', [item.answers.length]);
      }
    }
    return t1('waiting_for_the_mark');
  };

  renderListTakes = (takes) => (
    <div>
      <List>
        {takes.map((take, index) => {
          if (take && take.answers) {
            return (
              <ListItem
                key={`take-${take.id}-${index}`}
                primaryText={take.exam && take.exam.name}
                leftIcon={<IconStar color="red" />}
                hoverColor="#92c36a"
                primaryTogglesNestedList
                secondaryText={this.getSecondaryTextItem(take)}
                nestedItems={take.answers.map((question, qIndex) => (
                  <ListItem
                    key={`answer-${take.id}-${question.iid}-${qIndex}`}
                    hoverColor="#92c36a"
                    primaryText={t1('question_%s', [qIndex + 1])}
                    secondaryText={this.getSecondaryTextItem(question)}
                  />
                ))}
              />
            );
          }
          return (
            <ListItem
              key={`take-${take.id}-${index}`}
              hoverColor="#92c36a"
              leftIcon={<IconStar color="red" />}
              secondaryText={this.getSecondaryTextItem(take)}
              primaryText={take.exam && take.exam.name}
            />
          );
        })}
      </List>
    </div>
  );

  render() {
    const { item, rootPathIid, takes } = this.props;

    return (
      <div className="bs-callout bs-callout-success">
        <Link
          to={Links.overviewCourseByPath(rootPathIid, item)}
          className="btn pull-right"
        >
          {t1('continue')}
        </Link>
        <h4 className="my-course-outline">{item.name}</h4>
        <strong className="created-date-label">{t1('created')} :</strong>
        <span className="created-date"> {item.created_ts}</span>
        <div className="progress">
          <div
            className="progress-bar progress-bar-success"
            role="progressbar"
            aria-valuenow="40"
            aria-valuemax="100"
          >
            <span className="sr-only">
              {100 - item.p} % {t1('completion_progress')} ({t4('success')})
            </span>
          </div>
        </div>
        <div className="progress progress-1" title={t1('completion_progress')}>
          <div
            className="progress-bar"
            data-progress={item.cp}
            style={{ width: `${item.cp}%` }}
          >
            {item.cp > 10 && (
              <span className="title">
                {item.cp} % {t1('done')}
              </span>
            )}
          </div>
        </div>
        {takes && takes.length > 0 && this.renderListTakes(takes)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { item } = props;
  const keyState = keyStateTakeViewer(item);
  const takes = state.dataApiResults[keyState] || [];
  return {
    takes,
  };
};

export default connect(mapStateToProps)(ItemRender);
