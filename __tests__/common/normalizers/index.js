
import { normalizeVimeoUrl, normalizeYoutubeUrl } from 'common/normalizers/index';

test('normlizeVimeoUrl full http correctly', () => {
  const url = 'https://vimeo.com/216098603';
  const expected = '216098603';
  const result = normalizeVimeoUrl(url);

  expect(result).toEqual(expected);
});

test('normalizeYoutubeUrl full http correctly', () => {
  const url = 'https://www.youtube.com/watch?v=bOOx8tvwToc&index=24&list=RDonrF0WDHSNY';
  const expected = 'bOOx8tvwToc';
  const result = normalizeYoutubeUrl(url);

  expect(result).toEqual(expected);
});

test('normlizeVimeoUrl keeps id intact', () => {
  const url = '216098603';
  const expected = '216098603';
  const result = normalizeVimeoUrl(url);

  expect(result).toEqual(expected);
});
