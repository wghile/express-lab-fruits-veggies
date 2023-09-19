const React = require('react') 

    class Show extends React.Component {
       
        render () {
        const { vegetable } = this.props

        return (
            <div>
                <h1> Vegetables Show Page </h1>
                <p>The {vegetable.name} is {vegetable.color}</p>
                <p>{vegetable.readyToEat ? 'It\'s ready to eat' : 'It is NOT ready to eat'}</p>
            </div>
         )
        }
     }
module.exports  = Show;