import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VarDump from 'components/common/VarDump';
import { Element } from 'schema-form/elements';
import MultipleChoice from 'schema-form/elements/multiple-choice/MultipleChoice';

class MultipleChoiceDev extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { form, dump } = this.props;
    return (
      <div>
        <VarDump data={dump && dump.values} />
        <Element
          schema={{
            type: 'cascade',
            component: MultipleChoice,
            isMultiSelectable: true,
            name: 'answer',
            form,
          }}
        />
      </div>
    );
  }
}

MultipleChoiceDev.propTypes = {
  form: PropTypes.string.isRequired,
};

export default connect((state) => ({
  dump: state.form.dev_multiple_choice,
}))(
  reduxForm({
    form: 'dev_multiple_choice',
    initialValues: {
      answer: [
        {
          is_answer: true,
          avatar: 'two',
        },
        {},
        {
          is_answer: true,
          audio: 'Three',
        },
      ],
    },
  })(MultipleChoiceDev),
);
