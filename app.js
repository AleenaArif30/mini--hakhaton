
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,  signInWithPopup, GoogleAuthProvider, provider } from "./firebase.js"




let signup = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById("password").value
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)

            setTimeout(() => {
                window.location.href = "./dashboard.html"
            }, 3000)
            alert("login success")

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                    console.log("email verification sent")
                        .catch((error) => {
                            console.log(error.message)
                        })
                });
        })

        .catch((error) => {

            const errorcode = error.code
            if (errorcode === "auth/weak-password" || errorcode === "auth/missing-password") {
                alert("password should be 6 charater long")
            }
            else if (errorcode == "auth/email-already-in-use") {
                alert("user alreay exist")
            }

            else if (errorcode == "auth/invalid-email") {
                alert("please enter valid email")
            }
            else {
                console.log(error.message)
            }



        });
}
let sign_up = document.getElementById('sign-up')
sign_up.addEventListener("click", signup)



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


let goodlesignup = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.

            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error.message)
            console.log(email, credential)
        });

}

let google_signup = document.getElementById("google-signup")
google_signup.addEventListener("click", goodlesignup)



