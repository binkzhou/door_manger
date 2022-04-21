/**
 * api
 */
import { request } from './interceptors';
/**
 * 获取用户量列表
 */
export const getUserList = () => {
  return request({
    url: '/user/list',
    method: 'GET',
  });
};

/**
 * 获取日志
 */

export const getLog = () => {
  return request({
    url: '/log/list',
    method: 'GET',
  });
};

/**
 * 获取小区列表
 */

export const getCommunity = () => {
  return request({
    url: '/community/list',
    method: 'GET',
  });
};

/**
 * 添加小区
 */

export const addCommunity = (data) => {
  return request({
    url: '/community/create',
    method: 'POST',
    data,
  });
};

/**
 * 修改小区
 */
export const updateCommunity = (data) => {
  return request({
    url: '/community/edit',
    method: 'POST',
    data,
  });
};

/**
 * 删除小区
 */
export const delateCommunity = (communityId) => {
  return request({
    url: '/community/delete',
    method: 'GET',
    params: { communityId },
  });
};

/**
 * 获取门禁列表
 */

export const getDoors = (communityId) => {
  return request({
    url: '/door/list',
    method: 'GET',
    params: { communityId },
  });
};

/**
 * 添加门禁
 */

export const addDoor = (data) => {
  return request({
    url: '/door/create',
    method: 'POST',
    data,
  });
};

/**
 * 查看门禁密码
 */
export const getDoorPassWord = (data) => {
  return request({
    url: '/door/password',
    method: 'GET',
  });
};

/**
 * 删除门禁
 */
export const delateDoor = (doorId) => {
  return request({
    url: '/door/delete',
    method: 'GET',
    params: { doorId },
  });
};

/**
 * 呼叫门卫
 */
export const getActionCall = (doorId) => {
  return request({
    url: '/action/call',
    method: 'GET',
    params: { doorId },
  });
};

/**
 * 锁门
 */
export const getActionLock = (data) => {
  return request({
    url: '/action/lock',
    method: 'POST',
    data,
  });
};
/**
 * 打开摄像头
 */
export const getActionStart = (testParam) => {
  return request({
    url: '/action/start',
    method: 'GET',
    params: { testParam },
  });
};
/**
 * 解锁门禁
 */
export const getActionUnlock = (data) => {
  return request({
    url: '/action/unlock',
    method: 'POST',
    data,
  });
};