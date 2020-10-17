import React, { FunctionComponent } from 'react'

import "./styles.scss";

const ContentHeader: FunctionComponent = ({ children }) => {
  return (
    <div className="content-header">
      {children}
    </div>
  )
}

export default ContentHeader
