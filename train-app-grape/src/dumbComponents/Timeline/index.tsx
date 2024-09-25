import { Timeline } from 'antd'
import React from 'react'
import styled from "styled-components"

const Type = styled.p`
  weight: bold;
`

const Station = styled.p`
  font-style: italic;
`


type MyComponentProps = {
  data: any,
};

const TimelineComponent: React.FC<MyComponentProps> = ({
  data,
}) => {
  
  return (
    <Timeline>
      {data && data.map((item) => (
        <>
          <Timeline.Item>
            <Type><b>{item.type}</b></Type>
            <Station>{`${item.station || ""} ${item.carrierName || ""}`}</Station>
            <p>{`${item.direction ? `Towards: ${item.direction}` : ""} Time: ${item.time || ""}`}</p>
          </Timeline.Item>
        </>
      ))}
    </Timeline>
  )
};

export default TimelineComponent