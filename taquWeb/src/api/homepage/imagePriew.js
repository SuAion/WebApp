import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取免费图集
 * GET
 * params: {
 * }
 */
export const AtlasDetail = (params) => {
  return requestGet(`home/AtlasDetail`,params);
}


/**
 * 获取收费图集
 * GET
 * params: {
 * }
 */
export const AtlasCharge = (params) => {
  return requestGet(`home/AtlasCharge`,params);
}


/**
 * 购买收费图集
 * GET
 * params: {
 * }
 */
export const BoutiqueBuy = (params) => {
    return requestGet(`home/BoutiqueBuy`,params);
  }
