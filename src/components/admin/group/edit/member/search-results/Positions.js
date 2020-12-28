import React from 'react';
import { connect } from 'react-redux';
import LinkIfNeeded from 'components/common/router/LinkIfNeeded';
import routes from 'routes';
import { t1 } from 'translate';
import { uzeEquivalentJobPositionSystemSelector } from 'common/selectors';
import lodashGet from 'lodash.get';

class Positions extends React.Component {
  render() {
    const {
      item,
      showEquivalentJobPositionSystem,
      uzeEquivalentJobPositionSystem,
      textOnly,
      noLink,
    } = this.props;

    const iids = lodashGet(item, 'positions', []);
    const objects =
      this.props.expandedPositions || lodashGet(item, '__expand.positions', []);

    if (objects.length > 0) {
      return (
        <div>
          {iids.map((iid, idx) => {
            const position = objects.find(
              (o) => o && String(o.iid) === String(iid),
            );

            if (!position) {
              return null;
            }

            const text = (
              <span>
                {lodashGet(position, 'name')}
                {uzeEquivalentJobPositionSystem &&
                  showEquivalentJobPositionSystem &&
                  lodashGet(
                    position,
                    '__expand.equivalent_position.VTRICDANH_TDUONG',
                  ) && [
                    <br />,
                    <span className={'text-muted'}>
                      {t1('equivalent_position')}:
                      {lodashGet(
                        position,
                        '__expand.equivalent_position.VTRICDANH_TDUONG',
                      )}
                    </span>,
                  ]}

                {uzeEquivalentJobPositionSystem &&
                  showEquivalentJobPositionSystem &&
                  lodashGet(
                    position,
                    '__expand.evn_equivalent_position.CDANHTDUONG_EVN',
                  ) && [
                    <br />,
                    <span className="text-muted">
                      {t1('top_organization_equivalent_position')}:
                      {lodashGet(
                        position,
                        '__expand.evn_equivalent_position.CDANHTDUONG_EVN',
                      )}
                    </span>,
                  ]}
              </span>
            );

            return (
              <div>
                {' '}
                {textOnly ? (
                  text
                ) : (
                  <LinkIfNeeded
                    noLink={noLink}
                    to={routes.url(
                      'node_edit',
                      Object.assign({}, position, { ntype: 'category' }),
                    )}
                    title={t1('click_to_view_%s', [position.name])}
                  >
                    {text}
                  </LinkIfNeeded>
                )}
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>{iids && iids.join(',')}</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  uzeEquivalentJobPositionSystem: uzeEquivalentJobPositionSystemSelector(state),
});

export default connect(mapStateToProps)(Positions);
