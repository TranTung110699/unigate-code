import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import ButtonNew from './new/ButtonNew';
import SearchAcademicCategory from './search/Layout';
import { t1 } from 'translate';

// import HashbangContext from 'components/common/modal/hashbang-context';

class AcademicCategoryLayout extends React.Component {
  // static contextType = HashbangContext;

  render() {
    return (
      <div>
        <SubTopMenuContext
          button={<ButtonNew />}
          isSmallSize
          lastBreadcrumbName={t1('academic_category')}
        />
        <SearchAcademicCategory />
      </div>
    );
  }
}

AcademicCategoryLayout.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryLayout.defaultProps = {
  className: '',
};

export default AcademicCategoryLayout;
