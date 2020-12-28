import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import StudentInfo from './StudentInfo';
import ProgressForOneSkillLevel from './ProgressForOneSkillLevel';
import './style.scss';

class Skill extends React.Component {
  render() {
    const { positionsOfUserWithSkills, userInfo, schoolInfo } = this.props;

    let pos;
    if (!positionsOfUserWithSkills) {
      pos = null;
    } else {
      const { level1, level2, level3 } = positionsOfUserWithSkills;
      pos = (
        <React.Fragment>
          <ProgressForOneSkillLevel syllabuses={level1} level={1} />
          <ProgressForOneSkillLevel syllabuses={level2} level={2} />
          <ProgressForOneSkillLevel syllabuses={level3} level={3} />
        </React.Fragment>
      );
    }
    return (
      <div
        className="whitebox border-round skills-progress"
        style={{ color: '#000' }}
        id="skills-progress-container"
      >
        <table className="w-100">
          <thead>
            <tr>
              <td>
                <img
                  src={getLodash(schoolInfo, 'theme.logo')}
                  alt
                  height="80"
                  className="header-img"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <h1 className="text-center">
                    {t1('student_personal_progress_report')}
                  </h1>
                  <StudentInfo userInfo={userInfo} />
                  {pos}

                  <div className="m-t-40 signature">
                    <div
                      style={{ justifyContent: 'flex-end', display: 'flex' }}
                    >
                      <div
                        className="text-center"
                        style={{ height: 170, fontSize: 14, width: '30%' }}
                      >
                        <div>
                          <strong>{t1('manager_comfirmation')}</strong>
                        </div>
                        <div>{t1('(signature,_name_and_stamp)')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Skill;
