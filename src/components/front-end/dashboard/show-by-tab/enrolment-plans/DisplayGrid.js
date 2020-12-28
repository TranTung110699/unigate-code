import React from 'react';
import Item from 'components/front-end/common/block-item';
import lodashGet from 'lodash.get';
import Deadline from 'components/front-end/common/Deadline';
import { getDashboardUrl } from 'routes/links/common';
import DefaultEnrolmentPlanAvatar from 'common/images/default-enrolment-plan-avatar.jpeg';

const isMindmap = (item) => lodashGet(item, 'display_template') == 'mindmap';
const epLink = (item) => {
  const iid = lodashGet(item, 'iid');
  if (isMindmap(item)) {
    return `/mindmap/${iid}.html`;
  }

  return getDashboardUrl('my-enrolment-plans', { iid });
};

const DisplayGrid = ({ items, renderAfter, viewOnly }) => {
  return (
    <React.Fragment>
      {(items &&
        items.length > 0 &&
        items.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <Item
              title={lodashGet(item, 'name')}
              showDeadline
              showProgress={false}
              progress={Math.ceil(lodashGet(item, 'cp', 0))}
              deadline={<Deadline endDate={lodashGet(item, 'end_date')} />}
              overviewLink={epLink(item)}
              mindmapLink={isMindmap(item)}
              disableLink={viewOnly}
              fallbackAvatar={DefaultEnrolmentPlanAvatar}
            />
          </div>
        ))) ||
        null}
      {renderAfter && renderAfter()}
    </React.Fragment>
  );
};

export default DisplayGrid;
