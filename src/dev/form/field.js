import React, { Component } from 'react';

class StrangeField extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   id: 'id',
    //   st: 'start time',
    //   et: 'end time',
    // };
  }

  onxChange(ev, field) {
    const newValue = {
      id: '123123',
      st: 'xxx',
    };
    console.log(newValue, field);
    this.props.input.onChange(ev, 'newValue');
  }

  render() {
    console.log('yyy', this.props);

    return (
      <div>
        <span onClick={(ev) => this.onxChange(ev, 'st')}>
          Youtube asfas fsfsafasfsdf
        </span>
        {/*
        <div>
        Id:
        <input
          name="id"
          type="text"
          onChange={(ev) => this.onxChange(ev, 'id')}
        />
        st: <input
          name="st"
          type="text"
          onChange={(ev) => this.onxChange(ev, 'st')}
        />
        </div>
          */}
      </div>
    );
  }
}

export default StrangeField;
