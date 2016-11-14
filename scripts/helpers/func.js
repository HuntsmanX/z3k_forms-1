import isNil from "lodash/isNil";
import isNaN from "lodash/isNaN";

export const isPresent = (val) => {
  return !isNil(val) && !isNaN(val) && val != 0 && val != '';
};

export const isBlank = (val) => {
  return isNil(val) || isNaN(val) || val == 0 || val == '';
}
