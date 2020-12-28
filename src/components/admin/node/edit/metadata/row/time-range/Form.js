import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import DateTimePicker from 'schema-form/elements/date-time-picker';

class MetaDataTimeRangeForm extends React.Component {
  cssClass = 'meta-data-time-range-form';

  render() {
    const { className, handleSubmit } = this.props;
    return (
      <form
        className={`${className || ''} ${this.cssClass}`}
        onSubmit={handleSubmit}
      >
        <Element
          schema={{
            name: 'start_time',
            type: DateTimePicker,
            floatingLabelText: t1('start_time'),
          }}
        />
        <Element
          schema={{
            name: 'end_time',
            type: DateTimePicker,
            floatingLabelText: t1('end_time'),
          }}
        />
        <RaisedButton primary type="submit" label={t1('submit')} />
      </form>
    );
  }
}

MetaDataTimeRangeForm.propTypes = {
  className: PropTypes.string,
};

MetaDataTimeRangeForm.defaultProps = {
  className: '',
};

export default reduxForm({})(MetaDataTimeRangeForm);
