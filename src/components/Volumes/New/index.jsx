import React from 'react';
import Radio from 'antd/lib/radio';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { Slider, InputNumber, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class VolumeForm extends React.Component {
  static propTypes = {
    volume: React.PropTypes.shape({
      config: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          range: React.PropTypes.shape({
            min: React.PropTypes.number.isRequired,
            max: React.PropTypes.number.isRequired,
          }).isRequired,
          type: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            id: React.PropTypes.string.isRequired,
            unitPrice: React.PropTypes.number.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    createVolume: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      inputValue: 20,
      share: 'false',
      volumeType: '',
      unitPrice: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps.volume.config.data;
    const unitPrice = (Array.isArray(type) && type.length > 0) ? type[0].unitPrice : 0;

    this.setState({ unitPrice });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = () => {
    // const defaultType = this.props.volume.config.data.type.length > 0 ?
    //   this.props.volume.config.data.type[0].id : '';
    // const initialType = this.state.volumeType === '' ? defaultType : this.state.volumeType;
    //
    // const initialSize = this.state.inputValue === '' ? 20 : this.state.inputValue;

    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
    });
    this.props.createVolume({
      name: this.state.name,
      description: this.state.description,
      type: this.state.volumeType,
      share: this.state.share,
      size: this.state.inputValue,
    }).then(() => this.context.router.push('/app/volumes'));
  };

  handleSliderChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  handleTypeSelect = (e) => {
    this.setState({
      volumeType: e.target.value,
      unitPrice: e.target.unitPrice,
    });
  };

  handleSelectShare = (e) => {
    this.setState({
      share: e.target.value,
    });
  };

  renderType(data) {
    const type = data.type;
    if (!Array.isArray(type) || type.length < 1) return null;

    return (
      <RadioGroup
        name="volumeType"
        size="large"
        onChange={this.handleTypeSelect}
        defaultValue={type[0].id}
      >
        {type.map(t => (
          <RadioButton key={t.id} value={t.id} unitPrice={t.unitPrice} name="volumeType">
            {t.name}
          </RadioButton>)
        )}
      </RadioGroup>
    );
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formInputItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7, offset: 1 },
    };
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 14, offset: 1 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: this.state.name,
    });

    const { data } = this.props.volume.config;
    const unit = this.state.unitPrice;
    const hourly = (unit * this.state.inputValue).toFixed(2);
    const monthly = hourly * 24 * 30;

    return (
      <div className="volume-new">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <FormItem {...formInputItemLayout} label="名称:">
              <Input
                {...nameProps}
                onChange={this.handleNameChange}
                placeholder="请输入名称"
                name="name"
                value={this.state.name}
              />
            </FormItem>
            <FormItem {...formInputItemLayout} label="描述:">
              <Input
                onChange={this.handleDescriptionChange}
                placeholder="请输入描述"
                type="textarea"
                rows="5"
                value={this.state.description}
              />
            </FormItem>
            <FormItem {...formItemLayout} label="类型:">
              {this.renderType(data)}
            </FormItem>
            <FormItem {...formItemLayout} label="容量:">
              <Col span={12}>
                <Slider
                  min={data.range.min}
                  max={data.range.max}
                  onChange={this.handleSliderChange}
                  value={this.state.inputValue}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={data.range.min}
                  max={data.range.max}
                  style={{ marginLeft: '16px' }}
                  value={this.state.inputValue}
                  onChange={this.handleSliderChange}
                />
              </Col>
            </FormItem>
            <FormItem {...formItemLayout} label="共享盘:">
              <RadioGroup
                onChange={this.handleSelectShare}
                value={this.state.share}
              >
                <Radio key="true" value="true">是</Radio>
                <Radio key="false" value="false">否</Radio>
              </RadioGroup>
            </FormItem>
            <div className="price">
              <span className="quantity">{this.state.inputValue}</span> X <span className="unit">
          {unit} 元/小时</span> = <span className="hourly">
          {hourly} 元/小时</span> <span className="monthly">
          ({monthly.toFixed(2)} 元/月)</span>
            </div>
          </div>
        </Form>
        <Row>
          <Col span="2" push="14">
            <Button
              type="primary"
              size="large"
              style={{ width: '100%' }}
              onClick={this.handleSubmit}
            >
              创建
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(VolumeForm);
