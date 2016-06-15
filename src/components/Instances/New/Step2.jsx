import React from 'react';
import Form from 'antd/lib/form';
import Slider from 'antd/lib/slider';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';

import FormButtonArea from '../../common/FormButtonArea';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Step2 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.shape({
      subnet: React.PropTypes.string.isRequired,
      core: React.PropTypes.number.isRequired,
      ram: React.PropTypes.number.isRequired,
      networkType: React.PropTypes.string.isRequired,
    }),
    instance: React.PropTypes.shape({
      config: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          core: React.PropTypes.object.isRequired,
          ram: React.PropTypes.object.isRequired,
          volume: React.PropTypes.object.isRequired,
          instanceType: React.PropTypes.array.isRequired,
        }).isRequired,
      }),
    }),
    config: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      instance: React.PropTypes.shape({
        cpu: React.PropTypes.array.isRequired,
        memory: React.PropTypes.array.isRequired,
      }).isRequired,
    }),
    network: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        entities: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          subnets: React.PropTypes.array.isRequired,
        })),
      }),
    }),
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  getSliderTip = list => index => list[index];

  handleSliderChange = (name, list) => value => {
    const event = {
      target: {
        name,
        value: parseInt(list[value], 10),
      },
    };

    this.props.handleSpecChange(event);
  };

  handleNetworkChange = (value) => {
    const event = {
      target: {
        name: 'subnet',
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleSubmit = (e) => {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }

      // 硬盘容量设为默认值
      const event = {
        target: {
          name: 'volumeSize',
          value: this.props.instance.config.data.volume.size,
        },
      };
      this.props.handleSpecChange(event);

      this.props.handleNextClick(e);
    });
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

  renderSlider(type) {
    const { instance, spec } = this.props;
    const isFetching = instance.config.isFetching;
    const error = instance.config.error;
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
        list = instance.config.data.core.core.map(item => `${item}${unit}`);
      }

      if (type === 'ram') {
        unit = 'G';
        list = instance.config.data.ram.size.map(item => `${item / 1024}${unit}`);
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

  renderInstanceType() {
    const { instance } = this.props;
    const isFetching = instance.config.isFetching;
    const error = instance.config.error;

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
          defaultValue={instance.config.data.instanceType[0].id}
        >
          {instance.config.data.instanceType.map(type =>
            <RadioButton key={type.id} value={type.id} name="instanceType">
              {type.name}
            </RadioButton>)}
        </RadioGroup>
      );
    }

    return contents;
  }

  renderVolumes(formItemLayout) {
    const { instance, spec } = this.props;
    const { getFieldProps } = this.props.form;
    const isFetching = instance.config.isFetching;
    const error = instance.config.error;

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
          {instance.config.data.volume.type.map(type =>
            <RadioButton key={type.id} value={type.id} name="volumeType">{type.name}</RadioButton>)}
        </RadioGroup>
      );
      slider = (<Slider
        marks={[0 + unit, instance.config.data.volume.size + unit]}
        defaultValue={instance.config.data.volume.size}
        tipFormatter={null}
        disabled
      />);
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

  renderNetworks(formItemLayout) {
    const { spec, network } = this.props;
    const { getFieldProps } = this.props.form;
    const isFetching = network.list.isFetching;
    const error = network.list.error;
    let contents = '';

    const subnetProps = getFieldProps('subnet', {
      rules: [
        { required: true, message: '请选择子网' },
      ],
      onChange: this.handleNetworkChange,
      initialValue: spec.subnet,
    });

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = (
        <Select
          {...subnetProps}
          style={{ width: 200 }}
          showSearch={false}
        >
          {network.list.data.map((net, i) => <OptGroup key={i} label={net.name}>
            {net.subnets.map((sub) => <Option key={sub.id} value={sub.id}>{sub.name}</Option>)}
          </OptGroup>)}
        </Select>
      );
    }

    return (
      <FormItem {...formItemLayout} label="子网:">
        {contents}
      </FormItem>
    );
  }

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
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

          <FormItem
            {...formItemLayout}
            label="网络:"
            extra={<span>私有网络可在云主机创建完成后单独设置。<a href="#">了解更多</a></span>}
          >
            <RadioGroup
              name="networkType"
              value={spec.networkType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="basic" name="networkType">基础网络</RadioButton>
              <RadioButton value="private" name="networkType">私有网络</RadioButton>
            </RadioGroup>
          </FormItem>

          {spec.networkType === 'private' ? this.renderNetworks(formItemLayout) : null}
        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step2);
