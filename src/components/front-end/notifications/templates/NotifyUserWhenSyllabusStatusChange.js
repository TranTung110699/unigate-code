import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'components/common/router/Link';
import { ListItem } from 'material-ui/List';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t, t1 } from 'translate';
import { getNextStatusInAprovalFlowSelector } from 'components/admin/node/utils';
import { createSelector } from 'reselect';
import routes from 'routes';
import lodashGet from 'lodash.get';

const linkStyle = {
  width: '100%',
};

class NotifyUserWhenSyllabusStatusChange extends Component {
  render() {
    const { item, getNextStatusInAprovalFlow } = this.props;

    return (
      <ListItem key={`notification-${lodashGet(item.id)}`}>
        {t1('syllabus_%s_just_change_status_to_%s', [
          lodashGet(item, 'params.syllabus_name'),
          t(lodashGet(item, 'params.syllabus_new_status')),
        ])}
        <Link
          to={routes.url('node_edit', {
            ntype: 'syllabus',
            iid: lodashGet(item, 'params.syllabus_iid'),
          })}
          style={linkStyle}
        >
          <RaisedButton
            className="m-t-10"
            primary
            label={
              getNextStatusInAprovalFlow(
                lodashGet(item, 'params.syllabus_new_status'),
              ) === 'approved'
                ? t1('click_here_to_approve_it')
                : t1('click_here_to_view_it')
            }
            raisedButton
          />
        </Link>
      </ListItem>
    );
  }
}

NotifyUserWhenSyllabusStatusChange.propTypes = {};

const mapStateToProps = createSelector(
  getNextStatusInAprovalFlowSelector,
  (getNextStatusInAprovalFlow) => ({
    getNextStatusInAprovalFlow,
  }),
);

export default connect(mapStateToProps)(NotifyUserWhenSyllabusStatusChange);
