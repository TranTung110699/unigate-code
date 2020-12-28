import React from 'react';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import { isClassGroup } from 'common/learn';
import RaisedButton from 'components/common/mui/RaisedButton';
import { feeStatusFilterOptions, feeStatusFilters } from 'configs/constants';

const FormFilters = (props) => {
  const { node } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <Element
            schema={{
              type: 'text',
              name: 'text',
              floatingLabelText: t1('mutiple_name_or_iid_or_email'),
              floatingLabelFixed: true,
              fullWidth: true,
              placeholder: t1('e.g:%s', ['iid, mail@domain.com']),
            }}
          />
        </div>
        {isClassGroup(node) && (
          <div className="col-md-4 m-t-25">
            <Element
              schema={{
                name: 'financial_status',
                type: 'radio',
                inline: true,
                floatingLabelText: t1('financial_status'),
                hintText: t1('financial_status'),
                label: t1('financial_status'),
                options: feeStatusFilterOptions([
                  feeStatusFilters.FEE_CANCELLATION,
                ]),
              }}
            />
          </div>
        )}
      </div>
      <div className="row">
        <div className="m-t-25 text-center">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            className="admin-btn"
            primary
          />
        </div>
      </div>
    </div>
  );
};

export default FormFilters;
