import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import rolesConfig from 'layouts/admin_v2/menu-left/menu-schema/roles';
import itConfig from 'layouts/admin_v2/menu-left/menu-schema/it';
import academicConfig from 'layouts/admin_v2/menu-left/menu-schema/academic';
import messageConfig from 'layouts/admin_v2/menu-left/menu-schema/school-message';
import miscConfig from 'layouts/admin_v2/menu-left/menu-schema/misc';
import siteWideConfig from 'layouts/admin_v2/menu-left/menu-schema/site-wide';
import hrmsConfig from 'layouts/admin_v2/menu-left/menu-schema/organizational';
import hrmsDataConfig from 'layouts/admin_v2/menu-left/menu-schema/hrms-data';
import importConfig from './import';
import { splitIntoChunks } from 'common/utils/Array';
import lodashGet from 'lodash.get';
import { Link } from 'react-router-dom';
import SettingsWidget from './Widget';
import { confCategories, social, sys } from '../conf/menu-v2/school';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

const Section = ({ title, textTitle, widgets, titleWhite }) => {
  return (
    <React.Fragment>
      {title ? (
        title
      ) : textTitle ? (
        <h1 className={titleWhite ? 'text-white' : ''}>{textTitle}</h1>
      ) : null}
      {splitIntoChunks(widgets, 4).map((row) => (
        <React.Fragment>
          <div className="row">
            {row.map((w) => (
              <div className="col-md-3">
                <SettingsWidget
                  key={w.id}
                  linkItems={w.linkItems}
                  configItems={w.configItems}
                  title={w.title}
                />
              </div>
            ))}
          </div>
          <div className="clearfix m-t-20" />
          {/*<hr />*/}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const filterBlocksToShow = (
  widgetsToFilter,
  blockToShows,
  widgetChildrenKeys,
  filterWidgetChildren,
) =>
  (widgetsToFilter || []).reduce((widgetsToShow, widget) => {
    // if blockToShows is not defined or
    // blockToShows includes widget id, we show all widgets
    if (
      !Array.isArray(blockToShows) ||
      blockToShows.includes(lodashGet(widget, 'id'))
    ) {
      return [...widgetsToShow, widget];
    }

    let filteredWidget = widget;
    let doesFilteredWidgetHaveSomeChildren = false;

    widgetChildrenKeys.forEach((key) => {
      let filteredWidgetsChildren;

      if (typeof filterWidgetChildren === 'function') {
        filteredWidgetsChildren = filterWidgetChildren(
          lodashGet(filteredWidget, key),
          key,
        );
      } else {
        filteredWidgetsChildren = (lodashGet(filteredWidget, key) || []).filter(
          (child) => blockToShows.includes(lodashGet(child, 'id')),
        );
      }

      if (
        Array.isArray(filteredWidgetsChildren) &&
        filteredWidgetsChildren.length > 0
      ) {
        doesFilteredWidgetHaveSomeChildren = true;
        filteredWidget = {
          ...filteredWidget,
          [key]: filteredWidgetsChildren,
        };
      }
    });

    if (doesFilteredWidgetHaveSomeChildren) {
      return [...widgetsToShow, filteredWidget];
    }

    return widgetsToShow;
  }, []);

const filterSectionsToShow = (sectionsToFilter, blockToShows) => {
  const filterSectionWidgets = (sectionWidgetsToFilter, blockToShows) =>
    filterBlocksToShow(sectionWidgetsToFilter, blockToShows, [
      'linkItems',
      'configItems',
    ]);

  return filterBlocksToShow(
    sectionsToFilter,
    blockToShows,
    ['widgets'],
    (widgets) => filterSectionWidgets(widgets, blockToShows),
  );
};

class Widgets extends React.Component {
  render() {
    const { blockToShows, isFeatureEnabled } = this.props;
    const sections = [
      {
        id: 'less_frequently_used_settings',
        textTitle: t1('less_frequently_used_settings'),
        widgets: [
          {
            id: 'academic',
            linkItems: academicConfig().subMenu,
            title: academicConfig().title,
          },
          {
            id: 'message',
            linkItems: messageConfig().subMenu,
            title: messageConfig().title,
          },
          {
            id: 'import',
            linkItems: importConfig().subMenu,
            title: importConfig().title,
          },
          {
            id: 'misc',
            linkItems: miscConfig().subMenu,
            title: miscConfig().title,
          },
          {
            id: 'site',
            linkItems: siteWideConfig().subMenu,
            title: siteWideConfig().title,
          },
        ],
      },
      {
        id: 'system_&_integration',
        textTitle: t1('system_&_integration'),
        widgets: [
          {
            id: 'organization',
            linkItems: hrmsConfig().subMenu,
            title: hrmsConfig().title,
          },
          {
            id: 'social',
            configItems: social.subMenu,
            title: social.title,
          },
          {
            id: 'roles',
            linkItems: rolesConfig().subMenu,
            title: t1('roles'),
          },
          {
            id: 'it',
            linkItems: itConfig().subMenu,
            title: t1('system_settings'),
          },
          {
            id: 'system_settings',
            configItems: sys.subMenu,
            title: t1('system_settings'),
          },
          {
            id: 'hrms_data',
            linkItems: hrmsDataConfig().subMenu,
            title: t1('hrms_data'),
          },
        ],
      },
      {
        id: 'school_advanced_settings',
        title: (
          <h1
            className={
              isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'text-white' : ''
            }
          >
            {t1('school_advanced_settings')}.{' '}
            <Link to={'/admin/conf/dashboard'}>
              <Icon icon="edit" style={{ color: '#f5a623' }} />
            </Link>
          </h1>
        ),
        widgets: confCategories.map((category) => ({
          id: category.id,
          configItems: category.subMenu,
          title: category.title,
        })),
      },
    ];
    const sectionsToShow = filterSectionsToShow(sections, blockToShows);
    return (
      <div>
        {sectionsToShow.map((s) => (
          <Section
            textTitle={s.textTitle}
            title={s.title}
            widgets={s.widgets}
            titleWhite={isFeatureEnabled(features.NEW_UI_JULY_2019)}
          />
        ))}
      </div>
    );
  }
}

export default withFeatureFlags()(Widgets);
