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
import AppUI from './AppUI.js'

const axios = require('axios');

class App extends Component{
    constructor(props){
        super(props)
        // this.state = {
        //     list:["吃饭","睡觉","敲代码","跑步"],
        //     task:''
        // }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.state = store.getState()
        console.log(store.getState())
        store.subscribe(()=>{this.setState(store.getState())})

    }
        componentDidMount(){
        //发送ajax请求
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
            dispatch(result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleAdd(){
        this.setState((preState)=>({
            list:[...preState.list,preState.task],
            task:''
        })) 
        // const action = {
        //     type:"add_item",
           
        // }   
        //  store.dispatch(action)
    }
    handleChange(ev){
      const task = ev.target.value
      this.setState(()=>({
         task:task
      }))


       //派发action
        //action就是一个对象
        const action = {
            type:"change_item",
            payload:task
        }
        store.dispatch(action)



    }
    handleDel(index){
        const list = [...this.state.list]
        list.splice(index,1)
        this.setState(()=>({
            list
        }))


    }
    getItems(){
        return this.state.list.map((item,index)=>{
          return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)} />
        })        
    }
     render() {
        return (
                <AppUI 
                task={this.state.task}
                list={this.state.list}
                handleChange={this.handleChange}
                handleDel={this.handleDel}
                handleAdd={this.handleAdd}

                />
        )
    }
}

export default App