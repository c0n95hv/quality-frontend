import React from 'react';
import {Modal} from 'antd';
import {
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type {ToolListItem} from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<ToolListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<ToolListItem>;
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
            title="Update Server"
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
          number: props.values.number,
          version: props.values.version,
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
        <ProFormText width="md" name="number" label="Number"/>
        <ProFormText width="md" name="version" label="Version"/>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          case: props.values.case,
          path: props.values.path,
          maintainer: props.values.maintainer,
        }}
        title="Advanced"
        layout="horizontal"
        labelCol={{span: 6}}
        wrapperCol={{span: 24}}
      >
        <ProFormText width="md" name="case" label="Case"/>
        <ProFormText width="md" name="path" label="Path"/>
        <ProFormText width="md" name="maintainer" label="Maintainer"/>
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
