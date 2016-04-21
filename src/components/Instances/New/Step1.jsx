import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';

import FormButtonArea from './FormButtonArea';

import startsWith from 'lodash/startsWith';
import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Step1 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.shape({
      imageType: React.PropTypes.string.isRequired,
    }),
    image: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      })),
    }),
    snapshot: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      })),
    }),
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      systemType: '',
    };
  }

  getSystems(images) {
    const systems = images.map((image) => /^(\w+)\s+\w+/ig.exec(image.name)[1]);

    return uniqWith(systems, isEqual);
  }

  getImages(image, systemType) {
    if (systemType) {
      return image.entities.filter(img => startsWith(img.name, systemType));
    }

    return image.entities;
  }

  handleSubmit = (e) => {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }

      this.props.handleNextClick(e);
    });
  };

  handleSystemChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  renderFetching() {
    return (
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  renderImages() {
    const { spec, image, snapshot, handleSpecChange } = this.props;
    const systemType = this.state.systemType;
    const isImage = spec.imageType === 'image';
    const isFetching = isImage ? image.isFetching : snapshot.isFetching;
    const error = isImage ? image.error : snapshot.error;
    let contents = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      const images = isImage ? this.getImages(image, systemType) : this.getImages(snapshot);
      contents = (
        <RadioGroup
          name="image"
          value={spec.image}
          onChange={handleSpecChange}
        >
          {images.map((img) =>
            <Radio key={img.name} value={img.name} name="image">
              <div className="image-option">{img.name}</div>
            </Radio>)}
        </RadioGroup>
      );
    }

    return (
      <FormItem wrapperCol={{ span: 21, offset: 6 }}>
        <div className="images">
          {contents}
        </div>
      </FormItem>
    );
  }

  renderSystemTypes(formItemLayout) {
    const { spec, image } = this.props;
    const images = this.getImages(image);
    if (spec.imageType !== 'image') return null;

    const systemOptions = this.getSystems(images)
      .map(name => ({ name, value: name }));
    systemOptions.unshift({ name: '全部', value: '' });

    return (
      <FormItem {...formItemLayout} label="系统:">
        <RadioGroup
          name="systemType"
          value={this.state.systemType}
          size=""
          onChange={this.handleSystemChange}
        >
          {systemOptions.map((system) =>
            <RadioButton
              key={system.name}
              value={system.value}
              name="systemType"
            >
              {system.name}
            </RadioButton>
          )}
        </RadioGroup>
      </FormItem>
    );
  }

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

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem {...formItemLayout} label="名称:">
            <Input
              {...nameProps}
              placeholder="云主机名称"
              onChange={this.props.handleSpecChange}
              name="name"
              value={spec.name}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="镜像:">
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

          {this.renderSystemTypes(formItemLayout)}

          {this.renderImages()}

        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step1);
