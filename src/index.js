import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 新增事項輸入框
class NewToDo extends Component {
  render(){
    return(
      <input className='newTd' type='text' onKeyPress={this.props.keyEnter}></input>
    )
  }
}

// 事件清單
class Item extends Component {
  handleTransfrom = () => {
    const {index,changeItemType} = this.props
    changeItemType(index)
  }
  handleDelete = () => {
    const {index, deleteItem} = this.props
    deleteItem(index)
  }
  render(){
    const {value, type, uniqueKey, viewer} = this.props
    let visible = type ? 'complete' : 'active'
    if (viewer === 'active'){
      visible = type ? 'complete hidden' : 'active';
    } else if (viewer === "complete") {
      visible = type ? 'complete' : 'active hidden';
    }
    return(
    <li className={visible} key={uniqueKey}>{value}
      <button onClick={this.handleTransfrom} className='changeType'>{type ? 'Done' : 'Active'}</button>
      <button onClick={this.handleDelete} className='delete'>Delete</button>
    </li>
    )
  }
}
class Archive extends Component {
  render() {
    const {type, Num, delFunc, adjustFunc, lists, view} = this.props
    const listPocket = lists.map((value,index) => {
      return(<Item value={value} index={index} type={type[index]} uniqueKey={Num[index]}
                  changeItemType={adjustFunc} deleteItem={delFunc} viewer={view}/>    
      )
    })
    return(
      <ul>{listPocket}</ul>
    )
  }
}

// 狀態列
class BottomNav extends Component {
  checkAll = () => {
    const {showFunc} = this.props
    showFunc('all')
  }
  checkActive = () => {
    const {showFunc} = this.props
    showFunc('active')
  }
  checkComplete = () => {
    const {showFunc} = this.props
    showFunc('complete')
  }
  render() {
    return(
      <span>
        <button onClick={this.checkAll}>All</button>
        <button onClick={this.checkActive}>Active</button>
        <button onClick={this.checkComplete}>Complete</button>
      </span>
    )
  }
}

// 整理起來
class ContainBox extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      type: [],
      keyNum: [],
      order:0,
      view:'all'
    }
  }
  // 新增動作
  keyEnter = (a) => {
    if(a.key === 'Enter') {
      const newThing = document.getElementsByClassName('newTd')[0].value;
      document.getElementsByClassName('newTd')[0].value = "";
  
      let todos = this.state.todos
      todos.push(newThing)
      let type = this.state.type
      type.push(false)
      let key = this.state.keyNum
      key.push(this.state.order)

      this.setState((state) => ({
        todos:todos,
        type:type,
        keyNum:key,
        order:state.order + 1,
        view:state.view
      }))
    }
  }
  // 改變狀態
  changeItemType = (a) => {
    let status = this.state.type
    status[a] = !status[a]
    this.setState(state => ({
      todos:state.todos,
      type:status,
      keyNum:state.keyNum,
      order:state.order,
      view:state.view
    }))
  }
  // 刪除動作
  deleteItem = (a) => {
    let todos = this.state.todos;
    todos.splice(a,1);
    let type = this.state.type;
    type.splice(a,1);
    let key = this.state.keyNum;
    key.splice(a,1);

    this.setState(state => ({
      todos:todos,
      type:type,
      keyNum:key,
      order:state.order,
      view:state.view
    }))
  }

  // 篩選動作
  show = (a) => {
    if (a ==='active'){
      this.setState(state => ({
        todos:state.todos,
        type:state.type,
        keyNum:state.keyNum,
        order:state.order,
        view:'active'
      }))
    } else if (a ==='complete'){
      this.setState(state => ({
        todos:state.todos,
        type:state.type,
        keyNum:state.keyNum,
        order:state.order,
        view:'complete'
      }))
    } else {
      this.setState(state => ({
        todos:state.todos,
        type:state.type,
        keyNum:state.keyNum,
        order:state.order,
        view:'all'
      }))
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='title'>todos</div>
        <NewToDo keyEnter={this.keyEnter}/>
        <Archive lists={this.state.todos} type={this.state.type} 
                  Num={this.state.keyNum}  view={this.state.view}
                  delFunc={this.deleteItem} adjustFunc={this.changeItemType}/>
        <BottomNav showFunc={this.show}/>
      </div>
    );
  }
}

ReactDOM.render(<ContainBox/>, document.querySelector('main'))