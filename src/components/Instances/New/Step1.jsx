import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';

import FormButtonArea from './FormButtonArea';

import images from '../../../store/images.json';
import snapshots from '../../../store/snapshots.json';

import startsWith from 'lodash/startsWith';
import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      systemType: '',
    };
  }

  handleSubmit = (e) => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.handleNextClick(e);
    });
  };

  handleSystemChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  filterImageSystem(images) {
    let systems = [{ name:'All', value:'' }];
    images.map((image) => {
      let re = /^(\w+)\s+\w+/ig;
      let name = re.exec(image.name)[1];
      systems = uniqWith([...systems, { name: name, value: name }], isEqual);//去重
    });
    return systems;
  };

  render() {
    const { spec } = this.props;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14, offset: 1 },
    };

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: spec.name,
    });

    /*根据已选系统类型筛选系统镜像*/
    const systemType = this.state.systemType;
    const systems = this.filterImageSystem(images);
    const imageData = spec.imageType == 'image' ?
      images.filter(image => startsWith(image.name, systemType)) : snapshots;

    const imageOptions = imageData.map((image) =>
      <Radio key={image.name} value={image.name} name="image">
        <div className="image-option">{image.name}</div>
      </Radio>);
    /*系统选择控件*/
    const sysOp =
      <FormItem
        {...formItemLayout}
        label="系统:"
      >
        <RadioGroup
          name="systemType"
          value={this.state.systemType}
          size=""
          onChange={this.handleSystemChange}
        >
          {systems.map((system) =>
            <RadioButton
              key={system.name}
              value={system.value}
              name="systemType"
            >
              {system.name}
            </RadioButton>
          )}
        </RadioGroup>
      </FormItem>;

    /*是否显示系统选择控件*/
    const sysOpItem = spec.imageType == 'image' ? sysOp : null;

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem
            {...formItemLayout}
            label="名称:"
          >
            <Input
              {...nameProps}
              placeholder="云主机名称"
              onChange={this.props.handleSpecChange}
              name="name"
              value={spec.name}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="镜像:"
          >
            <RadioGroup
              name="imageType"
              value={spec.imageType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="image" name="imageType">系统镜像</RadioButton>
              <RadioButton value="snapshot" name="imageType">主机快照</RadioButton>
            </RadioGroup>
          </FormItem>

          {/*系统选择控件*//*系统选择控件*/}
          {sysOpItem}

          <FormItem
            wrapperCol={{ span: 21, offset: 6 }}
          >
            <div className="images">
              <RadioGroup
                name="image"
                value={spec.image}
                onChange={this.props.handleSpecChange}
              >
                {imageOptions}
              </RadioGroup>
            </div>
          </FormItem>
        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit}/>
      </Form>
    );
  }
}

export default Form.create()(Step1);
