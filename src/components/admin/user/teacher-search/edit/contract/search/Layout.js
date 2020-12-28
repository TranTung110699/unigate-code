import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/NewButton';
import { getUrl } from 'routes/links/common';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import { addContractMethods } from 'configs/constants';
import showResult from './Results';
import lGet from 'lodash.get';
import schema from './schema';

class Layout extends Component {
  showAddNormalContract(enabledAddContractMethods) {
    return (
      !Array.isArray(enabledAddContractMethods) ||
      enabledAddContractMethods.length === 0 ||
      enabledAddContractMethods.includes(addContractMethods.NORMAL)
    );
  }

  renderResultComponent = (items, props) => {
    const { enabledAddContractMethods, teacher } = this.props;
    return showResult({
      ...props,
      items,
      teacher,
      hasContractNormal: this.showAddNormalContract(enabledAddContractMethods),
    });
  };

  render() {
    const { teacher, enabledAddContractMethods } = this.props;

    const hiddenFields = {
      ntype: 'contract',
      employee_iid: (teacher && teacher.iid) || null,
    };
    return (
      <div>
        <SearchWrapper
          formid="contract_search"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          schema={schema}
          showSearchButton
          noResultText={t1('teacher_has_no_contracts_yet')}
          classFormFilter="display-none"
        />

        <div className="m-t-25 text-center">
          {this.showAddNormalContract(enabledAddContractMethods) && (
            <Link
              to={getUrl('node_edit', {
                ...teacher,
                ntype: 'teacher',
                step: 'add-contract',
                dialog: 1,
              })}
            >
              <FlatButton
                icon={<Icon icon={'plus'} />}
                label={t1('add_contract')}
                className="admin-btn"
              />
            </Link>
          )}
          {Array.isArray(enabledAddContractMethods) &&
            enabledAddContractMethods.includes(addContractMethods.SIMPLE) && (
              <Link
                to={getUrl('node_edit', {
                  ...teacher,
                  ntype: 'teacher',
                  step: 'add-simple-contract',
                  dialog: 1,
                })}
              >
                <FlatButton
                  icon={<Icon icon={'plus'} />}
                  label={t1('add_simple_contract')}
                  className="admin-btn m-l-10"
                />
              </Link>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enabledAddContractMethods: lGet(
      state,
      'domainInfo.conf.enabled_add_contract_methods',
    ),
  };
};

export default connect(mapStateToProps)(Layout);
