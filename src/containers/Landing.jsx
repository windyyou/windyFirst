import React from 'react';
import Button from 'antd/lib/button';

export default function Landing(prop, context) {
  const handleLogin = () => {
    context.router.push('/login');
  };

  const handleSignUp = () => {
    context.router.push('/sign-up');
  };

  return (
    <div className="landing">
      <h2>Landing Page</h2>
      <Button
        className="btn"
        type="primary"
        onClick={handleSignUp}
      >注册</Button>
      <Button
        className="btn"
        type="ghost"
        onClick={handleLogin}
      >登录</Button>
    </div>
  );
}

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
