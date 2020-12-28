/**
 * Created by quandv on 22/04/17.
 */
import { ObjectStrStr } from 'components/common/prop-types/Array';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VarDump from 'components/common/VarDump';

class PropTypesExample extends Component {
  render() {
    return (
      <div id="teacher-search-form">
        <p>Go in to the file below to test other Object :)</p>
        <p>r/readmin/src/dev/PropTypesExample.js</p>
        <VarDump data={this.props.jsonToCheck} />
      </div>
    );
  }
}

PropTypesExample.propTypes = {
  jsonToCheck: PropTypes.arrayOf(ObjectStrStr).isRequired,
};

PropTypesExample.defaultProps = {
  jsonToCheck: [
    {
      keyString1: 'valueString1',
    },
    {
      keyString2: 'valueString2',
    },
  ],
};

export default PropTypesExample;
