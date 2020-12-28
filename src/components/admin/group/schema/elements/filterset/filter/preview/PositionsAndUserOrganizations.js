import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import { extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue } from 'common/utils/Array';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';

export const positionsSchemaFormKeyState = (formid) =>
  `${formid}_positions_iids`;

export const userOrganizationsSchemaFormKeyState = (formid) =>
  `${formid}_user_organization_iids`;

const OneItem = (pos, allPositions) => {
  return (
    <span>
      {extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue(
        allPositions,
        pos,
        'iid',
        'name',
      )}{' '}
      (code:{' '}
      {extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue(
        allPositions,
        pos,
        'iid',
        'code',
      )}
      , #{pos})
    </span>
  );
};

const flatoutSchemaFormKeyState = (formid, fieldName) => {
  if (fieldName === 'positions')
    return `${positionsSchemaFormKeyState(formid)}_preview`;
  else if (fieldName === 'user_organizations')
    return `${userOrganizationsSchemaFormKeyState(formid)}_preview`;
};

class PositionsAndUserOrganizations extends React.Component {
  render() {
    const { iids, allItems, fieldName } = this.props;

    if (!iids || !iids.length) return null;

    return (
      <div>
        <b>
          {fieldName === 'positions' && t1('positions')}
          {fieldName === 'user_organizations' && t1('user_organizations')}
          {iids.length > 1 && `(${t1('matching_any')})`}{' '}
        </b>
        {iids.length === 1 ? (
          OneItem(iids[0], allItems)
        ) : (
          <ul>
            {iids.map((iid) => (
              <li key={iid}>{OneItem(iid, allItems)}</li>
            ))}
          </ul>
        )}
        {fieldName === 'user_organizations' &&
          (this.props.include_sub_organizations ? (
            <b>{t1('include_sub_organizations')}</b>
          ) : null)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let iids;
  if (props.fieldName === 'positions') iids = props.positions;

  if (props.fieldName === 'user_organizations') iids = props.user_organizations;

  return { iids };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    // all items (positions/user_organizations) that have been fetched from server and stored in state.dataApiResults
    // which is used by SelectTree component to display.
    // We need to forward those values to react renderer so it can display the names, not only iids
    params: {
      iids: props.iids,
    },
    keyState: flatoutSchemaFormKeyState(props.formid, props.fieldName),
    propKey: 'allItems',
    baseUrl: apiUrls.get_categories_info,
  }))(PositionsAndUserOrganizations),
);
