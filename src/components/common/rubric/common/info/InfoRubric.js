import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import Icon from 'components/common/Icon';
import DisplayHtml from 'components/common/html';
import './stylesheet.scss';

const Info = ({ content }) => (
  <IconMenu
    iconButtonElement={<Icon icon="mention" className="rubric-info-icon" />}
    useLayerForClickAway
  >
    <DisplayHtml content={content} className="rubric-info" />
  </IconMenu>
);

export default Info;
