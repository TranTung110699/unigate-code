import React from 'react';
import PropTypes from 'prop-types';
import RolePlay from 'components/learn/items/exercise/RolePlay';
import { t1 } from 'translate';
import './stylesheet.scss';

class LearnOnePageRolePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
    };
  }

  cssClass = 'learn-one-page-role-play';

  handleRolePlayResult = (result) => {
    this.setState({
      score: result,
    });
  };

  render() {
    const { exerciseIid, vocabsetIid } = this.props;
    const { score } = this.state;
    return (
      <div className={this.cssClass}>
        {score !== null && (
          <div className={`${this.cssClass}__score`}>
            {`${t1('your_last_score_is')}: ${score}%`}
          </div>
        )}
        <RolePlay
          exerciseIid={exerciseIid}
          vocabsetIid={vocabsetIid}
          onResult={this.handleRolePlayResult}
        />
      </div>
    );
  }
}

LearnOnePageRolePlay.propTypes = {
  exerciseIid: PropTypes.string,
  vocabsetIid: PropTypes.string,
};

LearnOnePageRolePlay.defaultProps = {
  exerciseIid: null,
  vocabsetIid: null,
};

export default LearnOnePageRolePlay;
