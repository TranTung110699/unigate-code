import React from 'react';
import Widgets from 'components/admin/settings/Widgets';
import checkRoot from 'common/hoc/checkRoot';

const ItSupport = ({ isRoot }) => {
  const blockToShowsInITSupport = ['organization', 'hrms_data'];

  return (
    <React.Fragment>
      <Widgets blockToShows={blockToShowsInITSupport} />
    </React.Fragment>
  );
};

export default checkRoot()(ItSupport);
