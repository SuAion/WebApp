import { requestGet, requestPost} from '@/common/js/request';


/**
 * 获取圈子的详情表
 * GET
 * params: {
 * }
 */
export const CircleDetail = (params) => {
    return requestGet(`circle/CircleDetail`,params);
  }
  
/**
 * 获取圈子的详情表
 * GET
 * params: {
 * }
 */
export const CollectionCircle = (params) => {
    return requestGet(`circle/CollectionCircle`,params);
  }
  


/**
 * 获取圈子的详情表
 * GET
 * params: {
 * }
 */
export const CollectionCircleDel = (params) => {
  return requestGet(`circle/CollectionCircleDel`,params);
}
  


  