import test from 'node:test';
import assert from 'node:assert/strict';

import { articleImageUrl } from '../src/lib/sanity.js';

const source = {
  asset: {
    _ref: 'image-ad2f442e926825aa97e9a1aa0deefc2b710355b3-250x223-jpg',
  },
};

test('article covers and inline illustrations share a cropped 16:9 ratio', () => {
  const coverUrl = new URL(articleImageUrl(source, 1200));
  const inlineUrl = new URL(articleImageUrl(source, 960));

  assert.equal(coverUrl.searchParams.get('w'), '1200');
  assert.equal(coverUrl.searchParams.get('h'), '675');
  assert.equal(inlineUrl.searchParams.get('w'), '960');
  assert.equal(inlineUrl.searchParams.get('h'), '540');

  for (const url of [coverUrl, inlineUrl]) {
    assert.equal(url.searchParams.get('fit'), 'crop');
    assert.equal(url.searchParams.get('auto'), 'format');
  }
});
