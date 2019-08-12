import React , {Component} from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Radium, { StyleRoot } from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {


  constructor() {
    console.log('App.js  Constructor calling...');
    super();
    this.state = {
      persons: [
        {id: '1', name: "Gopi", age: 28},
        {id: '2', name: "Siva", age: 25},
        {id: '3', name: "Ram", age: 28}
      ],
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }
  

  static getDerivedStateFromProps(state,props){
    console.log('App.js getDeriverdStateFromProps', props);
    return state;
  }
  // componentWillMount(){
  //   console.log('componentWillMount running...');
  // }
  componentDidMount(){
    console.log('App.js componentDidMount running...');
  }

  shouldComponentUpdate(){
    console.log('App.js shouldComponentUpdate running...');
    return true;
  }
  componentDidUpdate(){
    console.log('App.js componentDidUpdate running...');
  }

switchNameHandler = (newName) =>{
  // Cannot do this this.state.persons[0].name ='Gopinath';
  this.setState({
    persons: [
      {name: newName, age: 28},
      {name: "Siva", age: 26}
    ],
    showPersons: false,
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

  this.setState ((prevState,props)=>{
    return {
      persons: persons,
      changeCounter: prevState.changeCounter + 1 
    };
  })
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

  loginHandler = () => {
    this.setState({ authenticated: true });
  };


render() {
  console.log('App.js rendering....');
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
      <Persons 
        persons={this.state.persons} 
        clicked = {this.deletePersonHandler} 
        changed = {this.changeNameHandler} 
      />);
  }

  return (
    <StyleRoot>
    <Aux>
      <button 
        onClick = { () => {
          this.setState({showCockpit: false})
        }
      }
      > Remove Cockpit</button>
      <AuthContext.Provider 
      value= {{authenticated: this.state.authenticated, login: this.loginHandler}}>
      {(this.state.showCockpit) ?
      <Cockpit 
        title = {this.props.appTitle}
        personsLength ={this.state.persons.length} 
        btnStyle = {btnStyle} 
        click = {this.toggleNameHandler}
        showPersons = {this.state.showPersons}
      />
      : null
      }
      {persons}
      </AuthContext.Provider>
    </Aux>
    </StyleRoot>
  );
}
}

export default withClass(Radium(App),"App");
