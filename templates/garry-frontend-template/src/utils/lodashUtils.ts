// Centralize lodash imports so other files only import from this module.
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import set from 'lodash/set';

export const lodashUtils = {
  cloneDeep,
  get,
  isEqual,
  merge,
  set,
};

export { cloneDeep, get, isEqual, merge, set };
