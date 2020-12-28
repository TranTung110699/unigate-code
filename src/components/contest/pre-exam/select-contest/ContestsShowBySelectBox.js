import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1, t3 } from 'translate';
import { connect } from 'react-redux';

class ContestsShowBySelectBox extends Component {
  render() {
    const { contests, onHandleGoToContest, onHandleSelectContest } = this.props;
    return (
      <div>
        <select className="select-contest" onChange={onHandleSelectContest}>
          <option disabled selected value hidden>
            {t1('select_contest')}
          </option>
          {contests &&
            contests.map((item) => (
              <option className="option" value={item.value}>
                {item.primaryText}
              </option>
            ))}
        </select>
        <button className="btn-go-to-contest" onClick={onHandleGoToContest}>
          {t3('go_to_contest')}
        </button>
      </div>
    );
  }
}

ContestsShowBySelectBox.propTypes = {
  onHandleGoToContest: PropTypes.func,
  onHandleSelectContest: PropTypes.func,
  contests: PropTypes.arrayOf(PropTypes.any),
};

ContestsShowBySelectBox.defaultProps = {
  onHandleSelectContest: null,
  onHandleGoToContest: null,
  contests: [],
};

const mapStateToProps = (state) => ({
  prop: state.prop,
});
export default connect(mapStateToProps)(ContestsShowBySelectBox);
