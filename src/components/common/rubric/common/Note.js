import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import { stripHTML } from 'common/utils/string/index';

class Note extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { lines: 1, value: '' };
  }

  handleChangeValue = (item) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(get(item, 'target.value'));
    } else {
      this.setState({ value: get(item, 'target.value') });
    }
  };

  render() {
    const { lines, value } = this.state;
    const finalValue = this.props.value || value;
    const { requiedCommentMarking, hint } = this.props;
    const finalHint = stripHTML(hint);
    return (
      <div>
        <textarea
          style={{ width: '100%' }}
          value={finalValue}
          placeholder={finalHint || t1('enter_comment')}
          rows={lines > 5 ? 5 : lines}
          onKeyDown={(event) => {
            if (event.keyCode === 13)
              this.setState({ lines: this.state.lines + 1 });
          }}
          onChange={(item) => this.handleChangeValue(item)}
        />
        {requiedCommentMarking && !finalValue ? (
          <div style={{ color: 'red', marginTop: '-12px' }}>
            {t1('requied_comment')}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Note;
