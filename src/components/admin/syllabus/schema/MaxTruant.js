import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getTruantTypeUnitOptions } from 'configs/constants';
import { t1 } from 'translate';

const typeUnitDelimiter = '__';

class MaxTruant extends React.Component {
  cssClass = 'max-truant';

  componentDidMount() {
    const { input } = this.props;
    input.onBlur();
  }

  handleValueChange = (event, value) => {
    const { input } = this.props;
    input.onChange(Object.assign({}, input.value, { value }));
  };

  handleTypeUnitChange = (event, index, value) => {
    const [type, unit] = value.split(typeUnitDelimiter);
    const { input } = this.props;
    input.onChange(
      Object.assign({}, input.value, {
        type,
        unit,
      }),
    );
  };

  render() {
    const {
      className,
      input,
      meta: { touched, error },
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <div className="col-md-2">
          <TextField
            type="number"
            floatingLabelText={t1('value')}
            value={input.value.value}
            onChange={this.handleValueChange}
            fullWidth
            errorText={touched && error && error.value}
          />
        </div>
        <div className="col-md-2">
          <SelectField
            floatingLabelText={t1('unit')}
            floatingLabelFixed={false}
            value={
              input.value.type &&
              input.value.unit &&
              `${input.value.type}${typeUnitDelimiter}${input.value.unit}`
            }
            onChange={this.handleTypeUnitChange}
            fullWidth
            errorText={touched && error && error.typeUnit}
          >
            {getTruantTypeUnitOptions(input.value.value, typeUnitDelimiter).map(
              (option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  primaryText={option.primaryText}
                />
              ),
            )}
          </SelectField>
        </div>
      </div>
    );
  }
}

MaxTruant.propTypes = {
  className: PropTypes.string,
};

MaxTruant.defaultProps = {
  className: '',
};

export default MaxTruant;
