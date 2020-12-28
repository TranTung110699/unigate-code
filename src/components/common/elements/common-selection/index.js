import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import './stylesheet.scss';

class CommonResult extends React.Component {
  cssClass = 'admin-common-selection';

  render() {
    const { value, index, onDelete, fromValueToText } = this.props;

    if (!value) {
      return null;
    }

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className="col-md-12">
            <span className={`${this.cssClass}__name`}>
              {fromValueToText(value)}
            </span>
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

CommonResult.propTypes = {
  index: PropTypes.number,
  value: PropTypes.shape({
    name: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  fromValueToText: PropTypes.func,
};

CommonResult.defaultProps = {
  index: 0,
  value: {},
  onDelete: (f) => f,
  fromValueToText: (f) => f.name,
};

export default CommonResult;
