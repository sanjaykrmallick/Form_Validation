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
            errors: {},
            attachToken: true,
        };
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
                            for(let x of docTim) {
                                this.state.userData[x.day.toLowerCase()].push({from:x.from,to:x.to})
                            }
                            resolve(jsonResponse);
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


    updateUI(){
        
    }
    createUI(){
        return this.state.values.map((el, i) => 
            <div key={i}>
               <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
               <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
               <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
            </div>          
        )
     }
     addClick(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
      }
      removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
     }
   
    render() {
        return (
            <Fragment>
                <section className='d-flex justify-content-center'>
                    <div className='formMainDiv'>
                        <h5>Edit Work Timings</h5>
                        <hr />
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Monday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Turesday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Wednesday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Thursday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Friday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Saturday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <div className='d-flex flex-column'>
                            <div>
                                <label htmlFor=''>Sunday</label>
                                <button>Add</button>
                            </div>
                            <div></div>
                        </div>
                        <hr />
                        <button>Save</button>
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default DoctorTiming;
