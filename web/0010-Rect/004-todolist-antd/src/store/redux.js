

 const Default={
 	  list:["吃饭","睡觉","敲代码","跑步"],
      task:''
}
export default (state=Default,action)=>{
	if (action.type == 'change_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload
		return newState
	}
	if (action.type == 'add_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = ''
		return newState
	}
	if (action.type == 'del_item'){
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = ''
		return newState
	}


	return state
}