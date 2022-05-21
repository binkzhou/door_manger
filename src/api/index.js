/**
 * api
 */
import { request } from './interceptors';

/**
 * 登录
 */
export const loginApi = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  });
};

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

export const getLog = (keyword = ' ') => {
  return request({
    url: '/log/list',
    method: 'GET',
    params: { keyword },
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
 * 修改门禁
 */
export const updateDoor = (data) => {
  return request({
    url: '/door/update',
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
export const getActionLock = (params) => {
  return request({
    url: '/action/lock',
    method: 'POST',
    params,
  });
};
/**
 * 打开摄像头
 */
export const getActionStart = () => {
  return request({
    url: '/action/start',
    method: 'GET',
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
/**
 * 查看密码
 */
export const getPassword = (doorId) => {
  return request({
    url: 'door/password',
    method: 'GET',
    params: { doorId },
  });
};
