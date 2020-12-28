import React from 'react';
import { t1 } from 'translate';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from './Search';

class Index extends React.Component {
  render() {
    return (
      <>
        <SubTopMenuContext
          lastBreadcrumbName={t1('report_by_training_plan')}
          isSmallSize
        />
        <div className="white-background">
          <Search />
        </div>
      </>
    );
  }
}

export default Index;
