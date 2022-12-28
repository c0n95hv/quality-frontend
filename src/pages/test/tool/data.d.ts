export type ToolListItem = {
  id: number;
  name: string;
  number: string;
  status: string;
  version: string;
  case: string;
  path: string;
  maintainer: string;
  comment: string;
};

export type ToolListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ToolListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type ToolListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
