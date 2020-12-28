import React from 'react';
import { connect } from 'react-redux';
import { FormSection, getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
// import { FormSection } from 'redux-form';
// import { Addable } from 'schema-form/elements';
import AspectsPercentInput from './AspectsPercentInput';
// import VarDump from 'components/common/VarDump';
import { totalAspectsScore } from './configs';

class AspectsPercentElement extends React.Component {
  render() {
    const { name, aspectsPercent } = this.props;
    return (
      <div>
        <FormSection name={name}>
          <AspectsPercentInput
            {...this.props}
            total={aspectsPercent ? totalAspectsScore(aspectsPercent) : 0}
          />
        </FormSection>
      </div>
    );
  }
}

AspectsPercentElement.propTypes = {
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

export default connect(mapStateToProps)(AspectsPercentElement);
