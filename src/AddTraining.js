import React, { Component } from 'react';

class AddTraining extends Component {
    state = {
        chest: [],
        back: [],
        legs: []
    }

    createChestInput() {
        return this.state.chest.map((training_id, ) => {

        })
    }

    render() {
        return(
            <div className="add-training">
                <form>
                    <label htmlFor="name" className="label">Training name: </label>
                    <input type="text" placeholder="name" className="input-pass" name="name" id="name" />
                    <br />
                    <button className="btn btn-outline-secondary btn-lg">Set Training Name</button>
                </form>

                <h1>add chest exercise</h1>
                <form>

                </form>
            </div>
        );
    }
}

export default AddTraining;