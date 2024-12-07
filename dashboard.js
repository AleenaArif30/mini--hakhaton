import{auth,signOut,onAuthStateChanged}from "./firebase.js"


let signout = () => {
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout")
            setTimeout(()=>{
                window.location.href = "./index.html"
            },3000)

            history.pushState(null,null,window.location.href)
        }).catch((error) => {
            // An error happened.
            console.log(error.message)
        });

    }
}
let sign_out = document.getElementById("sign-out")
sign_out.addEventListener('click', signout)


onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user)
        window.location.href = "./index.html"
        // ...
    } else {
        // User is signed out
        // ...
        console.log(" user available",user.email)
    }
});


// Function to handle post creation
function post() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;

    if (title && description) {
        const post = document.getElementById("post");
        post.innerHTML += `
            <div class="card p-2 mb-2">
                <div class="card-header">
                    <strong>Category:</strong> ${category}
                </div>
                <div class="card-body">
                    <h5>${title}</h5>
                    <p>${description}</p>
                </div>
            </div>
        `;
        // Reset fields
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "General";
    } else {
        Swal.fire({
            title: "Empty Post",
            text: "Please provide a Title, Description, and Category for the post.",
            icon: "warning"
        });
    }
}

// Add event listener to the button
document.getElementById("postBtn").addEventListener("click", post);


