import React, { Component } from 'react';
import Avatar from 'components/common/avatar';
import { Link } from 'react-router-dom';
import { sortStaff } from 'common/utils/index';
// import VarDump from 'components/common/VarDump';

// hiddenStaffNames is array of staff names, it will be join'ed by ', '
// to display like "staff A, staff B,...."
const Plus = (hiddenStaffNames, count, linkTo) =>
  linkTo ? (
    <Link
      to={linkTo}
      title={
        hiddenStaffNames &&
        hiddenStaffNames.length &&
        hiddenStaffNames.join(', ')
      }
    >{`+${count}`}</Link>
  ) : (
    <span
      title={
        hiddenStaffNames &&
        hiddenStaffNames.length &&
        hiddenStaffNames.join(',')
      }
    >{`+${count}`}</span>
  );

class StaffList extends Component {
  avatarStyle = { marginRight: '5px' };

  render() {
    const { staff, linkTo } = this.props;
    const displayCount = this.props.displayCount || 3;

    if (!staff || staff.length === 0) return <span>N/A</span>;

    let newStaff = [];
    if (!Array.isArray(staff)) {
      newStaff = sortStaff(
        Object.keys(staff).map((key) => [Number(key), staff[key]]),
      );
    } else {
      newStaff = sortStaff(staff);
    }

    const hiddenStaffCount =
      staff.length - displayCount > 2 ? staff.length - displayCount : 0;

    // array of staff names
    const hiddenStaffNames = [];

    return (
      <div>
        {/*
        <VarDump data={staff} />
*/}
        {newStaff.map((oneStaff, index) => {
          if (hiddenStaffCount === 0 || index + 1 <= displayCount) {
            return (
              <Avatar
                key={(oneStaff && oneStaff.iid) || index}
                user={oneStaff}
                style={this.avatarStyle}
              />
            );
          }
          if (oneStaff && oneStaff.name) {
            hiddenStaffNames.push(oneStaff.name);
          }
        })}
        {hiddenStaffCount !== 0 &&
          Plus(hiddenStaffNames, hiddenStaffCount, linkTo)}
      </div>
    );
  }
}

/*
StaffList.propTypes = {
  staff: PropTypes.arrayOf(PropTypes.objectOfShape({iid, name, avatar})),
  displayCount: PropTypes.integer, // maximumNumber of
}

*/
export default StaffList;
