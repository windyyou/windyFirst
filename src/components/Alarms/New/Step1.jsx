import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Transfer from 'antd/lib/transfer';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';

import FormButtonArea from '../../common/FormButtonArea';

const FormItem = Form.Item;
const Option = Select.Option;

class Step1 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    alarm: React.PropTypes.object.isRequired,
    resources: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
    handleObjectTypeChange: React.PropTypes.func.isRequired,
    handleObjectChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      resourceValidate: '',
    };
  }

  getData(resourceData) {
    const returnData = resourceData.list.data.length > 0 ?
      resourceData.list.data.map((data) =>
        ({ ...data, key: data.id, title: data.name, description: data.name })) : [];
    return returnData;
  }

  handleResourceChange = (targetKeys) => {
    if (targetKeys.length > 0) {
      this.setState({
        resourceValidate: '',
      });
    }

    this.props.handleObjectChange(targetKeys);
  };

  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((errors) => {
      if (!!errors || this.props.spec.resources.length === 0) {
        if (this.props.spec.resources.length === 0) {
          this.setState({
            resourceValidate: '请选择对象',
          });
        }

        return;
      }

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

  renderTransfer = (item) => item.title;

  renderResourceType(alarm, typeProps) {
    return (
        <Select {...typeProps}
          placeholder="请选择资源类型"
        >
          {alarm.config.data.resource.map(type =>
            <Option value={type.value} key={type.value}>{type.name}</Option>)}
        </Select>
    );
  }

  renderResource() {
    const { spec, resources } = this.props;
    const type = spec.type;

    // 空值为初始状态提供
    const resourceData = type ? resources : { list: { isFetching: false, error: null, data: [] } };

    const isFetching = resourceData.list.isFetching;
    const error = resourceData.list.error;

    const isLoading = isFetching || !!error;
    const data = isLoading ? [] : this.getData(resourceData);
    let message = '';
    if (isFetching) {
      message = 'loading...';
    } else if (!!error) {
      message = 'error';
    } else {
      message = '未找到';
    }

    return (
      <div>
        <Transfer
          dataSource={data}
          showSearch
          listStyle={{
            width: 220,
            height: 270,
          }}
          titles={['候选资源', '对象资源']}
          notFoundContent={message}
          targetKeys={spec.resources}
          onChange={this.handleResourceChange}
          render={this.renderTransfer}
        />
        <div className="has-error">{this.state.resourceValidate}</div>
      </div>

    );
  }

  render() {
    const { spec, alarm } = this.props;
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8, offset: 1 },
    };
    const formTransferLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 15, offset: 1 },
    };

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: spec.name,
    });

    const typeProps = getFieldProps('type', {
      rules: [
        { required: true, message: '请选资源类型' },
      ],
      onChange: this.props.handleObjectTypeChange,
      initialValue: spec.type,
    });

    const error = this.state.resourceValidate ? 'error' : '';

    const resourceTypes = alarm.config.error ?
      this.renderError(alarm.config.error) : this.renderResourceType(alarm, typeProps);

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem {...formItemLayout} label="名称:">
            <Input
              {...nameProps}
              placeholder="名称"
              onChange={this.props.handleSpecChange}
              name="name"
              value={spec.name}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="描述:">
            <Input
              type ="textarea"
              placeholder="描述"
              onChange={this.props.handleSpecChange}
              name="description"
              value={spec.description}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="对象类型:">
            {alarm.config.isFetching ? this.renderFetching() : resourceTypes}
          </FormItem>

          <FormItem {...formTransferLayout} validateStatus={error} className="required" label="对象:">
            {this.renderResource()}
          </FormItem>

        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step1);
