import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import Icon from 'components/common/Icon';
import Search from './search';
import schema from '../user_goal/schema/form';

class Layout extends React.Component {
  searchFormId = 'user_goal_search';

  renderPreview = ({ showFull }) => (
    <RaisedButton
      onClick={showFull}
      label={[<Icon icon="add" />, t1('add_goal')]}
    />
  );

  renderFull = () => {
    const { node } = this.props;
    return (
      <NodeNew
        ntype={'user_goal'}
        schema={schema}
        mode={'new'}
        closeModal
        searchFormId={this.searchFormId}
        params={{
          user_iid: node.iid,
        }}
      />
    );
  };

  render() {
    const { node } = this.props;
    return (
      <div>
        <Search formid={this.searchFormId} node={node} />
        <DetailOnDialog
          renderPreview={this.renderPreview}
          renderFull={this.renderFull}
        />
      </div>
    );
  }
}

Layout.propTypes = {
  node: PropTypes.shape(),
};

Layout.defaultProps = {
  node: null,
};

export default Layout;
