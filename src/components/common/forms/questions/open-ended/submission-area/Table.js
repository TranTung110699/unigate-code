import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Menu from 'antd/lib/menu';
import { connect } from 'react-redux';
import AntdTable from 'antd/lib/table';
import Paper from 'material-ui/Paper';
import AntInput from 'antd/lib/input';
import Attachments from 'schema-form/elements/attachments';
import TextInput from 'schema-form/elements/text';
import HtmlContent from 'components/common/html';
import QuillRickText from 'schema-form/elements/richtext/QuillRickText';
import CourseSessions from '../sessions';
import PeerTakes from '../peer-takes';
import QuestionReports from '../reports';
import Portal, { portals } from 'components/common/portal';
import ResultMarked from '../marking-result';
import VideoPlayer from 'components/common/media-player/video';
import { normalizeYoutubeUrl } from 'common/normalizers';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import UploadAnswers from '../UploadAnswers';
import AttachmentViewer from '../attachment-viewer';

const useRte = true;

const getColumns = ({ value, readOnly, onChange, handleRowOnChange }) => {
  return [
    {
      title: t1('question_content'),
      render: ({ isParent, name }) => {
        return {
          children: name,
          props: {
            colSpan: isParent ? 2 : 1,
            style: isParent
              ? {
                  fontWeight: 'bold',
                }
              : {},
          },
        };
      },
    },
    {
      title: t1('answer'),
      render: ({ isParent, id, input_submit, ...row }) => {
        const currentValue = (Array.isArray(value) &&
          value.find((val) => id === val.id)) || { id };
        return {
          children: [
            (!Array.isArray(input_submit) || input_submit.includes('text')) && (
              <div>
                {useRte ? (
                  <QuillRickText
                    rows={2}
                    value={currentValue.content || ''}
                    onChange={(content) => {
                      currentValue.content = content;
                      handleRowOnChange(onChange, value, currentValue);
                    }}
                  />
                ) : (
                  <AntInput.TextArea
                    rows={2}
                    value={currentValue.content || ''}
                    onChange={(event) => {
                      currentValue.content = get(event, 'target.value');
                      handleRowOnChange(onChange, value, currentValue);
                    }}
                  />
                )}
              </div>
            ),
            Array.isArray(input_submit) && input_submit.includes('attachment') && (
              <Attachments
                readOnly={readOnly}
                value={get(currentValue, 'attachments') || []}
                onChange={(attachments) => {
                  currentValue.attachments = attachments;
                  handleRowOnChange(onChange, value, currentValue);
                }}
              />
            ),
          ],
          props: {
            colSpan: isParent ? 0 : 1,
          },
        };
      },
    },
  ];
};

const tableAnswerByStructure = ({
  value,
  dataSource,
  readOnly,
  onChange,
  handleRowOnChange,
}) => {
  return (
    <AntdTable
      className="white-background"
      dataSource={dataSource}
      columns={getColumns({
        value,
        // readOnly: readOnly || typeof onChange !== 'function',
        onChange,
        handleRowOnChange,
      })}
      defaultExpandAllRows
      expandIcon={() => <span />}
      onExpand={() => {}}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default tableAnswerByStructure;
