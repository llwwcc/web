<template>
	<div class="item" 
		 :style="{backgroundColor:bgColor}"
	>
		<span>吃饭</span>
	<input type="checkbox"
	>
	
	<button>删除</button>
		
	</div>
</template>
<script>
	export default {
	  name: 'item',
	  
	 
}
</script>
<style scoped>
	.item{
		width: 540px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px dashed #000;
		/*background: red;*/
	}
	input{
		float: left;
		margin-top: 10px;
	}
	
	button{
		float: right;
	}
</style>