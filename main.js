import {auth, onAuthStateChanged} from "./firebase.js"


let createpost = ()=>{
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
            window.location.href = "./index.html"
            console.log("no user available")
        }
    });
    
}


let create_post = document.getElementById("create")
create_post.addEventListener("click",createpost)

