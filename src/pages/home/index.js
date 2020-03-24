import React from 'react';
import { Table, Button, Modal } from 'antd';

import SearchForm from './common/searchForm';
import CreateProject from './common/createProject';
import EditProject from './common/editProject';
import { connect } from 'dva';
import styles from './common/index.less';
import { changeEnum } from '@/utils/utils';

@connect(user => ({ user, loading }) => ({
  //这行是把返回的数据test.data给了test
  user,
  loading: loading.models.list,
}))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      citys: [],
      title: '新增',
      isCreate: -1,
      loading: false,
      createVisible: false,
      editVisible: false,
      editData: {},
      currentPage: 1,
      total: 0,
      filter: {
        page: 1,
        pageSize: 10,
      },
    };
  }

  componentWillMount() {
    this.getData();
  }
  //成功后更新数据
  updateFrom(data) {
    this.setState({
      createVisible: false,
    });
    setTimeout(() => {
      this.getData();
    });
  }
  cancel() {
    this.setState({
      createVisible: false,
    });
  }
  getData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchDataList',
      payload: this.state.filter,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.DataList.length > 0) {
      let datas = nextProps.user.DataList;
      let meta = nextProps.user.meta;
      this.setState({
        data: datas,
        currentPage: meta.currentPage,
        total: meta.total,
      });
    }
  }
  //添加
  showModal() {
    this.setState({
      createVisible: true,
      title: '新增',
      isCreate: 0,
    });
  }
  //编辑
  handleEdit() {
    let index = event.target.getAttribute('data-edit');
    let row = this.state.data[index];
    this.setState({
      editData: row,
      createVisible: true,
      title: '编辑',
      isCreate: 1,
    });
  }
  //搜索查询
  searchForm(val) {
    this.setState({
      filter: { ...this.state.filter, ...val },
    });
    setTimeout(() => {
      this.getData();
    });
  }
  //删除
  handleDel() {
    let index = event.target.getAttribute('data-index');
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchremove',
      payload: this.state.data[index].id, //这里应该传入id进行删除
      callback: res => {
        if (res.status) {
          console.log('res', res);
        }
      },
    });
    setTimeout(() => {
      this.getData();
    }, 500);
  }
  //checkbox左侧多选
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  //分页
  handleTableChange = pagination => {
    console.log('pagination', pagination);
    this.setState({
      currentPage: pagination,
      filter: {
        page: pagination,
      },
    });
    setTimeout(() => {
      this.getData();
    });
  };
  render() {
    const columns = [
      {
        title: '城市',
        dataIndex: 'site',
        key: 'site',
        render: text => <a>{changeEnum(text, 'applicationArea')}</a>,
      },
      {
        title: '队列名称',
        dataIndex: 'ruletype',
        key: 'ruletype',
        render: text => <a>{text}</a>,
      },
      {
        title: '分单模式',
        dataIndex: 'autoassignMode',
        key: 'autoassignMode',
        render: text => <a>{changeEnum(text, 'applicationRuleMode')}</a>,
      },
      {
        title: '分单类型',
        dataIndex: 'ruletypeType',
        key: 'ruletypeType',
        render: text => <a>{changeEnum(text, 'applicationRuleType')}</a>,
      },
      {
        title: '签约地址',
        dataIndex: 'storeName',
        key: 'storeName',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record, index) => (
          <span>
            <Button
              type="danger"
              size="small"
              data-index={index}
              onClick={this.handleDel.bind(this)}
            >
              删除
            </Button>
            &emsp;
            <Button
              type="primary"
              size="small"
              data-edit={index}
              onClick={this.handleEdit.bind(this)}
            >
              编辑
            </Button>
          </span>
        ),
      },
    ];
    const addBtn = {
      textAlign: 'right',
      padding: '20px',
    };
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const paginationProps = {
      page: this.state.currentPage,
      onChange: page => this.handleTableChange(page),
      total: this.state.total,
    };
    return (
      <div className="home">
        <SearchForm searchForm={this.searchForm.bind(this)}></SearchForm>
        <div className="addBtn" style={addBtn}>
          <Button
            type="primary"
            shape="round"
            icon="plus-circle"
            size="large"
            onClick={this.showModal.bind(this)}
          >
            添加
          </Button>
        </div>
        <div className={styles.formTable}>
          <Table
            rowSelection={rowSelection}
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.state.data}
            pagination={paginationProps}
          ></Table>
        </div>
        <Modal title={this.state.title} visible={this.state.createVisible} footer="">
          {this.state.isCreate == 0 ? (
            <CreateProject
              updateForm={this.updateFrom.bind(this)}
              cancel={this.cancel.bind(this)}
            ></CreateProject>
          ) : (
            <EditProject
              editData={this.state.editData}
              updateForm={this.updateFrom.bind(this)}
              cancel={this.cancel.bind(this)}
            ></EditProject>
          )}
        </Modal>
      </div>
    );
  }
}

export default Home;
