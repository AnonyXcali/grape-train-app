import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import styled from "styled-components"
import Timeline from "../Timeline/index.tsx"

const TableWrap = styled.div`
  width: 1000px;
  margin: 0 auto;
`

interface DataType {
  from: string,
  to: string,
  sections: object | null,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: (text, record) => {
      const {
        from,
        to,
      } = record || {}
      
      return (
        <p>{`${from}-${to}`}</p>
      )
    },
  },  
];

type MyComponentProps = {
  trainData: DataType[]
};


const App: React.FC<MyComponentProps>= ({
  trainData,
}) => {

  return (
    <TableWrap>
      <Table
        columns={columns}
        dataSource={trainData}
        expandable={{
          expandedRowRender: record => <Timeline data={record.sections || []} />,
        }}
      />
    </TableWrap>
    
  )
}

export default App;