import React, { Component } from 'react';
import apiUrls from 'components/admin/system/endpoints';
import lodashGet from 'lodash.get';
import fetchData from 'components/common/fetchData';

class MotpDetail extends Component {
  render() {
    const { currentMotp } = this.props;

    return (
      <div>
        <div>
          <b>current pass</b>: {lodashGet(currentMotp, 'motp')}
        </div>

        <div>
          <b>nr of logins</b>: {lodashGet(currentMotp, 'nr_of_logins')}
        </div>

        <div>
          <b>to to live</b>: {lodashGet(currentMotp, 'ttl')} (seconds)
        </div>
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.get_motp,
  params: {
    school_slug: lodashGet(props, 'schoolSlug'),
  },
  propKey: 'currentMotp',
  fetchCondition: true,
}))(MotpDetail);
