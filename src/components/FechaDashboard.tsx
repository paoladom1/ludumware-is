import React from 'react';
var FontAwesome = require('react-fontawesome');

type MyProps = {
    // using interface is also ok
    date: Date;
};

export class FechaDashboard extends React.Component{
    constructor(props: any) {
        super(props);

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date'>
                <FontAwesome name='calendar' />{this.state.date}
            </div>
        );
    }
}

export default FechaDashboard;