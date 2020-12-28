import {parseItemAncestorsFromUrlCommon} from 'routes/links/common';
// import {convertAllowedValuesToMultiOptions} from "../../src/common/utils/form";


test('convertAllowedValuesToMultiOptions', () => {
  const url = "/admin/group/151698/members/add";
  const actual = parseItemAncestorsFromUrlCommon(url);

  const expected = {
    "action": "members",
    "itemAncestors": [{"iid": "151698", "ntype": "group", "pIid": 0, "type": undefined}],
    "subAction": ["add"],
  };

  expect(actual).toEqual(expected);

  console.log(actual);
});

