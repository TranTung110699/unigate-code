import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import IconButton from 'material-ui/IconButton';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import UpdateForm from './new/Form';

const keyState = 'roles_menu';

class RolesMenu extends Component {
  componentWillMount() {
    const node = this.props.node || {};
    this.getData(node);
  }

  componentWillReceiveProps(nextProps) {
    const node = this.props.node || {};
    if (
      !node.id &&
      typeof nextProps !== 'undefined' &&
      typeof nextProps.node !== 'undefined' &&
      nextProps.node
    ) {
      this.getData(nextProps.node);
    }
  }

  getData = (node) => {
    const { dispatch } = this.props;
    const url = apiUrls.roles_menu_url;
    dispatch(sagaActions.getDataRequest({ url, keyState }, node));
  };

  updateItem(item) {
    const { dispatch, adminMenuNav } = this.props;
    const formid = `roles_menu_${item.code}`;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        node={item}
        step="roles_nav"
        formid={formid}
        requestSuccessful={() => {
          this.getData();
        }}
        hiddenFields={{ role: item.code, admin_menu_nav: adminMenuNav }}
        alternativeApi={'/school/update?_sand_step=roles_nav'}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { formid } = this.props;
    let { data } = this.props;
    data = data || [];

    const node = this.props.node;
    return (
      <div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('roles_menu')} width="7%">
                {t1('roles_menu')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {data &&
              data.map((item) => (
                <TableRow key={item.code}>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn width="7%">
                    <IconButton
                      title={'edit'}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = state.dataApiResults[keyState] || [];
  const adminMenuNav =
    (state.domainInfo &&
      state.domainInfo.school &&
      state.domainInfo.school.admin_menu_nav) ||
    [];
  return {
    data,
    adminMenuNav,
  };
}

export default connect(mapStateToProps)(RolesMenu);
