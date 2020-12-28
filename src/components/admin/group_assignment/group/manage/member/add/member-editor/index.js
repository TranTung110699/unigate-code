import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import 'components/admin/invite/new/stylesheet.scss';

const style = {
  height: 'auto',
  width: '100%',
  margin: 5,
  padding: 10,
  display: 'inline-block',
};

class MemberEditor extends React.Component {
  render() {
    const { value, index, onDelete } = this.props;
    const { name, iid } = value;
    return (
      <Paper style={style} zDepth={2}>
        <div className="action-wrapper">
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
            style={{
              position: 'absolute',
              right: -5,
              top: -5,
              width: 25,
              height: 25,
            }}
          />
        </div>
        <div className="col-xs-8 name">{`${name} (#${iid})`}</div>
      </Paper>
    );
  }
}

MemberEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

MemberEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default MemberEditor;
