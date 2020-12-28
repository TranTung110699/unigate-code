import React from 'react';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { t1 } from 'translate';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReportsNav extends React.Component {
  render() {
    const { pathname } = this.props.location;

    const items = [
      {
        id: 'progress-reports',
        active: pathname === '/progress-reports',
        link: '/progress-reports',
        label: t1('progress_reports_by_student'),
      },
      {
        id: 'progress-reports-by-organization',
        active: pathname === '/progress-reports-by-organization',
        link: '/progress-reports-by-organization',
        label: t1('progress_reports_by_organization'),
      },
    ];

    return (
      <div className="p-t-10 m-t-20">
        <HorizontalNav
          items={items}
          componentClass="white-horizontal-nav"
          content={this.props.content}
        />
      </div>
    );
  }
}

ReportsNav.propTypes = {
  content: PropTypes.node,
};

export default withRouter(ReportsNav);
