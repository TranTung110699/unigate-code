import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field } from 'redux-form';
import PropTypes from 'prop-types';
import MUSelectField from 'schema-form/elements/select/MUSelectField';
import MUCheckBox from 'schema-form/elements/checkbox/index';
// import Icon from 'components/common/Icon';
import { t1, t4 } from 'translate';
import Text from 'schema-form/elements/text';
import { scoreUnitSelect } from './configs';

class PenaltyInput extends Component {
  onChange(value, field) {
    const { dispatch, name, formid } = this.props;
    // const value = ev.target.value;
    dispatch(change(formid, `${name}.${field}`, value));
  }

  render() {
    const { formid, videoType, hintText, dispatch } = this.props;
    return (
      <div class="container-fluid">
        <span>{hintText}</span>
        <div className="row">
          <div className="col-md-3">
            <Field
              name="wrong_count"
              component={Text}
              type="number"
              floatingLabelText={t4('for_every_x_times_user_got_wrong')}
              hintText={t4('wrong_count')}
              onChange={(ev) => this.onChange(ev.target.value, 'wrong_count')}
              fullWidth
            />
          </div>
          <div className="col-md-3">
            <Field
              name="substract_amount"
              component={Text}
              hintText={t4('substract_amount')}
              floatingLabelText={t4('substract_amount')}
              onChange={(ev) =>
                this.onChange(ev.target.value, 'substract_amount')
              }
              fullWidth
            />
          </div>
          <div className="col-md-3">
            <Field
              name="unit"
              component={MUSelectField}
              hintText={t4('points_or_percentages')}
              floatingLabelText={t4('points_or_percentages')}
              options={scoreUnitSelect}
              onChange={(ev, index, value) => this.onChange(value, 'unit')}
              fullWidth
            />
          </div>
          <div className="col-md-3">
            <br />
            <Field
              name="fail"
              component={MUCheckBox}
              hintText={t1('fail')}
              floatingLabelText={t4('fail')}
              label={t1('check_if_penalty_will_remove_passed_status')}
              onChange={(ev, value) => this.onChange(value, 'fail')}
              fullWidth
            />
          </div>
        </div>
      </div>
    );
  }
}

PenaltyInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Object),
  dispatch: PropTypes.instanceOf(Object),
  et: PropTypes.string,
  formid: PropTypes.string,
  hintText: PropTypes.string,
  st: PropTypes.string,
  videoType: PropTypes.string,
  youtube: PropTypes.instanceOf(Object),
  vimeo: PropTypes.instanceOf(Object),
};
PenaltyInput.defaultProps = {
  dispatch: {},
  formid: '',
  st: '',
  et: '',
  videoType: '',
  hintText: '',
  defaultValue: {},
  youtube: {},
  vimeo: {},
};

export default connect()(PenaltyInput);
