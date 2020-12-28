/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { menuItems } from './sub-left-menu-configs';

class CategoryEditContainerV2 extends Component {
  // getButtonByAction(props) {
  //   const { action, node } = props;
  //
  //   if (!node || !node.iid) {
  //     return <Loading />;
  //   }
  //
  //   switch (action) {
  //     case 'roles': {
  //       return <ButtonNewRoles node={node} />;
  //     }
  //     case 'staff': {
  //       return (
  //         <ButtonNewStaff searchFormId={getSearchFormId(node)} node={node} />
  //       );
  //     }
  //     case 'children': {
  //       return <ButtonNewChildren node={node} />;
  //     }
  //     default:
  //       return <div />;
  //   }
  // }

  render() {
    const { action, node, children, buttons, isHashbang } = this.props;

    const schema = menuItems(node);

    // const subMenuLeft = {
    //   schema,
    //   messages: [],
    //   // switchControls, messages, extraInfo
    // };

    /*
    if (isHashbang)
      return (
        <div>
          <DialogMainstage
            subMenuLeft={subMenuLeft}
            isHashbang={isHashbang}
          >
            {children}
          </DialogMainstage>
          <hr/>
          <CategoryList />
        </div>
      );
    */
    return (
      <div>
        <SubLeftMenuContext
          node={node}
          schema={schema}
          isHashbang={isHashbang}
        />
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={action}
          button={buttons}
          isHashbang={isHashbang}
        />
        <div style={{ minHeight: '300px' }}>{children}</div>
        {/*
          <hr />
          <b>{t1('other_academic_categories')}</b>
          <CategoryList noAutoFocus />

           */}
      </div>
    );
  }
}

export default CategoryEditContainerV2;
