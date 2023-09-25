const React = require('react')

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>New Fruit Page</h1>
                {/* NOTE: action will be the target route, method will be the HTTP verb */}
                <form action='/fruits' method='POST'> {/* How form will be consumed. Will be sent using post method to /fruits route */}
                    Name: <input type='text' name='name'/> <br />
                    Color: <input type='text' name='color'/> <br />
                    Is Ready To Eat: <input type='checkbox' name='readyToEat'/> <br />
                    <input type='submit' name='' value='Create Fruit'/> <br />
                </form>
            </div>
        )
    }
}

module.exports = New