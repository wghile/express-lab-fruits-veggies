const React = require('react')
const DefaultLayout = require('../layout/Default')

class New extends React.Component {
    render() {
        return(
            <DefaultLayout title={'New Vegetables Page'}>
                <form action='/vegetables' method='POST'>
                    Name: <input type='text' name='name'/> <br />
                    Color: <input type='text' name='color'/> <br />
                    Is Ready To Eat: <input type='checkbox' name='readyToEat' /> <br />
                    <input type='submit' name='' value='Create Vegetable'/> <br />
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = New