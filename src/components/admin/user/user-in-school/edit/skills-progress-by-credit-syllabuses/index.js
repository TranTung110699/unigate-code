import React from 'react';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';
import { connect } from 'react-redux';
import Skill from './Skill';
import ReactToPrint from 'react-to-print';
import './style.scss';
import Button from 'antd/lib/button';
const { detect } = require('detect-browser');

const browser = detect();

const fetchSkillsByJobPositions = (props) => ({
  baseUrl:
    '/student/api/student-progress-by-credit-syllabuses-in-job-position-skills-grouped-by-level',
  params: {
    user_iid: getLodash(props, 'userInfo.iid'),
  },
  keyState: `positionsOfUserWithSkills_${getLodash(props, 'userInfo.iid')}`,
  propKey: 'positionsOfUserWithSkills',
  fetchCondition: getLodash(props, 'userInfo.iid'),
  shouldRenderLoading: true,
});

/**
 * Overview http://vlms.local/dev/reports/student-progress/admin-view-student-credit-syllabus-progress.png
 */
class SkillsProgressByCreditSyllabuses extends React.Component {
  render() {
    return (
      <div className="student-info-container">
        <Skill {...this.props} ref={(el) => (this.componentRef = el)} />
        <div className="text-center m-t-20">
          <ReactToPrint
            trigger={() => (
              <Button type="primary" icon="printer" size="large">
                {t1('print')}
              </Button>
            )}
            content={() => this.componentRef}
          />
        </div>
        {((browser && browser.name !== 'chrome') ||
          !browser.os.startsWith('Windows')) && (
          <p className="text-danger text-center">
            {t1(
              'recommend_to_use_latest_version_of_Google_Chrome_on_Windows_to_print',
            )}
            ,<p>{t1('another_browser_will_get_some_errors')}</p>
            {browser.os.startsWith('Windows') && (
              <React.Fragment>
                {', '}
                <a href="//chrome.com" className="text-info" target="_blank">
                  <u>{t1('download_Google_Chrome')}</u>
                </a>
              </React.Fragment>
            )}
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolInfo: getLodash(state, 'domainInfo.school', {}),
});

export default fetchData(fetchSkillsByJobPositions)(
  connect(mapStateToProps)(SkillsProgressByCreditSyllabuses),
);
