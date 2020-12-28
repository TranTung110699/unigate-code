import React, { Component } from 'react';
// import { t1 } from 'translate';
// import PropTypes from 'prop-types';
import FlatButton from 'components/common/mui/FlatButton';

const headerStyle = { borderBottom: '1px solid #eee' };

const CopyButton = (props) => {
  return (
    <FlatButton
      primary
      onClick={() => {
        props.copyFromDictionary(props.name, props.val);
      }}
    >
      Use
    </FlatButton>
  );
};

const Meaning = (props) => {
  const { meaning, tu, copyFromDictionary, addExample } = props;
  return (
    <div>
      <div>
        <b>{meaning.name}</b>
        <CopyButton
          copyFromDictionary={props.copyFromDictionary}
          name="vname"
          val={meaning.name}
        />
      </div>
      <div className="clearfix" />
      <ul>
        {meaning.example &&
          meaning.example.map((example) => {
            return (
              <li key={example.id}>
                <FlatButton
                  primary
                  onClick={() => {
                    addExample(example);
                  }}
                >
                  Use this example
                </FlatButton>

                <div>{example.name}</div>
                <div className="text-muted">{example.vname}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const TuLoai = (props) => {
  const { tu } = props;
  return (
    <div>
      <h3 style={headerStyle}>{tu.name}</h3>
      {tu.meanings &&
        tu.meanings.map((meaning, i) => {
          return <Meaning meaning={meaning} {...props} key={i} />;
        })}
    </div>
  );
};

const Transcribe = (props) => {
  const { transcribe, type } = props;
  return (
    <div>
      {transcribe &&
        transcribe.length &&
        transcribe.map((phonics) => {
          return (
            <div>
              {' '}
              ({type}
              ): /<b>{phonics.phonics}</b>/
              <CopyButton
                copyFromDictionary={props.copyFromDictionary}
                name="phonetics"
                val={phonics.phonics}
              />
            </div>
          );
        })}
    </div>
  );
};

class DictionaryViewer extends Component {
  style = { backgroundColor: '#ddd', padding: '10px' };
  imgStyle = { width: '100px', maxWidth: '100px' };

  render() {
    const row = this.props.term;
    if (row && row.name) {
      return (
        <div style={this.style}>
          {/*
            <VarDump data={row.transcribe} />
            */}
          {row.transcribe && <h3 style={headerStyle}>Phonetics</h3>}
          {row.transcribe && row.transcribe.gb && (
            <Transcribe
              {...this.props}
              type="gb"
              transcribe={row.transcribe.gb}
            />
          )}
          {row.transcribe && row.transcribe.us && (
            <Transcribe
              {...this.props}
              type="us"
              transcribe={row.transcribe.us}
            />
          )}
          {row.tuloai &&
            row.tuloai.map((tu, i) => (
              <TuLoai tu={tu} {...this.props} key={i} />
            ))}
          {row.avatar && (
            <div>
              <img src={row.avatar} alt="avatar" style={this.imgStyle} />
              <CopyButton
                copyFromDictionary={this.props.copyFromDictionary}
                name="avatar"
                val={row.avatar}
              />
            </div>
          )}
        </div>
      );
    }
    return 'not found';
  }
}

export default DictionaryViewer;
