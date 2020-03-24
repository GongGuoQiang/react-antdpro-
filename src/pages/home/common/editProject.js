import { Form, Input, Tooltip, Icon, Select, Row, Col, Button, Modal } from 'antd';
import { connect } from 'dva';

@connect(user => ({ user, loading }) => ({
  //这行是把返回的数据test.data给了test
  user,
  loading: loading.models.list,
}))
class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    citys: [],
    times: [],
  };
  componentDidMount() {
    const city = JSON.parse(localStorage.getItem('enum')).applicationArea;
    const times = JSON.parse(localStorage.getItem('enum')).applicationTimeLimit;
    this.setState({
      citys: city.list,
      times: times.list,
    });
  }
  cancel() {
    this.props.cancel();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchEdit',
          payload: {
            id: this.props.editData.id,
            data: values,
          },
          callback: res => {
            console.log(res); // 请求完成后返回的结果
            this.props.updateForm();
          },
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { editData } = this.props;
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 14 },
      },
    };
    console.log('editData', editData);
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ background: '#fff' }}>
          <Form.Item label="城市">
            {getFieldDecorator('site', { initialValue: editData.site })(
              <Select onChange={this.handleChange} allowClear placeholder="请选择城市">
                {Object.keys(this.state.citys).map(item => (
                  <Option value={item} key={item}>
                    {this.state.citys[item]}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="队列名称" hasFeedback>
            {getFieldDecorator('ruletype', { initialValue: editData.ruletype })(
              <Input type="text" allowClear placeholder="请输入队列名称" />,
            )}
          </Form.Item>
          <Form.Item label="分单模式" hasFeedback>
            {getFieldDecorator('autoassignMode', { initialValue: editData.autoassignMode })(
              <Select allowClear placeholder="请选择分单模式">
                <Option value="1">自给</Option>
                <Option value="2">系数</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="分单类型" hasFeedback>
            {getFieldDecorator('ruletypeType', { initialValue: editData.ruletypeType })(
              <Select allowClear placeholder="请选择分单类型">
                <Option value="CAR_LOAN">车贷</Option>
                <Option value="CREDIT_LOAN">信用贷</Option>
                <Option value="HOUSE_LOAN">房贷</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="分单时间间隔" hasFeedback>
            {getFieldDecorator('timeLimit', { initialValue: editData.timeLimit })(
              <Select allowClear placeholder="请选择分单时间间隔">
                {Object.keys(this.state.times).map(item => (
                  <Option value={item} key={item}>
                    {this.state.times[item]}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="签约地址" hasFeedback>
            {getFieldDecorator('signAddress', { initialValue: editData.signAddress })(
              <Input allowClear placeholder="请输入签约地址" />,
            )}
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            &emsp;
            <Button onClick={this.cancel.bind(this)}>取消</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const EditProject = Form.create({ name: 'createForm' })(ProjectForm);
export default EditProject;
