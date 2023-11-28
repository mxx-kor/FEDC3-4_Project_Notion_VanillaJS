export const validation = (target, component) => {
  if (!target) {
    throw new Error(
      `${component} 컴포넌트는 생성자 함수입니다. new 키워드를 추가해주세요.`
    );
  }
};

export const checkDifference = (prev, curr) => {
  return JSON.stringify(prev) === JSON.stringify(curr) ? true : false;
};

export const preventXSS = (value) => {
  if (value === null) return '';
  let preventValue = value;
  preventValue = preventValue.replaceAll('<', '&lt;');
  preventValue = preventValue.replaceAll('>', '&gt;');
  preventValue = preventValue.replaceAll('\\(', '&#40;');
  preventValue = preventValue.replaceAll('\\)', '&#41;');
  preventValue = preventValue.replaceAll("'", '&#x27;');
  return preventValue;
};

export const resolveXSS = (value) => {
  if (value === null) return '';
  let resolveValue = value;
  resolveValue = resolveValue.replaceAll('&lt;', '<');
  resolveValue = resolveValue.replaceAll('&gt;', '>');
  resolveValue = resolveValue.replaceAll('&#40;', '\\(');
  resolveValue = resolveValue.replaceAll('&#41;', '\\)');
  resolveValue = resolveValue.replaceAll('&#x27;', "'");
  return resolveValue;
};
