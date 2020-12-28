import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import Addable from 'schema-form/elements/addable/Addable';
import AspectsPercent from './AspectsPercent';

const totalScore = (aspect) => {
  let sum = 0;
  Object.keys(aspect).forEach((key) => {
    if (key !== 'pass_score') sum += parseFloat(aspect[key]);
  });
  return sum;
};

class AspectsPercentAddable extends React.Component {
  divStyle = { marginLeft: '20px' };

  render() {
    const { name } = this.props;

    return (
      <div>
        <Addable
          name={name}
          renderElementToAdd={({ index, total }) => (
            <div style={this.divStyle}>
              <AspectsPercent
                key={index}
                total={
                  this.props.aspectsPercent
                    ? totalScore(this.props.aspectsPercent[index])
                    : 0
                }
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AspectsPercentAddable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // form: PropTypes.string.isRequired,
  // isMultiSelectable: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  const values = getFormValues(props.formid)(state);

  return {
    aspectsPercent:
      values && values.aspects_percent ? values.aspects_percent : null,
  };
};

export default connect(mapStateToProps)(AspectsPercentAddable);
