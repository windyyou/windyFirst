import React from 'react';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Spin from 'antd/lib/spin';
import Collapse from 'antd/lib/collapse';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';

import FormButtonArea from '../../../common/FormButtonArea';
import NetWork from './NetWork';

import startsWith from 'lodash/startsWith';
import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Panel = Collapse.Panel;
const Option = Select.Option;

function formatter(value) {
  return `${value}G`;
}

class Step2 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    keypair: React.PropTypes.object.isRequired,
    stack: React.PropTypes.object.isRequired,
    image: React.PropTypes.object.isRequired,
    snapshot: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
    handleNetInstance: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      systemType: '',
    };
  }

  getSliderTip = list => index => list[index];

  getSystems(images) {
    const systems = images.map((image) => image.name.split(/[\-_\s]+/)[0]);

    return uniqWith(systems, isEqual);
  }

  getImages(image, systemType) {
    if (systemType) {
      return image.list.data.filter(img => startsWith(img.name, systemType));
    }

    return image.list.data;
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

  handleSliderChange = (name, list) => value => {
    const event = {
      target: {
        name,
        value: parseInt(list[value], 10),
      },
    };

    this.props.handleSpecChange(event);
  };

  handleVolumeSizeChange = (value) => {
    const event = {
      target: {
        name: 'volumeSize',
        value,
      },
    };

    this.props.handleSpecChange(event);
  }

  handleKeypairChange = (value) => {
    const event = {
      target: {
        name: 'keypair',
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleQuantityChange = (value) => {
    const event = {
      target: {
        name: 'quantity',
        value,
      },
    };

    this.setState({
      max: value - this.props.spec.sum,
    });

    this.props.handleSpecChange(event);
  };

  passwordField = (spec, formItemLayout) => {
    const { getFieldProps } = this.props.form;
    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, min: 6, message: '密码至少为6位字符' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: spec.password,
    });

    return (
      <FormItem {...formItemLayout} label="密码:">
        <Input
          {...passwordProps}
          placeholder="密码"
          onChange={this.props.handleSpecChange}
          name="password"
          type="password"
          value={spec.password}
        />
      </FormItem>
    );
  };

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  renderKeypair(formItemLayout) {
    const { spec, keypair } = this.props;
    const { getFieldProps } = this.props.form;
    const isFetching = keypair.list.isFetching;
    const error = keypair.list.error;

    const keypairProps = getFieldProps('keypair', {
      rules: [
        { required: true, message: '请选择密钥' },
      ],
      onChange: this.handleKeypairChange,
      initialValue: spec.keypair,
    });

    let contents = '';
    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = (
        <Select
          {...keypairProps}
          style={{ width: 200 }}
          showSearch={false}
        >
          {keypair.list.data.map((key) => <Option key={key.id} value={key.id}>{key.name}</Option>)}
        </Select>);
    }

    return (
      <FormItem {...formItemLayout} label="密钥:">
        {contents}
      </FormItem>
    );
  }

  renderSlider(type) {
    const { stack, spec } = this.props;
    const isFetching = stack.config.isFetching;
    const error = stack.config.error;
    let unit = '';
    let contents = '';
    let list = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      if (type === 'core') {
        unit = '核';
        list = stack.config.data.core.core.map(item => `${item}${unit}`);
      }

      if (type === 'ram') {
        unit = 'G';
        list = stack.config.data.ram.size.map(item => `${item / 1024}${unit}`);
      }

      if (list.length > 0) {
        contents = (<Slider
          marks={list}
          step={null}
          value={list.indexOf(`${spec[type]}${unit}`)}
          onChange={this.handleSliderChange(type, list)}
          tipFormatter={this.getSliderTip(list)}
        />);
      }
    }

    return contents;
  }

  renderCpus() {
    return this.renderSlider('core');
  }

  renderMemorys() {
    return this.renderSlider('ram');
  }

  renderSystemTypes(formItemLayout) {
    const { spec, image } = this.props;
    const images = this.getImages(image);
    if (spec.sourceType !== 'image') return null;

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

  renderVolumes(formItemLayout) {
    const { stack, spec } = this.props;
    const { getFieldProps } = this.props.form;
    const isFetching = stack.config.isFetching;
    const error = stack.config.error;

    const volumeProps = getFieldProps('volume', {
      rules: [
        { required: true, message: '请选系统盘类型' },
      ],
      onChange: this.props.handleSpecChange,
      initialValue: spec.volumeType,
    });

    let contents = '';
    let slider = '';
    const unit = 'G';
    if (isFetching) {
      contents = this.renderFetching();
      slider = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
      slider = this.renderFetching();
    } else {
      contents = (
        <RadioGroup
          {...volumeProps}
          size="large"
        >
          {stack.config.data.volume.type.map(type =>
            <RadioButton key={type.name} value={type.name} name="volumeType">{type.name}</RadioButton>)}
        </RadioGroup>
      );

      const list = {
        1: `1${unit}`,
        [stack.config.data.volume.size]: `${stack.config.data.volume.size}${unit}`
      }

      slider = (
        <Row>
          <Col span={18}>
            <Slider
              marks={list}
              min={1}
              tipFormatter={formatter}
              max={stack.config.data.volume.size}
              onChange={this.handleVolumeSizeChange}
              value={spec.volumeSize} />
          </Col>
          <Col span={5}>
            <InputNumber
              min={1}
              max={20}
              style={{ marginLeft: '16px' }}
              value={spec.volumeSize}
              onChange={this.handleVolumeSizeChange}
          />
          </Col>
          <Col span={1}>
            {unit}
          </Col>
        </Row>
      )
    }

    return (
      <div>
        <FormItem{...formItemLayout}label="系统盘类型:">
          {contents}
        </FormItem>
        <FormItem{...formItemLayout}label="系统盘容量:">
          {slider}
        </FormItem>
      </div>
    );
  }

  renderInstanceType() {
    const { stack } = this.props;
    const isFetching = stack.config.isFetching;
    const error = stack.config.error;

    let contents = '';
    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = (
        <RadioGroup
          size="large"
          disabled
          defaultValue={stack.config.data.instanceType[0].id}
        >
          {stack.config.data.instanceType.map(type =>
            <RadioButton key={type.id} value={type.id} name="instanceType">
              {type.name}
            </RadioButton>)}
        </RadioGroup>
      );
    }

    return contents;
  }

  renderImages() {
    const { spec, image, snapshot, handleSpecChange } = this.props;
    const { getFieldProps } = this.props.form;
    const systemType = this.state.systemType;
    const isImage = spec.sourceType === 'image';
    const isFetching = isImage ? image.list.isFetching : snapshot.list.isFetching;
    const error = isImage ? image.list.error : snapshot.list.error;
    const source = isImage ? '镜像' : '快照';

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12, offset: 1 },
    };

    const radioProps = getFieldProps('source', {
      rules: [
        { required: true, message: `请选择${source}` },
      ],
      onChange: handleSpecChange,
      initialValue: spec.source,
    });

    let contents = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      const images = isImage ? this.getImages(image, systemType) : this.getImages(snapshot);
      contents = (
        <RadioGroup
          {...radioProps}
        >
          {images.map((img) =>
            <Radio key={img.id} value={img.id} name="source">
              <div className="image-option"> {img.name}</div>
            </Radio>)}
        </RadioGroup>
      );
    }

    return (
      <div className="images">
        <FormItem {...formItemLayout} label={`${source}:`}>
          {contents}
        </FormItem>
      </div>
    );
  }

  renderSystem() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="system-area">
          <FormItem {...formItemLayout} label="源类型:">
            <RadioGroup
              name="sourceType"
              value={spec.sourceType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="image" name="sourceType">系统镜像</RadioButton>
              <RadioButton value="snapshot" name="sourceType">主机快照</RadioButton>
            </RadioGroup>
          </FormItem>

          {this.renderSystemTypes(formItemLayout)}

          {this.renderImages()}

        </div>
      </Form>
    );
  }

  renderConfigure() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="configure-area">
          <FormItem {...formItemLayout} label="主机类型:">
            {this.renderInstanceType()}
          </FormItem>

          <FormItem {...formItemLayout} label="CPU:">
            {this.renderCpus()}
          </FormItem>

          <FormItem {...formItemLayout} label="内存:">
            {this.renderMemorys()}
          </FormItem>

          {this.renderVolumes(formItemLayout)}

          <FormItem {...formItemLayout} label="用户名:">
            <Input defaultValue={spec.userName} disabled />
          </FormItem>
          <FormItem {...formItemLayout} label="登录方式:">
            <RadioGroup
              name="credentialType"
              value={spec.credentialType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="password" name="credentialType">密码</RadioButton>
              <RadioButton value="keypair" name="credentialType">密钥</RadioButton>
            </RadioGroup>
          </FormItem>
          {spec.credentialType === 'password' ?
            this.passwordField(spec, formItemLayout) : this.renderKeypair(formItemLayout)}
          <FormItem {...formItemLayout} label="数量:">
            <InputNumber
              min={1}
              max={100}
              name="quantity"
              defaultValue={spec.quantity}
              onChange={this.handleQuantityChange}
            />
          </FormItem>

        </div>
      </Form>
    );
  }

  render() {
    return (
      <Col span="24">
        <div className="col-area">
          <Collapse defaultActiveKey={['1', '2', '3']}>
            <Panel header="系统" key="1">
              {this.renderSystem()}
            </Panel>
            <Panel header="配置" key="2">
              {this.renderConfigure()}
            </Panel>
            <Panel header="网络" key="3">
              <NetWork
                spec={this.props.spec}
                handleSpecChange={this.props.handleSpecChange}
                handleNetInstance={this.props.handleNetInstance}
              />
            </Panel>
          </Collapse>
          <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
        </div>
      </Col>
    );
  }
}

export default Form.create()(Step2);
