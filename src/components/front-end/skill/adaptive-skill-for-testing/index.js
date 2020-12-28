import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LayoutHelper from 'layouts/LayoutHelper';
import { t1, t3 } from 'translate';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import Overview from 'components/front-end/homepage/etec/overview';
import { Element } from 'schema-form/elements';
import { constants, layouts, loadingStatuses } from 'configs/constants';
import Loading from 'components/common/loading';
import { reduxForm } from 'redux-form';
import { getThemeConfig } from 'utils/selectors';
import Skill from '../common/item';
import './stylesheet.scss';

class Index extends Component {
  style = { marginBottom: '20px' };
  overviewStyle = { padding: '50px' };

  constructor(props) {
    super(props);
    this.state = {
      isPassedVisible: null,
    };
  }

  componentDidMount() {
    const { rootUrl } = this.props;
    if (rootUrl !== 'admin') {
      LayoutHelper.setLayout(this);
    }
    this.onFetchSkills();
  }

  onFetchSkills = () => {
    const { dispatch, skillIid } = this.props;

    const params = {
      get_adaptive_info: 1,
      iid: skillIid,
      children_level: 10,
    };

    const url = apiUrls.get_adaptive_skills;
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: `adaptive-${skillIid}` },
        params,
      ),
    );
  };

  isPassedTypeOnChanged = (event, value) => {
    this.setState({
      isPassedVisible: value,
    });
  };

  render() {
    const { skill, skillIid, loadingStatus, themeConfig } = this.props;

    const containerClass =
      themeConfig.layout !== layouts.LOTUS ? 'container' : '';

    return (
      <div className={containerClass} style={this.style}>
        {themeConfig.layout !== layouts.LOTUS ? (
          <Overview
            style={this.overviewStyle}
            title={t3('skills')}
            content={t1('show_statistics_all_progresses_for_each_your_skills')}
          />
        ) : (
          <div className="col-md-12">
            <h3 className="uppercase">{t1('my_skills')}</h3>
          </div>
        )}
        {skillIid && (
          <form>
            <div
              className={`row ${
                themeConfig.layout !== layouts.LOTUS ? 'text-center' : ''
              }`}
            >
              <div className="col-md-12">
                <div className="skill-filter-wrapper">
                  <Element
                    schema={{
                      name: 'is_passed',
                      type: 'multiCheckbox',
                      inline: true,
                      floatingLabelText: '',
                      options: constants.isPassedType(),
                      defaultValue: [0, 1],
                      onChange: this.isPassedTypeOnChanged,
                      labelStyle: { width: 'auto' },
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
        {skillIid === null && (
          <div className="text-center">
            {t1(
              'could_you_please_config_skill_iid_which_you_want_to_show_on_adaptive_learning_page',
            )}
          </div>
        )}
        {loadingStatus && loadingStatus === loadingStatuses.LOADING && (
          <Loading blackLoadingIcon />
        )}
        {(!loadingStatus || loadingStatus === loadingStatuses.FINISHED) && (
          <Skill skill={skill} isPassedVisible={this.state.isPassedVisible} />
        )}
      </div>
    );
  }
}

Index.propTypes = {
  skill: PropTypes.instanceOf(Object),
  skillIid: PropTypes.number,
};

Index.defaultProps = {
  skill: {},
  skillIid: null,
};

const mapStateToProps = (state) => {
  const skillIid =
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.default_adaptive_learning_skill_iid;
  const skill =
    state.dataApiResults && state.dataApiResults[`adaptive-${skillIid}`];
  return {
    skillIid,
    skill,
    loadingStatus:
      state.loading && state.loading.status ? state.loading.status : null,
    themeConfig: getThemeConfig(state),
  };
};

const AdaptiveLearningForm = reduxForm({
  form: 'adaptive-learning',
})(Index);

export default connect(mapStateToProps)(AdaptiveLearningForm);
