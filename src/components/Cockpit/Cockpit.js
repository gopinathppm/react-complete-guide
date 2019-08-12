import React , { useEffect , useRef } from 'react';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const autoClickRef = useRef(null);

    useEffect(() => {

      autoClickRef.current.click();
        console.log('Cockpit.js useEffect');
       const timer = setTimeout(()=>{
          alert ('Data saved!');
        }, 1000);
        return (() => {
          clearTimeout(timer);
          console.log('Cockpit.js cleanup work in use');
        })
    },[]); // pass an empty string if this needed to execute only once

    
    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      };
    });
    
    const classes = [];
    if(props.personslength <= 2){
      classes.push('red');
    }
    if(props.personslength <= 1){
      classes.push('bold');
    }
    if (props.showPersons){
        props.btnStyle.backgroundColor = 'red';
        
    }

    return (
        <div>
            <h1> {props.title}</h1>
            <button 
              name="Switch me" 
              style={props.btnStyle} 
              onClick={props.click}
              ref = {autoClickRef}
            >Toggle Persons</button>
            <p className={classes.join(' ')}>Program to switch Persons</p>
            <AuthContext.Consumer>
              {context => <button onClick={context.login}>Authenticate</button>}
            </AuthContext.Consumer>
            
      </div>
    )
}


export default React.memo(Cockpit);