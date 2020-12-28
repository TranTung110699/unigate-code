import React, { Component } from 'react';
import { iconBySubtype } from 'components/admin/node/icon';
import Icon from 'components/common/Icon';
import QuestionIcon from './question-icon';

class ItemIcon extends Component {
  render() {
    const { ntype, subType } = this.props;
    if (!['question', 'survey-question'].includes(ntype))
      return <Icon icon={iconBySubtype(ntype, subType)} />;

    return <QuestionIcon subType={subType} />;
  }
}

export default ItemIcon;

//
// export const labelItemToAdd = (
//   { ntype, avatar, label, flatButtonStyle, iconBySubtype },
//   showButton = false,
// ) => {
//   if (!['question', 'survey-question'].includes(ntype)) {
//     return showButton ? (
//       <FlatButton
//         fullWidth
//         label={label}
//         icon={<Icon icon={iconBySubtype} />}
//         style={flatButtonStyle}
//       />
//     ) : (
//       <span>
//         <Icon icon={iconBySubtype} /> {label}
//       </span>
//     );
//   }
//   return (
//     <span style={{ textAlign: 'center' }} className="m-r-20">
//       <img src={avatar} alt={label} /> <br />
//       {label}
//     </span>
//   );
// };
