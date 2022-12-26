import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Drawer} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {getSSD, addSSD, updateSSD, removeSSD} from './service';
import type {SSDListItem, SSDListPagination} from './data';


const handleAdd = async (fields: SSDListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addSSD({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const handleUpdate = async (fields: FormValueType, currentRow?: SSDListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateSSD({
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


const handleRemove = async (selectedRows: SSDListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeSSD({
      id: selectedRows.map((row) => row.id),
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
  const [currentRow, setCurrentRow] = useState<SSDListItem>();
  const [selectedRowsState, setSelectedRows] = useState<SSDListItem[]>([]);


  const columns: ProColumns<SSDListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      valueEnum: {
        'Unknown': {
          text: 'Unknown',
          status: 'Warning',
        },
        'Shutdown': {
          text: 'Shutdown',
          status: 'Default',
        },
        'Processing': {
          text: 'Processing',
          status: 'Processing',
        },
        'Online': {
          text: 'Online',
          status: 'Success',
        },
        'Abnormal': {
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
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
    },
    {
      title: 'Firmware',
      dataIndex: 'firmware',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      valueType: 'textarea',
      // ellipsis: true,
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
      <ProTable<SSDListItem, SSDListPagination>
        headerTitle="SSD"
        actionRef={actionRef}
        rowKey="id"
        search={false}
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
        request={getSSD}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar>
          <Button
            danger
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
        title="New SSD"
        width="600px"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as SSDListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Name is required',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="sn"
          label="Serial Number"
          rules={[
            {
              required: true,
              message: 'Serial Number is required',
            },
          ]}
        />
        <ProFormSelect
          name="status"
          width="md"
          label="Status"
          valueEnum={{
            'Unknown': 'Unknown',
            'Shutdown': 'Shutdown',
            'Processing': 'Processing',
            'Online': 'Online',
            'Abnormal': 'Abnormal',
          }}
          rules={[
            {
              required: true,
              message: 'Status is required',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="position"
          label="Position"
        />
        <ProFormText
          width="md"
          name="model"
          label="Model"
          rules={[
            {
              required: true,
              message: 'Model Address is required',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="capacity"
          label="Capacity"
          rules={[
            {
              required: true,
              message: 'Capacity is required',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="firmware"
          label="Firmware"
          rules={[
            {
              required: true,
              message: 'Firmware is required',
            },
          ]}
        />
        <ProFormTextArea width="md" name="comment" label="Comment"/>
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
          <ProDescriptions<SSDListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<SSDListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
