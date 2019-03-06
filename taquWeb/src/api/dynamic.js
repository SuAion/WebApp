import { requestGet, requestPost} from '@/common/js/request';


/**
 * 获取动态列表
 * GET
 * params: {
 * }
 */
export const dynamicList = (params) => {
  return requestGet(`user/dynamicList`,params);
}

/**
 * 获取动态列表
 * GET
 * params: {
 * }
 */
export const userComment = (params) => {
  return requestGet(`user/userComment`,params);
}

/**
 * 发布动态
 * POST
 * params: {
 * }
 */
export const dynamicPush = (params) => {
  return requestPost(`user/dynamicPush`,params);
}

/**
 * 上传图片
 * POST
 * params: {
 * }
 */
export const dynamicFile = (params) => {
  return requestPost(`user/dynamicFile`,params);
}


// ***********************************相册*******************************************
/**
 * 获取相册详情
 * GET
 * params: {
 * }
 */
export const PictureAlbum = (params) => {
  return requestGet(`user/PictureAlbum`,params);
}

/**
 * 获取相册列表
 * GET
 * params: {
 * }
 */
export const PictureList = (params) => {
  return requestGet(`user/PictureList`,params);
}

/**
 * 获取相册列表
 * POST
 * params: {
 * }
 */
export const AlbumSet = (params) => {
  return requestPost(`user/AlbumSet`,params);
}

/**
 * 上传图片
 * POST
 * params: {
 * }
 */
export const PicturePutFile = (params) => {
  return requestPost(`user/PicturePutFile`,params);
}

/**
 * 保存相册图片
 * POST
 * params: {
 * }
 */
export const PictureSet = (params) => {
  return requestPost(`user/PictureSet`,params);
}

/**
 * 清空相册
 * GET
 * params: {
 * }
 */
export const PictureDel = (params) => {
  return requestGet(`user/PictureDel`,params);
}

/**
 * 删除相册
 * GET
 * params: {
 * }
 */
export const AlbumDel = (params) => {
  return requestGet(`user/AlbumDel`,params);
}

/**
 * 获取分类列表
 * GET
 * params: {
 * }
 */
export const GetPictureType = (params) => {
  return requestGet(`user/GetPictureType`,params);
}




