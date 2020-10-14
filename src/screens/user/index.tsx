import React from "react";

interface Props {
  children: object;
  route: object;
}

const UserScreen: React.FC<Props> = () => {
  return (
    <div>
      <span>user Screen</span>
      <span>user Screen</span>
    </div>
  );
};

export default UserScreen;
