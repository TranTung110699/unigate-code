import React, { PureComponent } from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'components/common/mui/Table';
import NodeNew from 'components/admin/node/new';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import FeeCanBeAutomaticallyPaid from './FeeCanBeAutomaticallyPaid';
import apiUrls from 'api-endpoints';
import { invoiceTypes } from 'configs/constants';
import { schemaCreateInvoiceByAutomaticallyPaidList } from '../fees-of-user/schema/form';

class Results extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      automaticallyPaidList: [],
    };
  }
  width = {
    stt: '5%',
    name: '15%',
    fees_currency: '20%',
    fees: '60%',
  };

  addToAutomaticallyPaidList = (user, fees = []) => {
    if (!user || !user.iid) {
      return;
    }
    this.setState(({ automaticallyPaidList = [] }) => {
      const newList = automaticallyPaidList.filter((row) => {
        return get(row, 'user.iid') !== get(user, 'iid');
      });

      if (!Array.isArray(fees) || !fees.length) {
        return {
          automaticallyPaidList: newList,
        };
      }

      newList.push({ user, fees });
      return {
        automaticallyPaidList: newList,
      };
    });
  };

  confirmPayList = (closeDialog) => {
    const { formid } = this.props;

    return (
      <NodeNew
        resetForm
        ntype="invoice"
        searchFormId={formid}
        schema={schemaCreateInvoiceByAutomaticallyPaidList}
        hiddenFields={{
          data_automatically_paid: this.state.automaticallyPaidList,
          type: invoiceTypes.AUTOMATICALLY_PAYMENT_BY_WALLET,
        }}
        alternativeApi={apiUrls.post_new_node(
          'invoice',
          'automatically-paid-list',
        )}
        requestSuccessful={() => {
          closeDialog();
        }}
      />
    );
  };

  render() {
    const { items, ...props } = this.props;
    const { automaticallyPaidList } = this.state;

    return (
      <div>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={this.width.stt} />
              <TableHeaderColumn width={this.width.name}>
                {t1('code')} - {t1('full_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.width.fees_currency}>
                {t1('fees_by_currency')}
              </TableHeaderColumn>
              <TableHeaderColumn
                className="text-center"
                width={this.width.fees}
              >
                {t1('fees')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {items &&
              Array.isArray(items) &&
              items.length > 0 &&
              items.map(({ currencies, ...user }) => (
                <FeeCanBeAutomaticallyPaid
                  key={user && user.id}
                  {...props}
                  columnWidth={this.width}
                  user={user}
                  currencies={currencies}
                  addToAutomaticallyPaidList={this.addToAutomaticallyPaidList}
                />
              ))}
          </TableBody>
        </Table>
        {Array.isArray(items) && !!items.length && (
          <DetailOnDialog
            renderPreview={({ showFull }) => (
              <RaisedButton
                label={t1('automatically_pay')}
                className="m-t-30"
                onClick={showFull}
                disabled={
                  !Array.isArray(automaticallyPaidList) ||
                  !automaticallyPaidList.length
                }
                primary
              />
            )}
            renderFull={({ closeDialog }) => this.confirmPayList(closeDialog)}
            dialogOptionsProperties={{
              handleClose: true,
              width: '90%',
            }}
          />
        )}
      </div>
    );
  }
}

export default Results;
