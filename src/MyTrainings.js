import React, { Component } from 'react';
import axios from 'axios';

class MyTrainings extends Component{
    state = {
        data: [1,2,3,4,5],
        trainingsIDs: null,
        accordion: null,
        // ex: [
        //     {'exercise': 'pistol squats', 'id': 1, 'name': 'fbw1', 'reps': 5, 'sets': 6},
        //     {'exercise': 'pushups', 'id': 1, 'name': 'fbw1', 'reps': 10, 'sets': 5},
        //     {'exercise': 'strict pullups', 'id': 1, 'name': 'fbw1', 'reps': 5, 'sets': 6}
        // ]
    }

    async componentDidMount() {
        axios.post('http://localhost:5000/api/trainings', {'user_id': this.props.user['id']})
        .then(async (response) => {
            //Perform action based on response
            console.log(response.data);
            this.setState({
                trainingsIDs: response.data
            });

            const arr = [];
            for(var key in this.state.trainingsIDs) {
                var id = this.state.trainingsIDs[key]['id'];
                var name = this.state.trainingsIDs[key]['name'] ? this.state.trainingsIDs[key]['name'] : 'bez nazwy'; 

                console.log('chest');
                let chest = await axios.post('http://localhost:5000/api/chest', {'training_id': id})
                .then((response) => {
                    //console.log(response.data)
                    for(var i in response.data) {
                        //console.log(response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type']);
                        return (response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type'] + '\n');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

                let back = await axios.post('http://localhost:5000/api/back', {'training_id': this.state.trainingsIDs[key]['id']})
                .then((response) => {
                    //console.log(response.data)
                    for(var i in response.data) {
                        //console.log(response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type']);
                        return (response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type'] + '\n');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

                let legs = await axios.post('http://localhost:5000/api/legs', {'training_id': this.state.trainingsIDs[key]['id']})
                .then((response) => {
                    //console.log(response.data)
                    for(var i in response.data) {
                        //console.log(response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type']);
                        return (response.data[i]['exercise'] + ' ' + response.data[i]['reps'] + 'x' + response.data[i]['sets'] + ', type: ' + response.data[i]['type'] + '\n');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

                arr.push({'id': id, 'name': name, 'training': (chest ? chest : '')+(back ? back : '')+(legs ? legs : '')});

                console.log(arr);
            }

            const accordion = arr.map(el => {
                return(
                    <div className="panel panel-default accordion-item" key={el['id']}>
                        <div className="panel-heading">
                            <h4 className="panel-title accordion-title">
                                <a data-toggle="collapse" data-parent="#accordion" href={'#collapse'+el['id'].toString()}>
                                {el['name']}</a>
                            </h4>
                        </div>
                        <div id={'collapse'+el['id'].toString()} className="panel-collapse collapse in">
                            <div className="panel-body display-linebreak">
                            {el['training']}
                            </div>
                        </div>
                    </div>
                )
            });

            this.setState({
                accordion: accordion
            });

        })
    }

    render() {
        return(
            <div>
                <h1 className="h1-mt">MY TRAININGS</h1>
                <div className="my-trainings">
                    <div className="panel-group" id="accordion">
                        { this.state.accordion }
                    </div> 
                </div>
            </div>
        );
    }
}

export default MyTrainings;