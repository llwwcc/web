import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col, List } from 'antd';
import {
    getChangeItemAction,
    getAddItemAction,
    getDelItemAction,
    getRequestInitDataAction
} from './store/actionCreator.js' 

import AppUI from '../../AppUI.js'

//容器组件
class todolist extends Component {
   render() {
        const { handleChange,task,handleAdd,handleDel,list } = this.props
        return (
            <div className="App">
            <Row>
                <Col span={18}>
                    <Input 
                        onChange={handleChange}
                        value={task}
                    />
                </Col>
                <Col span={6}>
                    <Button 
                        type="primary"
                        onClick={handleAdd}
                    >
                        Primary
                    </Button>
                </Col>
            </Row>
            <List
              style={{marginTop:10}}
              bordered
              dataSource={list}
              renderItem={(item,index) => (
                <List.Item
                    onClick={()=>{handleDel(index)}}
                >
                   {item}
                </List.Item>
              )}
            />  
        </div>
        )          
    }
}


const mapStateToProps = (state)=>{
    return {
      task:state.task,
      list:state.list  
    }    
}
const mapDispatchToProps =(dispatch)=>({
   
        handleAdd:()=>{
           dispatch(getAddItemAction())
        },
        handleChange:(ev)=>{
            const task = ev.target.value
           dispatch(getChangeItemAction(task))
        },
        handleDel:(index)=>{
           dispatch(getDelItemAction(index))
        },
        handleInit:()=>{
        dispatch(getRequestInitDataAction())
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(todolist)