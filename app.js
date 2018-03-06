var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}


//var list = [
//	{
//		title:"啊飒飒的",
//		isChecked:false
//	},
//	{
//		title:"asdasdasdasd",
//		isChecked:true
//	}
//]

var list = store.fetch("todoList");
var filter = {
	all:function(list){
		return list;
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished:function(list){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}
var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		editTodos:"",
		beforeTitle:"",
		visibility:"all"
	},
	watch:{
		list:{
			handler:function(){
				store.save("todoList",this.list);
			},
			deep:true
		}
	},
	computed:{
		noCheckLength:function(){
			return this.list.filter(function(item){
				return !item.isChecked
			}).length
		},
		filteredList:function(){
			
			return filter[this.visibility] ? filter[this.visibility](list):list;
		}
	},
	methods:{
		addTodo(){
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = "";
		},
		deleteTodo(todo){
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		editTodo(todo){
			this.beforeTitle = todo.title;
			this.editTodos = todo;
		},
		edtor(todo){
			this.editTodos = "";
		},
		cancle(todo){
			todo.title = this.beforeTitle;
			this.editTodos = "";
			
		}
	},
	directives:{
		"focus":{
			update(el,binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);
