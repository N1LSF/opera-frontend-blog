import test from 'node:test';
import assert from 'node:assert/strict';

import { getSocialLinks } from '../src/lib/socialLinks.js';

test('social links always include Telegram and MAX without duplicating configured channels', () => {
  const links = getSocialLinks([
    { platform: 'MAX', url: 'https://max.ru/id662402736818_biz' },
    { platform: 'Telegram', url: 'https://t.me/operaread' },
    { platform: 'YouTube', url: 'https://youtube.com/example' },
  ]);

  assert.deepEqual(links, [
    { platform: 'Telegram', url: 'https://t.me/operaread' },
    { platform: 'MAX', url: 'https://max.ru/id662402736818_biz' },
    { platform: 'YouTube', url: 'https://youtube.com/example' },
  ]);
});
