const isUpperCase = new RegExp(/(?=.*[A-Z])/g);
const isSpecialChar = new RegExp(/(?=.#[ !@#$%*&])/g);
const isLowerCase = new RegExp(/(?=.*[a-z])/g);
const isLong = new RegExp(/(?=.{7,})/g);
const isNumeric = new RegExp(/(?=.*[0-9])/g);
const checkIsWhiteSpacefromBegAndEnd = new RegExp(/“[* ][\w\W ]*[* ]/g);

export const passwordValidator = (currentPassword: string): boolean => {
  if (
    currentPassword.match(isUpperCase) &&
    currentPassword.match(isSpecialChar) &&
    currentPassword.match(isLowerCase) &&
    currentPassword.match(isLong) &&
    currentPassword.match(isNumeric) &&
    currentPassword.match(checkIsWhiteSpacefromBegAndEnd)
  ) {
    return true;
  }
  return false;
};
