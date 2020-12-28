import React, { Component } from 'react';
import { t1 } from 'translate';
import Tabs from 'components/common/tabs';
import UpdateRoundForm from '../new/Form';
import lodashGet from 'lodash.get';

class ExamRoundTabs extends Component {
  render() {
    const { contest, node } = this.props;
    return (
      <div style={{ minHeight: '600px' }}>
        <Tabs
          tabs={[
            {
              label: t1('edit_exam_round_information'),
              content: (
                <UpdateRoundForm
                  mode="edit"
                  contest={contest}
                  node={node}
                  step={'exam_round'}
                  formid="edit_exam_round"
                  defaultValue={lodashGet(node, 'examshift_v1.options')}
                />
              ),
            },
            {
              label: t1('abasdfasdf'),
              content: <div>asdfsdf</div>,
            },
          ]}
        />
      </div>
    );
  }
}

export default ExamRoundTabs;
