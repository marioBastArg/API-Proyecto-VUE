<template>
	<form id="myForm" v-if="myFormData" :response="response" :value="myFormData" @submit="submitForm" enctype="multipart/form-data">
		<div>
			<div class="title">
				{{myFormData.title}}
			</div>
			<div v-for="(field,index) in myFormData.data" :key="index+'form'">
				<my-text>{{field.title}}</my-text>
				<my-input v-if="field.type!='file'" :type="field.type" :name="field.name" :value="field.value"></my-input>
				<my-input v-if="field.type=='file'" :type="field.type" :scr="'http://localhost:3000/lugares/'+field.scr" style="crimson" :value="field.value" @input="extractImg($event)"></my-input>
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
				myFiles:'',
				myid: ''
			}
		},
		methods:{
			submitForm(e){
				var formData = new FormData();
				e.preventDefault();
				e.target.elements.forEach((element) => {
					if (element.type!="submit" && element.type!="file") {
						formData.append(element.name, element.value)
					}else if(element.type!="hidden"){
						this.myid = element.id;
					}
				});	
				if (this.myFiles!='') {
					console.log(this.myFiles);
					formData.append('image', this.myFiles);
				}
				this.$emit('myFormSubmit',{form:formData,type:this.myFormData.submitName,id:this.myid});

			},
			extractImg(e){
				this.myFiles=e.files[0];
			}

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