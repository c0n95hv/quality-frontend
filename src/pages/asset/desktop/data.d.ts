export type DesktopListItem = {
  id: number;
  name: string;
  sn: string;
  status: string;
  position: string;
  comment: string;
  hostname: string;
  ip: string;
  mac: string;
  ssd_pcb: string;
  power_pcb: string;
  raspberry_pi_ip: string;
  raspberry_pi_mac: string;
};

export type DesktopListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type DesktopListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type DesktopListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
