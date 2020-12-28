import React from 'react';
import getLodash from 'lodash.get';

import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import RequestActionByStatusForCreditSyllabus from '../RequestActionByStatusForCreditSyllabus';
import fetchData from 'components/common/fetchData';

import './../../stylesheet.scss';

class CreditSyllabusesOfSkill extends React.Component {
  render() {
    const { programsOfSkill } = this.props;

    const programs = programsOfSkill ? programsOfSkill.programs : null;
    const width = {
      stt: '20px',
      code: '150px',
      mandatory: '50px',
      status: '50px',
      request: '50px',
    };

    return (
      <div>
        {programs &&
          programs.map((program, index) => {
            return (
              <div key={`${program && program.iid} - ${index}`}>
                <h4>{program && program.name}</h4>
                <div className="table-responsive">
                  <table className="table table-border whitebox">
                    <thead>
                      <th width={width.stt}>{t1('stt')}</th>
                      <th width={width.code}>{t1('code')}</th>
                      <th>{t1('credit_syllabus_name')}</th>
                      <th width={width.mandatory}>{t1('mandatory')}</th>
                      <th width={width.status}>{t1('score')}</th>
                      <th width={width.status}>{t1('learn_status')}</th>
                      <th width={width.request}>{t1('request_sent')}</th>
                    </thead>
                    <tbody>
                      {program &&
                        program.program_modules &&
                        program.program_modules.length > 0 &&
                        program.program_modules.map(
                          (programModule, programModuleIndex) => {
                            return [
                              <tr
                                key={`${programModule &&
                                  programModule.iid} - ${programModuleIndex}`}
                              >
                                {programModule &&
                                  programModule.iid !== program.iid &&
                                  programModule.name && (
                                    <td colSpan="7">
                                      <b>{programModule.name}</b>
                                    </td>
                                  )}
                              </tr>,
                              programModule.credit_syllabuses.map(
                                (creditSyllabus, creditSyllabusIndex) => (
                                  <tr
                                    key={`${creditSyllabus &&
                                      creditSyllabus.iid} - ${creditSyllabusIndex}`}
                                  >
                                    <td>{creditSyllabusIndex + 1}</td>
                                    <td>{creditSyllabus.code}</td>
                                    <td>{creditSyllabus.name}</td>
                                    <td>
                                      {creditSyllabus.mandatory
                                        ? t1('compulsory')
                                        : t1('optional')}
                                    </td>
                                    <td>{creditSyllabus.p}</td>
                                    <td>{creditSyllabus.pf_status}</td>
                                    <td className={'text-center'}>
                                      {!creditSyllabus.mandatory && (
                                        <div>
                                          {creditSyllabus.request_status &&
                                            t1(
                                              `request_${
                                                creditSyllabus.request_status
                                              }`,
                                            )}{' '}
                                          <RequestActionByStatusForCreditSyllabus
                                            creditSyllabus={creditSyllabus}
                                            getCreditSyllabusesOfSkill={
                                              this.getProgramsOfSkill
                                            }
                                          />
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                ),
                              ),
                            ];
                          },
                        )}
                    </tbody>
                  </table>
                  {(!programs || programs.length === 0) && (
                    <div className="col-md-12">
                      <p>{t1('there_are_no_programs_yet')}.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: apiUrls.dashboard_configs('programsOfSkill'),
  params: {
    skill_iid: getLodash(props, 'skillIid'),
    user_iid: getLodash(props, 'userInfo.iid'),
  },
  keyState: `programsOfSkill_${getLodash(props, 'skillIid')}_${getLodash(
    props,
    'userInfo.iid',
  )}`,
  propKey: 'programsOfSkill',
  fetchCondition:
    getLodash(props, 'skillIid') || getLodash(props, 'userInfo.iid'),
  refetchCondition: (prevProps) =>
    getLodash(props, 'skillIid') !== getLodash(prevProps, 'skillIid'),
  shouldRenderLoading: true,
}))(CreditSyllabusesOfSkill);
