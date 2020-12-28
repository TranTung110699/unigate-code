import Links from 'routes/links/index';
import courseApiUrls from 'components/admin/course/endpoints';
import sagaActions from 'actions/saga-creators';

export const getOverviewCourseLink = (item, viewUserIid, rootPathIid) => {
  if (viewUserIid) {
    return Links.adminOverviewCourseOfUser(viewUserIid, item);
  }

  return Links.overviewCourseByPath(rootPathIid, item);
};

export const downloadCertificate = (courseIid, userIid, dispatch) => {
  const url = courseApiUrls.download_certificate;

  const params = {
    course_iid: courseIid,
    user_iid: userIid,
  };
  dispatch(sagaActions.downloadCertificateRequest(url, params));
};
