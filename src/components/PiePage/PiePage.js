import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
//Import to do routing
import { withRouter } from 'react-router-dom';

// When using the { } for including the component, it will show this.props.dispatch not a function
import FavoritePie from '../FavoritePie/FavoritePie';

// import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import './PiePage.css';




export class PiePage extends Component {
    

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PIE' });
    }

    render() {
        // if (this.props.reduxStore.searchReducer.length > 0) {
            if (1<2) {
                
        return (
            <>
                <section id="saved-chart-result">
                    <Table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Keyword</th>
                                <th>Chart</th>
                                <th></th>
                                <th>Notes</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                            
                        {this.props.pies.map(pie => 
                            <FavoritePie key={pie.id} pie={pie} />
                        )}
                         
                    </Table>
                </section>

            </>
        )
    }
}
}
const putPropsOnReduxStore = (reduxState) => ({
    pies: reduxState.pieReducer,
});


// need to update the pie reducer
export default withRouter(connect(putPropsOnReduxStore)(PiePage));