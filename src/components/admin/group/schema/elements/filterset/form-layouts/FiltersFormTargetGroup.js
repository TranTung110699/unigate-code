import React, { Component } from 'react';
import 'schema-form/layouts/flex.scss';
// import Major from 'components/admin/user/schema/majors/Major';
//
// const majorDisplayFields = [
//   'major',
//   'training_mode',
//   'training_level',
//   'ico'
// ];

class FiltersFormTargetGroup extends Component {
  render() {
    const { groups, formid, availableFilters } = this.props;

    return (
      <div>
        <div>
          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('major_box') && (
              <div style={{ clearfix: 'both' }}>
                {groups.filters.fieldNames.major_box}
                {/*
          <Major
            forSearch
            displayFields={majorDisplayFields}
          />
             */}
              </div>
            )}
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('user_organizations') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.user_organizations}{' '}
                </div>
              )}
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('positions') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.positions}{' '}
                </div>
              )}
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('equivalent_positions') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.equivalent_positions}{' '}
                </div>
              )}
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('evn_equivalent_positions') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.evn_equivalent_positions}{' '}
                </div>
              )}
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('sex') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.sex}{' '}
                </div>
              )}
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('age') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.age}{' '}
                </div>
              )}
          </div>

          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('experience') && (
              <div className="flex-item">
                {' '}
                {groups.filters.fieldNames.experience}{' '}
              </div>
            )}

          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('skill') &&
            groups.filters.fieldNames.skill}

          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('contract_box') &&
            groups.filters.fieldNames.contract_box}

          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('credit_syllabuses') && (
                <div className="flex-item">
                  {' '}
                  {groups.filters.fieldNames.credit_syllabuses}{' '}
                </div>
              )}
          </div>

          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('statuses') && (
              <div className="col-md-12 flex-container">
                {groups.filters.fieldNames.statuses}
              </div>
            )}

          <div className="col-md-12 flex-container">
            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('total_credit_box') &&
                groups.filters.fieldNames.total_credit_box}
            </div>

            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('average_score_box') &&
                groups.filters.fieldNames.average_score_box}
            </div>
          </div>

          <div className="col-md-12 flex-container">
            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('sign_number') &&
                groups.filters.fieldNames.sign_number}
            </div>

            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('decision_number') &&
                groups.filters.fieldNames.decision_number}
            </div>

            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('date_of_issue') &&
                groups.filters.fieldNames.date_of_issue}
            </div>

            <div className="flex-item">
              {availableFilters &&
                availableFilters.length &&
                availableFilters.includes('delivery_date') &&
                groups.filters.fieldNames.delivery_date}
            </div>
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('graduating_senior_status') &&
              groups.filters.fieldNames.graduating_senior_status}
          </div>
          <div className="col-md-12 flex-container">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('get_member_belonged_others_group') &&
              groups.filters.fieldNames.get_member_belonged_others_group}
          </div>
          <div className="row">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('subject') &&
              groups.filters.fieldNames.subject}
          </div>
          <div className="row">
            {availableFilters &&
              availableFilters.length &&
              availableFilters.includes('external') &&
              groups.filters.fieldNames.external}
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersFormTargetGroup;
