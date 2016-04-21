import React from 'react';
import Form from 'antd/lib/form';
import Slider from 'antd/lib/slider';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';

import FormButtonArea from './FormButtonArea';

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
      cpu: React.PropTypes.number.isRequired,
      memory: React.PropTypes.number.isRequired,
      networkType: React.PropTypes.string.isRequired,
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
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        subnets: React.PropTypes.array.isRequired,
      })),
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
    this.props.handleNextClick(e);
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

  renderSlider(type) {
    const { config, spec } = this.props;
    const isFetching = config.isFetching;
    const error = config.error;
    let unit = '';
    let contents = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      if (type === 'cpu') unit = '核';
      if (type === 'memory') unit = 'G';
      const list = config.instance[type].map(item => `${item}${unit}`);

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
    return this.renderSlider('cpu');
  }

  renderMemorys() {
    return this.renderSlider('memory');
  }

  renderNetworks(formItemLayout) {
    const { spec, network } = this.props;
    const isFetching = network.isFetching;
    const error = network.error;
    let contents = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = (
        <Select value={spec.subnet}
          style={{ width: 200 }}
          showSearch={false}
          onChange={this.handleNetworkChange}
        >
          {network.entities.map((net, i) => <OptGroup key={i} label={net.name}>
            {net.subnets.map((sub, j) => <Option key={j} value={sub}>{sub}</Option>)}
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
          <FormItem {...formItemLayout} label="CPU:">
            {this.renderCpus()}
          </FormItem>

          <FormItem {...formItemLayout} label="内存:">
            {this.renderMemorys()}
          </FormItem>

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
