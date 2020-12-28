import React from 'react';
import { t1 } from 'translate';
import AntCheckbox from 'antd/lib/checkbox';

class ProgressForOneSkillLevel extends React.Component {
  render() {
    const { syllabuses, level } = this.props;

    const klass = 'col-xs-2 text-center p-b-10 m-b-10';

    return (
      <div>
        <div className={'container-fluid skill-level'}>
          <div className={'row'}>
            <div className={'col-xs-12'}>
              <h2 className="skill-level-name">
                {t1(`credit_syllabuses_progress_for_skill_level_${level}`)}
              </h2>
            </div>
          </div>
        </div>

        {Array.isArray(syllabuses) && syllabuses.length > 0 ? (
          syllabuses.map((syllabus, i) => {
            const isCompleted = Boolean(syllabus.pf);
            const isNotYetStarted = !syllabus.cp;
            const isLearning = !isCompleted && !isNotYetStarted;

            return (
              <div
                key={`${i}-ProgressForOneSkillLevel`}
                className={'container-fluid '}
              >
                <div className="row skill-level-row" style={{ fontSize: 14 }}>
                  <div className="col-xs-6 syllabus-name">{syllabus.name}</div>

                  <div className={klass}>
                    <AntCheckbox
                      checked={isCompleted}
                      readOnly
                      disabled={!isCompleted}
                    />
                    <br />
                    {t1('completed')}
                  </div>
                  <div className={klass}>
                    <AntCheckbox
                      checked={isLearning}
                      readOnly
                      disabled={!isLearning}
                    />
                    <br />
                    {t1('learning')}
                  </div>
                  <div className={klass}>
                    <AntCheckbox
                      checked={isNotYetStarted}
                      readOnly
                      disabled={!isNotYetStarted}
                    />
                    <br />
                    {t1('not_yet_started')}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={'container-fluid p-l-50 skill-level-row'}>
            <div className={'row'}>
              <div
                className={'col-xs-12 m-b-10'}
                style={{ color: 'rgba(0,0,0,.6)' }}
              >
                <em>
                  {t1('there_are_no_syllabuses_setup_for_this_skill_level_yet')}
                </em>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProgressForOneSkillLevel;
