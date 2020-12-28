import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contestApiUrls from 'components/admin/contest/endpoints';

import { createSelector } from 'reselect';
import { t1 } from 'translate';
import { withRouter } from 'react-router';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';

import ContestsShowByList from './ContestsShowByList';
import PublicContests from '../public-contests';
import './stylesheet.scss';

class ListContests extends Component {
  render() {
    const { userContests, mode, noTitle, noButton } = this.props;

    if (!userContests) {
      return <Loading />;
    }

    return (
      <div className="list-contest-wrapper m-l-15">
        <div className={'content'}>
          {!noTitle ? (
            <h3 className="title">{t1('upcoming_contests')}</h3>
          ) : null}
          <ContestsShowByList
            contests={userContests.private}
            mode={mode}
            noButton={noButton}
          />
        </div>

        <div className={'content'}>
          {!noTitle ? <h3 className="title">{t1('public_contests')}</h3> : null}
          <PublicContests
            contests={userContests.public || []}
            mode={mode}
            noButton={noButton}
          />
        </div>
      </div>
    );
  }
}

ListContests.propTypes = {
  onHandleGoToContest: PropTypes.func,
  onHandleSelectContest: PropTypes.func,
  contests: PropTypes.arrayOf(PropTypes.any),
};

ListContests.defaultProps = {
  onHandleSelectContest: null,
  onHandleGoToContest: null,
  contests: [],
};

const fetchUserContests = (props) => ({
  baseUrl: contestApiUrls.get_current_contests,
  params: {
    get_detail: 1,
    user_iid: props.userIid ? props.userIid : 0,
  },
  propKey: 'userContests',
  refetchCondition: () => false,
});

export default fetchData(fetchUserContests)(ListContests);
