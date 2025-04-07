import Header from "../components/Header"
import Footer from "../components/Footer"
import useGlobalContext from "../context/globalContext"
import { Link } from "react-router-dom"

const Addressess = () => {
    const{user,setUser} = useGlobalContext()
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
                        <Link to='/profile/addressess/addNew'  className="btn btn-success btn-sm mb-4">Add new address</Link>
                        <ul className="list-group">
                            {user && user.addresses &&
                                user.addresses.map(address => (
                                    <li className="list-group-item">
                                        {address.label + ', ' + address.street + ', ' + address.city + ', ' + address.state + '-' + address.pincode}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </main>
            <Footer />

        </>
    )
}

export default Addressess