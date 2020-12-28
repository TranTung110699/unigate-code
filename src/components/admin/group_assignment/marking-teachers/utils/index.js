export const normalizeUserData = (user) =>
  user && {
    ...user,
    iid: parseInt(user.iid, 10),
  };

export const getAssignmentMarkingTeachers = (course, groupAssignment) => {
  if (
    !groupAssignment ||
    !groupAssignment.iid ||
    !course ||
    !Array.isArray(course.assignment_marking_teachers)
  ) {
    return [];
  }
  const tmp = course.assignment_marking_teachers.find(
    (item) =>
      item && String(item.assignment_iid) === String(groupAssignment.iid),
  );
  return (
    (tmp &&
      Array.isArray(tmp.marking_teachers) &&
      tmp.marking_teachers.map(normalizeUserData)) ||
    []
  );
};

const couldStaffBeTeacher = (courseStaff) =>
  courseStaff &&
  Array.isArray(courseStaff.roles) &&
  courseStaff.roles.includes('teacher');

export const getCourseStaffWhoCouldBeTeacher = (course) => {
  return (
    (course &&
      course.staff &&
      Array.isArray(course.staff) &&
      course.staff.filter(couldStaffBeTeacher).map(normalizeUserData)) ||
    []
  );
};
