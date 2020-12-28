/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import './../stylesheet.scss';

class CoursesResultOfInputAutoComplete extends React.Component {
  cssClass = 'admin-survey-selection';

  render() {
    const { value, index, onDelete } = this.props;
    if (!value) {
      return null;
    }
    const { name, code } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className="col-md-12">
            <span className={`${this.cssClass}__name`}>{name}</span>
            {code && (
              <span className={`${this.cssClass}__code text-muted`}>
                {' '}
                ({code})
              </span>
            )}
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

CoursesResultOfInputAutoComplete.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

CoursesResultOfInputAutoComplete.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default CoursesResultOfInputAutoComplete;
