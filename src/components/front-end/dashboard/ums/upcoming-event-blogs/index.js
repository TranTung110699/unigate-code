import React, { Component } from 'react';
import { jsTimestampToDateString } from 'common/utils/Date';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints/index';
import get from 'lodash.get';
import Results from './Results';
import './stylesheet.scss';

class Layout extends Component {
  render() {
    const { userInfo, items } = this.props;
    return (
      <div className="upcoming-event-blogs">
        <div className="upcoming-event-blogs-header">
          <div className="col-xs-12 col-md-8">
            <div className="welcome-title">
              {t1('welcome')} {userInfo && userInfo.name}
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="date-title">
              {jsTimestampToDateString(Date.now())}
            </div>
          </div>
        </div>
        <div>
          <div className="col-md-12">
            <Results items={items} />
          </div>
        </div>
      </div>
    );
  }
}

export default fetchData(() => ({
  baseUrl: get(apiUrls, 'get_upcoming_event_blogs'),
  params: {
    page: 0,
    item_per_page: 5,
  },
  propKey: 'items',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(Layout);
