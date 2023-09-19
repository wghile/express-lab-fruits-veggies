const React = require('react')  //similar to import React from React
    class Show extends React.Component {
       render () {
        const fruit = this.props.fruit
        return (
            <div>
                <h1> Fruits Show Page </h1>      {/* still have same rule of having highest level element */}
                <p>The {fruit.name} is {fruit.color}</p>
                <p>{fruit.readyToEat ? 'It\'s ready to eat' : 'It is NOT ready to eat'}</p>
            </div>
         );
        }
     }
     module.exports  = Show;