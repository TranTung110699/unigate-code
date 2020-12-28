import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import RaisedButton from 'components/common/mui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import actions from 'actions/node/creators';
import AssignmentGroupMemberSearch from './search';
import AssignmentGroupMemberAdd from './add';
import './stylesheet.scss';

class AssignmentGroupMember extends React.Component {
  cssClass = 'assignment-group-member';
  searchFormId = 'assignment_group_member_search';

  handleAddNewClick = () => {
    const { dispatch, group } = this.props;
    const contentDialog = (
      <AssignmentGroupMemberAdd
        searchFormId={this.searchFormId}
        group={group}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('add_students'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, group } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__section`}>
          <h2 className={`${this.cssClass}__section-title`}>
            {t1('edit_current_students')}
          </h2>
          <Paper className={`${this.cssClass}__section-content`}>
            <AssignmentGroupMemberSearch
              searchFormId={this.searchFormId}
              group={group}
            />
          </Paper>
        </div>
        <div className={`${this.cssClass}__section`}>
          <RaisedButton
            primary
            onClick={this.handleAddNewClick}
            icon={<AddIcon />}
            label={t1('or_add_new_students')}
          />
        </div>
      </div>
    );
  }
}

AssignmentGroupMember.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape(),
};

AssignmentGroupMember.defaultProps = {
  className: '',
  group: null,
};

export default connect()(AssignmentGroupMember);
