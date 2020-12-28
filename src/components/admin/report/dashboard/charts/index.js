/**
 * Created by hungvo on 19/09/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import sagaNodeActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import IconUser from 'material-ui/svg-icons/social/person';
import { getKeyStateInformationReport } from '../utils/keyState';

const style = {
  display: 'inline-block',
  float: 'left',
  margin: '16px 32px 16px 0',
};

class DashBoardReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 'user',
      groups: [],
    };
  }

  componentWillMount() {
    this.getInformationReportNode(this.props);
  }

  getInformationReportNode = (props) => {
    const { node, dispatch, target, groups } = props;
    if (!node || !node.iid) {
      return;
    }

    const url = apiUrls.get_information_report;
    const params = {
      item: {
        iid: node && node.iid,
        ntype: node && node.ntype,
      },
    };
    if (target) {
      params.target = target;
    }
    if (groups && groups.length) {
      params.groups = groups;
    }
    dispatch(
      sagaNodeActions.getDataRequest(
        { url, keyState: getKeyStateInformationReport(node) },
        params,
      ),
    );
  };

  render() {
    const information = this.props.information || {};
    return (
      <div>
        {information && information.learning > 0 && (
          <div>
            <h3>
              {t1('number_of_users_passed:_%s/%s', [
                information.passed || 0,
                information.learning,
              ])}
            </h3>
            {information.deadlineSomeDays &&
              information.deadlineSomeDays.length > 0 &&
              information.deadlineSomeDays.map((deadline, index) => (
                <Paper style={style}>
                  <ListItem
                    key={`deadline-some-days-${index}`}
                    primaryText={deadline && deadline.name}
                    hoverColor="#00BCD4"
                    leftIcon={<IconUser />}
                    primaryTogglesNestedList
                    nestedItems={deadline.users.map((user, uIndex) => (
                      <ListItem
                        key={`deadline-some-days-users-${user.id || uIndex}`}
                        hoverColor="#00BCD4"
                        primaryText={`${user.name}-${user.iid}`}
                      />
                    ))}
                  />
                </Paper>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const node = props.node || {};
  return {
    information: state.dataApiResults[getKeyStateInformationReport(node)],
  };
};

export default connect(mapStateToProps)(DashBoardReport);
