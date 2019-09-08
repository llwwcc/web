<template>
	<div class="Header">
	
	<h1>todolist</h1>
	<input type="text">
	<button>增加</button>
	</div>
</template>
<script>
	export default {
	  name: 'Header',
	  
	 
}
</script>
<style scoped>
	h1{
		text-align: center;
	}
	input{
		width: 90%;
		height: 40px;
		border: 1px solid #000;
		box-sizing: border-box;
		padding: 0 10px;
	}
	button{
		width: 60px;
		height: 40px;
	}
</style>