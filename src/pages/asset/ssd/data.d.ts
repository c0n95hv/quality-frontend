export type SSDListItem = {
  id: number;
  name: string;
  sn: string;
  status: string;
  position: string;
  comment: string;
  model: string;
  capacity: string;
  firmware: string;
};

export type SSDListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type SSDListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type SSDListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
