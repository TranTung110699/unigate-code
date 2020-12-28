/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NodeShape } from 'configs/constants';
import Perm from 'common/utils/Perm';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import sagaActions from 'actions/node/saga-creators';
import Form from 'schema-form/Form';
import store from 'store';
import {
  generateFormId,
  preparePayloadForNodeRequestSaga,
} from '../schema-form/service';
import Preview from './Preview';

class NodeNew extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    // TODO: remove this ??
    if (Perm.isGuest() && this.props.ntype === 'take') {
      store.dispatch(openLoginDialog());
      return;
    }

    const { onSubmit } = this.props;

    if (onSubmit) {
      const hiddenFields = this.props.hiddenFields || {};

      const params = this.props.params || {};
      const allParams = Object.assign({}, params, hiddenFields);
      onSubmit(data, allParams);
      return;
    }

    const payload = preparePayloadForNodeRequestSaga(data, this.props);

    store.dispatch(sagaActions.upsertNodeRequest(payload));
  }

  render() {
    const { orgIids } = this.props;
    const formid = generateFormId(this.props);
    const schema = this.props.schema; // || getNodeFormSchema(this.props.ntype);
    const showAddNewAndEditButton = this.props.showAddNewAndEditButton;
    const getEditItemUrl = this.props.getEditItemUrl;

    if (!schema) {
      return <div>schema not yet defined. {this.props.ntype}</div>;
    }

    let hiddenFields = this.props.hiddenFields || {};

    hiddenFields = {
      ...hiddenFields,
      orgIids,
    };

    const showPreview =
      process.env.NODE_ENV !== 'production' && window.APP_SHOW_PREVIEW === 1;
    const { className, ...propsRenderer } = this.props;

    return (
      <div className={className}>
        <Form
          {...propsRenderer}
          resetForm
          schema={schema}
          showAddNewAndEditButton={showAddNewAndEditButton}
          getEditItemUrl={getEditItemUrl}
          onSubmit={this.handleSubmit}
          onChange={this.props.onChange}
          formid={formid}
          hiddenFields={hiddenFields}
        />
        {showPreview && (
          <Preview {...this.props} submitButton={null} formid={formid} />
        )}
      </div>
    );
  }
}

NodeNew.defaultProps = {
  editingItemIid: '',
  closeModal: true,
  ntype: '',
  mode: 'new',
  step: '',
  className: '',
  alternativeApi: '',
};

NodeNew.propTypes = {
  alternativeApi: PropTypes.string,
  className: PropTypes.string,
  closeModal: PropTypes.bool,
  editingItemIid: PropTypes.any,
  hiddenFields: PropTypes.shape(),
  mode: PropTypes.string, // new,edit,''
  // mode: PropTypes.oneOf(['new', 'edit']),
  node: PropTypes.shape(NodeShape),
  ntype: PropTypes.string, // optional
  schema: PropTypes.any,
  showPreview: PropTypes.bool,
  step: PropTypes.string,
  dialogKey: PropTypes.string,
  readOnly: PropTypes.bool,
  searchFormId: PropTypes.string,
  // requestSuccessful: PropTypes.func(), // when request is successfully returned from server, what do we do.
};

export default connect()(NodeNew);
