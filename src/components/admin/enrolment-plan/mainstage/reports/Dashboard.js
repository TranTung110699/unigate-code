import React from 'react';
import configs from './configs';
import Widget from 'components/common/Widget';
import chunk from 'lodash.chunk';

class EpReportDashboard extends React.Component {
  render() {
    const { node, conf, title } = this.props;
    const items = configs(node, conf).filter((item) => !item.hidden);
    const chunks = chunk(items, 4);

    return (
      <div>
        {chunks.map((chunk) => (
          <div className="row m-b-30">
            {chunk.map((item, i) => (
              <div className="col-md-3">
                <Widget title={item.title} url={item.url}>
                  {item.description}
                  {item.component}
                </Widget>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default EpReportDashboard;
