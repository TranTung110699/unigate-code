import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import routes from 'routes';
import { reduxForm, submit } from 'redux-form';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'components/common/mui/FlatButton';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { Element } from 'schema-form/elements';

class Results extends Component {
  openRemoveDialog = (invitedItem) => {
    const { dispatch, group, searchFormId } = this.props;

    const form = 'remove_group_learning_item';

    const onFormSubmit = ({ remove_learn_item }) => {
      const params = {
        items: invitedItem,
        targets: group,
        remove_learn_item,
        _sand_step: 'learning_item',
      };

      const options = {
        formidToSubmitOnSuccess: searchFormId,
        url: apiUrls.remove_invite,
        extraParams: params,
        closeModal: true,
      };

      dispatch(nodeSagaActions.submitFormRequest('', options));
    };

    const Form = reduxForm({
      form,
      initialValues: {
        remove_learn_item: 0,
      },
      onSubmit: onFormSubmit,
    })(() => (
      <div>
        <Element
          schema={{
            type: 'checkbox',
            name: 'remove_learn_item',
            label: t1('the_group_cannot_continue_to_learn_this_item'),
          }}
        />
      </div>
    ));

    const contentDialog = <Form />;

    const optionsProperties = {
      handleClose: true,
      actions: [
        <FlatButton
          label={t1('yes', 1)}
          primary
          onClick={() => {
            dispatch(submit(form));
          }}
        />,
      ],
      title: `${t1('are_you_sure_you_want_to_do_this')}?`,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, group } = this.props;
    const invitedItems =
      items && items.map((item) => item && item.item).filter((item) => !!item);

    if (!invitedItems || !Array.isArray(invitedItems) || !invitedItems.length) {
      return null;
    }

    return (
      <div className="table-result">
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>{t1('iid')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('type')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('actions')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {invitedItems &&
              invitedItems.map((invitedItem) => (
                <TableRow key={invitedItem.iid}>
                  <TableRowColumn>{invitedItem.iid}</TableRowColumn>
                  <TableRowColumn>{invitedItem.name}</TableRowColumn>
                  <TableRowColumn>{t1(invitedItem.ntype)}</TableRowColumn>
                  <TableRowColumn>
                    <Link
                      to={`${routes.url('node_edit', {
                        iid: invitedItem.iid,
                        ntype: invitedItem.ntype,
                        step: 'groups',
                      })}/group/${group && group.iid}`}
                    >
                      <IconButton
                        title={t1('view_detail_skills')}
                        iconClassName="mi mi-remove-red-eye"
                      />
                    </Link>
                    <IconButton
                      title={t1('remove_from_group')}
                      iconClassName="mi mi-clear"
                      onClick={() => this.openRemoveDialog(invitedItem)}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default connect()(Results);
