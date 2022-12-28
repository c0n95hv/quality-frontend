// @ts-ignore
/* eslint-disable */
import {request} from 'umi';
import {ToolListItem} from './data';

export async function getTool(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: ToolListItem[];
    total?: number;
    success?: boolean;
  }>('/api/test/tool/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateTool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ToolListItem>('/api/test/tool/', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function addTool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<ToolListItem>('/api/test/tool/', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function removeTool(data: { id: number[] }, options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/test/tool/', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
