import React , {Component} from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
state = {
  persons: [
    {id: '1', name: "Gopi", age: 28},
    {id: '2', name: "Siva", age: 25},
    {id: '3', name: "Ram", age: 28}
  ]
}

switchNameHandler = (newName) =>{
  // console.log("clicked");
  // Cannot do this this.state.persons[0].name ='Gopinath';
  this.setState({
    persons: [
      {name: newName, age: 28},
      {name: "Siva", age: 26}
    ],
    showPersons: false
  })
}

changeNameHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
  });

  const person = {
    ...this.state.persons[personIndex]
  }

  // const person = Object.assign({},this.state.persons[personIndex]); alternatives approach

  person.name = event.target.value;
  const persons =[...this.state.persons];
  persons[personIndex]= person;

  this.setState ({persons: persons})
  }

  toggleNameHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

render() {
  const btnStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      padding: '8px',
      border: '1px solid black',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'red'
      }
  };

  let persons = null;

  if(this.state.showPersons){
    persons = (
    <div>
      {
        this.state.persons.map((person, index) => {
          return <ErrorBoundary><Person 
          click={() =>this.deletePersonHandler(index)}
          name={person.name} 
          age={person.age} 
          key={person.id}
          change ={(event)=> this.changeNameHandler(event, person.id)}/>
         </ErrorBoundary>
        })  
        
      }
      
      {/* <Person 
        name= {this.state.persons[0].name} 
        age={this.state.persons[0].age}
        click = {this.switchNameHandler.bind(this, 'Zee')}
        change ={this.changeNameHandler}
      />
      <Person 
        name= {this.state.persons[1].name} 
        age={this.state.persons[1].age}> 
        She is a python developer
      </Person>  */}
    </div> 
    );
    btnStyle.backgroundColor = 'red';
    btnStyle[':hover'] = {
      backgroundColor: 'salmon',
      color: 'blue'
    }
  }

  const classes = [];
  if(this.state.persons.length <= 2){
    classes.push('red');
  }
  if(this.state.persons.length <= 1){
    classes.push('bold');
  }

  return (
    <StyleRoot>
    <div className="App">
      <h1> React Application</h1>
      <button name="Switch me" style={btnStyle} onClick={this.toggleNameHandler}>Toggle Persons</button>
      <p className={classes.join(' ')}>Program to switch Persons</p>
      {persons}
    </div>
    </StyleRoot>
  );
}

}

export default Radium(App);
