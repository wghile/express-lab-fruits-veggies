const React = require('react')
const DefaultLayout = require('../layout/Default');

class Index extends React.Component {
    render() {
        const { vegetables } = this.props
        
        return (
            <DefaultLayout title={"Vegetables Index Page"}>
                <nav>
                    <a href="/vegetables/new">Create a New Vegetable</a>
                </nav>
                <ul>
                    {/* {vegetables.map((vegetable, i) => {
                        return(
                            <li>
                                The {' '}
                                <a href={`/vegetables/${i}`}>
                                    {vegetable.name}
                                </a>{` `} is {vegetable.color} <br></br>
                                {vegetable.readyToEat ? `It is ready to eat` : `It is NOT ready to eat`}
                                <br />
                            </li>
                        )
                    })} */}
                    {vegetables.map((vegetable,i) => {
                        return <li key={i}>
                            <a href={`/vegetables/${vegetable._id}`}>
                                {vegetable.name}
                            </a> is {vegetable.color}. { vegetable.readyToEat? <span>It is ready to eat</span>: <span> It is not ready to eat </span>}
                            <form action={`/vegetables/${vegetable._id}?_method=DELETE`} method='POST'>
                                <input type="submit" value="DELETE"/>
                            </form>
                            <a href={`/vegetables/${vegetable._id}/edit`}>
                                Edit this Vegetable
                            </a>
                            <br />
                            <br />
                        </li>
                    })}
                </ul>
            </DefaultLayout>
        )
    }
}

module.exports = Index