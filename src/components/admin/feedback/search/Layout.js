import React, { Component } from 'react';
import { connect } from 'react-redux';
import searchForm from './SearchForm';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { t1 } from 'translate';

class Layout extends Component {
  render() {
    const { type, node } = this.props;
    return (
      <React.Fragment>
        <SubTopMenuContext
          lastBreadcrumbName={t1('feedback')}
          description={t1('feedback_description')}
        />
        {searchForm({ node, type })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const type = props.match && props.match.params && props.match.params.type;
  return { type };
};

export default connect(mapStateToProps)(Layout);
