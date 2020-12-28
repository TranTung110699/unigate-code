/**
 * Created by hngvo on 03/11/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

class CustomChunk extends React.Component {
  textFieldStyle = {
    width: '95%',
  };

  constructor(props) {
    super(props);
    this.state = {
      chunk: [],
    };
  }

  componentWillMount() {
    this.setState({
      chunk: [50],
    });
  }

  changeValue = (newValue, index) => {
    const { chunk } = this.state;
    chunk[index] = newValue;
    this.setState({ chunk });
  };

  addChunk = () => {
    const { chunk } = this.state;
    const maxValue = (chunk && chunk[chunk.length - 1]) || 50;
    chunk[chunk.length] = parseInt((maxValue + 100) / 2);
    this.setState({ chunk });
  };

  removeChunk = (index) => {
    const { chunk } = this.state;
    chunk.splice(index, 1);
    this.setState({ chunk });
  };

  render() {
    const { chunk } = this.state;
    return (
      <div>
        {chunk &&
          chunk.length > 0 &&
          chunk.map((row, index) => (
            <div>
              <TextField
                key={`custom-chunk-${index}`}
                type="number"
                value={chunk && chunk[index]}
                fullWidth
                step={1}
                max={100}
                style={this.textFieldStyle}
                min={(chunk && chunk[index - 1]) || 0}
                onChange={(e, value) => this.changeValue(value, index)}
              />
              {index === chunk.length - 1 ? (
                <Icon
                  className="m-t-25 action"
                  icon="plus"
                  onClick={() => this.addChunk()}
                />
              ) : (
                <Icon
                  className="m-t-25 action"
                  icon="minus"
                  onClick={() => this.removeChunk(index)}
                />
              )}
            </div>
          ))}
        <RaisedButton
          label={t1('ok')}
          onClick={() => {
            const { handleSubmit } = this.props;
            const { chunk } = this.state;
            handleSubmit ? handleSubmit(chunk) : console.log(chunk);
          }}
        />
      </div>
    );
  }
}

export default connect()(CustomChunk);
