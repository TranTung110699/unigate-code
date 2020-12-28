import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { t1 } from 'translate';
import Menu from 'antd/lib/menu';
import AntdTable from 'antd/lib/table';
import Paper from 'material-ui/Paper';
import AntInput from 'antd/lib/input';
// import Attachments from 'schema-form/elements/attachments';
import Attachments from 'schema-form/elements/attachments/core/Component';
import TextInput from 'schema-form/elements/text/TextField';
import HtmlContent from 'components/common/html';
import QuillRickText from 'schema-form/elements/richtext/QuillRickText';
import CourseSessions from './sessions';
import PeerTakes from './peer-takes';
import QuestionReports from './reports';
import Portal, { portals } from 'components/common/portal';
import ResultMarked from './marking-result';
import VideoPlayer from 'components/common/media-player/video';
import { normalizeYoutubeUrl } from 'common/normalizers';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import { submit } from 'redux-form';

const UploadAnswers = ({
  dispatch,
  formid,
  fields = [],
  currentValue = '',
  onChange = () => {},
}) => {
  let [value, setValue] = React.useState(currentValue);
  return [
    fields.includes('youtube') && (
      <div className="m-t-20">
        <div>{t1('input_youtube_url')}</div>
        <TextInput
          floatingLabelText={'youtube'}
          value={get(value, 'youtube')}
          onChange={(e) => {
            const url = e.target.value;
            const youtube = normalizeYoutubeUrl(url);
            value.youtube = youtube;
            setValue(value);
          }}
        />
      </div>
    ),
    fields.includes('attachment') && (
      <div className="m-t-20">
        <div>{t1('upload_your_documents')}</div>
        <Attachments
          noFileManager
          allowDownload
          value={get(value, 'attachments') || []}
          onChange={(attachments) => {
            value.attachments = attachments;
            setValue({ ...value });
          }}
        />
      </div>
    ),
    fields.includes('text') && (
      <div className="m-t-20">
        <div>{t1('edit_your_document')}</div>
        <QuillRickText
          rows={8}
          value={get(value, 'content')}
          onChange={(text) => {
            value.content = text;
            setValue(value);
          }}
        />
      </div>
    ),

    <div className="text-center m-t-30">
      <RaisedButton
        primary
        className="m-l-10 m-r-10"
        onClick={() => {
          onChange(value);
          setTimeout(function() {
            dispatch(submit(formid));
          }, 10);
        }}
        label={t1('submit')}
      />
    </div>,
  ];
};

export default connect()(UploadAnswers);
