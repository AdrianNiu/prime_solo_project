import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
// import './FavoriteTwt.css';
import { Button, FormGroup, Input } from 'reactstrap';
import swal from 'sweetalert';

export class FavoriteTwt extends Component {

    state = {
        category: '',
        isOpen: false,
        notes: this.props.favorite.notes
    }

    handleClick = () => {
        console.log('Category Selected', this.props.favorite.id, this.state);
        this.props.dispatch({ type: 'PUT_FAV', payload: { id: this.props.favorite.id, category: this.state.category } });
        this.setState({
            category: '',
        })
    }

    handleChange = (event) => {
        console.log('Category changed to', event.target.value);
        this.setState({
            category: event.target.value,
        })
    }

    delete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this tweet!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your saved tweet has been deleted!", {
                        icon: "success",   
                    });
                    this.props.dispatch({ type: 'DELETE_FAV', payload: id })
                } else {
                    swal("Your saved tweet is safe!");
                }
            });
    }


    //button part
    setIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen });
        console.log('In setIsOpen');
    }

    handleChangeFor = (event) => {
        this.setState({
            notes: event.target.value
        });
    }

    handleSubmitNote = () => {
        //Sends a dispatch to update the notes that were added.
        this.props.dispatch({ type: 'PUT_NOTES', payload: { id: this.props.favorite.id, notes: this.state.notes } });
        //Closes the modal once you hit save;
        this.setIsOpen();
    }
    

    render() {

        return (
            
            <>
            <tbody>
                <tr key={this.props.favorite.id}>
                            {/* <td>{this.props.favorite.id}</td> */}
                            <td>{this.props.favorite.time}</td>
                            <td>{this.props.favorite.keyword}</td>

                        <td>
                            <div>
                                <Button onClick={() => this.setIsOpen()} color="secondary" size="sm">Note</Button>
                            {this.state.isOpen ? (
                                <div>
                                    <div>
                                        {/* <h2>Notes</h2> */}
                                        {/* <hr /> */}
                                        <article>
                                            {/* <textarea
                                                spellCheck="true"
                                                value={this.state.notes || ''}
                                                onChange={(event) => this.handleChangeFor(event)}></textarea> */}
                                                <FormGroup>
                                                    {/* <Label for="exampleText">Notes</Label> */}
                                                    <hr />
                                                    <Input type="textarea" name="text" id="exampleText" 
                                                        spellCheck="true"
                                                        value={this.state.notes || ''}
                                                        onChange={(event) => this.handleChangeFor(event)}/>
                                                </FormGroup>
                                        </article>
                                            <Button onClick={this.handleSubmitNote} color="secondary" size="sm">Save</Button>
                                            {/* <button onClick={this.handleSubmitNote}>Save</button> */}
                                            {"       "}
                                            <Button onClick={() => this.setIsOpen()} color="secondary" size="sm">Cancel</Button>
                                        {/* <button onClick={() => this.setIsOpen()}>Cancel</button> */}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        
                        </td>

                            <td>{this.props.favorite.notes}</td>
                            <td>{this.props.favorite.sentiment}</td>
                            <td>{this.props.favorite.sentiment_score}</td>
                            <td>{this.props.favorite.sentiment_text}</td>
                        <td><Button onClick={(event) => this.delete(this.props.favorite.id)} color="secondary" size="sm">Remove</Button></td>
                        </tr>
                    
            </tbody>
            </>
        )
    }
}




export default connect()(FavoriteTwt);