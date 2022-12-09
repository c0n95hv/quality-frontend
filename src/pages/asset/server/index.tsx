import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Drawer} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {getServer, addServer, updateServer, removeServer} from './service';
import type {ServerListItem, ServerListPagination} from './data';


const handleAdd = async (fields: ServerListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addServer({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const handleUpdate = async (fields: FormValueType, currentRow?: ServerListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateServer({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};


const handleRemove = async (selectedRows: ServerListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeServer({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ServerListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ServerListItem[]>([]);


  const columns: ProColumns<ServerListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      // tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Serial Number',
      dataIndex: 'sn',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Shutdown',
          status: 'Default',
        },
        1: {
          text: 'Processing',
          status: 'Processing',
        },
        2: {
          text: 'Online',
          status: 'Success',
        },
        3: {
          text: 'Abnormal',
          status: 'Error',
        },
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Hostname',
      dataIndex: 'hostname',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
    },
    {
      title: 'MAC Address',
      dataIndex: 'mac',
    },
    {
      title: 'BMC IP Address',
      dataIndex: 'bmc_ip',
    },
    {
      title: 'Commit',
      dataIndex: 'commit',
      valueType: 'textarea',
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          Update
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<ServerListItem, ServerListPagination>
        headerTitle="Server"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> New
          </Button>,
        ]}
        request={getServer}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar>
          <Button danger
                  onClick={async () => {
                    await handleRemove(selectedRowsState);
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }}
          >
            Delete
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="New Server"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as ServerListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Rule name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText width="md" name="sn"/>
        <ProFormText width="md" name="position"/>
        <ProFormText width="md" name="ip"/>
        <ProFormTextArea width="md" name="bmc_ip"/>
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<ServerListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<ServerListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
