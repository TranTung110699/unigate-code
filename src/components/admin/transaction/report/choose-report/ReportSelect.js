import React from 'react';
import { Element } from 'schema-form/elements';
import { reduxForm } from 'redux-form';
import { t1 } from 'translate';
import reportOptions from '../configs/reportOptions';

class TransactionReportSearch extends React.Component {
  render() {
    const translatedOptions = reportOptions.map((option) =>
      Object.assign({}, option, {
        primaryText: t1(option.primaryText),
      }),
    );

    return (
      <div id="teacher-search-form">
        <Element
          schema={{
            type: 'select',
            name: 'report',
            floatingLabelText: t1('choose_report'),
            options: translatedOptions,
          }}
        />
      </div>
    );
  }
}

export default reduxForm({})(TransactionReportSearch);
