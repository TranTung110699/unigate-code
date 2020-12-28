import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import schema from 'components/admin/event/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, searchFormId, title } = this.props;
    const formid = this.props.formid || 'new_event';
    return (
      <NodeNew
        title={title}
        ntype={'event'}
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        closeModal
        searchFormId={searchFormId}
        formid={formid}
      />
    );
  }
}

Form.propTypes = {
  formid: PropTypes.string,
  title: PropTypes.string,
  mode: PropTypes.string,
  step: PropTypes.string,
  node: PropTypes.instanceOf(Object),
  searchFormId: PropTypes.string,
  date_from: PropTypes.string,
  date_to: PropTypes.string,
};

Form.defaultProps = {
  formid: null,
  title: null,
  mode: 'new',
  step: null,
  node: null,
  searchFormId: null,
  date_from: null,
  date_to: null,
};

function mapStateToProps(state, props) {
  const selector = formValueSelector(props.formid || 'new_event');
  const { date_from, date_to } = selector(state, 'date_from', 'date_to');
  return {
    date_from,
    date_to,
  };
}

export default connect(mapStateToProps)(Form);
