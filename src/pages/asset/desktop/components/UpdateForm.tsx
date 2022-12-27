import React from 'react';
import {Modal} from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type {DesktopListItem} from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<DesktopListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<DesktopListItem>;
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
            title="Update Desktop"
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
        />
        <ProFormText
          width="md"
          name="position"
          label="Position"
        />
        <ProFormText
          width="md"
          name="ip"
          label="IP"
          rules={[
            {
              required: true,
              message: 'IP is required',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          status: props.values.status,
          hostname: props.values.hostname,
          mac: props.values.mac,
          ssd_pcb: props.values.ssd_pcb,
          power_pcb: props.values.power_pcb,
          raspberry_pi_ip: props.values.raspberry_pi_ip,
          raspberry_pi_mac: props.values.raspberry_pi_mac,
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
        <ProFormText width="md" name="mac" label="MAC"/>
        <ProFormText width="md" name="ssd_pcb" label="SSD PCB"/>
        <ProFormText width="md" name="power_pcb" label="Power PCB"/>
        <ProFormText width="md" name="raspberry_pi_ip" label="Raspberry Pi IP"/>
        <ProFormText width="md" name="raspberry_pi_mac" label="Raspberry Pi MAC"/>
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
