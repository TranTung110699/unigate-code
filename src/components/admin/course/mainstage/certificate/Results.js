import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { downloadCertificate } from 'components/front-end/course/utils';

class Results extends Component {
  tableKeysSave = ['type', 'iid', 'name'];

  constructor(props) {
    super(props);
    this.state = {
      targets: [],
    };
  }

  sendEmailWithCertificate = (courseIid, userIid) => {
    const { dispatch } = this.props;
    const url = apiUrls.send_email_with_certificate;

    const params = {
      course_iid: courseIid,
      user_iid: userIid,
    };
    dispatch(sagaActions.sendEmailWithCertificateRequest(url, params));
  };

  render() {
    const { node, items, formid } = this.props;
    const checkKey = 'id';
    return (
      <div className="table-result">
        {items && items.length ? (
          <div>
            <Table
              formid={formid}
              itemList={items}
              checkKey={checkKey}
              keysSave={this.tableKeysSave}
              multiSelectable
            >
              <TableHeader
                displaySelectAll={false}
                enableSelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
                  <TableHeaderColumn width="10%">
                    {t1('progress')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width="15%">
                    {t1('actions')}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {items.map((item) => (
                  <TableRow key={item.id} selected={item.selected}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn width="10%">{item.p || 0}</TableRowColumn>
                    <TableRowColumn width="15%">
                      <IconButton
                        onClick={() => {
                          downloadCertificate(
                            node.iid,
                            item.iid,
                            this.props.dispatch,
                          );
                        }}
                        title={t1(
                          'download_certificate_and_then_certificate_it',
                        )}
                        iconClassName="mi mi-turned-in-not"
                      />

                      <IconButton
                        onClick={() => {
                          this.sendEmailWithCertificate(node.iid, item.iid);
                        }}
                        title={t1('send_email_with_certificate')}
                        iconClassName="mi mi-inbox"
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div>{t1('no_result')}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formid } = props;
  const result = state.searchResults[formid] || {};
  const targets = result.selectedItems || [];
  return {
    targets,
  };
}

export default connect(mapStateToProps)(Results);
