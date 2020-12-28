import React from 'react';
import { t1 } from 'translate';
import Timeline from 'antd/lib/timeline';

class Rules extends React.Component {
  render() {
    const { examRules } = this.props;
    return (
      <div>
        <h4 className="contest-information-block-title">{t1('exam_rules')}</h4>
        <Timeline className="m-l-24">
          {examRules &&
            examRules.length &&
            examRules.map((rule) => (
              <Timeline.Item className="p-b-5 text-capitalize-first-letter ">
                {rule}
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    );
  }
}

export default Rules;
