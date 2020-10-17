import React, { FunctionComponent } from 'react'

import "./styles.scss";

const ContentCard: FunctionComponent = ({ children }) => {
  return (
    <div className="site-layout-background content-card">
      {children}
    </div>
  )
}

export default ContentCard
