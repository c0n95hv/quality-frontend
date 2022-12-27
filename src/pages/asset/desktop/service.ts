// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {DesktopListItem} from './data';

export async function getDesktop(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: DesktopListItem[];
    total?: number;
    success?: boolean;
  }>('/api/asset/desktop/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateDesktop(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<DesktopListItem>('/api/asset/desktop/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addDesktop(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<DesktopListItem>('/api/asset/desktop/', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeDesktop(data: { id: number[] }, options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/asset/desktop/', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
