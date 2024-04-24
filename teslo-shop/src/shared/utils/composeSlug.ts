export function composeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(/\s/g, '_')
    .replaceAll(/\W/g, '');
}
