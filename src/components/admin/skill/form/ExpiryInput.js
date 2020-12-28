import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field } from 'redux-form';
import PropTypes from 'prop-types';
import MUSelectField from 'schema-form/elements/select/MUSelectField';
import { t1, t4 } from 'translate';
import Text from 'schema-form/elements/text';
import { dateUnitSelect, scoreUnitSelect } from './configs';

class PenaltyInput extends Component {
  onChange(value, field) {
    const { dispatch, name, formid } = this.props;
    // const value = ev.target.value;
    dispatch(change(formid, `${name}.${field}`, value));
  }

  render() {
    const { formid, hintText, dispatch } = this.props;
    return (
      <div>
        <span>{hintText}</span>
        <div>
          <div>
            {t1('valid_for')}{' '}
            <Field
              name="valid_duration"
              component={Text}
              type="number"
              onChange={(ev) =>
                this.onChange(ev.target.value, 'valid_duration')
              }
              fullWidth
            />
            <Field
              name="valid_unit"
              component={MUSelectField}
              hintText={t4('valid_unit')}
              floatingLabelText={t4('valid_unit')}
              options={dateUnitSelect}
              onChange={(ev, index, value) =>
                this.onChange(value, 'valid_unit')
              }
              fullWidth
            />
          </div>
          <div>
            {t1('score_will_be_reduced')}{' '}
            <Field
              name="substract_amount"
              type="number"
              component={Text}
              hintText={t4('substract')}
              floatingLabelText={t4('substract')}
              onChange={(ev) =>
                this.onChange(ev.target.value, 'substract_amount')
              }
              fullWidth
            />
            <Field
              name="score_unit"
              component={MUSelectField}
              hintText={t4('score_unit')}
              floatingLabelText={t4('score_unit')}
              options={scoreUnitSelect}
              defaultValue="point"
              onChange={(ev, index, value) =>
                this.onChange(value, 'score_unit')
              }
              fullWidth
            />
            <Field
              name="time_unit"
              component={MUSelectField}
              hintText={t4('every')}
              floatingLabelText={t4('every')}
              options={dateUnitSelect}
              onChange={(ev, index, value) => this.onChange(value, 'time_unit')}
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
