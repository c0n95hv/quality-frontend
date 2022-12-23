import type {Request, Response} from 'express';
import {parse} from 'url';
import type {ServerListItem, ServerListParams} from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: ServerListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      name: `Name-${index}`,
      sn: `SN-${index}`,
      status: (Math.floor(Math.random() * 10) % 4).toString(),
      position: `Position-${index}`,
      commit: `Commit-${index}`,
      hostname: `Hostname-${index}`,
      ip: `IP-${index}`,
      mac: `MAC-${index}`,
      bmc_ip: `BMC-IP-${index}`,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getServer(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const {current = 1, pageSize = 10} = req.query;
  const params = parse(realUrl, true).query as unknown as ServerListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter as any);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postServer(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const {name, sn, key} = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'POST':
      (() => {
        const newServer = {
          key: tableListDataSource.length,
          name,
          sn,
          status: (Math.floor(Math.random() * 10) % 4).toString(),
          position: `Position-${tableListDataSource.length}`,
          commit: `Commit-${tableListDataSource.length}`,
          hostname: `Hostname-${tableListDataSource.length}`,
          ip: `IP-${tableListDataSource.length}`,
          mac: `MAC-${tableListDataSource.length}`,
          bmc_ip: `BMC-IP-${tableListDataSource.length}`,
        };
        tableListDataSource.unshift(newServer);
        return res.json(newServer);
      })();
      return;

    case 'PUT':
      (() => {
        let newServer = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newServer = {...item, sn, name};
            return {...item, sn, name};
          }
          return item;
        });
        return res.json(newServer);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/server': getServer,
  'POST /api/server': postServer,
  'DELETE /api/server': postServer,
  'PUT /api/server': postServer,
};
