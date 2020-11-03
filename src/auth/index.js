import { API } from "../config";

export  const signup = user => {
    
     return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


export  const signin = user => {
  
     return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


// NB: (next) is a callback function, you could name it anything
// we want to persist the user information in the local storage once they are loggedin
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

// this handles the signout stuff, its link is in the (core/Menu.js) file
// it takes in a callback function (next) as a parameter
// then the argument is passed to it in the (core/Menu.js) when the "signout" link is clicked
export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};


// this function ensures the user is authenticated(loggedin)
// it only returns 'true' when the 'jwt' localStorage item holding the usertoken is set
// else, it assumes there is no user
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
