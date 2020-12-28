import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import ImportForm from './ImportForm';
import topMenuSchema from '../menu/teacher-menus';

class Layout extends Component {
  render() {
    const { domainInfo } = this.props;

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema({ domainInfo })} />
        <ImportForm
          formid="import_organizations_form"
          shouldDisableImportButtonIfNotValid
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    domainInfo: state.domainInfo,
  };
}

export default connect(mapStateToProps)(Layout);
