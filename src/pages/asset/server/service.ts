// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {ServerListItem} from './data';

export async function getServer(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ServerListItem[];
    total?: number;
    success?: boolean;
  }>('/api/server', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateServer(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ServerListItem>('/api/server', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addServer(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ServerListItem>('/api/server', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeServer(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/server', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
