import React from 'react';
import PropTypes from 'prop-types';
import RadarChart from 'components/common/d3/RadarChart';
import { t1 } from 'translate';
import { fromArrayToKeyValueObject } from 'common/utils/Array';

class Layout extends React.Component {
  render() {
    const {
      // node, user,
      progresses,
    } = this.props;
    return (
      <RadarChart
        config={{
          width: 500,
          height: 500,
          padding: 50,
          domainMax: 100,
          legendPadding: 20,
        }}
        data={{
          variables: progresses.map((skill) => ({
            key: String(skill.iid),
            label: skill.name,
          })),
          sets: [
            {
              key: 'initial',
              label: t1('progress_when_started'),
              values: fromArrayToKeyValueObject(
                progresses,
                'iid',
                'initial_score',
                0,
              ),
            },
            {
              key: 'current',
              label: t1('current_progress'),
              values: fromArrayToKeyValueObject(
                progresses,
                'iid',
                'current_score',
                0,
              ),
            },
            {
              key: 'target',
              label: t1('target'),
              values: fromArrayToKeyValueObject(progresses, 'iid', 'score', 0),
            },
          ],
        }}
      />
    );
  }
}

Layout.propTypes = {
  node: PropTypes.shape(),
};

Layout.defaultProps = {
  node: null,
};

export default Layout;
