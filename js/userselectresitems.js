let cartitem = document.getElementById('cartitem');
let modalCart = document.getElementById('modalCart');
let loader = document.getElementById('loader');
let id = localStorage.getItem("resid");

let resName = document.getElementById('resName'), mainResName = document.getElementById('mainResName'), allResItems = document.getElementById('allResItems'), deliverycharges = document.getElementById('deliverycharges'); deal = document.getElementById('deal'); mainHeaderImage = document.getElementById('mainHeaderImage');
const showResAllItems = () => {
    loader.style.display = "block";
    let items = '';

    resturantData();
    disableCheckout();
    // FOr Getting Resturant Items
    db.collection("items").where("key", "==", id).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            allResItems.innerHTML = `<h2 class="text-center">No Items Added By Resturant</h2>`;
            loader.style.display = "none";
        } else {
            querySnapshot.forEach((doc) => {
                items += `<div id="w${doc.id}" onclick="addcartitem(${doc.id}); cart(${doc.id});" class="box-item pt-3">
                            <div class="Item-nameNimage">
                                <div class="itemname">
                                    <p><b>${doc.data().itemname}</b><br>${doc.data().itemcategory}</p>
                                    <p>Rs: ${doc.data().itemprice}</p>
                                </div>
                                <div class="itemimage">
                                    <img class="rounded-circle" src="${doc.data().imageurl}" width="70px" height="70px" alt="">
                                    <div class="plus-item"><i class="bi bi-plus-square-fill"></i></div>
                                </div>
                                
                            </div>
                        </div>`
                allResItems.innerHTML = items;
                loader.style.display = "none"
            });
        }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
        alert(error)
    });
}

const resturantData = () => {
    // FOr Getting Resturant Data
    db.collection("resturant").where("restaurantkey", "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            resName.innerHTML = `${doc.data().name} Restaurant Items`
            mainResName.innerHTML = `${doc.data().name}`
            
            
            mainHeadervideo.src = `${doc.data().videourl}`
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });

    let x = cartitem.getElementsByTagName("div").length;
    if (x == 0) {
        cartitem.style.display = "none"
    } else {
        cartitem.style.display = "block"
    }
}

const addcartitem = (itemid) => {
    let html = '';
    let htmltwo = '';
    cartitem.style.display = "block"

    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            html += `<div id="rr${itemid}">
                        <div class="d-f-j-b pt-3" >
                            <div class="cartItemname" id="cartitemnameid">${doc.data().itemname}</div>
                            
                        </div>
                        <div class="d-f-j-b pt-2" style="cursor: pointer;">
                            <div class="text-end">Quatity: 1</div> 
                            <div onclick="removefromCart( ${itemid})"><i class="bi bi-trash"></i></div>
                        </div>
                        
                    </div>`

            cartitem.innerHTML += html;
        });

    db.collection("items").doc(`${itemid}`)
        .onSnapshot((doc) => {
            htmltwo += `<div id="rrm${itemid}">
                        <div class="d-f-j-b pt-3" >
                            <div class="cartItemname" id="cartitemnameid">${doc.data().itemname}</div>
                
                        </div>
                        <div class="d-f-j-b pt-2" style="cursor: pointer;">
                            <div class="text-end">Quatity: 1</div> 
                            <div onclick="removefromCart(${doc.data().itemprice}, ${itemid})"><i class="bi bi-trash"></i></div>
                        </div>
                        
                    </div>`

            modalCart.innerHTML += htmltwo;
        });
    disableCheckout();
    let itemforchange = document.getElementById(`w${itemid}`);

}



const disableCheckout = () => {
    let totnum = Number(totalprice.textContent);
    let checkoutbtn = document.getElementById('checkoutbtn');
    let checkoutbtnmodal = document.getElementById('checkoutbtnmodal');
    let placeorder = document.getElementById('placeorder');
    if (totnum <= 0) {
        checkoutbtn.disabled = true;
        checkoutbtnmodal.disabled = true;
        placeorder.disabled = true;
    } else if (totnum > 0) {
        checkoutbtn.disabled = false;
        checkoutbtnmodal.disabled = false;
        placeorder.disabled = false;
    }
}

////! Geo Location



////! --------------------------------


// PHONE Number Authentication

// function render() {

//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     recaptchaVerifier.render()
// }

// function phoneauth() {
//     let userOrderNum = document.getElementById('userOrderNum').value;
//     console.log(userOrderNum);
//     auth.signInWithPhoneNumber(userOrderNum, window.recaptchaVerifier)
//         .then((confirmationResult) => {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             window.confirmationResult = confirmationResult;
//             console.log(confirmationResult);
//             // ...
//         }).catch((error) => {
//             // Error; SMS not sent
//             console.log(error);
//             // ...
//         });
// }

// function verify() {
//     let vericode = document.getElementById('vericode').value;
//     console.log(vericode);
//     confirmationResult.confirm(vericode).then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         console.log(user);
//         // ...
//     }).catch((error) => {
//         console.log(error);
//         // User couldn't sign in (bad verification code?)
//         // ...
//     });
// }

////! Storage
// function upload() {

//     const ref = storage.ref('resturant');
//     let file = document.getElementById('photo').files[0], image = document.getElementById('image');
//     const date = new Date, name = date.getTime() + '-' + file.name

//     const metadata = {
//         contentType: file.type
//     }

//     const task = ref.child(name).put(file, metadata);

//     task.then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => { console.log(url); image.src = url; })
//         .catch((err) => { console.log(err); })


// }