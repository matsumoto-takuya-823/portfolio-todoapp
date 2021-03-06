import React from "react"
import Form from "./Form"
import TodoList from "./TodoList"
import styled from 'styled-components'
import bgi from './image/wood.jpg'

const Container = styled.div`
background-color: #fff;
margin: 0;
padding: 0 15%;
background-image: url(${bgi});
padding-bottom: 20px;
`
const MainTitle = styled.h1`
text-align: center;
color: #fff;
text-shadow: 2px 2px 0 black,
               -2px 2px 0 black,
               2px -2px 0 black,
               -2px -2px 0 black;
`

class App extends React.Component {
	constructor() {
		super() //親のコンポーネントを使用する時に書く
		this.state = {
			todos: [
				{
					title: "課題をやる！",
					desc: "test",
					isDone: false
				}
			]
		}
        
	}
	handleSubmit(e){
		e.preventDefault() 

		//まず、フォームに入力されたデータを取得する
		//(注意:this.ではイベントの発生源を参照できない！)
		
		const title = e.target.title.value  //e.targetでイベント(submitイベント)の発生源を示す
		const desc = e.target.desc.value
		const newTodos = this.state.todos.slice() //()内は何も書かないと全部指定したことになる
		if(title.length === 0){
			window.alert('TITLEの内容を入力してください')
		} else {
			newTodos.push({
				title: title,
				desc: desc,
				isDone: false
			})
			//再レンダリングを行うために、必ずsetStateを使用する。
			this.setState({
				//新しいstateの変更の内容を記述
				todos: newTodos
			})
		}
		//stateのtodosに、入力されたデータを追加する
		e.target.title.value = ""
		e.target.desc.value = ""
	}
	

	handleClick(key){
		//ボタン押したら、falseはtrueにtrueはfalseにする
		const newBtnText = this.state.todos.slice()
		if (newBtnText[key].isDone === false) {
			newBtnText[key].isDone = true
		} else {
			newBtnText[key].isDone = false
		}
        
		this.setState({
			todos: newBtnText
		})   
	}

	handleDelete(i){
		//削除ボタン押したらtodosが消えるようにする
		this.state.todos.splice(i, 1);
		this.setState({
		  todo : this.state.todos
		});
	}

	



	render() {
		return ( 
		// <React.Fragment> divの代わりになる
		/* thisは実行元を参照するのでその前の段階のthisを参照するようにbindする */
			<Container> 
				<MainTitle>ToDo List</MainTitle>
				<Form handleSubmit={this.handleSubmit.bind(this)}></Form>
				<TodoList 
				todos={this.state.todos} 
				handleClick={this.handleClick.bind(this)}
				handleDelete={this.handleDelete.bind(this)}></TodoList> 
			</Container>
		)
	}
}
export default App


