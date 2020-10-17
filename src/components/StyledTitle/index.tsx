import React, { FunctionComponent } from 'react'
import { Typography } from 'antd'

const { Title } = Typography

interface StyledTitleProps {
  level: 4 | 1 | 2 | 3
  style?: object
}

const StyledTitle: FunctionComponent<StyledTitleProps> = ({ style = {}, level, children }) => {
  return (
    <Title
      style={{ ...style, margin: '0' }}
      level={level}
    >
      {children}
    </Title>
  )
}

export default StyledTitle
