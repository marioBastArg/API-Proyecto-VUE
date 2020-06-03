<template>
	<form id="myForm" v-if="myFormData" :response="response" :value="myFormData" @submit="submitForm" enctype="multipart/form-data">
		<div>
			<div class="title">
				{{myFormData.title}}
			</div>
			<div v-for="(field,index) in myFormData.data" :key="index+'form'">
				<my-text>{{field.title}}</my-text>
				<my-input :type="field.type" :name="field.name" :value="field.value"></my-input>
			</div>	
			<my-input :type="myFormData.submitType">{{myFormData.submitName}}</my-input>
		</div>
		<my-text>{{response}}</my-text>
	</form>
</template>
<script>
	import myText from "../atom/myText";
	import myInput from "../atom/myInput";
	export default{
		name: "myForm",
		props: ["myFormData","value","action","response"],
		data(){
			return{
				myFiles:''
			}
		},
		methods:{
			submitForm(e){
				var formData = new FormData();
				e.preventDefault();
				e.target.elements.forEach((element) => {
					if (element.type!="submit") {
						formData.append(element.name, element.value)
					}
				});	
				if (this.myFiles.length>0) {
					formData.append('img', this.myFiles[0]);
				}
				this.$emit('myFormSubmit',{form:formData,type:this.myFormData.submitName});

			},

		},
		components:{
			myInput,
			myText
		}
	}
</script>
<style>
	p{
		margin-top: 5px;
		margin-bottom: 3px;
	}
	.title{
		text-transform: uppercase;
	}
</style>