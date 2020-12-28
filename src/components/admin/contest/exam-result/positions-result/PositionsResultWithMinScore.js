import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';

import './stylesheet.scss';

class PositionsResultsWithMinScore extends React.Component {
  cssClass = 'admin-positions-selection';

  render() {
    const { value, index, onDelete, fromValueToText } = this.props;

    if (!value) {
      return null;
    }

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info col-md-7`}>
          {fromValueToText(value)}
        </div>
        <div className={`${this.cssClass}__extra col-md-3`}>
          <Element
            schema={{
              name: 'min_score',
              type: 'number',
              step: 1,
              min: 0,
              floatingLabelText: t1('min_score'),
              floatingLabelFixed: true,
              fullWidth: true,
              normalize: (val) => parseFloat(val),
            }}
          />
        </div>
        <div className={`${this.cssClass}__delete col-md-2`}>
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

PositionsResultsWithMinScore.propTypes = {
  index: PropTypes.number,
  value: PropTypes.shape({
    name: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  fromValueToText: PropTypes.func,
};

PositionsResultsWithMinScore.defaultProps = {
  index: 0,
  value: {},
  onDelete: (f) => f,
  fromValueToText: (f) => f.name,
};

export default PositionsResultsWithMinScore;
