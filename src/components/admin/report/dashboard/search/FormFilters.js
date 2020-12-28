/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { createSelector } from 'reselect';

import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import {
  feeStatusFilterOptions,
  feeStatusFilters,
  schoolTypes,
} from 'configs/constants';

const USER_TARGET = 'user';
const GROUP_TARGET = 'group';

class FormFilters extends Component {
  render() {
    const { node, target, groups, themeConfig } = this.props;

    return (
      <div>
        <div className="row">
          <div
            className={
              target === USER_TARGET && (!groups || !groups.length)
                ? 'col-md-6'
                : 'col-md-8'
            }
          >
            <Element
              schema={{
                type: 'text',
                name: 'q',
                floatingLabelText: t1('search_by_name_or_iid'),
                floatingLabelFixed: false,
                fullWidth: true,
                hintText: t1('please_type_search_text'),
              }}
            />
          </div>
          {target === USER_TARGET &&
            (!groups || !groups.length) &&
            themeConfig.type === schoolTypes.SIS && (
              <div className="col-md-4">
                <Element
                  schema={{
                    name: 'financial_status',
                    type: 'radio',
                    inline: true,
                    floatingLabelText: t1('financial_status'),
                    hintText: t1('financial_status'),
                    label: t1('financial_status'),
                    options: feeStatusFilterOptions([
                      feeStatusFilters.FEE_CANCELLATION,
                    ]),
                  }}
                />
              </div>
            )}
          <div
            className={`${
              target === USER_TARGET && (!groups || !groups.length)
                ? 'col-md-2'
                : 'col-md-4'
            } m-t-25 text-center`}
          >
            <RaisedButton
              name="submit"
              type="submit"
              id="submit"
              label={t1('search')}
              primary
            />
          </div>
        </div>
        {themeConfig && themeConfig.type !== schoolTypes.SIS && (
          <div>
            <div className="row">
              <div className="col-md-3">
                <Element
                  schema={{
                    name: 'min_score',
                    type: 'number',
                    floatingLabelText: t1('score_from'),
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
              <div className="col-md-3">
                <Element
                  schema={{
                    name: 'max_score',
                    type: 'number',
                    floatingLabelText: t1('score_to'),
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Element
                  schema={{
                    name: 'max_progress',
                    type: 'number',
                    floatingLabelText: `${t1('progress')} ≤`,
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getThemeConfig,
  (themeConfig) => ({
    themeConfig,
  }),
);

export default connect(mapStateToProps)(FormFilters);
