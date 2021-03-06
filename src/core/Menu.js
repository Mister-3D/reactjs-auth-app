import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";


// a helper class to indicate the active link - by Teacher
const isActive = (history, path) => {
    // if the history(address) is same as the path[i.e. route(link)] 
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

// a helper class to indicate the active link - by Me
// i want to add the value to the html "class" attribute 
// e.g. like <li><a class="nav-link active">Link active</a></li>
const isActiveLink = (history, path) => {
    // if the history(address) is same as the path[i.e. route(link)] 
    if (history.location.pathname === path) {
        return "active" ;
    } else {
        return  "" ;
    }
};


const Menu = ({ history }) => {

    return(

        <div>
            <ul className="nav nav-tabs bg-primary">


                <li className="nav-item">
                    <Link 
                        className="nav-link"
                        style={isActive(history, "/")} 
                        to="/"
                    >
                        Home
                    </Link>
                </li>


                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/user/dashboard")}
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/admin/dashboard")}
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>
                )}


                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link 
                                className="nav-link"
                                style={isActive(history, "/signin")}
                                to="/signin"
                            >
                                Signin
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                style={isActive(history, "/signup")} 
                                to="/signup"
                            >
                                Signup
                            </Link>
                        </li>
                    </Fragment>
                )}

                

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span 
                            className="nav-link" 
                            style={{cursor: 'pointer', color: '#fff'}} 
                            onClick={() => 
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                            Signout
                        </span>
                    </li>
                )}

            </ul>
        </div>
    );
    

};

export default withRouter(Menu);