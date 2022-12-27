import React from 'react';
import {Modal} from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type {SSDListItem} from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<SSDListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SSDListItem>;
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
            title="Update SSD"
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
          status: props.values.status,
          position: props.values.position,
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
        <ProFormText
          width="md"
          name="position"
          label="Position"
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          model: props.values.model,
          capacity: props.values.capacity,
          firmware: props.values.firmware,
        }}
        title="Advanced"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
      >
        <ProFormText
          width="md"
          name="model"
          label="Model"
          rules={[
            {
              required: true,
              message: 'Model is required',
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
