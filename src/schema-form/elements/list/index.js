import React from 'react';
import Icon from 'components/common/Icon';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import './stylesheet.scss';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillMount() {
    const { input, defaultValue, value } = this.props;
    const values = (input && input.value) || value || defaultValue;
    this.handleOnChange(values);
  }

  handleOnChange = (value) => {
    const { input, onChange } = this.props;
    if (input && input.onChange) {
      input.onChange(value);
    }

    this.setState({ value });

    if (onChange) {
      onChange(value);
    }
  };

  remove = (index) => {
    const value = this.getValues();
    value.splice(index, 1);
    this.handleOnChange(value);
  };

  getValues = () => {
    const { input } = this.props;
    return input && input.onChange ? input.value || [] : this.state.value || [];
  };

  render() {
    const { label, className } = this.props;
    const values = this.getValues();
    return (
      <div className={`list-component ${className}`}>
        <div>{label}</div>
        {Array.isArray(values) &&
          values.map((value, index) => (
            <div className="item-component">
              {value.name}
              <Icon
                icon="clear"
                className="delete-button"
                onClick={() => this.remove(index)}
              />
            </div>
          ))}
        {(!Array.isArray(values) || values.length === 0) && (
          <div>{t1('list_is_empty')}</div>
        )}
      </div>
    );
  }
}

Index.propTypes = {
  defaultValue: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  defaultValue: [],
};

export default Index;
