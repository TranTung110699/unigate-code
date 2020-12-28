import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import ButtonNew from 'components/common/primary-button';

class GroupMemberSearchFormFilters extends React.Component {
  render() {
    const { isFeatureEnabled } = this.props;
    return (
      <div>
        {isFeatureEnabled(features.NEW_UI_JULY_2019) ? (
          <div className="border-round white-background p-15">
            <Element
              schema={{
                name: 'text',
                type: 'text',
                floatingLabelText: t1('search_staff'),
                label: t1('search_staff'),
                hintText: t1('please_enter_search_text'),
                floatingLabelFixed: false,
              }}
            />
            <div className="text-center">
              <ButtonNew
                name="submit"
                type="submit"
                id="submit"
                label={t1('search')}
                className="admin-btn m-b-10"
              />
            </div>
          </div>
        ) : (
          <div className="col-md-9">
            <Element
              schema={{
                name: 'text',
                type: 'text',
                floatingLabelText: t1('search_staff'),
                label: t1('search_staff'),
                hintText: t1('please_enter_search_text'),
                floatingLabelFixed: false,
              }}
            />
            <div className="col-md-12 m-t-25">
              <RaisedButton
                name="submit"
                type="submit"
                id="submit"
                label={t1('search')}
                className="admin-btn"
                primary
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

GroupMemberSearchFormFilters.propTypes = {
  className: PropTypes.string,
};

GroupMemberSearchFormFilters.defaultProps = {
  className: '',
};

export default withFeatureFlags()(GroupMemberSearchFormFilters);
