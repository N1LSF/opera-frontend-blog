const DEFAULT_SOCIAL_LINKS = [
  { platform: 'Telegram', url: 'https://t.me/operaread' },
  { platform: 'MAX', url: 'https://max.ru/id662402736818_biz' },
];

function channelKey(url = '') {
  if (url.includes('t.me/') || url.includes('telegram.me/')) return 'telegram';
  if (url.includes('max.ru/')) return 'max';
  return null;
}

export function getSocialLinks(configuredLinks = []) {
  const validLinks = configuredLinks.filter((link) => typeof link?.url === 'string' && link.url);

  const requiredLinks = DEFAULT_SOCIAL_LINKS.map((defaultLink) => {
    const key = channelKey(defaultLink.url);
    return validLinks.find((link) => channelKey(link.url) === key) || defaultLink;
  });

  const additionalLinks = validLinks.filter((link) => !channelKey(link.url));
  return [...requiredLinks, ...additionalLinks];
}
