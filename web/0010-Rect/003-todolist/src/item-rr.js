import React,{ Component } from 'react'

class Item extends Component{
    constructor(props){
        super(props)
    }   
    render(){
        const { handleDel,task } = this.props
        return(
            <li onClick={handleDel}>{task}</li>
        )
    }
}

export default Item