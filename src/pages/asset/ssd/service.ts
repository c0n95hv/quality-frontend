// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {SSDListItem} from './data';

export async function getSSD(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: SSDListItem[];
    total?: number;
    success?: boolean;
  }>('/api/asset/ssd/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateSSD(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<SSDListItem>('/api/asset/ssd/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addSSD(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<SSDListItem>('/api/asset/ssd/', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeSSD(data: { id: number[] }, options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/asset/ssd/', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
