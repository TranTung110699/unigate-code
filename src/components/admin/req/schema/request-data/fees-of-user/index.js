import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import Paper from 'material-ui/Paper';
import { Element } from 'schema-form/elements';
import get from 'lodash.get';
import { timestampToDateString } from 'common/utils/Date';
import { formatMoneyWithCurrency } from 'common';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Divider from 'material-ui/Divider';
import Checkbox from 'schema-form/elements/checkbox';
import schema from './schema';

class FeesOfUser extends React.PureComponent {
  stylePaper = {
    padding: 10,
  };

  renderFeesResultsComponent = (items) => (
    <div>
      <Divider />
      <Element
        schema={{
          name: 'fees',
          type: 'multiCheckbox',
          floatingLabelText: ' ',
          fullWidth: true,
          options:
            Array.isArray(items) && items.length
              ? items.map((item) => ({
                  name: item.name,
                  value: item.iid,
                  label: item.name,
                }))
              : [],
          renderCustomizableOptions: (options) => {
            const columns = [
              {
                title: '',
                key: 'iid',
                render: (text, row) => {
                  const props = { ...row, label: '' };
                  return {
                    children: <Checkbox {...props} />,
                    props: {
                      className: 'text-center',
                    },
                  };
                },
              },
              {
                title: t1('name'),
                render: (text, row) => {
                  const fee =
                    items.find((item) => item.iid === row.value) || {};
                  return fee.name;
                },
              },
              {
                title: t1('deadline'),
                render: (text, row) => {
                  const fee =
                    items.find((item) => item.iid === row.value) || {};
                  return timestampToDateString(fee.end_date);
                },
              },
              {
                title: t1('amount'),
                render: (text, row) => {
                  const fee = items.find((item) => item.iid === row.value);
                  return formatMoneyWithCurrency(
                    get(fee, 'fee_template.currency'),
                    fee.amount,
                  );
                },
              },
            ];

            return (
              <AntdTable
                columns={columns}
                dataSource={options}
                pagination={false}
                bordered
                size="middle"
              />
            );
          },
        }}
      />
    </div>
  );

  render() {
    const { hiddenFields } = this.props;

    return (
      <Paper className="col-md-12" style={this.stylePaper}>
        <h3>{t1('choose_fees_to_postponing')}</h3>
        <SearchWrapper
          formid={'search_fee_of_user_to_postpone'}
          alternativeApi={apiUrls.fee_search}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderFeesResultsComponent}
          showResult
          autoSearchWhenValuesChange
          autoSearchWhenStart
          schema={schema}
        />
      </Paper>
    );
  }
}

FeesOfUser.propTypes = {
  className: PropTypes.string,
};

FeesOfUser.defaultProps = {
  className: '',
};

export default FeesOfUser;
