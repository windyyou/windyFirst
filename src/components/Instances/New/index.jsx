import React from 'react';
import Steps from 'antd/lib/steps';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

import Preview from './Preview';

const Step = Steps.Step;
const steps = [
  { title: '镜像', description: '选择一个系统镜像或主机快照' },
  { title: '配置', description: '选择主机的CPU，内存，网络配置' },
  { title: '登录信息', description: '设置主机的系统登录信息' },
];

export default class NewInstance extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      spec: {
        name: 'instance',
        imageType: 'image',
        image: 'CentOS 6.4 64bit',
        cpu: '1',
        memory: '1',
        networkType: 'basic',
        subnet: 'sub1',
        username: 'root',
        credentialType: 'password',
        password: '',
        keyPair: 'secret1',
        quantity: 1,
      },
    };
  }

  handleSpecChange = (e) => {
    this.setState({
      ...this.state,
      spec: {
        ...this.state.spec,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleNextClick = (e) => {
    e.preventDefault();
    let step = this.state.current + 1;
    if (step > steps.length) step = steps.length;

    this.setState({
      current: step,
    });

    this.context.router.push(`/instances/new/step-${step}`);
  };

  handlePreviousClick = (e) => {
    e.preventDefault();

    let step = this.state.current - 1;
    if (step < 1) step = 1;

    this.setState({
      current: step,
    });

    this.context.router.push(`/instances/new/step-${step}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.context.router.push('/instances');
  };

  render() {
    return (
      <div className="new-instance">
        <div className="steps">
          <Steps current={this.state.current - 1}>
            {steps.map((step, i) =>
              <Step title={step.title} description={step.description} key={i}/>
            )}
          </Steps>
        </div>
        <Row>
          <Col span="14">
            {React.cloneElement(this.props.children,
              {
                current: this.state.current,
                total: steps.length,
                spec: this.state.spec,
                handleNextClick: this.handleNextClick,
                handlePreviousClick: this.handlePreviousClick,
                handleSubmit: this.handleSubmit,
                handleSpecChange: this.handleSpecChange,
              })}
          </Col>
          <Col span="8" offset="2">
            <Preview spec={this.state.spec}/>
          </Col>
        </Row>
      </div>
    );
  }
}
