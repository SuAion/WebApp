import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取图集列表轮播
 * GET
 * params: {
 * }
 */
export const BoutiqueAtlas = (params) => {
  return requestGet(`home/BoutiqueAtlas`,params);
}


/**
 * 获取图集列表轮播
 * GET
 * params: {
 * }
 */
export const BoutiqueList = (params) => {
  return requestGet(`home/BoutiqueList`,params);
}

