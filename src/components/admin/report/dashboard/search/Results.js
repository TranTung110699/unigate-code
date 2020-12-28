/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import RaisedButton from 'components/common/mui/RaisedButton';
import routes from 'routes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import FlatButton from 'components/common/mui/FlatButton';
import IconMail from 'material-ui/svg-icons/communication/message';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Communicate from 'components/admin/course/mainstage/communication/Form';
import apiUrls from 'api-endpoints';

const USER_TARGET = 'user';
const GROUP_TARGET = 'group';
const INVITE_TYPE_MANUALL = 'manually';

class Results extends Component {
  linkStyle = { paddingRight: 20 };
  tableKeysSave = ['type', 'iid', 'name'];

  constructor(props) {
    super(props);
    this.state = {
      targets: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.renderContentDialog = this.renderContentDialog.bind(this);
  }

  sendMessage(targets) {
    targets = targets || this.props.targets || [];
    const { dispatch, node } = this.props;

    const targetsValue = [];
    targets.forEach((item) => {
      targetsValue.push({
        key: item.name,
        data: item,
      });
    });

    const contentDialog = (
      <Communicate
        modal={1}
        valuesSet={{ targets: targetsValue }}
        params={{ targets: { node_type: node.ntype, node_iid: node.iid } }}
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,
      title: 'Communication',
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  getLinkDrawReport = () => {
    const { /*dispatch,*/ node, targets } = this.props;
    if (!targets || !targets.length) {
      return '#';
    }

    let url = `${routes.url('node_edit', {
      iid: node.iid,
      ntype: node.ntype,
      step: 'groups',
    })}/group/`;

    targets.forEach((group, index) => {
      url = `${url}${group.iid}`;
      if (index + 1 < targets.length) {
        url = `${url}+`;
      }
    });

    return url;
  };

  renderContentDialog = () => (
    <Checkbox
      label={t1('cannot_continue_to_learn_this_item')}
      checked={this.state.checked}
      title={t1('cannot_continue_to_learn_this_item')}
      onCheck={(e, checked) => {
        this.setState({ checked });
      }}
    />
  );

  render() {
    const { node, items, formid, target } = this.props;
    const checkKey = 'id';

    return (
      <div className="table-result">
        {items && items.length ? (
          <div>
            <Table
              formid={formid}
              itemList={items}
              checkKey={checkKey}
              keysSave={this.tableKeysSave}
              multiSelectable
            >
              <TableHeader adjustForCheckbox enableSelectAll>
                <TableRow>
                  <TableHeaderColumn>{t1('iid')}</TableHeaderColumn>
                  <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
                  {target === USER_TARGET && (
                    <TableHeaderColumn>{t1('start_time')}</TableHeaderColumn>
                  )}
                  {target === USER_TARGET && (
                    <TableHeaderColumn>
                      {t1('time_learn_last')}
                    </TableHeaderColumn>
                  )}
                  {target === USER_TARGET && (
                    <TableHeaderColumn>{t1('progress')}</TableHeaderColumn>
                  )}
                  {target === GROUP_TARGET && (
                    <TableHeaderColumn>{t1('group_type')}</TableHeaderColumn>
                  )}
                  {target === GROUP_TARGET && (
                    <TableHeaderColumn>{t1('information')}</TableHeaderColumn>
                  )}
                  <TableHeaderColumn>{t1('actions')}</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox
                deselectOnClickaway={false}
                showRowHover
                stripedRows
              >
                {items.map((item) => (
                  <TableRow key={item.id} selected={item.selected}>
                    <TableRowColumn>{item.iid}</TableRowColumn>
                    <TableRowColumn>
                      {item.name}
                      <FlatButton
                        title={t1('communication_user')}
                        primary
                        icon={<IconMail />}
                        onClick={() =>
                          this.sendMessage([
                            { iid: item.iid, type: 'user', name: item.name },
                          ])
                        }
                      />
                    </TableRowColumn>
                    {target === USER_TARGET && (
                      <TableRowColumn>{item.start_time}</TableRowColumn>
                    )}
                    {target === USER_TARGET && (
                      <TableRowColumn>{item.time_learn_last}</TableRowColumn>
                    )}
                    {target === USER_TARGET && (
                      <TableRowColumn>{item.progress}</TableRowColumn>
                    )}
                    {target === GROUP_TARGET && (
                      <TableRowColumn>{t1(item.type || '__')}</TableRowColumn>
                    )}
                    {target === GROUP_TARGET && (
                      <TableRowColumn>{item.member || 0}</TableRowColumn>
                    )}
                    <TableRowColumn>
                      <Link
                        to={`${routes.url('node_edit', {
                          iid: node.iid,
                          ntype: node.ntype,
                          step: 'groups',
                        })}/${target}/${item.iid}`}
                      >
                        <IconButton
                          title={t1('view_detail_skills')}
                          iconClassName="mi mi-remove-red-eye"
                        />
                      </Link>
                      {item.invite_type === INVITE_TYPE_MANUALL && (
                        <DeleteItem
                          alternativeApi={'/invite/api/remove'}
                          contentDialog={this.renderContentDialog()}
                          params={{
                            items: { iid: node.iid, ntype: node.ntype },
                            targets: { iid: item.iid, type: target },
                            remove_learn_item: this.state.checked ? 1 : 0,
                          }}
                          formid={formid}
                        />
                      )}
                      <DeleteItem
                        alternativeApi={apiUrls.reset_progress}
                        title={t1('auto_reset_progress')}
                        icon="autorenew"
                        params={{
                          node: {
                            iid: node.iid,
                            ntype: node.ntype,
                          },
                          target: { iid: item.iid, type: target },
                        }}
                        formid={formid}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="m-t-25">
              <Link to={this.getLinkDrawReport()} style={this.linkStyle}>
                <RaisedButton label={t1('view_progress')} primary />
              </Link>
              <RaisedButton
                name="send_message"
                id="send_message"
                label={t1('send_message')}
                onClick={() => this.sendMessage()}
                primary
              />
            </div>
          </div>
        ) : (
          <div>{t1('no_result')}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formid } = props;
  const result = state.searchResults[formid] || {};
  const targets = result.selectedItems || [];
  return {
    targets,
  };
}

export default connect(mapStateToProps)(Results);
