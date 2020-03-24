import { Form, Input, Tooltip, Icon, Select, Row, Col, Button } from 'antd';
import styles from './index.less';
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    confirmDirty: false,
    citys: [],
  };
  componentDidMount() {
    const city = JSON.parse(localStorage.getItem('enum')).applicationArea;
    this.setState({
      citys: city.list,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.searchForm(values);
      }
    });
  };

  handleChange = value => {
    console.log(value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className={styles.form}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ background: '#fff' }}>
          <Row>
            <Col span={6}>
              <Form.Item label="城市">
                {getFieldDecorator('site')(
                  <Select onChange={this.handleChange} allowClear placeholder="请选择城市">
                    {Object.keys(this.state.citys).map(item => (
                      <Option value={item} key={item}>
                        {this.state.citys[item]}
                      </Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="队列名称" hasFeedback>
                {getFieldDecorator('ruletype')(
                  <Input type="text" allowClear placeholder="请输入队列名称" />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="分单模式" hasFeedback>
                {getFieldDecorator('autoassignMode')(
                  <Select allowClear placeholder="请选择分单模式">
                    <Option value="1">自给</Option>
                    <Option value="2">系数</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="分单类型" hasFeedback>
                {getFieldDecorator('ruletypeType')(
                  <Select allowClear placeholder="请选择分单类型">
                    <Option value="CAR_LOAN">车贷</Option>
                    <Option value="CREDIT_LOAN">信用贷</Option>
                    <Option value="HOUSE_LOAN">房贷</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="签约地址" hasFeedback>
                {getFieldDecorator('signAddress', { initialValue: '' })(
                  <Input allowClear placeholder="请输入签约地址" />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" shape="round" icon="search" htmlType="submit">
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'searchForm' })(RegistrationForm);
export default WrappedRegistrationForm;
