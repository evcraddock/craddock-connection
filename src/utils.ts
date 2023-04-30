export function truncateString(value: string, length: number) {
  if (value.length <= length) {
    return value;
  }

  return value.slice(0, length) + ' ...';
}
