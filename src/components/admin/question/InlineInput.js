import React, { Component } from 'react';

class UserInput extends Component {
  render() {
    // node is the question
    // inputElement contains information about the answers
    const { e, i, /* node,*/ handleChange } = this.props;
    // TODO: render a input component
    return (
      <span>
        {e.type === 'input' && (
          <input
            name={`text_${i}`}
            onChange={(event) => {
              handleChange(event.target.value, i);
            }}
          />
        )}
        {e.type === 'select' && (
          <select
            name={`select_${i}`}
            onChange={(event /*, value*/) => {
              handleChange(event.target.value, i);
            }}
          >
            <option>---</option>
            {e.answer.map((option, index) => (
              <option key={index} value={option.text}>
                {option.text}
              </option>
            ))}
          </select>
        )}
      </span>
    );
  }
}

export default UserInput;
