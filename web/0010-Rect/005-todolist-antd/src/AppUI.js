/*
* @Author: TomChen
* @Date:   2019-08-09 15:14:36
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-11 10:39:33
*/
import React,{ Component } from 'react'
import Item from './Item.js'
import "./App.css"
import { Button, Input, Row, Col, List } from 'antd';

import store from './store/index.js'
/*
class AppUI extends Component{
   
     render() {
        return (
            <div className="App">
            <Row>
                <Col span={18}>
                    <Input 
                        onChange={this.handleChange}
                        value={this.props.task}
                    />
                </Col>
                <Col span={6}>
                    <Button 
                        type="primary"
                        onClick={this.handleAdd}
                    >
                        Primary
                    </Button>
                </Col>
            </Row>
            <List
              style={{marginTop:10}}
              bordered
              dataSource={this.props.list}
              renderItem={(item,index) => (
                <List.Item
                    onClick={()=>{this.props.handleDel(index)}}
                >
                   {item}
                </List.Item>
              )}
            />
            
        </div>
        )
    }
}
*/
const AppUI =(props)=>{
    const { handleChange,task,handleAdd,handleDel,list } = props
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
                   提交
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
export default AppUI