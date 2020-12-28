import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { skillScaleOptionsSelector } from 'components/admin/skill/skill/utils';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { constants } from 'configs/constants';

class FormFilters extends Component {
  exportUsersInfoInCourse() {
    const { id, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_users_in_course,
        form[id].values,
      ),
    );
  }

  render() {
    const { scaleOptions } = this.props;
    let allowedToTestSelectOptions = [
      {
        value: '',
        primaryText: t1('all'),
      },
    ];
    allowedToTestSelectOptions = allowedToTestSelectOptions.concat(
      constants.YesNoOptions(),
    );

    return (
      <div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'text',
              name: 'q',
              floatingLabelText: t1('name_or_iid_of_user'),
              floatingLabelFixed: false,
              fullWidth: true,
              label: t1('search_by_name_or_iid'),
              hintText: t1('please_type_search_text'),
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'score_scale',
              floatingLabelText: t1('score_scale'),
              fullWidth: true,
              label: t1('score_scale'),
              hintText: t1('score_scale'),
              options: scaleOptions,
            }}
          />
        </div>
        <div className="col-md-3">
          <Element
            schema={{
              type: 'select',
              name: 'allowed_to_test',
              floatingLabelText: t1('allowed_to_test'),
              fullWidth: true,
              label: t1('allowed_to_test'),
              hintText: t1('allowed_to_test'),
              options: allowedToTestSelectOptions,
            }}
          />
        </div>
        <div className="col-md-3 m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            className="admin-btn"
            label={t1('view_score')}
            primary
          />
          <RaisedButton
            name="export"
            type="btn"
            id="export"
            label={t1('export')}
            primary
            className="admin-btn"
            onClick={() => {
              this.exportUsersInfoInCourse();
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scaleOptions: skillScaleOptionsSelector(state),
  form: state.form,
});

export default connect(mapStateToProps)(FormFilters);
