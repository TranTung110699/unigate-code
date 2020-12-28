import { unaccentVietnamese, uppercaseVietnamese } from 'common/utils/string/vn';

test('unaccentVietnamese works ok', () => {
  const str = "Nga thông báo đóng cửa lãnh sứ quán Mỹ. NGA THÔNG BÁO ĐÓNG CỬA LÃNH SỨ QUÁN MỸ";
  const expected = "Nga thong bao dong cua lanh su quan My. NGA THONG BAO DONG CUA LANH SU QUAN MY";
  const result = unaccentVietnamese(str);
  // console.log(result, expected);
  expect(result).toEqual(expected);
});

test('uppercaseVietnamese works ok', () => {
  const str = "Nga thông báo đóng cửa lãnh sứ quán Mỹ";
  const expected = "NGA THÔNG BÁO ĐÓNG CỬA LÃNH SỨ QUÁN MỸ";
  const result = uppercaseVietnamese(str);
  console.log(result, expected);
  expect(result).toEqual(expected);
  
});
