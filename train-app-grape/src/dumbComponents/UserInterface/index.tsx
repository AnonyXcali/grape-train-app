import React from "react"
import moment from 'moment';
import type { RangePickerProps } from 'antd/es/date-picker';
import { Wrap, CTAWrap, InputWrap } from "./styles/index.tsx"
import { Input, DatePicker, Button, Form } from "antd"
import { Dayjs } from 'dayjs';


type MyComponentProps = {
  handleDateChange: (date: Dayjs, dateString: string | string[]) => void
  handleSubmit: (values: Record<string, any>) => void
};

const UserInterface: React.FC<MyComponentProps> = ({
  handleDateChange,
  handleSubmit,
}) => {

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };
  
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  return (
    <Wrap>
      <Form
      onFinish={handleSubmit}
      layout="horizontal"
      >
        <CTAWrap>
          
            <InputWrap>
            <Form.Item
                label="From"
                name="from"
                rules={[{ required: true, message: 'Required' }]}
              >
              <Input
                placeholder="From"
              />
              </Form.Item>
            </InputWrap>
          
          <Form.Item
            label="To"
            name="to"
            rules={[{ required: true, message: 'Required' }]}
          >
              <Input
                placeholder="To"
              />
          </Form.Item>
          

          <Form.Item
            label="Date"
            name="date"
          >
             <DatePicker
                onChange={handleDateChange}
                format="YYYY-MM-DD HH:mm"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
          </Form.Item>
          

          <Form.Item>
            <InputWrap>
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </InputWrap>
          </Form.Item>
          
        </CTAWrap>
      </Form>
      
    </Wrap>
  )
}

export default UserInterface