import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import { createSelector } from 'reselect';
import { getDomainInfo } from 'utils/selectors';
import PropTypes from 'prop-types';
import Link from 'components/common/router/Link';
import routes from 'routes';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import {
  hasAcademicCategories as checkDomainInfoHasAcademicCategories,
  hasOrganization as checkDomainInfoHasOrganization,
} from 'common/conf';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Button from 'antd/lib/button';
import CardResult from './card-result';
import Menu from 'antd/lib/menu';
import Tooltip from 'antd/lib/tooltip';

class ResultsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };
  }

  componentDidMount() {
    let listView = localStorage.getItem('displayListView');
    if (listView === null) {
      localStorage.setItem('displayListView', this.state.listView);
    } else {
      this.setState({
        listView: JSON.parse(listView),
      });
    }
  }

  changeView = () => {
    this.setState({
      listView: !this.state.listView,
    });
    localStorage.setItem('displayListView', !this.state.listView);
  };

  render() {
    const { items, formid } = this.props;
    const { listView } = this.state;
    const menu = (item) => (
      <Menu>
        <Menu.Item key="0">
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, { ntype: 'enrolment_plan' }),
            )}
          >
            {t1('edit')}
          </Link>
        </Menu.Item>
        {item.status !== enrolmentPlanStatuses.DELETED && (
          <Menu.Item key="1">
            <DeleteBtn
              formid={formid}
              ntype={'enrolment_plan'}
              itemId={item.id}
              clearTextButton={t1('remove')}
            />
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div className="m-b-20">
        <div className="text-right m-t-20">
          <Tooltip
            title={`${t1('display_mode')} ${t(listView ? 'grid' : 'list')}`}
            placement="left"
          >
            <Button
              icon={`${listView ? 'appstore' : 'bars'}`}
              onClick={this.changeView}
            />
          </Tooltip>
        </div>
        <CardResult items={items} listView={this.state.listView} menu={menu} />
      </div>
    );
  }
}

ResultsNew.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

ResultsNew.defaultProps = {
  items: [],
};

const mapStateToProps = createSelector(
  getDomainInfo,
  (domainInfo) => ({
    hasOrganization: checkDomainInfoHasOrganization(domainInfo),
    hasAcademicCategories: checkDomainInfoHasAcademicCategories(domainInfo),
  }),
);

export default connect(mapStateToProps)(ResultsNew);
