import Header from "../components/Header"
import Footer from "../components/Footer"
import useGlobalContext from "../context/globalContext"
import { Link } from "react-router-dom"
import { useState } from "react"

const AddNewAddress = () => {
    const{user,setUser, API_URL} = useGlobalContext()

    const [formData, setFormData] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
    })


    const inputHandler = (e) => {
        const {id, value} = e.target
        setFormData(prevData => ({...prevData, [id]:value}))
    }

    const formHandler = (e) => {
        e.preventDefault()
        const updatedAddresses = [...user.addresses, formData]
        console.log(updatedAddresses)


        fetch(`${API_URL}/update/67dce53d2b5635c333cd19df`, {
            method: "POST",
            body: JSON.stringify({addresses: updatedAddresses}),
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    return (
        <>
            <Header />
            <main className="container">
                <div className="row py-5">
                    <div className="col-md-2">
                        <ul className="list-group list-group-flush sidebar">
                            <li className="list-group-item"><Link to='/profile'>Profile</Link> </li>
                            <li className="list-group-item"><Link >Orders</Link> </li>
                            <li className="list-group-item"><Link to='/profile/addressess' >Addressess</Link> </li>
                        </ul>
                    </div>

                    <div className="col-md-8">
                        <h5>Add New Address</h5>
                        <form onSubmit={(e) => formHandler(e)}>
                            <label htmlFor="label">Label</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="label" required/> <br/>

                            <label htmlFor="street">Street</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="street" required/> <br/>

                            <label htmlFor="city">City</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="city" required/> <br/>

                            <label htmlFor="state">State</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="state" required/> <br/>

                            <label htmlFor="pincode">Pincode</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="pincode" required/> <br/>

                            <label htmlFor="country">Country</label> <br/>
                            <input onChange={inputHandler} className="form-control" type="text" id="country" required/> <br/>

                            <input type="submit" value="save" />
                        </form>
                    </div>
                </div>

            </main>
            <Footer />

        </>
    )
}

export default AddNewAddress