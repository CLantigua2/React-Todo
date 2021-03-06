import React from 'react';
import './App.css';
import ToDoList from './components/TodoComponents/TodoList';
import Form from './components/TodoComponents/TodoForm';
import SimpleStorage from 'react-simple-storage';

// you will need a place to store your state in this component.
// design `App` to be the parent component of your application.
// this component is going to take care of state, and any change handlers you need to work with your state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          task: 'Organize Garage',
          id: 1528817077286,
          done: true,
          completed: 'Complete',
          icon: "fas fa-check-circle green",
        },
        {
          task: 'Bake Cookies',
          id: 1528817084358,
          done: false,
          completed: 'Incomplete',
          icon: "fas fa-check-circle red"
        }
      ],
      inputText: '',
      newTask: '',
      value: '',
    }
  }


  completeTask = (index) => {
    // let id = this.state.id;
    this.setState({
      list: this.state.list.map((task) => {

        if (index !== task.id) {
          return task;
        } else {
          return {
            ...task,
            completed: task.completed === 'Complete' ? 'Incomplete' : 'Complete',
            icon: task.icon === 'fas fa-check-circle green' ? 'fas fa-check-circle red' : 'fas fa-check-circle green'
          };
        }
      })
    });
  };

  closeTask = (index) => {
    this.setState({
      list: this.state.list.filter((task) => {

        if (index !== task.id) {
          return task;
        } else {
          if (task.completed === 'Complete') {
            return null;
          } else {
            alert('please complete task');
            return task;
          }
        }
      })
    }
      // , () => {
      //   localStorage.setItem("toDoList", JSON.stringify(this.state.list));
      // }
    )
  }

  changeHandler = event => {
    event.preventDefault();
    this.setState({ newTask: event.target.value });
  }

  addNewTask = event => {
    event.preventDefault();
    if (!this.state.newTask) {
      alert('Please add a new task');
    } else {
      this.setState({
        list: [
          ...this.state.list,
          {
            task: this.state.newTask,
            id: Date.now(),
            done: false,
            completed: 'Incomplete',
            icon: "fas fa-check-circle red",
          }
        ],
        newTask: ''
      }
        // , () => {
        //   localStorage.setItem("toDoList", JSON.stringify(this.state.list))
        // }
      );
    };
  }






  render() {

    return (
      <div className="App">
        <SimpleStorage parent={this} />
        {/* list of tasks */}
        <h1>Things to do when you're bored</h1>
        <div className="todolist">
          <ToDoList
            completeTask={this.completeTask}
            list={this.state.list}
            key={this.state.id}
            closeTask={this.closeTask}
          />
        </div>

        {/* input field and button */}
        <div className="todoform">
          <Form
            type="text"
            inputText={this.state.inputText}
            placeholder="Add A New Task"
            addNewTask={this.addNewTask}
            onClick={this.changeHandler}
            changeHandler={this.changeHandler}
            value={this.state.newTask}
          />
        </div>
      </div>
    );
  }
}

export default App;
