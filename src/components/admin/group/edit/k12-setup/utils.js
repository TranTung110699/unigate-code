export const isSetup = (group) =>
  group.enrolment_plans &&
  group.enrolment_plans.length &&
  group.k12_grades_synced;
export const isSetupForCurrentSemester = (group, currentSemesterIid) => {
  let ret = false;
  if (!group.enrolment_plans) return false;

  group.enrolment_plans.forEach((ep) => {
    if (ep.semester == currentSemesterIid) ret = true;
  });

  return ret;
};
