import React from 'react';
import { connect } from 'react-redux';
import { shouldUseV1FileManager } from 'common/selectors';
import FileManagerPopupButton from 'components/common/file-manager/FileManagerPopupButton';
import { t1 } from 'translate';
import { allowedFileTypes } from 'common/utils/File';

class CustomToolbar extends React.Component {
  render() {
    const { id, onImageSelect, useV1FileManager } = this.props;
    const accept = allowedFileTypes('image');

    return (
      <div id={id}>
        <select
          className="ql-header"
          defaultValue={''}
          onChange={(e) => e.persist()}
        >
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
          <option value="6" />
          <option selected />
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-blockquote" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
        <button className="ql-link" />
        <FileManagerPopupButton
          accept={accept}
          className="ql-image"
          onSelect={onImageSelect}
        />
        <button
          className="ql-imageV1"
          style={{
            display: useV1FileManager ? undefined : 'none',
            width: 52,
            fontSize: 10,
          }}
        >
          {t1('image_v1')}
        </button>
        <button className="ql-video" />
        <button className="ql-direction" value="rtl" />
        <select className="ql-color" style={{ display: 'none' }}>
          <option selected />
          <option value="#e60000" />
          <option value="#ff9900" />
          <option value="#ffff00" />
          <option value="#008a00" />
          <option value="#0066cc" />
          <option value="#9933ff" />
          <option value="#ffffff" />
          <option value="#facccc" />
          <option value="#ffebcc" />
          <option value="#ffffcc" />
          <option value="#cce8cc" />
          <option value="#cce0f5" />
          <option value="#ebd6ff" />
          <option value="#bbbbbb" />
          <option value="#f06666" />
          <option value="#ffc266" />
          <option value="#ffff66" />
          <option value="#66b966" />
          <option value="#66a3e0" />
          <option value="#c285ff" />
          <option value="#888888" />
          <option value="#a10000" />
          <option value="#b26b00" />
          <option value="#b2b200" />
          <option value="#006100" />
          <option value="#0047b2" />
          <option value="#6b24b2" />
          <option value="#444444" />
          <option value="#5c0000" />
          <option value="#663d00" />
          <option value="#666600" />
          <option value="#003700" />
          <option value="#002966" />
          <option value="#3d1466" />
        </select>
        <select className="ql-background">
          <option value="#000000" />
          <option value="#e60000" />
          <option value="#ff9900" />
          <option value="#ffff00" />
          <option value="#008a00" />
          <option value="#0066cc" />
          <option value="#9933ff" />
          <option selected />
          <option value="#facccc" />
          <option value="#ffebcc" />
          <option value="#ffffcc" />
          <option value="#cce8cc" />
          <option value="#cce0f5" />
          <option value="#ebd6ff" />
          <option value="#bbbbbb" />
          <option value="#f06666" />
          <option value="#ffc266" />
          <option value="#ffff66" />
          <option value="#66b966" />
          <option value="#66a3e0" />
          <option value="#c285ff" />
          <option value="#888888" />
          <option value="#a10000" />
          <option value="#b26b00" />
          <option value="#b2b200" />
          <option value="#006100" />
          <option value="#0047b2" />
          <option value="#6b24b2" />
          <option value="#444444" />
          <option value="#5c0000" />
          <option value="#663d00" />
          <option value="#666600" />
          <option value="#003700" />
          <option value="#002966" />
          <option value="#3d1466" />
        </select>
        <select className="ql-font">
          <option selected />
          <option value="serif" />
          <option value="monospace" />
        </select>
        <select className="ql-align">
          <option selected="selected" />
          <option value="center" />
          <option value="right" />
          <option value="justify" />
        </select>
        <button type="button" className="ql-clean" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  useV1FileManager: shouldUseV1FileManager(state),
});

export default connect(mapStateToProps)(CustomToolbar);
