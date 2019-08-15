/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-14 10:37:14
 */
import React, { Component } from 'react'
import './App.css'

import TodoList from './pages/todolist'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Home extends Component{
    render(){
        return <h2>this is home page</h2>
    }
}
class admin extends Component{
    render(){
        return <h2>this is home admin</h2>
    }
}
class Admin extends Component{
    render(){
        return (
            <Switch>
                <Route exact path="/admin" render={()=><h2>this is admin home page</h2>} />
                <Route path="/admin/profile" render={()=><h2>this is admin profile page</h2>} />
                <Route path="/admin/:id" render={(route)=>(<h2>this is admin info page, admin id is {route.match.params.id}</h2>)} />
            </Switch>
        )
    }
}
class App extends Component {
	 constructor(props){
        super(props)
        this.state = {
            isLogin:true
        }
    }
    render() {
    	 const ProtectRoute = ({component:Component ,...rest})=>{
            return <Route
                {...rest} 
                render={(props)=>{
                    return this.state.isLogin ? <Component {...props} /> : <h2>this is login page</h2>
                }}
            />
        }
        return (
        	<Router>
	            <div className="App">
	            	<nav>
		            	<ul>
		            		<li><Link to="/">Home</Link></li>
		            		<li><Link to='/todolist'>TodoList</Link></li>
		            		<li><Link to='/about'>about</Link></li>
		            		<li><Link to='/admin:id'>adminid</Link></li>
		            		<li><Link to='/admin/123'>admin/123</Link></li>
		            		
		            	</ul>
		                <TodoList />
		                <Route path="/" exact component={Home} />
		                <Route path="/admin"  component={admin} />
		                <Route path="/admin:id"  component={Admin} />

		            	 <Route exact path="/todilist" component={TodoList} />
		            	 <Route path="/about" render={()=><h2>this is about page</h2>} />
		            	 <ProtectRoute path="/admin" component={Admin} />
	            	</nav>
	            </div>
            </Router>
        )          
    }
}



export default App