import React from 'react';
import newTimetable from '../form-configs/new';
import NodeNew from 'components/admin/node/new';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 21/10/2017
 **/
class ChooseTeacher extends React.Component {
  params = { a: 1, b: 2 };
  submitLabels = { new: 'New', submitting: '.....' };
  formSubmitLabels = { new: 'Search', submitting: '.....' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onShowNewTimeTablePopup = () => {
    const form = (
      <NodeNew
        ntype="timetable"
        schema={newTimetable}
        mode="new"
        formid="newTimeTable"
        alternativeApi="/timetable/api/new"
        params={this.params}
        submitLabels={this.submitLabels}
      />
    );
    this.setState({ openDetail: true, popupContent: form });
  };

  render() {
    const { onSelected, timetableId } = this.props;
    return (
      <div>
        <Form
          schema={schema}
          onSubmit={this.handleSubmit}
          formid="timetable"
          submitLabels={this.formSubmitLabels}
          //   controls={[
          //     <RaisedButton
          //       className="mui-button mui-button--primary"
          //       primary
          //       onClick={this.onShowNewTimeTablePopup}
          //       label={t1('new_timetable')}
          //     />,
          // ]}
        />
        {/*<DialogNoHeader*/}
        {/*autoScrollBodyContent*/}
        {/*contentStyle={{*/}
        {/*width: '90%',*/}
        {/*maxWidth: 'none',*/}
        {/*}}*/}
        {/*className="timetable-panel-detail"*/}
        {/*closeOn={this.closeTimetableDetail}*/}
        {/*open={this.state.openDetail}>*/}
        {/*{this.state.popupContent}*/}
        {/*</DialogNoHeader>*/}
      </div>
    );
  }
}

export default ChooseTeacher;
