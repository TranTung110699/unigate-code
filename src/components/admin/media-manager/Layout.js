import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Media from 'components/media/Media';
import topMenuSchema from './menu/MainstageTopMenu';

class MediaManagerLayout extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Media {...this.props} />
      </div>
    );
  }
}

export default MediaManagerLayout;
