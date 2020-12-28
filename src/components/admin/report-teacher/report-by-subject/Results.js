import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { courseLearningTypes } from 'configs/constants';
import { t1 } from 'translate';
import get from 'lodash.get';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';

class Results extends Component {
  showReportBySubjectData = () => {
    let reportBySubjectData = [];
    const keys = this.props.keys || [];
    const displayTexts = this.props.displayTexts || [];

    for (let keyIndex = 0; keyIndex < keys.length; ++keyIndex) {
      reportBySubjectData.push({
        title: `${displayTexts[keyIndex]}`,
        render: (text, row) => {
          return get(row, `data[${keyIndex}].value`, 0) || 0;
        },
      });
    }

    return reportBySubjectData;
  };

  render() {
    const { items, learningType } = this.props;
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('information'),
        key: 'id',
        render: (text) => t1(text),
        dataIndex: 'name',
      },
      {
        title:
          learningType === courseLearningTypes.ONLINE
            ? t1('online_training')
            : t1('offline_training'),
        children: this.showReportBySubjectData(),
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        className="report-by-subject"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

function mapStateToProps(state, props) {
  const learningTypeSelector = getFormValues('report_by_subject');

  const learningType = learningTypeSelector(state, 'learning_type');

  return {
    learningType: learningType.learning_type,
  };
}

export default connect(mapStateToProps)(Results);
