import React from 'react';
import Paper from 'components/common/paper';
import Title from 'schema-form/field-set/Title';

const Widget = ({
  noMinHeight,
  url,
  title,
  compact,
  children,
  style,
  className = '',
}) => {
  const contentStyle = { minHeight: noMinHeight ? 'initial' : '150px' };

  return (
    <div className={`${className} m-b-10`}>
      <Paper className={'p-10'} style={style}>
        <Title url={url} title={title} className={'text-transform'} />
        <div style={!compact ? contentStyle : null}>{children}</div>
      </Paper>
    </div>
  );
};

export default Widget;
