import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { t1 } from 'translate';
import TakeSearch from 'components/common/forms/questions/open-ended/peer-takes/Search';

class CourseOpenEndedTakes extends Component {
  render() {
    const { courseIid } = this.props;
    return <TakeSearch courseIid={courseIid} />;
  }
}

export default CourseOpenEndedTakes;
