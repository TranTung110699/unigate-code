import common from 'common/network/http/Common';


test('should create post param correctly', () => {
  const input = {
    video: '123123-video-id',
    attachments: [
      {
        u: {
          id: '5836b4a0840e8219a565c721',
        },
        id: 'cover-twinkle-5',
        name: 'cover-twinkle-5',
      },
    ],
  };

  const expected = '216098603';
  const form = common.createFrom(input);
  console.error('video');
  console.log(form.get('video'));
  console.error('form');
  // console.dir(form.getAll());

  // Display the values
  // for (let value of form.values()) {
  //    console.log('sdfsdfs', value);
  // }

  console.error('attachments');

  console.dir(form.get('attachments'));
  console.dir(form.get('attachments[0][u][id]'));
  console.dir(form.get('attachments[0][name]'));
  console.error('attachments[]', form.get('attachments[]'));
  console.error('attachments[0]', form.get('attachments[0]'));
  // console.error('all values', form.values);


  expect(form).toEqual(expected);
});

