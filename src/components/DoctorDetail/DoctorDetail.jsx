import React, { Component, Fragment } from "react";
import "./DoctorDetail.styles.css";
const url = `http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051`;
const url1 = `http://178.128.127.115:3000/admin/v1/specialties`;

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                speciality: "",
               
            },
            isDirty: {
                name:"",
                speciality: "",
                experience: "",
                consultFees: "",
                qualification: "",
                practiceAt: "",
                lang: [],
                email: "",
                phone: "",
                gender: "",
                regNo: "",
                specialize: "",
                superSpecilize: "",
            },
            userData:{
                name:"",
                speciality: "",
                experience: "",
                consultFees: "",
                qualification: "",
                practiceAt: "",
                lang: [],
                email: "",
                phone: "",
                gender: "",
                regNo: "",
                specialize: "",
                superSpecilize: "",
            },
            errors: {},
            hasCharError: false,
            attachToken: true,
            specialities:[],
        };
        this._handleOnChange = this._handleOnChange.bind(this)
        this._handleOnSubmit = this._handleOnSubmit.bind(this)
        
        // this._handleOnBlur = this._handleOnBlur.bind(this);
        // this._handleOnFocus = this._handleOnFocus.bind(this);
        // this._checklang = this._checklang.bind(this)
    }

    componentDidMount() {
        this.makeGetRequestDocDetail(url, this.state.attachToken);
        this.makeGetRequestDocSpeciality(url1, this.state.attachToken);
    }

    // if(e.target.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)){
    //     this.setState({hasError:false});
    // }else{
    //     this.setState({hasError:true});
    // }

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
                            let docDet = jsonResponse.doctor;
                            console.log("Doctor Detail: ",docDet);
                            this.setState({userData:{
                                name: docDet.name.full,
                                speciality: docDet._specialty.id,
                                experience: docDet.experience,
                                consultFees: docDet.fee,
                                qualification: docDet.qualification,
                                practiceAt: docDet.areasOfExpertise,
                                lang: docDet.languages,
                                email: docDet.email,
                                phone: docDet.phone,
                                gender: docDet.gender,
                                regNo: docDet.registrationNumber,
                                specialize: docDet.specialty,
                                superSpecilize: docDet.superSpeciality,
                            }
                            });
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

    makeGetRequestDocSpeciality(url, attachToken) {
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
                            console.log("Specialties Data: ",jsonResponse);
                            // this.setState({
                            //     specialities: jsonResponse.specialties
                            // })
                            resolve(jsonResponse);
                           let speci = jsonResponse.specialties.map((e)=>{
                                console.log(e.name)
                                return e.name
                            })
                            this.setState({
                                specialities: speci
                            })        
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

    // _checklang=(lan)=>{
    //     let datlang = new Array(this.state.userData.lang)
    //         const res =datlang[0].includes(lan)
    //         if(res===false){
    //             return false
    //         }else{
    //             return true
    //         }
    //     }

    //     _handleOnBlur = (e) => {
    //         e.preventDefault();
    //         if (e.target.value.match(/^[a-zA-Z]*$/)) {
    //             this.setState({ hasCharError: false });
    //         }
    //         if(e.target.value === undefined){
    //             this.setState({hasCharError:true});
    //         }
    //         if(e.target.value === ""){
    //             this.setState({hasCharError:true});
    //         }
    //     };
    //     _handleOnFocus =(e) => {
    //         e.preventDefault();
    //         this.setState({hasCharError:false})
    //     }

    //     _handleOnChangesSpeciality=(e)=>{
    //         e.preventDefault();
    //         const selected = e.target.value 
    //         console.log("selected speciality :",selected)
    //         this.setState({
    //             user:{
    //                 speciality: selected,
    //             }
    //         })
    //     }

        _handleOnChange = (field, value)=> {
            console.log(field, value);
            const { userData, isDirty } = this.state;
            if(field === 'languages') {
                if(value.checked) {
                    userData[field].push(value.value)
                } else {
                    userData[field].splice(userData[field].indexOf(value.value),1)
                }
            } else {
                userData[field] = value;
            }
            isDirty[field] = true
            this.setState({ userData, isDirty }, () => {
                this._validateForm();
                console.log(this.state)
            });

            if(!value && typeof value === 'number') {
                userData[field] = '';
                isDirty[field] = true;
                this.setState({ userData, isDirty }, () => {
                    this._validateForm();
                    console.log(this.state)
                });
                return;
            }

        }

        _handleOnSubmit = (e) => {
            e.preventDefault();
            let isDirty = {
                name: true,
                speciality: true,
                experience: true,
                consultFees: true,
                qualification: true,
                practisingAt: true,
                lang: true,
                email: true,
                phone: true,
                gender: true,
                regNo: true,
                graduation: true,
                specialization: true,
                superSpecialization: true,
            };
            this.setState({ isDirty }, () => {
              let errors = this._validateForm();
              console.log(errors);
              if (!errors) {
                    const { userData } = this.state;
                    console.log("Final API call: ", userData);
              }
            });
        };

        _validateForm() {
            const { userData, isDirty, errors } = this.state;
            Object.keys(userData).forEach((each) => {
                switch(each) {
                    case 'name': {
                        if (isDirty.name) {
                            if (userData.name.length < 3) {
                                errors[each] = "*Must be Greater than 3 characters";
                            }
                            if (!userData.name.length) {
                                errors[each] = "*Required";
                            } else {
                                delete errors[each];
                                isDirty.name = false;
                            }
                        }
                        break;
                    }
                    case 'speciality': {
                        if (isDirty.speciality) {
                            if (!userData.speciality.trim().length) {
                                errors[each] = "* Please select the above field";
                            } else {
                                delete errors[each];
                                isDirty.speciality = false;
                            }
                        }
                        break;
                    }
                    case 'experience': {
                        if (isDirty.experience) {
                             if (userData.experience < 0) {
                                errors[each] = "* Invalid Input";
                            }if (!userData.experience) {
                                errors[each] = "* Please fill above field";
                            }else {
                                delete errors[each];
                                isDirty.experience = false;
                            }
                        }
                        break;
                    }
                    case 'consultFees': {
                        if (isDirty.consultFees) {
                            if (userData.consultFees < 0) {
                                errors[each] = "* Invalid Input";
                            }if (!userData.consultFees) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.consultFees = false;
                            }
                        }
                        break;
                    }
                    case 'qualification': {
                        if (isDirty.qualification) {
                            if (!userData.qualification.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.qualification = false;
                            }
                        }
                        break;
                    }
                    case 'practisingAt': {
                        if (isDirty.practisingAt) {
                            if (!userData.practisingAt.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.practisingAt = false;
                            }
                        }
                        break;
                    }
                    case 'phone': {
                        if (isDirty.phone) {
                            if ((userData.phone).toString().length < 10 || (userData.phone).toString().length > 10) {
                                errors[each] = "* Invalid Input:- 10 digits only";
                            } else {
                            if (!userData.phone) {
                                errors[each] = "* Please fill above field";
                            }
                                delete errors[each];
                                isDirty.phone = false;
                            }
                        }
                        break;
                    }
                    case 'email': {
                        if (isDirty.email) {
                            if (
                                userData.email.trim().length &&
                                !new RegExp(
                                    "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
                                ).test(userData.email)
                                ) {
                                    errors.email = "* Invalid Email";
                                }
                            if (!userData.email.trim().length) {
                                errors.email = "* Please fill above field";
                            }  else {
                                    delete errors[each];
                                    isDirty.email = false;
                            }
                        } 
                        break;
                    }
                    case 'gender': {
                        if (isDirty.gender) {
                            if (!userData.gender.trim().length) {
                                errors[each] = "* Please tick above field";
                            } else {
                                delete errors[each];
                                isDirty.gender = false;
                            }
                        }
                        break;
                    }
                    case 'regNo': {
                        if (isDirty.regNo) {
                            if (!userData.regNo.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.regNo = false;
                            }
                        }
                        break;
                    }
                    case 'graduation': {
                        if (isDirty.graduation) {
                            if (!userData.graduation.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.graduation = false;
                            }
                        }
                        break;
                    }
                    case 'specialization': {
                        if (isDirty.specialization) {
                            if (!userData.specialization.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.specialization = false;
                            }
                        }
                        break;
                    }
                    case 'superSpecialization': {
                        if (isDirty.superSpeciallization) {
                            if (!userData.superSpecialization.trim().length) {
                                errors[each] = "* Please fill above field";
                            } else {
                                delete errors[each];
                                isDirty.superSpecialization = false;
                            }
                        }
                        break;
                    }
                    default: {
                        console.log("Error in validation_switch_case ");
                        break;
                    }
                } 
            });
            this.setState({ errors });
            return Object.keys(errors).length ? errors : null;
        }
    

    render() 
        {
            const { userData, specialities, errors } = this.state;
        return (
            <Fragment>
                <section className='d-flex justify-content-center'>
                    <form className='formMainDiv' onSubmit={this._handleOnSubmit}>
                        <h5>Edit Basic Info</h5>
                        <hr />
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor='Doctor Name'>Name</label>
                                <input
                                    id="nameInput"
                                    type='text'
                                    name="name"
                                    // onBlur={this._handleOnBlur}
                                    // onFocus={this._handleOnFocus}
                                    value={userData.name}
                                    placeholder="Enter Name ..."
                                    onChange={(e) => 
                                        this._handleOnChange("name",e.target.value)
                                    }
                                /> 
                                { errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.name}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Speciality'>Speciality</label>
                                <select
                                    
                                    className='form-control'
                                    id='specialtyInput'
                                    name='specialty'
                                    onChange={(e)=>this._handleOnChange("specialty",e.target.value)}>
                                        
                                     {specialities.map((e) => <option key={e} value={e}>{e}</option>)}
                                </select>
                                { errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.specialty}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor=''>Experience</label>
                                <input type='number' id="experienceInput" name="experience" value={userData.experience} min={0}
                                    onChange={(e) => 
                                        this._handleOnChange("experience",parseInt(e.target.value))
                                    }
                                />
                                { errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.experience}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                            
                            <div className='form-group'>
                                <label htmlFor=''>Consult Fees</label>
                                <input type='number' id="consultFeesInput" name='consultFees' value={userData.consultFees} min={0}
                                    onChange={(e) => 
                                        this._handleOnChange("consultFees",parseInt(e.target.value))
                                }
                                />
                                 {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.consultFees}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor=''>Qualification</label>
                                <input type='text' id="qualificationInput" name="qualification" value={userData.qualification}
                                    onChange={(e) => 
                                        this._handleOnChange("qualification",e.target.value.trim())
                                    }
                                />
                                {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.qualification}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                            <div className='form-group'>
                                <label htmlFor=''>Practising At</label>
                                <input type='text' name="practisingAt"  value={userData.practiceAt}
                                    onChange={(e) => 
                                        this._handleOnChange("practisingAt",e.target.value.trim())
                                    }
                                />
                                {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.practiceAt}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div>
                                <label htmlFor=''>Languages</label>
                            </div>
                            <div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label' >
                                        <input
                                            id='LH' 
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("Hindi") }
                                        />
                                        Hindi
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("English") }
                                        />
                                        English
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("Bengali") }
                                        />
                                        Bengali
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("Telugu") }
                                        />
                                        Telugu
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("Gujrati") }
                                        />
                                        Gujrati
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            // checked={ this._checklang("Tamil") }
                                        />
                                        Tamil
                                    </label>
                                </div>
                            </div>
                            {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.lang}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                        </div>
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor=''>Email</label>
                                <input type='email' name="email" value={userData.email}
                                    onChange={(e) => 
                                    this._handleOnChange("email",e.target.value.trim())
                                }/>
                                {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.email}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                            <div className='form-group'>
                                <label htmlFor=''>Phone</label>
                                <input type='number' name="phone" value={userData.phone}
                                    onChange={(e) => 
                                    this._handleOnChange("phone",parseInt(e.target.value))
                                }/>
                                {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.phone}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div>
                                <label htmlFor=''>Gender</label>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            name="gender"
                                            value="Male"
                                            checked={userData.gender === "Male"? true : false}
                                            
                                            onChange={(e) => 
                                                this._handleOnChange("gender",e.target.value)
                                            }
                                        />
                                        Male 
                                    </label>
                                </div>
                                <div className='form-check-inline'>
                                    <label className='form-check-label'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            name="gender"
                                            value="Female"
                                            checked={userData.gender === "Female"? true : false}
                                            onChange={(e) => 
                                                this._handleOnChange("gender",e.target.value)
                                            }
                                        />
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor=''>
                                    Medical Registration Number
                                </label>
                                <input type='text' name="regNo" value={userData.regNo} min={0}
                                onChange={(e) => 
                                    this._handleOnChange("regNo",e.target.value.trim())
                                }/>
                                {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.regNo}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor='comment'>Graduation</label>
                                <textarea
                                    name="text"
                                    className='form-control'
                                    rows='5'
                                    id='comment' value={userData.qualification} onChange={(e) => 
                                        this._handleOnChange("graduation",e.target.value.trim())
                                    }></textarea>
                                    {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.qualification}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='comment'>Specialization</label>
                                <textarea
                                    name="text"
                                    className='form-control'
                                    rows='5'
                                    id='comment' value={userData.specialize}
                                    onChange={(e) => 
                                        this._handleOnChange("specialization",e.target.value.trim())
                                    }></textarea>
                                    {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.specialize}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div className='form-group'>
                                <label htmlFor='comment'>
                                    Super Specialization
                                </label>
                                <textarea
                                    name="text"
                                    className='form-control'
                                    rows='5'
                                    id='comment' value={this.state.userData.superSpecilize}
                                    onChange={(e) => 
                                        this._handleOnChange("superSpecialize",e.target.value.trim())
                                    }></textarea>
                                    {errors && (
                                    <Fragment>
                                        <small style={{ color: "red" }}>
                                            {errors.superSpecilize}
                                            {/* * Please fill above field */}
                                        </small>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <hr />
                        <button>Save</button>
                    </form>
                </section>
            </Fragment>
        );
    }
}

export default DoctorDetail;
