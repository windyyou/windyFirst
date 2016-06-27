import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import classNames from 'classnames';
import { Form, Button, InputNumber } from 'antd';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';

const FormItem = Form.Item;

export default class Rules extends React.Component {
  static propTypes = {
    alarm: React.PropTypes.object.isRequired,
    addAlarmRule: React.PropTypes.func.isRequired,
    deleteAlarmRule: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      item: '',
      threshold: '',
      period: '',
      condition: '',
    };
  }

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
      item: '',
      threshold: '',
      period: '',
      condition: '',
    });
  };

  handleSaveClick = e => {
    e.preventDefault();
    const isService = this.props.alarm.current.data.type === 'service';

    const periodData = this.props.alarm.config.data.period;
    const serviceConditionData = this.props.alarm.config.data.serviceCondition;
    const instanceConditionData = this.props.alarm.config.data.condition;
    const instanceItemData = this.props.alarm.config.data.item;
    const serviceThresholdData = this.props.alarm.config.data.serviceThreshold;

    const serviceItemJud = isService ? serviceThresholdData[0].value : instanceItemData[0].value;
    const serviceConditionJud = isService ?
      serviceConditionData[0].value : instanceConditionData[0].value;
    const serviceThresholdJud = isService ? serviceThresholdData[0].value : 60;

    const pid = this.props.alarm.current.data.id;
    const params = isService ?
    {
      pid,
      threshold: this.state.item === '' ? serviceItemJud : this.state.status,
      period: this.state.period === '' ? (periodData[0].value) : this.state.period,
      condition: this.state.condition === '' ? serviceConditionJud : this.state.condition,
      item: this.props.alarm.current.data.name,
    } : {
      pid,
      item: this.state.item === '' ? serviceItemJud : this.state.item,
      period: this.state.period === '' ? (periodData[0].value) : this.state.period,
      condition: this.state.condition === '' ? serviceConditionJud : this.state.condition,
      threshold: this.state.threshold === '' ? serviceThresholdJud : this.state.threshold,
    };

    this.props.addAlarmRule(params);
    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteClick = id => () => {
    const pid = this.props.alarm.current.data.id;
    this.props.deleteAlarmRule({ pid, id });
  };

  handleSelectCondition = value => {
    this.setState({
      ...this.state,
      condition: value,
    });
  };

  handleSelectStatus = value => {
    this.setState({
      ...this.state,
      status: value,
    });
  };

  handleSelectPeriod = value => {
    this.setState({
      ...this.state,
      period: value,
    });
  };

  handleSelectItem = value => {
    this.setState({
      ...this.state,
      item: value,
    });
  };

  handleInputChange = value => {
    this.setState({
      ...this.state,
      threshold: value,
    });
  };

  renderInstance(current) {
    const rules = current.data.rules;
    return (
      <div>
        {rules.map((rule, i) => <Row key={i}>
          <Col span="4">{rule.item}</Col>
          <Col span="5">{rule.condition}</Col>
          <Col span="4">{rule.threshold}%</Col>
          <Col span="6">{rule.period}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除规则"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteClick(rule.id)}
              >
                <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
              </Popconfirm>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  renderServer(current) {
    const rules = current.data.rules;
    return (
      <div>
        {rules.map((rule, i) => <Row key={i}>
          <Col span="4">{current.data.name}</Col>
          <Col span="5">{rule.condition}</Col>
          <Col span="4">{rule.threshold}</Col>
          <Col span="6">{rule.period}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除规则"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteClick(rule.id)}
              >
                <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
              </Popconfirm>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

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

  renderAddRuleForm() {
    const formEditing = this.state.formEditing;
    const current = this.props.alarm.current;
    const isService = current.data.type === 'service';
    const periodData = this.props.alarm.config.data.period;
    const periods = periodData.map(period =>
      <Option key={period.value} value={period.name}>{period.name}</Option>);

    const instanceItemData = this.props.alarm.config.data.item;
    const items = instanceItemData.map(item =>
      <Option key={item.value} value={item.name}>{item.name}</Option>);

    const serviceConditionData = this.props.alarm.config.data.serviceCondition;
    const serviceConditions = serviceConditionData.map(serviceCondition =>
      <Option key={serviceCondition.value} value={serviceCondition.name}>
        {serviceCondition.name}
      </Option>);

    const instanceConditionData = this.props.alarm.config.data.condition;
    const instanceConditions = instanceConditionData.map(instanceCondition =>
      <Option key={instanceCondition.value} value={instanceCondition.name}>
        {instanceCondition.name}
      </Option>);

    const serviceThresholdData = this.props.alarm.config.data.serviceThreshold;
    const thresholds = serviceThresholdData.map(
      threshold => <Option key={threshold.value}>{threshold.name}</Option>);

    const instanceItem = (
      <Select
        style={{ width: '110px' }}
        onChange={this.handleSelectItem}
        name="item"
        defaultValue={instanceItemData[0].name}
      >
        {items}
      </Select>
    );
    const instanceCondition = (
      <Select
        style={{ width: '60px' }}
        onChange={this.handleSelectCondition}
        name="condition"
        defaultValue={instanceConditionData[0].name}
      >
        {instanceConditions}
      </Select>
    );
    const serverCondition = (
      <Select
        style={{ width: '60px' }}
        onChange={this.handleSelectItem}
        name="item"
        defaultValue={serviceConditionData[0].name}
      >
        {serviceConditions}
      </Select>
    );
    const serverStatus = (
      <Select
        style={{ width: '60px' }}
        onChange={this.handleSelectStatus}
        name="status"
        defaultValue={serviceThresholdData[0].name}
      >
        {thresholds}
      </Select>
    );
    const input = (
      <InputNumber
        size="large"
        min={1} max={100}
        defaultValue={60}
        onChange={this.handleInputChange}
      />
    );

    const inputStatus = ('%');

    const status = ('状态');

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            添加报警规则
          </Button>
        </Row>
        <Form inline>
          <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
            <FormItem>
              <Select
                style={{ width: '70px' }}
                defaultValue={periodData[0].name}
                onChange={this.handleSelectPeriod}
                name="period"
              >
                {periods}
              </Select>
            </FormItem>
            <FormItem>
              <span>内</span>
            </FormItem>
            <FormItem>
              {isService ? serverCondition : instanceItem}
            </FormItem>
            <FormItem>
              {isService ? serverStatus : instanceCondition}
            </FormItem>
            <FormItem>
              {isService ? status : input}
              {isService ? null : inputStatus}
              <a
                className={classNames('save')}
                onClick={this.handleSaveClick}
              >
                <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
              </a>
              <a
                className={classNames('cancel')}
                onClick={this.handleCancelClick}
              >
                <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
              </a>
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const { alarm } = this.props;
    const current = this.props.alarm.current;
    const config = this.props.alarm.config;
    let addConfigs = '';
    if (alarm.config.isFetching) {
      addConfigs = this.renderFetching();
    } else if (!!alarm.config.error) {
      addConfigs = this.renderError(alarm.config.error);
    } else {
      addConfigs = config.data.item.length > 0 ? this.renderAddRuleForm() : this.renderFetching();
    }

    const instanceTable = (
      <Row>
        <Col span="4">监控项</Col>
        <Col span="5">报警条件</Col>
        <Col span="4">报警阀值</Col>
        <Col span="6">监控周期</Col>
        <Col span="4">操作</Col>
        <Col span="1" />
      </Row>
    );

    const serverTable = (
      <Row>
        <Col span="4">监控项</Col>
        <Col span="5">报警条件</Col>
        <Col span="4">状态</Col>
        <Col span="6">监控周期</Col>
        <Col span="4">操作</Col>
        <Col span="1" />
      </Row>
    );

    const isService = current.data.type === 'service';
    const showRule = isService ?
      this.renderServer(current) : this.renderInstance(current);
    const showRules = current.error ? this.renderError(current.error) : showRule;

    return (
      <div className="instance-snapshots">
        {addConfigs}
        <div className="instance-snapshots-header">
          {isService ? serverTable : instanceTable}
        </div>
        <div className="alarm-basic-info">
          {current.isFetching ? this.renderFetching() : showRules}
        </div>
      </div>
    );
  }
}
