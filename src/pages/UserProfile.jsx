import Header from "../components/Header"
import Footer from "../components/Footer"
import useGlobalContext from "../context/globalContext"
import { Link } from "react-router-dom"

const UserProfile = () => {
    const{user,setUser} = useGlobalContext()

    return (
        <>
            <Header />
            <main className="container">
                <div className="row py-5">
                    <div className="col-md-2">
                        <ul className="list-group list-group-flush sidebar">
                            <li className="list-group-item"><Link to='/profile'>Profile</Link> </li>
                            <li className="list-group-item"><Link to='/orders' >Orders</Link> </li>
                            <li className="list-group-item"><Link to='/profile/addressess' >Addressess</Link> </li>
                        </ul>
                        
                    </div>

                    <div className="col-md-8">
                        <img style={{borderRadius: "50%"}} className="mb-3" src="https://placehold.co/150?text=R" alt="" />
                        <p><span className="me-3">Name :</span> {user.name}</p>
                        <p><span className="me-3">Email :</span> {user.email}</p>
                        <p><span className="me-3">Phone Number :</span> {user.phoneNumber}</p>
                    </div>
                </div>

            </main>
            <Footer />

        </>
    )
}

export default UserProfile