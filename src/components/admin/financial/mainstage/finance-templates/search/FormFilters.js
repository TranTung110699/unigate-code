import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import { constants, feesTypeApplied } from 'configs/constants';
import RaisedButton from 'components/common/mui/RaisedButton';
import PropTypes from 'prop-types';

const styles = {
  checkBox: {
    width: '130px',
  },
  status: {
    width: '100px',
  },
};

class FormFilters extends Component {
  render() {
    const { classification } = this.props;
    return [
      <div className={classification === 'fee' ? 'col-md-12' : 'col-md-4'}>
        {classification === 'fee' && (
          <Element
            schema={{
              name: 'template_type',
              type: 'multiCheckbox',
              inline: true,
              floatingLabelText: t1('template_type'),
              hintText: t1('template_type'),
              labelStyle: styles.checkBox,
              options: constants.feeTemplateTypes().concat([
                {
                  value: feesTypeApplied.DEPOSIT_TO_ACCOUNT,
                  label: t1('Deposit_to_account'),
                  primaryText: t1('Deposit_to_account'),
                },
              ]),
              defaultValue: constants
                .feeTemplateTypes()
                .map((item) => item.value)
                .concat([feesTypeApplied.DEPOSIT_TO_ACCOUNT]),
            }}
          />
        )}
        {classification === 'benefit' && (
          <Element
            schema={{
              name: 'benefit_type',
              type: 'select',
              multiple: true,
              fullWidth: true,
              floatingLabelText: t1('benefit_type'),
              hintText: t1('benefit_type'),
              options: constants.benefitTypes(),
              defaultValue: constants.benefitTypes().map((item) => item.value),
            }}
          />
        )}
      </div>,
      <div className={classification === 'fee' ? 'col-md-7' : 'col-md-3'}>
        <Element
          schema={{
            type: 'text',
            name: 'name',
            floatingLabelText: t1('iid_or_name'),
            fullWidth: true,
            label: t1('name'),
            hintText: t1('enter_iid_or_name'),
          }}
        />
      </div>,
      <div className="col-md-3">
        <Element
          schema={{
            name: 'status',
            fullWidth: true,
            type: 'multiCheckbox',
            inline: true,
            labelStyle: styles.status,
            floatingLabelText: t1('status'),
            hintText: t1('type_of_status'),
            options: constants.feeTemplateStatusOptions(),
            defaultValue: constants
              .feeTemplateStatusOptions()
              .map((item) => item.value),
          }}
        />
      </div>,
      <div className="col-md-2 m-t-25 text-center">
        <RaisedButton
          name="submit"
          type="submit"
          id="submit"
          label={t1('search')}
          primary
        />
      </div>,
    ];
  }
}

FormFilters.propTypes = {
  classification: PropTypes.string,
};

FormFilters.defaultProps = {
  classification: null,
};

export default FormFilters;
