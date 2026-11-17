export const HERO_CATEGORY_SLUG = 'opernye-syuzhety';
export const FEED_CATEGORY_SLUG = 'listaya-libretto';

export function buildHomepageSections(posts, feedLimit = 6) {
  const orderedPosts = [...posts].sort((a, b) => {
    const aDate = Date.parse(a.publishedAt || '') || 0;
    const bDate = Date.parse(b.publishedAt || '') || 0;
    return bDate - aDate;
  });

  const heroPost = orderedPosts.find((post) => post.categorySlug === HERO_CATEGORY_SLUG) || null;
  const feedPosts = orderedPosts
    .filter((post) => post.categorySlug === FEED_CATEGORY_SLUG)
    .slice(0, feedLimit);
  const freshPosts = orderedPosts.filter((post) => post._id !== heroPost?._id);

  return { heroPost, feedPosts, freshPosts };
}
