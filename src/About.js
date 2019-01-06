import React, { Component } from 'react';

class About extends Component {
    render() {
        return(
            <div className="about-content">
                this site is for saving ur training and training's  results 
                <p>u can also compare ur max reps to others</p>
                <p>everything is free</p>
                <p>{this.props.costam}</p>
            </div>
        );
    }
}

export default About;