import test from 'node:test';
import assert from 'node:assert/strict';

import { buildHomepageSections } from '../src/lib/homepage.js';

test('home sections use primary rubrics, dates and exclude the hero from fresh posts', () => {
  const posts = [
    {
      _id: 'feed-new',
      categorySlug: 'listaya-libretto',
      publishedAt: '2026-11-17T12:00:00Z',
    },
    {
      _id: 'hero-new',
      categorySlug: 'opernye-syuzhety',
      publishedAt: '2026-11-16T12:00:00Z',
    },
    {
      _id: 'other-newest',
      categorySlug: 'istoriya-sozdaniya',
      publishedAt: '2026-11-18T12:00:00Z',
    },
    {
      _id: 'hero-old',
      categorySlug: 'opernye-syuzhety',
      publishedAt: '2026-11-10T12:00:00Z',
    },
    {
      _id: 'additional-feed-only',
      categorySlug: 'istoriya-sozdaniya',
      additionalCategorySlugs: ['listaya-libretto'],
      publishedAt: '2026-11-15T12:00:00Z',
    },
    {
      _id: 'feed-old',
      categorySlug: 'listaya-libretto',
      publishedAt: '2026-11-11T12:00:00Z',
    },
  ];

  const sections = buildHomepageSections(posts);

  assert.equal(sections.heroPost?._id, 'hero-new');
  assert.deepEqual(sections.feedPosts.map((post) => post._id), ['feed-new', 'feed-old']);
  assert.deepEqual(sections.freshPosts.map((post) => post._id), [
    'other-newest',
    'feed-new',
    'additional-feed-only',
    'feed-old',
    'hero-old',
  ]);
});
