import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取圈子分类
 * GET
 * params: {
 * }
 */
export const CircleList = (params) => {
  return requestGet(`circle/CircleList`,params);
}

/**
 * 关注圈子
 * GET
 * params: {
 * }
 */
export const CollectionCircle = (params) => {
  return requestGet(`circle/CollectionCircle`,params);
}



/**
* 取消关注圈子
* GET
* params: {
* }
*/
export const CollectionCircleDel = (params) => {
return requestGet(`circle/CollectionCircleDel`,params);
}



