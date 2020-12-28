import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import scoTypes from 'components/admin/sco/schema/tpl-types';
import { t1 } from 'translate';
import Warning from 'components/common/Warning';

class CheckList extends Component {
  render() {
    const { node } = this.props;

    let totalWeight = 0;
    if (node.metadata) {
      node.metadata.map((item) => {
        totalWeight += parseInt(item.weighted);
      });
    }

    return (
      <div className="">
        {node.weighed_score &&
          (!totalWeight || (totalWeight && totalWeight !== 100)) && (
            <Warning>
              {t1('total_weight_of_%s_is_not_equal_100', [t1(node.ntype)])}
            </Warning>
          )}
      </div>
    );
    /*
      if (node.ntype === 'sco') {
        // && node.tpl_type === scoTypes.TYPE_SONG)
        return <div>Sco Publishable?</div>;
      } else {
        return <div>CheckList</div>;
      }
    */
  }
}

export default CheckList;
