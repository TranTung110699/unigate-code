/**
 * Created by Peter Hoang Nguyen on 4/27/2017.
 */
// For url like /learn/sco/
import React from 'react';
import { connect } from 'react-redux';
import HtmlContent from 'components/common/html';
import nodeActions from 'actions/node/creators';
import Loading from 'components/common/loading';
import { trackUserViewDanTriSCO } from 'configs/facebook-event';
import LayoutHelper from 'layouts/LayoutHelper';
import ScoItem from './ScoItem';
import './stylesheet.scss';

class LearningOnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.onComponentWillMount();
    LayoutHelper.useLayout('embedded', this);
  }

  render() {
    const { sco } = this.props;
    if (!sco || !sco.iid) {
      return <Loading />;
    }
    return (
      <div className="learn-one-page">
        <div className="learn-one-page-panel">
          <h2 className="title">
            {' '}
            {sco && <HtmlContent content={sco.content} />}
          </h2>
          {sco &&
            sco.children &&
            sco.children.map((iid, index) => (
              <ScoItem key={`${iid}-${index}`} itemIid={iid} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  if (!match || !match.params) {
    return null;
  }

  const { iid } = match.params;

  const nodes = state.tree;

  return {
    sco: nodes[iid],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const onComponentWillMount = () => {
    const { match } = props;
    if (!match || !match.params) {
      return;
    }
    const { iid, edit } = match.params;

    const params = { iid, ntype: 'sco', depth: -1 };

    if (edit !== 'edit') {
      params.learning = true;
    }

    dispatch(nodeActions.fetchNode(params));

    trackUserViewDanTriSCO({
      scoIid: iid,
    });
  };

  return {
    dispatch,
    onComponentWillMount,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningOnePage);
