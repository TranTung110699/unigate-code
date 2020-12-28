import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// import StrangeField from './field';

class Form extends Component {
  spanStyle = { fontSize: '150%', color: 'red' };

  constructor(props) {
    super(props);
    this.state = {
      foo: this.props.initialValues.foo,
    };
  }

  render() {
    const { handleSubmit } = this.props;
    const onChange = (value) => {
      // TODO: whey does redux-form return value in the format of {0: 'A'}
      this.setState({ foo: value[0] });
      // console.log('hahaha', name, value);
    };

    const props = {
      name: 'foo',
      valueKey: 'value',
      options: [
        {
          value: 'A',
          title: 'Choose this A',
          url: '/images/1.jpg',
        },
        {
          value: 'B',
          title: 'Another image B',
          url: '/images/2.jpg',
        },
        {
          value: 'C',
          title: 'Choose this C',
          url: '/images/3.jpg',
        },
      ],
      onChange,
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          Selected image: <span style={this.spanStyle}> {this.state.foo} </span>
          {/*
          <Field component={StrangeField} name="youtubexx" />;
            */}
          <input type="text" name="bar" value="Alo" />
          <input name="submit" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

// Decorate the form component
Form = reduxForm({
  form: 'selectImageForm', // a unique name for this form
})(Form);

// You have to connect() to any reducers that you wish to connect to yourself
Form = connect((state) => ({
  initialValues: {
    foo: 'B',
  },
  // state.account.data // pull initial values from account reducer
}))(Form);

export default Form;
