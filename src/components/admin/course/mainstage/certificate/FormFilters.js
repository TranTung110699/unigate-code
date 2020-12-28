import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import UpdateForm from 'components/admin/course/new/Form';
import actions from 'actions/node/creators';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

class FormFilters extends Component {
  editCertificateConfig = () => {
    const { dispatch, node } = this.props;
    const contentDialog = (
      <UpdateForm
        formid="update_certificate_config"
        mode="edit"
        title={t1('edit_certificate_config')}
        node={node}
        step="certificate"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_certificate_config'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  sendCertificates = (courseIid) => {
    const { dispatch, node, q, page, itemsPerPage } = this.props;
    const url = apiUrls.send_email_with_certificates;

    const params = {
      course_iid: node.iid,
      q: q,
      page: page,
      items_per_page: itemsPerPage,
    };

    dispatch(sagaActions.sendEmailWithCertificateRequest(url, params));
  };

  render() {
    const { shouldSendAllCertificateViaMail } = this.props;
    return (
      <div>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'text',
              name: 'q',
              floatingLabelText: t1('name_or_id_or_iid_of_user_or_group'),
              fullWidth: true,
              label: t1('search_by_name_or_iid'),
              hintText: t1('please_type_search_text'),
            }}
          />
        </div>
        <div className="col-md-4  m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
          <RaisedButton
            className="m-l-10"
            label={t1('edit_certificate_config')}
            onClick={() => {
              this.editCertificateConfig();
            }}
            primary
          />
          {shouldSendAllCertificateViaMail && (
            <RaisedButton
              className="m-l-10"
              label={t1('send_certificates')}
              onClick={() => {
                this.sendCertificates();
              }}
              primary
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const selector = formValueSelector('certificate_users');
  const { q, page, items_per_page } = selector(
    state,
    'q',
    'page',
    'items_per_page',
  );
  const shouldSendAllCertificateViaMail =
    (state.domainInfo &&
      state.domainInfo.conf &&
      state.domainInfo.conf.should_send_all_certificate_via_mail) ||
    false;

  return {
    q,
    page,
    shouldSendAllCertificateViaMail,
    itemsPerPage: items_per_page,
  };
}

export default connect(mapStateToProps)(FormFilters);
