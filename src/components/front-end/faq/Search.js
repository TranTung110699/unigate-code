import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import { createSelector } from 'reselect';
import { getOrgTypes } from 'configs/constants';
import { confSelector } from 'common/selectors';
import { getOrganizationSubTypesToDisplayInTemisProfileFormGivenConf } from 'common/conf';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Card from 'antd/lib/card';
import Alert from 'antd/lib/alert';
import Descriptions from 'antd/lib/descriptions';

const Result = (props) => {
  const { items } = props;
  const { name, phone, mail, address } = items;
  return (
    <Descriptions
      title={t1('you_can_contact_to_%s_by', [name])}
      bordered
      column={1}
    >
      {phone && (
        <Descriptions.Item label={t1('phone')}>
          <a href={`tel:${phone}`}>{phone}</a>
        </Descriptions.Item>
      )}
      {mail && (
        <Descriptions.Item label={t1('email')}>
          <a href={`mailto:${mail}`}>{mail}</a>
        </Descriptions.Item>
      )}
      {address && (
        <Descriptions.Item label={t1('address')}>{address}</Descriptions.Item>
      )}
    </Descriptions>
  );
};

class SearchSupportByORG extends React.Component {
  renderResultComponent = (items) => {
    if (items) return <Result items={items} />;

    return null;
  };

  render() {
    return (
      <Card className={this.props.className}>
        <Alert
          message={t1(
            'if_you_need_help_for_account,_course_or_technical,_choose_you_organization_for_seek_support_contact',
          )}
          type="info"
          showIcon
          description={t1(
            'if_you_not_see_you_organization_in_list,_choose_your_parent_organization_to_get_this_organiztion_contact',
          )}
          className="m-b-10"
        />
        <SearchWrapper
          schema={schema}
          formid="search_faq_support"
          alternativeApi="/organization/api/get-organization-support-by-user-organization"
          // hiddenFields={{}}
          renderResultsComponent={this.renderResultComponent}
          allOrgTypes={this.props.orgTypes}
          submitButton={<button className="btn-primary">{t1('search')}</button>}
          showResult
        />
      </Card>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => getOrgTypes(state, '*'),
  confSelector,
  (allOrgTypes, conf) => {
    const organizationSubTypesToDisplayInTemisProfileForm = getOrganizationSubTypesToDisplayInTemisProfileFormGivenConf(
      conf,
    );

    const orgTypes = (allOrgTypes || []).filter((ot) => {
      return organizationSubTypesToDisplayInTemisProfileForm.find(
        (subType) => subType == lodashGet(ot, 'value'),
      );
    });

    return {
      orgTypes,
    };
  },
);

export default connect(mapStateToProps)(SearchSupportByORG);
