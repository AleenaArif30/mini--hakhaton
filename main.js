// import {auth, onAuthStateChanged} from "./firebase.js"


// let createpost = ()=>{
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/auth.user
//             console.log(user)
//             window.location.href = "./dashboard.html"
//             // ...
//         } else {
//             // User is signed out
//             // ...
//             window.location.href = "./index.html"
//             console.log("no user available")
//         }
//     });
    
// }


// let create_post = document.getElementById("create")
// create_post.addEventListener("click",createpost)


import {
    auth,
    getAuth,
    signOut,
    
    onAuthStateChanged,

    db,
    query,
    orderBy,
    addDoc,
    serverTimestamp,
    
    collection, getDocs, doc, 
    deleteDoc
} from "./firebase.js";

let logout=()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signout successfull")

    })

    .catch((error) => {
      // An error happened.
    });
    
}
let out = document.getElementById('logout')
out.addEventListener("click",logout)

let getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `,doc.data());
    });
}
getData()
/*const Update = document.getElementById("update");
if (googleBtn) {
    Update.addEventListener("click", UpdateProfile);
}*/



// Attach event listeners for post actions (edit/delete)
const attachEventListeners = () => {
    const post_data = document.getElementById("post_data");

    post_data.addEventListener("click", async (e) => {
        if (e.target && e.target.classList.contains("deleteBtn")) {
            const postId = e.target.closest('.p-2').getAttribute('data-id');
            if (postId) {
                try {
                    await deleteDoc(doc(db, "Post", postId)); // Delete from Firestore
                    alert("Post deleted successfully");
                } catch (error) {
                    console.error("Error deleting document:", error);
                    alert("Error deleting the post");
                }
            } else {
                alert("Post ID not found!");
            }
        }
    });

    post_data.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("editBtn")) {
            const postId = e.target.closest('.p-2').getAttribute('data-id');
            const cardElement = e.target.closest('.p-2');
            const currentTitle = cardElement.querySelector('.title').innerText;
            const currentDesc = cardElement.querySelector('.description').innerText;

            document.getElementById("title").value = currentTitle;
            document.getElementById("description").value = currentDesc;

            let updateButton = document.getElementById("update_post");
            if (updateButton) {
                updateButton.onclick = () => UpdatePost(postId, cardElement);
            }
        }
    });
};

// // Fetch and display posts based on the selected category
// const fetchPosts = (category = "") => {
//     try {
//         const postListElement = document.getElementById("post_data");
//         postListElement.innerHTML = ''; // Clear previous posts

//         // If a category is passed, filter posts by that category
//         let queryRef = query(collection(db, "Post"), orderBy("time", "desc"));

//         if (category) {
//             // Only show posts that match the selected category
//             queryRef = query(queryRef, where("category", "==", categoryInput.toLowerCase()));
//         }

//         const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
//             if (querySnapshot.empty) {
//                 postListElement.innerHTML = '<p>No posts found for this category</p>';
//             } else {
//                 querySnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     const timeString = data.time ? data.time.toDate().toLocaleString() : "No Timestamp";
//                     const currentUser = auth.currentUser;
//                     const userName = currentUser && currentUser.displayName;

//                     // Create post element
//                     const postElement = document.createElement('div');
//                     postElement.classList.add('p-2', 'mb-2');
//                     postElement.setAttribute('data-id', doc.id);

//                     postElement.innerHTML = `
//                         <div class="card-header d-flex">
//                             <div class="name-time d-flex flex-column">
//                                 ${userName}
//                                 <div class="time">${timeString}</div>
//                             </div>
//                         </div>
//                         <blockquote class="blockquote mb-0">
//                             <p class="title">${data.title}</p>
//                             <footer class="blockquote-footer description">${data.desc}</footer>
//                         </blockquote>
//                         <div class="card-footer d-flex justify-content-end">
//                             <button type="button" class="ms-2 btn bg-primary text-light editBtn">Edit</button>
//                             <button type="button" class="ms-2 btn btn-danger deleteBtn">Delete</button>
//                         </div>
//                     `;

//                     postListElement.appendChild(postElement);
//                 });

//                 attachEventListeners(); // Attach event listeners for Edit/Delete actions
//             }
//         });

//         return unsubscribe;
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     }
// };

