import React, { Component } from 'react';
// import { t1 } from 'translate/index';
import 'schema-form/layouts/flex.scss';
import { isSearchingWithinGroup } from './utils';

class K12FiltersFormSingleUser extends Component {
  render() {
    const { groups, availableFilters, formid } = this.props;
    // const values = this.props.values || {};
    // const {availableFilters} = values; // from store

    return (
      <div>
        {availableFilters && availableFilters.length && (
          <div className="flex-container">
            <div className="flex-item">{groups.filters.fieldNames.text}</div>
            {!isSearchingWithinGroup(formid) ? (
              <div className="flex-item">
                {groups.filters.fieldNames.school__grade}
              </div>
            ) : null}
            {!isSearchingWithinGroup(formid) ? (
              <div className="flex-item">
                {groups.filters.fieldNames.school__group}
              </div>
            ) : null}
            {/*
              <div className="flex-item">{groups.filters.fieldNames.textOp}</div>
                 */}
          </div>
        )}

        <div className="flex-container">
          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('codes') && (
              <div className="flex-item">
                {' '}
                {groups.filters.fieldNames.codes}{' '}
              </div>
            )}
          {/*
            availableFilters && availableFilters.length && availableFilters.includes('code') &&
            <div className="flex-item"> {groups.filters.fieldNames.code} </div>
            */}
          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('lname') && (
              <div className="flex-item">
                {' '}
                {groups.filters.fieldNames.lname}{' '}
              </div>
            )}
          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('mail') && (
              <div className="flex-item">
                {' '}
                {groups.filters.fieldNames.mail}{' '}
              </div>
            )}
          {availableFilters &&
            availableFilters.length &&
            availableFilters.includes('iid') && (
              <div className="flex-item"> {groups.filters.fieldNames.iid} </div>
            )}
        </div>
      </div>
    );
  }
}

export default K12FiltersFormSingleUser;
