/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class DetailFormsOfTraining extends React.PureComponent {
  render() {
    const {
      informationDetails,
      renderElementEitFormOfTraining,
      renderElementEitSpecialization,
    } = this.props;

    const trainingMode = get(this.props, 'formOfTraining.training_mode');
    const trainingLevel = get(this.props, 'formOfTraining.training_level');

    return (
      <div>
        {Array.isArray(informationDetails) &&
          informationDetails.length > 0 &&
          (informationDetails.length === 1 &&
          !informationDetails[0].specialization ? (
            <div className="text-center">
              {`${t1('degree')}: ${get(informationDetails[0], 'degree.name')}`}
              {renderElementEitFormOfTraining(
                'edit_degree',
                {
                  training_mode: trainingMode,
                  training_level: trainingLevel,
                },
                {
                  degree: get(informationDetails[0], 'degree.iid'),
                },
                {
                  title: t1('edit_degree_form_of_training'),
                },
              )}
            </div>
          ) : (
            <div>
              <h3>{t1('list_specialization')}</h3>
              <Table>
                <TableHeader
                  displaySelectAll={false}
                  enableSelectAll={false}
                  adjustForCheckbox={false}
                >
                  <TableRow>
                    <TableHeaderColumn title={t1('stt')}>STT</TableHeaderColumn>
                    <TableHeaderColumn title={t1('specialization')}>
                      {t1('specialization')}
                    </TableHeaderColumn>
                    <TableHeaderColumn title={t1('degree')}>
                      {t1('degree')}
                    </TableHeaderColumn>
                    <TableHeaderColumn title={t1('action')}>
                      {t1('action')}
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  showRowHover={false}
                  stripedRows={false}
                >
                  {informationDetails.map((row, index) => (
                    <TableRow key={row.index}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>
                        {row.specialization && (
                          <p>
                            {get(row, 'specialization.name')}
                            <br />
                            <span className="text-muted">
                              ({row.specialization.code})
                            </span>
                            {renderElementEitSpecialization(row.specialization)}
                          </p>
                        )}
                      </TableRowColumn>
                      <TableRowColumn>
                        {row.degree && get(row, 'degree.name')}
                        {row.degree &&
                          renderElementEitFormOfTraining(
                            'edit_degree',
                            {
                              training_mode: trainingMode,
                              training_level: trainingLevel,
                              specialization: row.specialization.iid,
                            },
                            {
                              degree: get(informationDetails[0], 'degree.iid'),
                            },
                            {
                              title: t1('edit_degree_form_of_training'),
                            },
                          )}
                      </TableRowColumn>
                      <TableRowColumn>
                        {!row.degree && (
                          <span className="m-l-5 m-r-5">
                            {renderElementEitFormOfTraining(
                              'add_degree',
                              {
                                training_mode: trainingMode,
                                training_level: trainingLevel,
                                specialization: row.specialization.iid,
                              },
                              {},
                              {
                                title: t1('add_degree_form_of_training'),
                              },
                            )}
                          </span>
                        )}
                        <span className="m-l-5 m-r-5">
                          {renderElementEitFormOfTraining('remove', {
                            training_mode: trainingMode,
                            training_level: trainingLevel,
                            specialization:
                              row.specialization && row.specialization.iid,
                          })}
                        </span>
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        <div style={{ display: 'flex' }}>
          {(!Array.isArray(informationDetails) ||
            !informationDetails.length) && (
            <div className="m-t-20 m-l-5 m-r-5">
              {renderElementEitFormOfTraining(
                'add_degree',
                {
                  training_mode: trainingMode,
                  training_level: trainingLevel,
                },
                {},
                {
                  title: t1('add_degree_form_of_training'),
                },
              )}
            </div>
          )}
          {
            <div className="m-t-20 m-l-5 m-r-5">
              {renderElementEitFormOfTraining('add_specialization', {
                training_mode: trainingMode,
                training_level: trainingLevel,
              })}
            </div>
          }
        </div>
      </div>
    );
  }
}

const getDetailInformationFormsOfTraing = (props) => ({
  baseUrl: apiUrls.get_detail_information_forms_of_traing,
  fetchCondition: (() => {
    const degrees = get(props, 'formOfTraining.degrees') || [];

    const degreeIids =
      degrees.length > 0
        ? degrees.map((map) => map && map.degree).filter(Boolean)
        : [];
    const specializationIids =
      degrees.length > 0
        ? degrees.map((map) => map && map.specialization).filter(Boolean)
        : [];

    if (degreeIids.length || specializationIids.length) {
      return true;
    }

    return false;
  })(),
  refetchCondition: (prevProps) => {
    if (props.updateInfo !== prevProps.updateInfo) {
      return true;
    }

    const degrees = get(props, 'formOfTraining.degrees') || [];
    const major = get(props, 'major.iid');
    const degreeIids =
      degrees.length > 0
        ? degrees.map((map) => map && map.degree).filter(Boolean)
        : [];
    const specializationIids =
      degrees.length > 0
        ? degrees.map((map) => map && map.specialization).filter(Boolean)
        : [];

    const prevDegrees = get(prevProps, 'formOfTraining.degrees') || [];
    const prevMajor = get(prevProps, 'major.iid');
    const prevDegreeIids =
      prevDegrees.length > 0
        ? prevDegrees.map((map) => map && map.degree).filter(Boolean)
        : [];
    const prevSpecializationIids =
      prevDegrees.length > 0
        ? prevDegrees.map((map) => map && map.specialization).filter(Boolean)
        : [];

    if (
      !isEqual(degreeIids, prevDegreeIids) ||
      !isEqual(specializationIids, prevSpecializationIids) ||
      !isEqual(major, prevMajor)
    ) {
      return true;
    }

    return false;
  },
  params: {
    training_mode: get(props, 'formOfTraining.training_mode'),
    training_level: get(props, 'formOfTraining.training_level'),
    major: get(props, 'major.iid'),
  },
  propKey: 'informationDetails',
});

export default fetchData(getDetailInformationFormsOfTraing)(
  DetailFormsOfTraining,
);
