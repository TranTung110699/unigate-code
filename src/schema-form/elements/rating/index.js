import React from 'react';
import ReactStars from 'react-stars';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentWillMount() {
    const { value, defaultValue, input } = this.props;
    if (!input && (value || defaultValue)) {
      this.setState({ value: value || defaultValue });
    }
  }

  handleChange = (newValue) => {
    const { input, onChange } = this.props;
    if (input) {
      input.onChange(newValue);
    } else {
      this.setState({ value: newValue });
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  render() {
    const { label, input, styleContainer, ...props } = this.props;
    return (
      <div style={styleContainer}>
        {label}
        <ReactStars
          {...props}
          onChange={(newRating) => {
            this.handleChange(newRating);
          }}
          value={input ? input.value : this.state.value}
        />
      </div>
    );
  }
}

export default Rating;
