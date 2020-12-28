import React from 'react';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import { getInfos, getReferenceLinks } from './config';

class MenuTopInfo extends React.Component {
  render() {
    const { schoolInfo } = this.props;
    const infos = getInfos(schoolInfo);
    const referenceLinks = getReferenceLinks();

    return (
      <div className="evn-header-info">
        <div className="container info-container">
          <div className="info-left">
            {infos &&
              infos.map(
                (item) =>
                  item.href && (
                    <a
                      className={`item ${item.id}`}
                      href={item.href}
                      key={`info-left-${item.id}`}
                    >
                      <i className={item.icon} />
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
