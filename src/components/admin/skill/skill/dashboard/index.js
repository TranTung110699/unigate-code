/**
 * Created by hungvo on 02/11/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import PieChart from 'components/common/d3/PieChart';
import RaisedButton from 'components/common/mui/RaisedButton';
import SearchUser from '../search-user/Layout';
import CustomChunk from './CustomChunk';

const getKeySkillInformation = (node) =>
  `skill-information-${node && node.iid}`;

class DashBoard extends React.Component {
  pieChartConfig = {
    height: 400,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      newChunk: false,
      chunk: [],
    };
  }

  componentWillMount() {
    this.getData(this.props);
  }

  getData = (props, chunk) => {
    const { node, dispatch } = props;
    const params = {
      iid: node && node.iid,
    };
    if (chunk && chunk.length) {
      params.chunk = chunk;
    }
    const url = '/skill/api/get-information';
    const keyState = getKeySkillInformation(node);
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  formatDataPieChart = (data) =>
    data
      .map((row) => ({
        label: row.name,
        value: row.count,
        legendLabel: `${row.name} - ${row.count}/${row.total}`,
      }))
      .filter((row) => row && row.value);

  handleCustomChunk = () => {
    const { dispatch } = this.props;
    const contentDialog = (
      <CustomChunk
        handleSubmit={(chunk) => {
          this.getData(this.props, chunk);
          dispatch(actions.handleOpenDialog({ openDialog: false }));
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('custom_chunk'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { node, info } = this.props;
    return (
      <div>
        {info && info.length > 0 && (
          <div>
            <div className="col-md-6 whitebox">
              {info.map((row, index) => (
                <p key={`report-info-${index}`}>{`${row.name}: ${row.count}/${
                  row.total
                }`}</p>
              ))}
              <RaisedButton
                label={t1('custom_chunk')}
                onClick={() => this.handleCustomChunk()}
              />
            </div>
            <div className="col-md-6">
              <PieChart
                config={this.pieChartConfig}
                data={{
                  dataSet: this.formatDataPieChart(info),
                }}
              />
            </div>
          </div>
        )}
        <SearchUser node={node} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { node } = props;
  const keyState = getKeySkillInformation(node);
  const info = state.dataApiResults[keyState];
  return {
    info,
  };
}

export default connect(mapStateToProps)(DashBoard);
