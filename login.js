import{auth,signInWithEmailAndPassword,sendEmailVerification,onAuthStateChanged} from "./firebase.js"

let signin = () => {

    let email = document.getElementById('email').value
    let password = document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
            setTimeout(() => {
                window.location.href = "./dashboard.html"
            }, 3000)
            alert("login")


            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                    console.log("email verification sent")
                        .catch((error) => {
                            console.log(error.message)
                        })
                })
        })
        .catch((error) => {
            console.log(error.message)
            const errorCode = error.code;
            if (errorCode == "auth/invalid-emai") {
                alert("enter valid mail")
            }
            else if (errorCode == "auth/invalid-credential") {
                alert("invalid user, please enter correct password and email")
            }

            else {
                console(error.message)
            }

        });

}
let sign_in = document.getElementById("sign-in")
sign_in.addEventListener("click", signin)




onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user)
        window.location.href = "./dashboard.html"
        // ...
    } else {
        // User is signed out
        // ...
        console.log("no user available")
    }
});


/*let signout = () => {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
        }).catch((error) => {
            // An error happened.
            console.log(error.message)
        });

    }
}
let sign_out = document.getElementById("sign-out")
sign_out.addEventListener('click', signout)*/





/*let signout = () => {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
        }).catch((error) => {
            // An error happened.
            console.log(error.message)
        });

    }
}
let sign_out = document.getElementById("sign-out")
sign_out.addEventListener('click', signout)*/



