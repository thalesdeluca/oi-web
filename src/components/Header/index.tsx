import React, { FunctionComponent } from "react";

const Header: FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}
    >
      {children}
    </div>
  )
}

export default Header
