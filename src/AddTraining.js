import React, { Component } from 'react';
import axios from 'axios';

class AddTraining extends Component {
    state = {
        training_id: null,
        name: '',
        training: [],
        exercise: '',
        reps: '',
        sets: '',
        type: '',
        muscle: '',
        exerciseID: 1
    }

    addTraining = () => {
        console.log(this.state.name);
        axios.post('http://localhost:5000/api/addtraining', {'user_id': this.props.user['id'], 'name': this.state.name})
        .then((response) => {
            console.log(response.data);
            this.setState({
                training_id: response.data
            });
        })
    }

    updateTraining = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:5000/api/updatetraining', {'training_id': this.state.training_id, 'training': this.state.training}).then((response) => {
            console.log(response.data);
        });
        console.log('training submited!');
        this.setState({
            training: [],
            name: ''
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value ? e.target.value : ''
        });
    }
    
    add = (e) => {
        const training = this.state.training;
        training.push({'muscle': this.state.muscle, 'exercise': this.state.exercise, 'reps': this.state.reps, 'sets': this.state.sets, 'type': this.state.type, 'exerciseID': this.state.exerciseID});
        const exerciseID = this.state.exerciseID + 1;
        this.setState({
            training: training,
            muscle: '-',
            exercise: '',
            reps: '',
            sets: '',
            type: '-',
            exerciseID: exerciseID
        });

        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    deleteExercise = (exerciseID) => {
        const training = this.state.training.filter(t => {
            return t['exerciseID'] !== exerciseID
        })
        this.setState({
            training: training
        });
    }

    render() {
        const workout = this.state.training.length ? (
            this.state.training.map(t => {
                return(
                    <div key={t['exerciseID']}>
                        <span style={{cursor: "pointer"}} className="list-group-item list-group-item-dark" onClick={() => {this.deleteExercise(t['exerciseID'])}}>{t['exercise'] + ' ' +t['reps'] + 'x' + t['sets'] + ' <' + t['type'] + '>'}</span>
                    </div> )})) : (<p>add some exercise!</p>)
        

        return(
            <div className="add-training" style={{marginBottom: "200px"}}>
                <form onSubmit={this.handleSubmit}>
                    <label style={{marginLeft: "150px"}} htmlFor="name" className="label">Training name: </label>
                    <input type="text" value={this.state.name} placeholder="name" className="input-pass" name="name" id="name" onChange={this.handleChange}/>
                    <br />
                    <button style={{marginLeft: "250px"}} className="btn btn-outline-secondary btn-lg" onClick={this.addTraining}>Set Training Name</button>
                </form>
                    
                <form onSubmit={this.updateTraining}>

                    <h1 className="h1-mt">add exercise</h1>
                    <input id="exercise" value={this.state.exercise} className="input-training" type="text" name="exercise" placeholder="exercise" onChange={this.handleChange} />
                    <input id="reps" min="0" value={this.state.reps} type="number" className="input-number" placeholder="reps" onChange={this.handleChange} />
                    <input id="sets" min="0" value={this.state.sets} type="number" className="input-number" placeholder="sets" onChange={this.handleChange} />
                    <select value={this.state.type} id="type" style={{width: "120px", marginLeft: "15px", border: "none", borderBottom: "2px solid black", background: "transparent"}} onChange={this.handleChange}  >
                        <option value="-">-</option>
                        <option value="strength">strength</option>
                        <option value="endurance">endurance</option>
                        <option value="explosivness">explosivness</option>
                    </select>
                    <select id="muscle" value={this.state.muscle} style={{width: "90px", marginLeft: "15px", border: "none", borderBottom: "2px solid black", background: "transparent"}} onChange={this.handleChange}  >
                        <option value="-">-</option>
                        <option value="chest">chest</option>
                        <option value="back">back</option>
                        <option value="legs">legs</option>
                    </select>
                    <input style={{marginLeft: "15px"}} className="btn btn-outline-secondary btn-sm" type='button' value='add' onClick={this.add}/>

                    <br />
                    <button style={{marginTop: "150px", marginLeft: "250px"}} className="btn btn-outline-secondary btn-lg">SUBMIT WORKOUT</button>
                    
                </form>

                <h1 className="h1-mt">current workout</h1>
                    {workout}
            </div>
        );
    }
}

export default AddTraining;