import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';

class DegreeInfo extends Component {
  render() {
    const { degree_info } = this.props;

    if (!degree_info) {
      return null;
    }

    return (
      <div>
        {degree_info.date_of_issue && (
          <div>
            {t1('date_of_issue:_%s', [
              timestampToDateString(degree_info.date_of_issue),
            ])}
          </div>
        )}
        {degree_info.delivery_date && (
          <div>
            {t1('delivery_date:_%s', [
              timestampToDateString(degree_info.delivery_date),
            ])}
          </div>
        )}
        {degree_info.sign_number && (
          <div>{t1('sign_number:_%s', [degree_info.sign_number])}</div>
        )}
        {degree_info.decision_number && (
          <div>{t1('decision_number:_%s', [degree_info.decision_number])}</div>
        )}
        <div>
          {degree_info.has_received_original_degree === 1
            ? t1('has_received_original_degree')
            : t1('has_not_received_original_degree')}
        </div>
        <div>
          {degree_info.has_received_clone_degree === 1 ? (
            <div>
              {t1('has_received_clone_degree')} <br />
              {t1('number_of_clone_degree:_%s', [
                degree_info.number_of_clone_degree,
              ])}
            </div>
          ) : (
            t1('has_not_received_clone_degree')
          )}
        </div>
      </div>
    );
  }
}

DegreeInfo.propTypes = {
  degree_info: PropTypes.object,
};

DegreeInfo.defaultProps = {
  degree_info: {},
};

export default DegreeInfo;
