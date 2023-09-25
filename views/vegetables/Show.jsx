const React = require('react') 
const DefaultLayout = require('../layout/Default')

    class Show extends React.Component {
       
        render () {
        const { vegetable } = this.props

        return (
            <DefaultLayout title={'Vegetables Show Page'}>
                <p>The {vegetable.name} is {vegetable.color}</p>
                <p>{vegetable.readyToEat ? 'It\'s ready to eat' : 'It is NOT ready to eat'}</p>
                <a href='/vegetables'>Go Back to Home Page</a>
            </DefaultLayout>
         )
        }
     }
module.exports  = Show;