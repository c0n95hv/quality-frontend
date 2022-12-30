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
import {getTool, addTool, updateTool, removeTool} from './service';
import type {ToolListItem, ToolListPagination} from './data';


const handleAdd = async (fields: ToolListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addTool({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const handleUpdate = async (fields: FormValueType, currentRow?: ToolListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateTool({
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


const handleRemove = async (selectedRows: ToolListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeTool({
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
  const [currentRow, setCurrentRow] = useState<ToolListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ToolListItem[]>([]);


  const columns: ProColumns<ToolListItem>[] = [
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
      title: 'Number',
      dataIndex: 'number',
    },
    {
      title: 'Version',
      dataIndex: 'version',
    },
    {
      title: 'Case',
      dataIndex: 'case',
    },
    {
      title: 'Path',
      dataIndex: 'path',
    },
    {
      title: 'Maintainer',
      dataIndex: 'maintainer',
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
      <ProTable<ToolListItem, ToolListPagination>
        headerTitle="Tool"
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
        pagination={{
          showSizeChanger: true,
        }}
        request={getTool}
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
        title="New Tool"
        width="600px"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as ToolListItem);
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
        <ProFormText width="md" name="number" label="Number"/>
        <ProFormText width="md" name="version" label="Version"/>
        <ProFormText width="md" name="case" label="Case"/>
        <ProFormText width="md" name="path" label="Path"/>
        <ProFormText width="md" name="maintainer" label="Maintainer"/>
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
          <ProDescriptions<ToolListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<ToolListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
