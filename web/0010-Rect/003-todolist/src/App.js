import React,{Component} from 'react'
import './App.css'
class App extends Component{
	constructor(props){
		super(props);
		this.state={
			list:['吃饭','睡觉','敲代码','跑步'],
			task:''
		}
	}
	handle(){
		// console.log('input...')
		 this.setState({
            list:[...this.state.list,this.state.task],
            task:''
        }) 
	}
	handleVal(ev){
		// console.log(ev.target.value)
		const task = ev.target.value
	      this.setState(()=>({
	         task:task
	      }))
	}
	handleDel(index){
		const list=[...this.state.list]
		list.splice(index,1)
		this.setState({
			list
		})
	}
	render(){
		return <div className='App'>
				<input onChange={this.handleVal.bind(this)} value={this.state.task} />
				<button className='btn' onClick={this.handle.bind(this)}>按钮</button>
					<ul style={{color:'red'}}>{
						this.state.list.map((item,index)=>{
							return(
								<li 
								key={index}
								onClick={this.handleDel.bind(this,index)}
								>
								{item}
								</li>
								)	
						})
					}
						
						
					</ul>
		 		</div>
	}
}
export default App