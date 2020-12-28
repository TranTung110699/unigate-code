export const getAttachment = (lecture) => {
  let attachment = [];
  if (lecture && lecture.attachments && lecture.attachments.length > 0) {
    attachment = lecture.attachments[0];
  }

  return attachment;
};
