import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DefinedUrlParams } from 'routes/links/common';
import { hrmsTypes } from 'configs/constants';

import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import { menuItems as leftMenuSchema } from './menu/sub-left-menu-configs';
import EvnHrmsOrganizationSearch from './../hrms-data/evn/organization-search/Layout';
import EvnHrmsUserSearch from './../hrms-data/evn/user-search/Layout';
import EvnHrmsDepartmentSearch from './../hrms-data/evn/department-search/Layout';
import EvnHrmsPositionSearch from './../hrms-data/evn/position-search/Layout';
import EvnHrmsEquivalentPositionSearch from './../hrms-data/evn/equivalent-position-search/Layout';
import EvnHrmsTopEquivalentPositionSearch from './../hrms-data/evn/top-equivalent-position-search/Layout';

import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

class HrmsDataLayout extends Component {
  getEvnHrmsDataSearchContentByHrmsType = () => {
    const { hrmsType } = this.props;
    let hrmsDataSearchContent = '';

    switch (hrmsType) {
      case hrmsTypes.USER: {
        hrmsDataSearchContent = <EvnHrmsUserSearch />;
        break;
      }
      case hrmsTypes.ORGANIZATION: {
        hrmsDataSearchContent = <EvnHrmsOrganizationSearch />;
        break;
      }
      case hrmsTypes.PHONGBAN: {
        hrmsDataSearchContent = <EvnHrmsDepartmentSearch />;
        break;
      }
      case hrmsTypes.TOP_EQUIVALENT_POSITION: {
        hrmsDataSearchContent = <EvnHrmsTopEquivalentPositionSearch />;
        break;
      }
      case hrmsTypes.EQUIVALENT_POSITION: {
        hrmsDataSearchContent = <EvnHrmsEquivalentPositionSearch />;
        break;
      }
      case hrmsTypes.POSITION: {
        hrmsDataSearchContent = <EvnHrmsPositionSearch />;
        break;
      }
      default: {
        break;
      }
    }

    return hrmsDataSearchContent;
  };

  render() {
    const { isEvn } = this.props;
    return (
      <div>
        <SubLeftMenuContext schema={leftMenuSchema(this.props)} />
        {isEvn && this.getEvnHrmsDataSearchContentByHrmsType()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const hrmsType =
    match && match.params && match.params[DefinedUrlParams.HRMS_TYPE];

  return {
    hrmsType,
  };
};

export default connect(mapStateToProps)(withSchoolConfigs(HrmsDataLayout));