// // Handle category search button click
// const handleSearchClick = () => {
//     const searchBtn = document.getElementById("searchBtn");
//     const searchCategoryInput = document.getElementById("searchCategory");

//     searchBtn.addEventListener("click", () => {
//         const selectedCategory = searchCategoryInput.value.trim().toLowerCase();

//         // If the search input is empty, show all posts
//         if (selectedCategory) {
//             fetchPosts(selectedCategory);  // Fetch posts based on the selected category
//         } else {
//             document.getElementById("post_data").innerHTML = '<p>Please enter a category to search.</p>';
//         }
//     });
// };

// // Initial fetch to display all posts when the page loads
// fetchPosts();

// // Initialize search button listener
// handleSearchClick();


// let addDocument = async () => {
//     try {
//         let title_input = document.getElementById("title");
//         let desc_input = document.getElementById("description");
//         let category_input = document.getElementById("category");

//         const selectedCategory = category_input.value;  // Get selected category for post

//         const docRef = await addDoc(collection(db, "Post"), {
//             title: title_input.value,
//             desc: desc_input.value,
//             category: selectedCategory,  // Store the category with the post
//             time: Timestamp.now(),
//         });

//         console.log("Successfully added document with ID: ", docRef.id);

//         title_input

let addPost = async () => {



    
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        console.log(user)
        window.location.href = "./index1.html"
        // ...
    } else {        console.log("you are log in",user)
    
    
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let category = document.getElementById("category").value.trim().toLowerCase();

    if (!title || !description || !category) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "Post"), {
            title: title,
            description: description,
            ServerTimestamp: serverTimestamp(),
            category: category
        });
        console.log("Document written with ID:", docRef.id);
        alert("Post added successfully!");
        getAllPost(); // Refresh posts after adding
    } catch (error) {
        console.error("Error adding post:", error);
        alert("Failed to add post. Please try again.");
    }
}
})
    
};



document.getElementById('button').addEventListener("click",addPost)

let  getAllPost = async () => {
    const q = query(collection(db, "Post"), orderBy('ServerTimestamp', 'desc'));
    let postListElement = document.getElementById("post_data");

    if (!postListElement) {
        console.error("post_data element not found in the DOM.");
        return;
    }

    postListElement.innerHTML = `<p>Loading posts...</p>`; // Show loading indicator

    try {
        const querySnapshot = await getDocs(q);
        postListElement.innerHTML = ""; // Clear previous results

        if (querySnapshot.empty) {
            postListElement.innerHTML = `<p>No posts found.</p>`;
            return;
        }

        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const timeString = postData.ServerTimestamp?.toDate().toLocaleString() || "No Timestamp";

            postListElement.innerHTML += `
                <div class="post-card">
                    <div class="card-header">
                        <p>Posted on: ${timeString}</p>
                    </div>
                    <h3>${postData.title}</h3>
                    <p>${postData.description}</p>
                    <small class="badge">${postData.category}</small>
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to fetch posts. Please try again.");
    }
};

// Load all posts on page load
getAllPost();
const searchByCategory = async () => {
    const categoryInput = document.getElementById("searchCategory").value.trim().toLowerCase();
    const postListElement = document.getElementById("post_data");

    if (!categoryInput) {
        alert("Please enter a category to search.");
        return;
    }

    postListElement.innerHTML = `<p>Loading...</p>`; // Show loading indicator

    try {
        const q = query(collection(db, "Post"), where("category", "==", categoryInput));
        const querySnapshot = await getDocs(q);

        postListElement.innerHTML = ""; // Clear previous results

        if (querySnapshot.empty) {
            postListElement.innerHTML = `<p>No posts found for category: ${categoryInput}</p>`;
            return;
        }

        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const timeString = postData.ServerTimestamp?.toDate().toLocaleString() || "No Timestamp";

            postListElement.innerHTML += `
                <div class="post-card">
                    <div class="card-header">
                        <p>Posted on: ${timeString}</p>
                    </div>
                    <h3 class="card text-primary">${postData.title}</h3>
                    <p class="card">${postData.description}</p>
                    <small class="badge">${postData.category}</small>
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        alert("Failed to fetch posts. Please try again.");
    }
};

document.getElementById("searchBtn").addEventListener("click", searchByCategory);

