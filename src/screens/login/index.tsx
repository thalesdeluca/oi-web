import React from "react";

interface Props {
  children: object;
  route: object;
}

const LoginScreen: React.FC<Props> = () => {
  return (
    <div>
      <span>login Screen</span>
    </div>
  );
};

export default LoginScreen;
