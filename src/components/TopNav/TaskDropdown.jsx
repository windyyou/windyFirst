import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';

export default class TaskDropdown extends React.Component {
  getContent() {
    const tasks = [10, 50, 100];

    return (
      <div className="dropdown-tasks open">
        <ul className="dropdown-menu">
          {tasks.map((percent, i) =>
            <li key={i}>
              <a href="#">
                <p>
                  <strong>Task {i}</strong>
                </p>
                <Progress.Line percent={percent} />
              </a>
            </li>
          )}
          <li>
            <a href="#" className="text-center">
              <strong>更多任务</strong>
              <Icon type="right" />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <li>
        <Dropdown
          overlay={ this.getContent() }
          trigger={ ['click'] }
        >
          <a href="#"><Icon type="bars" /> 任务</a>
        </Dropdown>
      </li>
    );
  }
}
