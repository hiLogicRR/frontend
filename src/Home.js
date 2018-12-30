import React, { Component } from 'react';

class Home extends Component {
    render() {
        return(
            <div className="home">

                <div className="home-parallax">
                    <h1 className="on-img">Nothing is impossible . . .<br/>if you want to achive it</h1>
                </div>

                <div className="home-content">
                    There are many types of training. You can train for explosivness and dynamic, strength or endurance. With us You can achive everything.
                </div>

                <div className="home-parallax2">
                    <h1 className="on-img">Endurance</h1>
                </div>

                <div className="home-parallax3">
                    <h1 className="on-img">Strength</h1>
                </div>

                <div className="home-parallax4">
                    <h1 className="on-img">Dynamic and Explosivness</h1>
                </div>

                <div className="home-content">
                    And much much more ! Join us today and start to working on best shape of your life !
                </div>


            </div>
        );
    }
}

export default Home;