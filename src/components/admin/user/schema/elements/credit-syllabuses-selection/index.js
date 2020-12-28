/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import './../stylesheet.scss';

class CreditSyllabusesResultOfInputAutoComplete extends React.Component {
  cssClass = 'admin-credit-syllabus-selection';

  render() {
    const { value, index, onDelete } = this.props;
    if (!value) {
      return null;
    }
    const { name } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className="col-md-12">
            <span className={`${this.cssClass}__name`}>{name}</span>
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

CreditSyllabusesResultOfInputAutoComplete.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

CreditSyllabusesResultOfInputAutoComplete.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default CreditSyllabusesResultOfInputAutoComplete;
