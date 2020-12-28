import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';
import schema from './schema/form';

class RateFeedback extends Component {
  render() {
    return (
      <NodeNew
        {...this.props}
        ntype={'feedback'}
        schema={schema}
        alternativeApi={'/feedback/index/new'}
        submitLabels={{
          default: t1('feedback'),
        }}
      />
    );
  }
}

export default RateFeedback;
