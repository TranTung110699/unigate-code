import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import { getFileFullName } from 'common/utils/File';
import lodashGet from 'lodash.get';
import List from 'antd/lib/list';
import { t1 } from 'translate';
import DownloadLinkWrapper from 'components/common/download/DownloadLinkWrapper';
import AntTable from 'antd/lib/table';
import './stylesheet.scss';
import Typography from 'antd/lib/typography';

const getAttachmentFileNameForDisplay = (item, suffixExtension = false) => {
  let ret = item.desc || item.name;
  if (suffixExtension) ret = `${ret}.${item.ext}`;

  return ret;
};

const MainDownloadLink = ({ href, onClick, className, iconOnly }) => {
  return (
    <a className={className} href={href || '#'} onClick={onClick}>
      <Icon icon="download" /> {!iconOnly && t1('download')}
    </a>
  );
};

const DownloadAttachmentWrapper = ({ attachment, renderComponent }) => {
  const link = lodashGet(attachment, 'link');
  const fileName = getFileFullName(attachment);

  if (!link) {
    return null;
  }

  return (
    <DownloadLinkWrapper
      link={link}
      fileName={fileName}
      renderComponent={renderComponent}
    />
  );
};

export const ListAttachmentsToDownload = ({ attachments, size }) => {
  const cssClass = 'list-attachments-to-download';

  if (!attachments || !Array.isArray(attachments)) {
    return null;
  }

  return (
    <List
      size={size}
      className={`${cssClass} ${size ? `${cssClass}--${size}` : ''}`}
      dataSource={attachments}
      renderItem={(att) => {
        const key = lodashGet(att, 'id');
        return (
          <List.Item key={key}>
            <List.Item.Meta
              title={
                <DownloadAttachmentWrapper
                  key={key}
                  attachment={att}
                  renderComponent={({ href, onClick }) => {
                    return (
                      <a href={href} onClick={onClick}>
                        <Icon icon="download" />{' '}
                        {getAttachmentFileNameForDisplay(att, true)}
                      </a>
                    );
                  }}
                />
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export const ListAttachmentsToDownloadAsTable = ({
  attachments,
  showHeader = true,
  compact = false,
}) => {
  if (!attachments || !Array.isArray(attachments)) {
    return null;
  }

  const columns = [
    {
      title: '#',
      render: (value, item, index) => {
        return index + 1;
      },
    },
    {
      title: t1('name'),
      key: 'name',
      width: '70%',
      render: (item) => {
        return !compact ? (
          getAttachmentFileNameForDisplay(item)
        ) : (
          <>
            {item.ext ? (
              <>
                [
                <Typography.Text mark>{item.ext.toUpperCase()}</Typography.Text>
                ]{' '}
              </>
            ) : (
              ''
            )}
            {getAttachmentFileNameForDisplay(item)}
          </>
        );
      },
    },
    ...(!compact
      ? [
          {
            title: t1('file_type'),
            key: 'name',
            width: '10%',
            render: (item) => (item.ext ? item.ext.toLowerCase() : ''),
          },
        ]
      : []),
    {
      title: t1('download'),
      key: 'download',
      width: '15%',
      render: (item) => (
        <DownloadAttachmentWrapper
          attachment={item}
          renderComponent={({ href, onClick }) => {
            return (
              <a href={href} onClick={onClick}>
                <Icon icon="download" /> {compact ? '' : t1('download')}
              </a>
            );
          }}
        />
      ),
    },
  ];

  const pageSize = attachments.length > 20 ? { defaultPageSize: 20 } : false;

  return (
    <AntTable
      showHeader={showHeader}
      columns={columns}
      dataSource={attachments}
      childrenColumnName={null}
      bordered
      className="white-background"
      rowKey="id"
      pagination={pageSize}
      size="small"
    />
  );
};

const dialogKey = 'download_multiple_attachments';

const DownloadMultipleAttachments = ({
  attachments,
  className,
  iconOnly = false,
}) => {
  if (!attachments || !Array.isArray(attachments)) {
    return null;
  }

  if (attachments.length === 1) {
    return (
      <DownloadAttachmentWrapper
        attachment={attachments[0]}
        renderComponent={({ href, onClick }) => (
          <MainDownloadLink
            href={href}
            onClick={onClick}
            className={className}
            iconOnly={iconOnly}
          />
        )}
      />
    );
  }

  return (
    <DetailOnDialog
      dialogOptionsProperties={{
        title: t1('download_attachments'),
      }}
      renderPreview={({ showFull }) => {
        return (
          <MainDownloadLink
            className={className}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              showFull();
            }}
          />
        );
      }}
      renderFull={({ closeDialog }) => {
        return <ListAttachmentsToDownload attachments={attachments} />;
      }}
      dialogKey={dialogKey}
    />
  );
};

export default DownloadMultipleAttachments;
