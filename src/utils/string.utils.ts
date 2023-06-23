export const capitalize = (str: string): string => {
  const stringIsEmpty = str.length === 0;
  if (stringIsEmpty) {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const stripHTML = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};
