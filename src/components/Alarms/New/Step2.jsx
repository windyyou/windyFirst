import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import Spin from 'antd/lib/spin';
import classNames from 'classnames';
import FormButtonArea from '../../common/FormButtonArea';
import { dict } from '../../../utils/data';

const Option = Select.Option;
const FormItem = Form.Item;

class Step2 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    alarm: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      period: '',
      item: '',
      condition: '',
      threshold: 60,
      unit: '%',
    };
  }

  handleSaveClick = (isService, alarm) => () => {
    const periodData = alarm.config.data.period;
    const serviceConditionData = alarm.config.data.serviceCondition;
    const instanceConditionData = alarm.config.data.condition;
    const instanceItemData = alarm.config.data.item;
    const serviceThresholdData = alarm.config.data.serviceThreshold;

    // 判断默认值状态
    const period = this.state.period || periodData[0].value;

    // service设置主机名为item
    const serviceItemJud = isService ? this.props.spec.name : instanceItemData[0].value;
    const item = this.state.item === '' ? serviceItemJud : this.state.item;
    const serviceConditionJud = isService ?
      serviceConditionData[0].value : instanceConditionData[0].value;
    const condition = this.state.condition === '' ? serviceConditionJud : this.state.condition;
    const threshold = isService ? serviceThresholdData[0].value : this.state.threshold;

    // const threshold = this.state.threshold === '' ? serviceThresholdJud : this.state.threshold;

    this.setState({
      ...this.state,
      period,
      item,
      condition,
      threshold,
    });

    const rule = this.props.spec.rules.slice(0);
    rule.push({
      period,
      item,
      condition,
      threshold,
    });

    const event = {
      target: {
        name: 'rules',
        value: rule,
      },
    };
    this.props.handleSpecChange(event);
  };

  handleDeleteClick = index => () => {
    const rule = this.props.spec.rules.slice(0);
    rule.splice(index, 1);

    const event = {
      target: {
        name: 'rules',
        value: rule,
      },
    };
    this.props.handleSpecChange(event);
  };

  handlePeriodChange = value => {
    this.setState({
      ...this.state,
      period: value,
    });
  };

  handleItemChange = value => {
    const unit = dict(value, this.props.alarm.config.data.item, 'value', 'unit');

    this.setState({
      ...this.state,
      item: value,
      threshold: 60,
      unit,
    });
  };

  handleConditionChange = value => {
    this.setState({
      ...this.state,
      condition: value,
    });
  };

  handleThresholdChange = value => {
    this.setState({
      ...this.state,
      threshold: value,
    });
  };

  handleSubmit = e => {
    this.props.handleNextClick(e);
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

  renderItem() {
    const { alarm } = this.props;
    const instanceItemData = alarm.config.data.item;

    const items = instanceItemData.map(item => <Option key={item.value}>{item.name}</Option>);
    return (
      <Select
        style={{ width: '110px' }}
        defaultValue={instanceItemData[0].value}
        onChange={this.handleItemChange}
      >
        {items}
      </Select>
    );
  }

  renderCondition(array) {
    return (
      <Select
        defaultValue={array[0].value}
        onChange={this.handleConditionChange}
      >
        {array.map(data =>
          <Option key={data.value}>{data.name}</Option>
        )}
      </Select>
    );
  }

  renderThreshold() {
    const maxVal = this.state.unit === '%' ? 100 : Infinity;
    return (
      <InputNumber
        min={0} max={maxVal}
        value={this.state.threshold}
        onChange={this.handleThresholdChange}
      />
    );
  }

  renderServiceThreshold() {
    const { alarm } = this.props;
    const serviceThresholdData = alarm.config.data.serviceThreshold;

    const thresholds = serviceThresholdData.map(
      threshold => <Option key={threshold.value}>{threshold.name}</Option>);
    return (
      <Select
        defaultValue={serviceThresholdData[0].value}
        onChange={this.handleThresholdChange}
      >
        {thresholds}
      </Select>
    );
  }

  renderAddRuleForm() {
    const { spec, alarm } = this.props;
    const isService = spec.type === 'service';

    const periodData = alarm.config.data.period;
    const serviceConditionData = alarm.config.data.serviceCondition;
    const instanceConditionData = alarm.config.data.condition;

    const periods = periodData.map(period => <Option key={period.value}>{period.name}</Option>);
    const item = isService ? '' : this.renderItem();

    const conditionOptions = isService ? serviceConditionData : instanceConditionData;
    const threshold = isService ? this.renderServiceThreshold() : this.renderThreshold(spec);
    const unit = isService ? '状态' : this.state.unit;

    return (
      <Form inline form={this.props.form}>
        <FormItem>
          <Select
            style={{ width: '70px' }}
            defaultValue={periodData[0].value}
            onChange={this.handlePeriodChange}
          >
            {periods}
          </Select>
        </FormItem>
        <FormItem>
          <span>内</span>
        </FormItem>
        <FormItem>
          {item}
        </FormItem>
        <FormItem>
          {this.renderCondition(conditionOptions)}
        </FormItem>
        <FormItem>
          {threshold}
        </FormItem>
        <FormItem>
          <span>{unit}</span>
        </FormItem>
        <FormItem>
          <a
            className={classNames('add')}
            onClick={this.handleSaveClick(isService, alarm)}
          >
            <i className={classNames('portalicon', 'portalicon-add', 'add')}></i>
          </a>
        </FormItem>
      </Form>
    );
  }

  renderRuleList() {
    const { spec, alarm } = this.props;
    const isService = spec.type === 'service';
    const rules = spec.rules;
    return (
      <div>
        {rules.map((rule, i) => <Row key={i} type="flex" justify="center" className="list-data">
          <Col span="6">
            <span>{dict(rule.item, alarm.config.data.item, 'value', 'name')}</span>
          </Col>
          <Col span="4">
            <span>{dict(rule.condition,
              isService ? alarm.config.data.serviceCondition : alarm.config.data.condition,
              'value',
              'name')}</span>
          </Col>
          <Col span="6">
            <span>{dict(rule.threshold, alarm.config.data.serviceThreshold, 'value', 'name')}</span>
          </Col>
          <Col span="4">
            <span>{dict(rule.period, alarm.config.data.period, 'value', 'name')}</span>
          </Col>
          <Col span="4">
            <a
              className="delete"
              onClick={this.handleDeleteClick(i)}
            >
              <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  render() {
    const { spec, alarm } = this.props;

    let addConfigs = '';
    if (alarm.config.isFetching) {
      addConfigs = this.renderFetching();
    } else if (!!alarm.config.error) {
      addConfigs = this.renderError(alarm.config.error);
    } else {
      addConfigs = this.renderAddRuleForm();
    }

    return (
      <div>
        <div className="form-area">
          <div>
            <div className="add-item">
              {addConfigs}
            </div>
            <div className="list-item">
              <Row type="flex" justify="center" className="header">
                <Col span="6">监控项</Col>
                <Col span="4">报警条件</Col>
                <Col span="6">{spec.type === 'service' ? '状态' : '报警阀值'}</Col>
                <Col span="4">监控周期</Col>
                <Col span="4">操作</Col>
              </Row>
            </div>
            <div>
              {this.renderRuleList()}
            </div>
          </div>
        </div>
        <Form form={this.props.form}>
          <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
        </Form>
      </div>
    );
  }
}

export default Form.create()(Step2);
