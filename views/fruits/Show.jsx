const React = require('react')  //similar to import React from React
const DefaultLayout = require('../layout/Default');

    class Show extends React.Component {
       render () {
        const fruit = this.props.fruit
        return (
            <DefaultLayout title={'Fruits Show Page'}>
                <p>The {fruit.name} is {fruit.color}</p>
                <p>{fruit.readyToEat ? 'It\'s ready to eat' : 'It is NOT ready to eat'}</p>
                <a href='/fruits'>Go Back to Home Page</a>
            </DefaultLayout>
         );
        }
     }
     module.exports  = Show;