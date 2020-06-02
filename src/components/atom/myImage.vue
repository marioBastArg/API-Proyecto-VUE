<template>
	<img id="myImage" :src="scr">
</template>
<script>
	export default{
		name: "myImage",
		props:["scr"],
		data(){
			return{

			}
		}
	}
</script>
<style>
	img{
		width: 100%;
		max-height: 300px;
	}
</style>