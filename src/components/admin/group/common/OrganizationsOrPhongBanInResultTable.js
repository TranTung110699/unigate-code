import React from 'react';
import Link from 'components/common/router/Link';
import routes from 'routes';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Icon from 'antd/lib/icon';
import styled from 'styled-components';
import Popover from 'antd/lib/popover';

const OrgParent = styled.ul`
  list-style: none;
  padding-left: 5px;
`;

/**
 * user info is usually expanded with organization and job positions
 * We'll extract them and display here in this component
 *
 * attr can be either 'organization' or 'positions' which were expanded
 */
class OrganizationsOrPhongBanInResultTable extends React.Component {
  render() {
    // if withLink, show link to the org
    const { item, attr, showParentsInfo, withLink } = this.props;

    const iids = lodashGet(item, attr, []);
    const objects =
      this.props.expandedAttr || lodashGet(item, '__expand.' + attr, []);

    if (objects.length > 0) {
      return (
        <div>
          {iids.map((iid, idx) => {
            const item = objects.find(
              (o) => o && String(o.iid) === String(iid),
            );

            if (!item) {
              return null;
            }

            const text = (
              <div>
                {item.name}

                {showParentsInfo &&
                Array.isArray(item.parents) &&
                item.parents.length > 1 ? (
                  window.isETEP ? (
                    <Popover
                      content={
                        <OrgParent>
                          {item.parents.map((p, index) => (
                            <li className={`item-${index}`}>{p.name}</li>
                          ))}
                        </OrgParent>
                      }
                      overlayClassName="parent-info"
                    >
                      {' '}
                      <Icon type="exclamation-circle" />
                    </Popover>
                  ) : (
                    [
                      <br key="br" />,
                      <span key="equivalent" className={'text-muted'}>
                        ({item.parents.map((p) => p.name).join(' \\ ')})
                      </span>,
                    ]
                  )
                ) : null}
              </div>
            );

            return (
              <div key={`org-el-${iid}`}>
                {withLink ? (
                  <Link
                    to={routes.url(
                      'node_edit',
                      Object.assign({}, item, { ntype: 'organization' }),
                    )}
                    title={t1('click_to_view_%s', [item.name])}
                  >
                    {' '}
                    {text}
                  </Link>
                ) : (
                  text
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return <div>{iids && iids.join(',')}</div>;
  }
}

export default OrganizationsOrPhongBanInResultTable;
