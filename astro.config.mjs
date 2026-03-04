// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static', // <-- ДОБАВЬ ЭТУ СТРОКУ! Говорит Astro генерировать статические HTML файлы.
  trailingSlash: 'always', // <-- ДОБАВЬ ЭТУ СТРОКУ! Гарантирует, что URL-ы будут заканчиваться на слэш, что хорошо для статических хостингов и ViewTransitions.

  // Если у тебя есть TailwindCSS, то должно быть так:
  // integrations: [tailwind()],
  // Если у тебя нет Tailwind, можешь удалить строку 'import tailwind...' и 'integrations: [tailwind()]'.
  // Но если есть, то должно быть
  // integrations: [tailwind()],
});