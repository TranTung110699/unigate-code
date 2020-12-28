import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import lGet from 'lodash.get';
import { t1, t3 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { enableWorkingMode as enableWorkingModeFunc } from 'common/conf';
import actions from 'actions/creators';

const styles = {
  dashboard: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
  },
};

class Help extends Component {
  componentDidMount() {
    const { themeConfig } = this.props;
    const siteTitle = `${t1('help')} ${
      themeConfig && themeConfig.website_title
        ? ': ' + themeConfig.website_title
        : ''
    }`;
    this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
  }

  render() {
    const { themeConfig, workingMode, enableWorkingMode } = this.props;

    const layout = lGet(themeConfig, 'layout', '');
    const isSeabank = layout && ['sb'].includes(layout);

    return (
      <div className="dashboard" style={styles.dashboard}>
        {/*

        <SubTopMenuContext schema={[]} />
           */}
        {enableWorkingMode && (
          <div>
            {t1('you_are_working_as_following_role')}:{' '}
            <strong>
              {workingMode ? t3(workingMode) : t3('all_the_roles')}
            </strong>
          </div>
        )}

        {isSeabank ? (
          <div>
            <h1>
              <a
                target="_blank"
                href="https://elearning.seabank.com.vn/p-learn/73833-73833/huong-dan-su-dung-phan-mem-lotuslms-danh-cho-quan-tri-vien.html"
              >
                Hướng dẫn sử dụng cho quản trị viên{' '}
              </a>
            </h1>
            <h1>
              <a
                target="_blank"
                href="https://elearning.seabank.com.vn/p-learn/73868-73868/huong-dan-su-dung-phan-mem-lotuslms-danh-cho-nguoi-hoc.html"
              >
                Hướng dẫn sử dụng cho học viên{' '}
              </a>
            </h1>
          </div>
        ) : (
          <h1>{t1('your_smart_assistant_is_coming_soon')}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (state) => lGet(state, 'user.info.working_mode'),
  (state) => enableWorkingModeFunc(state.domainInfo),
  (themeConfig, workingMode, enableWorkingMode) => ({
    themeConfig,
    workingMode,
    enableWorkingMode,
  }),
);

export default connect(mapStateToProps)(Help);
