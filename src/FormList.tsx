import React from 'react'
import { useState } from 'react'

const FormList: React.FC = () => {
    interface userInter{
        fname:string;
        age:string;
        job:string;
    }
    interface allUsername {
        currentUser: userInter;
        allUser: Array<userInter>
    }
    const [user, setuser] = useState<allUsername>({
        currentUser : {
            fname : "",
            age: "",
            job : ""
        },
        allUser: []
    })
    const oneventChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setuser({
            ...user,
            currentUser:{
                ...user.currentUser,
                [e.target.name]: e.target.value
            }
        })

    }
    const submitBtn = (e: React.SyntheticEvent):void => {
        e.preventDefault();
        setuser({
            currentUser : {
                fname : "",
                age: "",
                job : ""
            },
            allUser: [
                ...user.allUser,
                user.currentUser
            ]
        })
    } 
    const deletHandler =  (index:number):void => {
        const filterList = user.allUser.filter((element,i) => {
            return index !== i
        })
        setuser({
            ...user,
            allUser:filterList
        })
    }  
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit={submitBtn} className="form-group p-4 bg-muted rounded shadow mt-4">
                            <h4 className="text-secondary text-center">Add New Person</h4>
                            <input onChange={oneventChange} name="fname" className="form-control mt-3 mb-3" type="text" placeholder="Name"/>
                            <input onChange={oneventChange} name="age" className="form-control mt-3 mb-3" type="text" placeholder="Age"/>
                            <input onChange={oneventChange} name="job" className="form-control mt-3 mb-3" type="text" placeholder="Job"/>
                            <button className="btn btn-primary shadow text-center w-100 mt-2 mb-2">Submit</button>
                        </form>
                    {user.allUser.length > 0 ? (
                        <div className="list-group mt-2 shadow p-4 mt-3 mb-3">
                            <h5 className="text-primary text-center">List of people</h5>
                            {user.allUser.map((item,i) =>(
                                 <li key={i} className="list-group-item list-group-item-primary mt-3 mb-3">
                                    <div className="d-flex justify-content-between">
                                    <div className="text-user">
                                     <span className="m-2"><i className="fa-solid fa-user mx-2 text-primary"></i>{item.fname}</span>
                                     <span className="m-2"><i className="fa-solid fa-arrow-down-1-9 mx-2 text-primary"></i>{item.age}</span>
                                     <span className="m-2"><i className="fa-solid fa-people-group mx-2 text-primary"></i>{item.job}</span>
                                     </div>
                                     <div className="icon text-primary">
                                     <button className="bg-transparent border-0 text-primary" onClick={() => deletHandler(i)}><i className="fa-solid fa-trash"></i></button>
                                     </div>
                                     </div> 
                                 </li>
                            ))}
                        </div>
                        ):(
                            <li className="list-group-item list-group-item-danger mt-4 text-center p-2 rounded-2">
                                There is not anyone here !
                            </li>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormList
