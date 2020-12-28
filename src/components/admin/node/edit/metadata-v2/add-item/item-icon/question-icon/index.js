import React, { Component } from 'react';
import Intro from './img/intro.png';
import Mc from './img/mc.png';
import Num from './img/number.png';
import Inline from './img/inline.png';
import Speaking from './img/speaking.png';
import OE from './img/open-ended.png';
import MP from './img/pairs.png';
import RE from './img/reorder.png';
import Excel from './img/excel.png';
import WT from './img/writing.png';
import { types } from 'components/admin/question/schema/question-types';

class QuestionIcon extends Component {
  render() {
    const { subType } = this.props;

    return (
      <div>
        {subType == types.TYPE_MC && <img src={Mc} />}
        {subType == types.TYPE_INLINE && <img src={Inline} />}
        {subType == types.TYPE_INTRODUCTION && <img src={Intro} />}
        {subType == types.TYPE_NUMBER && <img src={Num} />}
        {subType == types.TYPE_MC_OPEN_ENDED && <img src={Mc} />}
        {subType == types.TYPE_REORDER && <img src={RE} />}
        {subType == types.TYPE_MATCHING_PAIRS && <img src={MP} />}
        {subType == types.TYPE_OPEN_ENDED && <img src={OE} />}
        {subType == types.TYPE_SPEAKING && <img src={Speaking} />}
        {subType == types.TYPE_WRITING && <img src={WT} />}
        {subType == 'import' && <img src={Excel} />}
      </div>
    );
  }
}

/**
 * we don't have icons for different kinds of questions yet, that's why we need this component
 * to display an image in stead
 */
export default QuestionIcon;
