export const formatUserData = (user) => {
  const formattedUser = user;

  if (user && user.parent && user.parent.name) {
    formattedUser.parent__name = user.parent.name;
  }

  if (user && user.parent && user.parent.phone) {
    formattedUser.parent__phone = user.parent.phone;
  }

  if (user && user.parent && user.parent.mail) {
    formattedUser.parent__mail = user.parent.mail;
  }

  if (user && user.school && user.school.id) {
    formattedUser.school__id = user.school.id;
  }

  if (user && user.school && user.school.province) {
    formattedUser.school__province = user.school.province;
  }

  if (user && user.school && user.school.district) {
    formattedUser.school__district = user.school.district;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.high_school_diploma
  ) {
    formattedUser.admission_documents__high_school_diploma =
      user.admission_documents.high_school_diploma;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.original_admission_notice
  ) {
    formattedUser.admission_documents__original_admission_notice =
      user.admission_documents.original_admission_notice;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.copy_of_notarized_birth_certificate
  ) {
    formattedUser.admission_documents__copy_of_notarized_birth_certificate =
      user.admission_documents.copy_of_notarized_birth_certificate;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.high_school_diploma_certificate_temporary
  ) {
    formattedUser.admission_documents__high_school_diploma_certificate_temporary =
      user.admission_documents.high_school_diploma_certificate_temporary;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.a_health_certificate_issued
  ) {
    formattedUser.admission_documents__a_health_certificate_issued =
      user.admission_documents.a_health_certificate_issued;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents
      .a_copy_of_the_military_service_registration_certificate
  ) {
    formattedUser.admission_documents__a_copy_of_the_military_service_registration_certificate =
      user.admission_documents.a_copy_of_the_military_service_registration_certificate;
  }

  if (
    user &&
    user.admission_documents &&
    user.admission_documents.is_prioritized_or_beneficiaries
  ) {
    formattedUser.admission_documents__is_prioritized_or_beneficiaries =
      user.admission_documents.is_prioritized_or_beneficiaries;
  }

  formattedUser.positions = Array.isArray(user.positions) ? user.positions : [];

  return formattedUser;
};

export const formatInvoiceData = (invoice, student) => {
  const formattedInvoice = invoice;
  if (invoice.payer && invoice.payer.name) {
    formattedInvoice.payer__name = invoice.payer.name;
  } else if (student && student.name) {
    formattedInvoice.payer__name = student.name;
  }

  if (invoice.payer && invoice.payer.phone) {
    formattedInvoice.payer__phone = invoice.payer.phone;
  } else if (student && student.phone) {
    formattedInvoice.payer__phone = student.phone;
  }

  return formattedInvoice;
};
