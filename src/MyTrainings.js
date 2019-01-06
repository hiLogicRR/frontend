import React, { Component } from 'react';

class MyTrainings extends Component{
    state = {
        data: [1,2,3,4,5]
    }

    render() {
        const accordion = this.state.data.map(data => {
            return(
                <div className="panel panel-default accordion-item" key={data}>
                    <div className="panel-heading">
                        <h4 className="panel-title accordion-title">
                            <a data-toggle="collapse" data-parent="#accordion" href={'#collapse'+data.toString()}>
                            section {data}</a>
                        </h4>
                    </div>
                    <div id={'collapse'+data.toString()} className="panel-collapse collapse in">
                        <div className="panel-body">
                        {'collapse'+data.toString()}
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <h1 className="h1-mt">MY TRAININGS</h1>
                <div className="my-trainings">
                    <div className="panel-group" id="accordion">
                        { accordion }
                    </div> 
                </div>
            </div>
        );
    }
}

export default MyTrainings;