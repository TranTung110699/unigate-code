import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import DisplayHtml from 'components/common/html';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { wordBreadcrumb, stripHTML } from 'common/utils/string';

const Download = ({ take }) => {
  const attachments = lodashGet(take, 'answer.attachments');

  if (attachments && attachments.length) {
    return (
      <div>
        {attachments.map((file) => (
          <div>
            <a target="_blank" href={file.link}>
              <Icon icon="fileDownload" /> {t1('download')}
            </a>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// display the open ended takes of the student
// if props.simple, we only show whether or not he has submitted
const OpenEndedTake = ({
  take,
  simple,
  borderBottom = '1px solid #eee',
  index,
}) => {
  const displayIndex = typeof index !== 'undefined' ? index + 1 : undefined;

  return (
    <div
      style={{
        ...(borderBottom ? { borderBottom } : {}),
      }}
      className="flex-container"
    >
      <div className="flex-item oe">
        <div className={'mobile-content'}>
          <DetailOnDialog
            textPreview={`${t1('question')}${
              displayIndex ? ` ${displayIndex}` : ''
            }`}
            renderFull={() => <DisplayHtml content={take.content} />}
          />
        </div>
        <div className={'web-content'}>
          <DetailOnDialog
            textPreview={`${
              displayIndex ? `${displayIndex}.` : ''
            }${wordBreadcrumb(stripHTML(take.content), 20)}`}
            renderFull={() => <DisplayHtml content={take.content} />}
          />
        </div>
      </div>
      <div className="flex-item oe">
        {take.answer ? (
          <div>
            <div className={'mobile-content'}>
              <DetailOnDialog
                textPreview={wordBreadcrumb(
                  stripHTML(lodashGet(take, 'answer.content')),
                  2,
                )}
                renderFull={() => (
                  <div>
                    <DisplayHtml content={lodashGet(take, 'answer.content')} />
                    <hr />
                    <Download take={take} />
                  </div>
                )}
              />
            </div>
            <div className={'web-content'}>
              <DetailOnDialog
                textPreview={wordBreadcrumb(
                  stripHTML(lodashGet(take, 'answer.content')),
                  20,
                )}
                renderFull={() => (
                  <div>
                    <DisplayHtml content={lodashGet(take, 'answer.content')} />
                    <hr />
                    <Download take={take} />
                  </div>
                )}
              />
            </div>
            <Download take={take} />
          </div>
        ) : (
          <div style={{ color: 'red' }}>
            <Icon icon="cancel" /> {t1('no_answer')}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenEndedTake;
