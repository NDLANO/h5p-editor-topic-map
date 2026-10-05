export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent ?? '';
};

export const capitalize = (str: string): string => {
  const stringIsEmpty = str.length === 0;
  if (stringIsEmpty) {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
};
