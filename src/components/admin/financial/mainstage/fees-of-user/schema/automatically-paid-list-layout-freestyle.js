import React from 'react';
import Avatar from 'components/common/avatar/index';
import get from 'lodash.get';
import { formatMoney } from 'common';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import { t1 } from 'translate';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const LayoutFreestyle = (props) => {
  const { submitButton } = props;

  const dataAutomaticallyPaid = get(
    props,
    'hiddenFields.data_automatically_paid',
  );

  if (!Array.isArray(dataAutomaticallyPaid) || !dataAutomaticallyPaid.length) {
    return <h3>{t1('empty_data_automatically_paid')}</h3>;
  }

  const fieldNames = get(props, 'groups.default.fieldNames');
  if (!fieldNames) {
    return null;
  }

  return (
    <div>
      <Paper style={stylePaper}>
        <Title title={t1('fees')} />
        <div className="clearfix">
          <div className="col-md-12">
            <ul>
              {dataAutomaticallyPaid.map(({ user, fees }) => {
                return (
                  <li>
                    <Avatar user={user} size={30} />
                    &nbsp;
                    {user && user.name} (#{user && user.code})
                    <ul>
                      {fees.map((fee) => {
                        return (
                          <li>{`${get(
                            fee,
                            'fee_template.name',
                          )} : (${formatMoney(get(fee, 'amount'))} ${get(
                            fee,
                            'fee_template.currency',
                          )})`}</li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Paper>
      <Paper style={stylePaper}>
        <Title title={t1('others_benefit')} />
        <div className="clearfix">
          <div>{fieldNames['others_benefit']}</div>
        </div>
      </Paper>
      <div className="text-center">{submitButton}</div>
    </div>
  );
};

export default LayoutFreestyle;
