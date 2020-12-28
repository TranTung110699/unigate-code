import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t3 } from 'translate';
import lGet from 'lodash.get';
import contestApiUrls from 'components/admin/contest/endpoints';

import SearchWrapper from 'components/common/search-wrap/SearchWrapper';

import Results from './Results';
import '../upcoming-contests/stylesheet.scss';

class ExamResult extends Component {
  renderResultComponent = (items) => (
    <Results items={items} user={this.props.user} />
  );

  render() {
    return (
      <div className="list-contest-wrapper m-l-15">
        <div className={'content'}>
          {!this.props.noTitle ? (
            <h3 className="title">{t3('taken_contests')}</h3>
          ) : null}

          <SearchWrapper
            formid="contests_result"
            showResult
            alternativeApi={contestApiUrls.get_contests_result}
            hiddenFields={{ userIid: this.props.user.iid }}
            renderResultsComponent={this.renderResultComponent}
          />
        </div>
      </div>
    );
  }
}

ExamResult.defaultProps = {
  results: [],
  contestsResult: [],
  user: null,
};

ExamResult.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  results: PropTypes.arrayOf(PropTypes.any),
  contestsResult: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state, props) => {
  return {
    user: props.user || lGet(state, 'user.info'),
  };
};

export default connect(mapStateToProps)(ExamResult);
