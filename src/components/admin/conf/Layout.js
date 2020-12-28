/**
 * Created by anhvtt on 09/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';

import UpdateSchool from 'components/admin/school/school/edit/Update';
import EditCategory from 'components/admin/school/school/edit/EditCategory';
import TranslateLayout from 'components/admin/translate/search/Layout';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import SearchLayout from './search/Layout';
import { menuItems } from './menu-v2/sub-left-menu-configs';
import requireRoot from 'common/hoc/requireRoot';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

const mapTypeToSlug = {
  'exam-paths': { slug: 'exam_paths', applicableNtypes: ['path'] },
  'open-paths': { slug: 'open_paths', applicableNtypes: ['path'] },
  default: {
    slug: 'list_featured_courses_or_path',
    applicableNtypes: ['path'],
  },
};

const getConfCategoryBySlug = (type) => {
  let result = mapTypeToSlug[type];
  result = result || mapTypeToSlug.default;
  return result;
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: 'admin',
      menu: '',
      step: null,
      sections: [],
    };
  }

  componentWillMount() {
    this.getSectionsConfigByMenu(this.getConfig(this.props));
  }

  componentWillReceiveProps(nextProps) {
    const conf = this.getConfig(nextProps);
    if (
      conf.menu !== this.state.menu ||
      (conf.menu === this.state.menu && conf.type !== this.state.type)
    ) {
      this.getSectionsConfigByMenu(conf);
    }
  }

  getSectionsConfigByMenu({ menu, type, domain }) {
    const items = menuItems({ domain });
    let menuConfig = {};
    items.forEach((item) => {
      if (item && item.subMenu) {
        item.subMenu.forEach((child) => {
          menuConfig = child.id === menu ? child : menuConfig;
        });
      } else {
        menuConfig = item.id === menu ? item : menuConfig;
      }
    });
    const sections = menu !== 'school' ? menuConfig.sections || [] : [];

    this.setState({
      menu,
      type,
      domain,
      sections,
    });
  }

  getConfig = (props) => {
    const match = props.match || {};
    const params = match.params || {};
    const menu = params.menu || 'school';
    const type = params.type || null;
    const domain = params.domain || 'admin';

    return { menu, type, domain };
  };

  isEditingSchoolInfo = () => {
    const schoolInfoMenus = [
      'info',
      'domain-seo',
      'theme',
      'homepage-slider',
      'translate',
      'course_deadline_reminder_settings',
    ];
    return schoolInfoMenus.includes(this.state.type);
  };

  getEditSchoolInfo = () => {
    return (
      <div>
        {this.state.type === 'info' && (
          <UpdateSchool step="info" formid="edit_school_info" />
        )}
        {this.state.type === 'domain-seo' && (
          <UpdateSchool step="domain-seo" formid="edit_school_domain-seo" />
        )}
        {this.state.type === 'theme' && (
          <UpdateSchool step="theme" formid="edit_school_theme" />
        )}
        {this.state.type === 'homepage-slider' && (
          <UpdateSchool
            step="homepage-slider"
            formid="edit_school_homepage-slider"
          />
        )}
        {this.state.type === 'translate' && <TranslateLayout />}
        {this.state.type === 'course_deadline_reminder_settings' && (
          <UpdateSchool
            step="course_deadline_reminder_settings"
            formid="edit_course_deadline_reminder_settings"
          />
        )}
        {this.state.type && !this.isEditingSchoolInfo() && (
          <EditCategory {...getConfCategoryBySlug(this.state.type)} />
        )}
      </div>
    );
  };

  getBodyContent = () => {
    if (this.state.menu === 'school') {
      return this.getEditSchoolInfo();
    }

    return (
      <SearchLayout sections={this.state.sections} menu={this.state.menu} />
    );
  };

  render() {
    const { domain } = this.getConfig(this.props);
    const { menuAvailable } = this.props;

    return (
      <div>
        <SubTopMenuContext isHidden />
        <SubLeftMenuContext
          schema={menuItems({ domain, menuAvailable, metadata: true })}
        />
        {this.getBodyContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  menuAvailable: get(state, 'domainInfo.school.config_menu_nav'),
});

export default connect(mapStateToProps)(requireRoot(Layout));
