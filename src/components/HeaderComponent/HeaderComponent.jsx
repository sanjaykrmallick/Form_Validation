import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <section>
                    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                        <Link className='navbar-brand' to='/'>
                            Appointment
                        </Link>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-toggle='collapse'
                            data-target='#navbarNavAltMarkup'
                            aria-controls='navbarNavAltMarkup'
                            aria-expanded='false'
                            aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon' />
                        </button>
                        <div
                            className='collapse navbar-collapse'
                            id='navbarNavAltMarkup'>
                            <div className='navbar-nav'>
                                <Link
                                    className='nav-item nav-link active'
                                    to='/edit-doctor-info'>
                                {"Doctor Detail "}
                                    <span className='sr-only'>(current)</span>
                                </Link>
                                <Link className='nav-item nav-link' to='/edit-doctor-timing'>
                                    Doctor Timing
                                </Link>
                                {/* <Link className='nav-item nav-link' href='/#'>
                                    Pricing
                                </Link> */}
                            </div>
                        </div>
                    </nav>
                </section>
            </Fragment>
        );
    }
}

export default HeaderComponent;
