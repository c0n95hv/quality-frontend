export type ServerListItem = {
  key: number;
  name: string;
  sn: string;
  status: string;
  position: string;
  commit: string;
  hostname: string;
  ip: string;
  mac: string;
  bmc_ip: string;
};

export type ServerListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ServerListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type ServerListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
