/**
 * Created by vohung on 08/06/2017.
 */
import Store from 'store';
import getUser from 'common/auth';
import { nodeRoles } from 'configs/constants';

class Perm {
  hasPerm = (role, domain, user) => {
    const userInfo = user && user.iid ? user : Store.getState().user.info || {};
    let roles = userInfo.roles || [];
    if (!Array.isArray(roles)) {
      roles = Object.values(roles);
    }
    const domainInfo = Store.getState().domainInfo || {};
    domain = domain || domainInfo.domain || 've';

    const rolesGroup = domainInfo.roles || [];
    let userRole = roles;
    roles.forEach((key) => {
      const roleGroup = rolesGroup[key] || {};
      if (roleGroup.g && roleGroup.g.length) {
        userRole = userRole.concat(roleGroup.g);
      }
    });
    let prefixedRole = role;
    let prefixedRootRole = 'root';
    if (domain) {
      prefixedRole = `${domain}:${role}`;
      prefixedRootRole = `${domain}:root`;
    }

    if (
      userRole.indexOf(prefixedRole) !== -1 ||
      userRole.indexOf(prefixedRootRole) !== -1
    ) {
      return true;
    }

    const subDomain = domain.split(':');
    subDomain.shift();

    if (subDomain.length < 2) {
      return false;
    }

    for (let i = 1; i < subDomain.length; i += 1) {
      prefixedRole = subDomain[0];
      if (i > 1) {
        for (let j = 1; j < i; j += 1) {
          prefixedRole = `${prefixedRole}:${subDomain[j]}`;
        }
      }

      prefixedRootRole = `${prefixedRole}:root`;
      if (userRole.indexOf(prefixedRootRole) !== -1) {
        return true;
      }
    }
    return false;
  };

  isGuest = () => {
    const userInfo = Store.getState().user || getUser() || {};
    const user = userInfo && userInfo.info;
    if (user && user.iid) {
      return false;
    }
    return true;
  };

  getRolesAssignedToNode = (node, showFull = false) => {
    const userInfo = Store.getState().user && Store.getState().user.info;
    if (!userInfo || !userInfo.iid) {
      return [];
    }

    if (showFull) {
      return [nodeRoles.ROOT];
    }

    const staffs = node && node.staff;

    if (!staffs || !staffs.length) {
      if (
        node &&
        node.u &&
        node.u.iid &&
        String(node.u.iid) === String(userInfo.iid)
      ) {
        return [nodeRoles.ROOT];
      }
      return [];
    }
    let roles = [];

    staffs.forEach((staff) => {
      if (staff && staff.iid && String(staff.iid) === String(userInfo.iid)) {
        roles = staff.roles || [];
      }
    });

    return roles;
  };

  nodeEditer = (node) => {
    const userInfo = Store.getState().user && Store.getState().user.info;
    if (!userInfo || !userInfo.iid) {
      return false;
    }

    return true;
    // TODO: IMPROVE THIS LOGIC
  };
}

export default new Perm();
