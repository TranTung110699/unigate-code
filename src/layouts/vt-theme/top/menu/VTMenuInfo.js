import React from 'react';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import { getInfos, getReferenceLinks } from './config';
import Icon from '../../../../components/common/Icon';

class MenuTopInfo extends React.Component {
  render() {
    const { schoolInfo } = this.props;
    const infos = getInfos(schoolInfo);
    const referenceLinks = getReferenceLinks();

    return (
      <div className="vt-header-info">
        <div className="col-md-12">
          <div className="info-left">
            {infos &&
              infos.map(
                (item, index) =>
                  item.href && (
                    <a
                      className={`item ${item.id} ${
                        index !== 0 ? 'm-l-20' : ''
                      }`}
                      href={item.href}
                      key={`info-left-${item.id}`}
                    >
                      <Icon icon={item.icon} antIcon={item.antIcon} />
                      <span> {item.label}</span>
                    </a>
                  ),
              )}
          </div>
          <div className="info-right">
            {referenceLinks &&
              referenceLinks.map((item) => (
                <a className={`item ${item.id}`} key={`info-right-${item.id}`}>
                  <span>{item.label}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolInfo: lGet(state, 'domainInfo.school', {}),
});

export default connect(mapStateToProps)(MenuTopInfo);
