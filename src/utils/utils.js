import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};
export const objToParam = function(param) {
  if (Object.prototype.toString.call(param) !== '[object Object]') {
    return '';
  }
  let queryParam = '';
  for (let key in param) {
    if (param.hasOwnProperty(key)) {
      let value = param[key];
      queryParam += toQueryPair(key, value);
    }
  }
  return queryParam;
};

export const toQueryPair = function(key, value) {
  if (typeof value == 'undefined') {
    return `&${key}=`;
  }
  return `&${key}=${value}`;
};
/*
 *枚举转换
 */
export const changeEnum = (val, EnumType) => {
  if (localStorage.getItem('enum')) {
    return JSON.parse(localStorage.getItem('enum'))[EnumType].list[val];
  } else {
    return val;
  }
};
