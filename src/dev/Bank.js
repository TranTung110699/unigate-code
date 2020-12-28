import React, { Component } from 'react';
import Bank from 'components/admin/node/bank/Bank';

class DevBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ntype: 'video',
    };
  }

  changeNtype(ntype) {
    this.setState({ ntype });
  }

  render() {
    const applicableNtypes = [
      'path',
      'course',
      'syllabus',
      'sco',
      'video',
      'vocabset',
      'exercise',
      'question',
      'skill',
      'user',
      'page',
      'room',
    ].sort();

    applicableNtypes.push('foo');
    // const node = {};
    // const ntype = this.state.ntype;
    return (
      <div className="form-content">
        <div className="row">
          <div className="col-md-12">
            {applicableNtypes.map((ntype, idx) => (
              <button
                key={`${ntype}-${idx}`}
                onClick={() => this.changeNtype(ntype)}
              >
                {ntype}
              </button>
            ))}
          </div>
          <div className="col-md-12">
            {applicableNtypes.map(
              (ntype, idx) =>
                ntype === this.state.ntype && (
                  <Bank key={`${ntype}-${idx}`} ntype={ntype} mode="new" />
                ),
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DevBank;
