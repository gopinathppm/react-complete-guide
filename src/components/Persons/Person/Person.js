import React , {Component} from 'react';
import './Person.css';
import Radium from 'radium';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';


class Person extends Component {
constructor(props){
    super(props);
    this.inputElememtRef = React.createRef();
}
static contextType = AuthContext;

componentDidMount(){
    this.inputElememtRef.current.focus();
    // this.inputElement.focus();
    console.log(this.context.authenticated);
}

    render(){
        const style = {
            '@media (min-width: 500px)': {
                width: '450px'
            }
        }
        console.log('Persons.js function rendering...');
        return (
            <Aux className= "Person" style={style}>
               {(this.context.authenticated) ? "Authenticated" : "Please login"}
                <p onClick = {this.props.click}>I am {this.props.name} and {this.props.age} years old </p>
                <p>{this.props.children}</p>
                <input type="text" 
                       onChange = {this.props.change} 
                       value={this.props.name} 
                       ref = {this.inputElememtRef}
                    //    ref = {(inputEl)=> {this.inputElement = inputEl}}
                />
            </Aux>
    )

    }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func      
}


export default withClass(Radium(Person),"Person");
