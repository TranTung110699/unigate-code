import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import 'components/admin/invite/new/stylesheet.scss';
import Avatar from 'components/common/avatar';
import './stylesheet.scss';

class UserEditor extends React.Component {
  cssClass = 'admin-user-input-auto-complete-result-editor';

  render() {
    const { value, index, onDelete } = this.props;
    const { name, iid, mail } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <Avatar className={`${this.cssClass}__avatar`} user={value} />
          <div className={`${this.cssClass}__name-group`}>
            <div className={`${this.cssClass}__name`}>{name}</div>
            <div className={`${this.cssClass}__iid text-muted`}>({mail})</div>
          </div>
        </div>
        <div className={`${this.cssClass}__delete`}>
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
          />
        </div>
      </Paper>
    );
  }
}

UserEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

UserEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default UserEditor;
