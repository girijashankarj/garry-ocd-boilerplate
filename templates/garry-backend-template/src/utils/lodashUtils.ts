// Centralize lodash imports so other files only import from this module.
import * as lodash from 'lodash';

export const lodashUtils = lodash;
export const { cloneDeep, get, isEqual, merge, set } = lodash;
export default lodashUtils;
