import React from 'react';
import {Modal} from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type {ServerListItem} from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<ServerListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<ServerListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="Update"
            open={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          sn: props.values.sn,
          position: props.values.position,
          ip: props.values.ip,
        }}
        title="Basic"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
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
        <ProFormText
          width="md"
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              message: 'Position is required',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="ip"
          label="IP Address"
          rules={[
            {
              required: true,
              message: 'IP Address is required',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          status: props.values.status,
          hostname: props.values.hostname,
          mac: props.values.mac,
          bmc_ip: props.values.bmc_ip,
        }}
        title="Advanced"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
      >
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
        />
        <ProFormText width="md" name="hostname" label="Hostname"/>
        <ProFormText width="md" name="mac" label="MAC Address"/>
        <ProFormText width="md" name="bmc_ip" label="BMC IP Address"/>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          comment: props.values.comment,
        }}
        title="More"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
      >
        <ProFormTextArea width="md" name="comment" label="Comment"/>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
