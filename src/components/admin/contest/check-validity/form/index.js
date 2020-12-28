import React from 'react';
import { connect } from 'react-redux';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Warning from 'components/common/Warning';
import ValidityScoResult from './ValidityScoResult';
import './../stylesheet.scss';

class CheckValidity extends React.Component {
  constructor(props) {
    super(props);
    this.checkValidity = this.checkValidity.bind(this);
  }

  componentDidMount() {
    this.checkValidity();
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.props;
    if (
      nextProps &&
      nextProps.node &&
      nextProps.node.iid &&
      (!node || !node.iid || nextProps.node.iid !== node.iid)
    ) {
      this.checkValidity();
    }
  }

  checkValidity = () => {
    const { dispatch, node } = this.props;
    if (node && node.iid) {
      const config = {
        url: apiUrls.check_validity,
        keyState: `check-validity-${node.iid}`,
      };

      const params = {
        ntype: node.ntype,
        iid: node.iid,
      };

      dispatch(nodeSagaActions.getDataRequest(config, params));
    }
  };

  render() {
    const { checkValidityResult, node } = this.props;
    if (node && node.ntype === 'sco') {
      const checkValidityResultOfSco = Object.assign(node, checkValidityResult);
      return (
        <div className="check-validity-wrapper">
          <ValidityScoResult sco={checkValidityResultOfSco} idx={1} />
        </div>
      );
    }

    return (
      <div className="check-validity-wrapper">
        <div className="item-block">
          <div className="group-title">{t1('overview')}</div>
          <div className={'table-item-list'}>
            <Table className={'item-list'}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>{t1('type')}</TableHeaderColumn>
                  <TableHeaderColumn>{t1('number')}</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {checkValidityResult && checkValidityResult.num_scos && (
                  <TableRow>
                    <TableRowColumn>{t1('sco')}</TableRowColumn>
                    <TableRowColumn>
                      {checkValidityResult.num_scos}
                    </TableRowColumn>
                  </TableRow>
                )}
                {checkValidityResult && checkValidityResult.num_exercises && (
                  <TableRow>
                    <TableRowColumn>{t1('exercise')}</TableRowColumn>
                    <TableRowColumn>
                      {checkValidityResult.num_exercises}
                    </TableRowColumn>
                  </TableRow>
                )}
                {checkValidityResult && checkValidityResult.num_exams && (
                  <TableRow>
                    <TableRowColumn>{t1('exam')}</TableRowColumn>
                    <TableRowColumn>
                      {checkValidityResult.num_exams}
                    </TableRowColumn>
                  </TableRow>
                )}
                {checkValidityResult && checkValidityResult.num_vocabsets && (
                  <TableRow>
                    <TableRowColumn>{t1('vocabset')}</TableRowColumn>
                    <TableRowColumn>
                      {checkValidityResult.num_vocabsets}
                    </TableRowColumn>
                  </TableRow>
                )}
                {checkValidityResult && checkValidityResult.num_lectures && (
                  <TableRow>
                    <TableRowColumn>{t1('lecture')}</TableRowColumn>
                    <TableRowColumn>
                      {checkValidityResult.num_lectures}
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className={'common-errors'}>
            <div className="error-title">{t1('common_errors')}</div>
            {checkValidityResult && checkValidityResult.empty_duration && (
              <Warning>{t1('duration_of_exam_store_cant_be_empty')}</Warning>
            )}
          </div>
        </div>
        {checkValidityResult &&
          checkValidityResult.scos &&
          checkValidityResult.scos.map((sco, idx) => (
            <ValidityScoResult sco={sco} idx={idx} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { node } = props;
  const keyState = `check-validity-${node.iid}`;

  return {
    checkValidityResult: state.dataApiResults[keyState],
  };
};

export default connect(mapStateToProps)(CheckValidity);
