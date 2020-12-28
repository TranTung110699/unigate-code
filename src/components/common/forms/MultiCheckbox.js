import React, { Component } from 'react';

/*
  props : name, label, options
*/
class MultiCheckbox extends Component {
  render() {
    return (
      <div>
        <dt id={`${this.props.name}-label`}>
          <label className="optional" htmlFor={this.props.name}>
            {this.props.label}
          </label>
        </dt>
        <div className="form-control">
          {this.props.options.map((item) => (
            <label
              key={`${this.props.name}-${item.name}`}
              htmlFor={`${this.props.name}-${item.name}`}
            >
              <input
                type="checkbox"
                value={item.value}
                id={`${this.props.name}-${item.name}`}
                name={`${this.props.name}[]`}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default MultiCheckbox;
