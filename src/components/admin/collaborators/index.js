import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import actionsNode from 'actions/node/creators';
import RaisedButton from 'components/common/mui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import DeleteCollaboratorItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { t1 } from 'translate';
import { change } from 'redux-form';
import { stringifyFromValue } from 'common/utils/string';
import NewForm from './new/Form';
import schema from './schema/form';

class Collaborators extends Component {
  iconStyle = { fontSize: 20 };
  iconStyle1 = { color: 'white' };

  flatButtonStyle = {
    minWidth: '43px !important',
    top: '-7px',
  };

  divStyle = { marginTop: '10px' };

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillMount() {
    const { node, nodeIid, nodeNtype } = this.props;
    if (!node && nodeIid && nodeNtype) {
      this.getNode();
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const elementRight = (
      <div>
        <FlatButton
          icon={<Icon icon="plus" />}
          label={t1('add_staff')}
          onClick={() => this.handleOnClick()}
        />
      </div>
    );
    // dispatch(actionsCreators.setTopMenuElement({ elementRight }));
  }

  getNode = () => {
    const { dispatch, node, nodeIid, nodeNtype } = this.props;
    const snippet = {
      iid: nodeIid || (node && node.iid),
      ntype: nodeNtype || (node && node.ntype),
    };
    dispatch(actionsNode.fetchNode({ ...snippet, depth: 1 }));
  };

  handleOnClick = () => {
    const { dispatch, node, modal } = this.props;
    if (modal) {
      this.setState({
        adding: true,
      });
      return;
    }

    const contentDialog = this.elementNewCollaborator();
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('new'),
    };
    dispatch(
      actionsNode.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  handleChangeRoles = (staff) => {
    const { dispatch, node } = this.props;
    const contentDialog = (
      <NewForm
        formid={`edit-role-${node && node.iid}`}
        mode="edit"
        step="roles"
        node={{
          role: staff && staff.roles,
          id: node && node.id,
          iid: node && node.iid,
        }}
        params={{ staff_id: staff && staff.id, id: node.id, ntype: node.ntype }}
        alternativeApi={`/${node.ntype}/update`}
        requestSuccessful={() => this.updateRolesSuccessFul()}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_roles_staff:_%s', [staff && staff.name]),
    };
    dispatch(
      actionsNode.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  elementNewCollaborator = () => {
    const { node, modal } = this.props;
    const formid = 'add_collaborators';
    return (
      <NewForm
        formid={formid}
        schema={schema}
        mode="edit"
        node={node}
        step="add_staffs"
        closeModal={!modal}
        params={{ id: node.id, ntype: node.ntype }}
        alternativeApi={`/${node.ntype}/update`}
        requestSuccessful={() => {
          const { dispatch } = this.props;
          dispatch(change(formid, 'staff_ids', null));
          dispatch(change(formid, 'role', null));
          this.setState({
            adding: false,
          });
          this.getNode();
        }}
      />
    );
  };

  updateRolesSuccessFul = () => {
    this.getNode();
  };

  render() {
    const { formid, readOnly, node, modal } = this.props;
    const staff = node.staff || [];

    if (this.state.adding) {
      return this.elementNewCollaborator();
    }

    return (
      <div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width="10%">{t1('iid')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('role')}</TableHeaderColumn>
              {!readOnly && (
                <TableHeaderColumn width="20%">
                  {t1('actions')}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {staff &&
              staff.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width="10%">
                    {item.iid || item.id}
                  </TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    {stringifyFromValue(item && item.roles)}
                  </TableRowColumn>
                  {!readOnly && (
                    <TableRowColumn width="20%">
                      <FlatButton
                        icon={
                          <Icon
                            title={t1('change_roles')}
                            icon="admin"
                            className="action"
                            style={this.iconStyle}
                          />
                        }
                        style={this.flatButtonStyle}
                        onTouchTap={() => this.handleChangeRoles(item)}
                      />
                      <DeleteCollaboratorItem
                        title={t1('remove')}
                        textConfirm={t1('are_you_sure')}
                        formid={formid}
                        ntype={node.ntype}
                        itemId={node.id}
                        step="remove_staff"
                        alternativeApi={`/${node.ntype}/update`}
                        params={{ staff_id: item.id }}
                        onRequestSuccessful={() => this.getNode()}
                      />
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={this.divStyle}>
          <RaisedButton
            label={t1('add_staff')}
            primary
            icon={<Icon icon="plus" style={this.iconStyle1} />}
            onClick={() => this.handleOnClick()}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const nodeIid = props.nodeIid;
  const node = props.node || state.tree[nodeIid];
  return {
    node,
  };
}

export default connect(mapStateToProps)(Collaborators);
