import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import { connect } from 'react-redux';

class FormFilters extends Component {
  exportUsersInfoInOfflineExam() {
    const { id, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_users_in_offline_exam,
        form[id].values,
      ),
    );
  }

  render() {
    const { node } = this.props;
    return (
      <div>
        <div className={'col-md-6'}>
          <Element
            schema={{
              type: 'text',
              name: 'q',
              floatingLabelText: t1('search_by_name_or_iid'),
              floatingLabelFixed: false,
              fullWidth: true,
              hintText: t1('please_type_search_text'),
            }}
          />
        </div>
        <div className={`col-md-3 m-t-25 text-center`}>
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
          {node.exam_type && node.exam_type === 'OFFLINE_EXAM' && (
            <RaisedButton
              name="export"
              type="btn"
              id="export"
              label={t1('export')}
              primary
              className="admin-btn m-l-15"
              onClick={() => {
                this.exportUsersInfoInOfflineExam();
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: state.form,
});

export default connect(mapStateToProps)(FormFilters);
