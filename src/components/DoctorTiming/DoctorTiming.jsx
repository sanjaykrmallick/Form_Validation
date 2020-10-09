import React, { Component, Fragment } from "react";
import "./DoctorTiming.styles.css";

const url = `http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051`;

class DoctorTiming extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            },
            isDirty: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            appTiming: [
                { label: "08:00 AM", value: 8 },
                { label: "09:00 AM", value: 9 },
                { label: "10:00 AM", value: 10 },
                { label: "11:00 AM", value: 11 },
                { label: "12:00 PM", value: 12 },
                { label: "01:00 PM", value: 13 },
                { label: "02:00 PM", value: 14 },
                { label: "03:00 PM", value: 15 },
                { label: "04:00 PM", value: 16 },
                { label: "05:00 PM", value: 17 },
                { label: "06:00 PM", value: 18 },
                { label: "07:00 PM", value: 19 },
                { label: "08:00 PM", value: 20 },
                { label: "09:00 PM", value: 21 },
                { label: "10:00 PM", value: 22 },
            ],
            errors: {},
            attachToken: true,
            values: [],
            isLoading: false,
        };
        this._validateForm = this._validateForm.bind(this);
        this._handleOnChange = this._handleOnChange.bind(this)
        this._handleAdd=this._handleAdd.bind(this)
        this._handleDelete=this._handleDelete.bind(this)

    }

    componentDidMount() {
        this.makeGetRequestDocDetail(url, this.state.attachToken);
    }

    makeGetRequestDocDetail(url, attachToken) {
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        if (attachToken) {
            try {
                const authToken =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMTk4Mjk3MiwiZXhwIjoxNjA0NTc0OTcyfQ.rnyN3M76h7xlzrZsY9gcIXa968uMcrW1J0o_GQzw-P0";
                if (authToken) {
                    console.log(authToken);
                    headers["Authorization"] = "Bearer " + authToken;
                }
            } catch (e) {
                console.log(e);
            }
        }
        return new Promise((resolve, reject) => {
            try {
                fetch(url, {
                    method: "GET",
                    headers: headers,
                })
                    .then((res) => res.json())
                    .then((jsonResponse) => {
                        if (jsonResponse.error === false) {
                            // console.log(jsonResponse);
                            let docTim = jsonResponse.doctor.availability;
                            console.log("DoctorTimingDetail: ", docTim);
                            for (let x of docTim) {
                                this.state.userData[x.day.toLowerCase()].push({
                                    from: x.from,
                                    to: x.to,
                                });
                            }
                            resolve(jsonResponse);
                            this.setState({ isLoading: true });
                        } else {
                            console.log(jsonResponse);
                            reject(jsonResponse);
                        }
                    })
                    .catch((e) => {
                        console.log("XHR GET Error: ", e);
                        reject(e);
                    });
            } catch (e) {
                console.log(e);
                reject();
            }
        });
    }

    
    _validateForm = () => {
        const { userData, isDirty, errors } = this.state;
        Object.keys(userData).forEach((e) => {
            // console.log(typeof e);
            // console.log("isdir:-", isDirty[e]);
            // debugger

            if (isDirty[e]!==false) {
                const emptErr = userData[e].some((time) => {
                    console.log("looping");
                    return time.from === "-" || time.to === "-";
                });
                const valErr = userData[e].some((time) => {
                    return time.from > time.to;
                });
                let prevVal = 0;
                const overlapErr = userData[e].some((time) => {
                    if (prevVal <= time.from) {
                        prevVal = time.to;
                        return false;
                    } else {
                        return true;
                    }
                });
                console.log(emptErr);
                console.log(valErr);
                console.log(overlapErr);
                if (emptErr) {
                    errors[e] = "Fields can't be Blank";
                }
                if (valErr) {
                    errors[e] = "FROM must be greater then TO";
                }
                if (overlapErr) {
                    errors[e] =
                        "Please check appointment time, OVERLAPPING ...";
                } else {
                    delete errors[e];
                    isDirty[e] = false;
                }
                console.log(e);
            } else {
                this.setState({ errors });
                return Object.keys(errors).length ? errors : null;
            }
        });
    };

    _handleOnChange = (day, ind, val) => {
        const { userData, isDirty } = this.state;
        if (val.from) {
            userData[day][ind].from = val.from;
        } else {
            userData[day][ind].to = val.to;
        }

        isDirty[day] = true;

        this.setState({ userData, isDirty }, () => {
            this._validateForm();
            console.log("onChange, ", this.state);
        });
    };

    _handleTimingChange = (day, ind, val) => {
        const { appTiming } = this.state;
        const fromTimeOpt = appTiming.map((time) => {
            return (
                <option key={time.value} value={time.value}>
                    {time.label}
                </option>
            );
        });
        const toTimeOpt = appTiming.map((time) => {
            if (time.value <= val.from) {
                return null;
            }
            return (
                <option key={time.value} value={time.value}>
                    {time.label}
                </option>
            );
        });
        return (
            <Fragment>
                <div id="timeBox" className="d-flex" style={{}}>
                    <div className='form-group formGroupDiv'>
                        <select
                            name='timeSlotFrom'
                            id='timeSlotSelectFrom'
                            className='form-control'>
                            <input
                                type='select'
                                value={val.from}
                                name='timeSlot'
                                onChange={(e) =>
                                    this._handleOnChange(day, ind, {
                                        from: parseInt(e.target.value)
                                            ? parseInt(e.target.value)
                                            : "",
                                    })
                                }
                            />
                            {fromTimeOpt}
                        </select>
                    </div>
                    <div className='form-group formGroupDiv'>
                        <select
                            name='timeSlotTo'
                            id='timeSlotSelectTo'
                            className='form-control'>
                            <input
                                type='select'
                                value={val.to}
                                name='timeSlot'
                                onChange={(e) =>
                                    this._handleOnChange(day, ind, {
                                        to: parseInt(e.target.value)
                                            ? parseInt(e.target.value)
                                            : "",
                                    })
                                }
                            />
                            {toTimeOpt}
                        </select>
                    </div>
                    <button
                        onClick={() => this._handleDelete(day, ind)}
                        outline
                        color='danger'
                        className='btn btn-danger' style={{flex: "1", height: "38px"}}>
                        Delete
                    </button>
                </div>
            </Fragment>
        );
    };

    _handleAdd = (day) => {
        const { userData } = this.state;
        userData[day] = [...userData[day], { from: "", to: "" }];
        this.setState({
            isDirty: {
                day: true,
            },
        });
        this.setState({ userData }, () => {
            this._validateForm();
            console.log("added, ", userData);
        });
    };
    _handleDelete = (day, index) => {
        const { userData } = this.state;
        userData[day].splice(index, 1);
        this.setState({ userData }, () => {
            this._validateForm();
            console.log("deleted, ", userData);
        });
    };

    _handleSubmitData = (e) => {
        e.preventDefault();
        let isDirty = {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
        };
        this.setState({ isDirty }, () => {
            let errors = this._validateForm();
            console.log(errors);
            if (!errors) {
                const { userData } = this.state;
                console.log("Make API call: ", userData);
            }
        });
    };

    render() {
        const { userData, errors} = this.state;

        return (
            <Fragment>
                <section className='d-flex justify-content-center' style={{padding: "10px 80px",marginBottom: "15px"}}>
                    <div className='formMainDiv'>
                        <h5>Edit Work Timings</h5>
                        <hr />
                        {/* monday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Monday</label>
                                <button
                                    style={{marginLeft:"15px"}}
                                    className="btn btn-success"
                                    onClick={() => this._handleAdd("monday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.monday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "monday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.monday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* tuesday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Tuesday</label>
                                <button
                                    style={{marginLeft:"15px"}}
                                    className="btn btn-success"
                                    onClick={() => this._handleAdd("tuesday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.tuesday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "tuesday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.tuesday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* wednesday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''> Wednesday</label>
                                <button
                                    style={{marginLeft:"15px"}}
                                    className="btn btn-success"
                                    onClick={() => this._handleAdd(" wednesday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.wednesday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "wednesday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.wednesday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* thursday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Thursday</label>
                                <button
                                    style={{marginLeft:"15px"}}
                                    className="btn btn-success"
                                    onClick={() => this._handleAdd("thursday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.thursday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "thursday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.monday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* friday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Friday</label>
                                <button
                                    className="btn btn-success"
                                    style={{marginLeft:"15px"}}
                                    onClick={() => this._handleAdd("monday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.friday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "friday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.friday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* saturday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Saturday</label>
                                <button
                                    className="btn btn-success"
                                    style={{marginLeft:"15px"}}
                                    onClick={() => this._handleAdd("saturday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.saturday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "saturday",
                                        i,
                                        dat
                                    );
                                })
                            )}
                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.monday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        {/* sunday */}
                        <div className='d-flex flex-column' style={{padding: "10px 60px"}}>
                            <div style={{padding: "10px 0px"}}>
                                <label htmlFor=''>Sunday</label>
                                <button
                                    className="btn btn-success"
                                    style={{marginLeft:"15px"}}
                                    onClick={() => this._handleAdd("monday")}>
                                    Add
                                </button>
                            </div>

                            {React.Children.toArray(
                                userData.sunday.map((dat, i) => {
                                    return this._handleTimingChange(
                                        "sunday",
                                        i,
                                        dat
                                    );
                                })
                            )}

                            {errors && (
                                <Fragment>
                                    <small style={{ color: "red" }}>
                                        {errors.monday}
                                        {/* * Please fill above field */}
                                    </small>
                                </Fragment>
                            )}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={this._handleSubmitData}
                                className='btn btn-primary ' style={{width:"20%"}}>
                                Save
                            </button>
                        </div>
                        
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default DoctorTiming;
