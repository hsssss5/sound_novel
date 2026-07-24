/** Prefix path with Vite `base` (e.g. `/sound_novel/` on GitHub Pages). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
