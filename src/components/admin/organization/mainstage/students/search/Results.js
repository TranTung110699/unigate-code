import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import ResultsEnterprise from 'components/admin/group/edit/member/search-results/ResultsEnterprise';
import ResultsSis from 'components/admin/group/edit/member/search-results/ResultsSis';
import { getUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import { schoolTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';
import { reduxForm } from 'redux-form';
import Icon from 'components/common/Icon';

class MembersResults extends Component {
  renderActionCell = (item) => {
    const { node, searchValues } = this.props;

    const { showEditAccountButton } = this.props;

    return (
      <span>
        {showEditAccountButton && (
          <Link to={getUrl('admin_view_account', item)}>
            <Icon title={t1('edit_user_account_information')} icon="edit" />
          </Link>
        )}
        &nbsp;
        <Link to={getUrl('admin_view_student', item)}>
          <Icon title={t1('view_student_learning_activities')} icon="preview" />
        </Link>
      </span>
    );
  };

  render() {
    const { items, node, searchValues } = this.props;
    const { themeConfig } = this.props;

    const Res =
      themeConfig.type === schoolTypes.ENTERPRISE
        ? ResultsEnterprise
        : ResultsSis;

    return (
      <div className="table-result">
        <Res {...this.props} renderActionCell={this.renderActionCell} />
      </div>
    );
  }
}

MembersResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

MembersResults.defaultProps = {
  items: [],
  searchFormId: '',
};

const mapStateToProps = (state) => {
  const domainInfo = state.domainInfo;
  return {
    domain: domainInfo && domainInfo.domain,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'user_department_search_result',
  })(MembersResults),
);
