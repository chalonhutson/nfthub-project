
// Grabs header elements
let headerLeftSide = document.getElementById("headerLeftSide");
let numOfCartItems = document.getElementById("numOfCartItems");
let navToCartBtn = document.getElementById("navToCartBtn");

axios.get("http://localhost:4200/cartLength")
        .then(res => {
            cartNum = res.data
            numOfCartItems.innerText = `# Items - ${cartNum}`
            // console.log(typeof(res.data))
        });

headerLeftSide.addEventListener("click", (e) => window.location.replace("./index.html"))
navToCartBtn.addEventListener("click", (e) => window.location.replace("./cart.html"))

// Page info is set when the page is visited, and used for updating all the HTML elements. If null, elements will appear on page but won't be updated.
let pageInfo = null;
let nftID = null;
let cartNum = 0;

// Grabbing the main elements from the HTML.

    // Main elements
const mainPic = document.getElementById("mainPic");
const nftName = document.getElementById("nftName");
const artistName = document.getElementById("artistName");
const basePriceTotal = document.getElementById("basePriceTotal");
const grandTotalAmount = document.getElementById("grandTotalAmount");
const addToCartBtn = document.getElementById("addToCartBtn");
const title = document.getElementById("title");

// Addon DOM elements and variables
const ledCheckBox = document.getElementById("ledCheckbox");
const ledPrice = document.getElementById("ledPrice");
const signedCopyCheckbox = document.getElementById("signedCopyCheckbox");
const signedCopyPrice = document.getElementById("signedCopyPrice");
const posterCheckbox = document.getElementById("posterCheckbox");
const posterPriceAmount = document.getElementById("posterPriceAmount");

let addLEDLights = false;
let addLEDAmount = 150;

let addSignedCopy = false;
let addSignedCopyAmount = 500;

let addPosterCopy = false;
let addPosterCopyAmount = 20;


// Grand total, and update function, to keep the grand total up to date.
let grandTotalAmountNumber = 0
const updateGrandTotal = (isAddition, amount) => {
    if (isAddition){grandTotalAmountNumber += amount}
    else {grandTotalAmountNumber -= amount}
    grandTotalAmount.innerText = `\$${grandTotalAmountNumber/100}`
};


const updateCart = (e) => {
    axios.get("http://localhost:4200/cartLength")
        .then(res => {
            cartNum = res.data
            numOfCartItems.innerText = cartNum
            console.log(typeof(res.data))
        });
};


// This function is called when the inital GET request is successful, and filled the DOM with updated elements.
const pageSetup = () => {
    if (pageInfo !== null){
        nftID = pageInfo.id
        mainPic.src = pageInfo.largePic
        nftName.innerText = `"${pageInfo.name}"`
        artistName.innerText = `By: ${pageInfo.artistName}`
        basePriceTotal.innerText = `\$${pageInfo.price/100}`
        ledPrice.innerText = `\$${pageInfo.ledPrice/100}`
        addLEDAmount = pageInfo.ledPrice
        signedCopyPrice.innerText = `\$${pageInfo.signedCopyPrice/100}`
        addSignedCopyAmount = pageInfo.signedCopyPrice
        posterPriceAmount.innerText = `\$${pageInfo.posterCopyPrice/100}`
        addPosterCopyAmount = pageInfo.posterCopyPrice
        updateGrandTotal(true, pageInfo.price)
        title.innerText = `${pageInfo.name} by ${pageInfo.artistName}`
        updateCart()
        
    } else {alert("Error loading page.")}
}


// Attempts to get the info for the page from the server. If successful it will update elements on the DOM.
axios.get("http://localhost:4200/nextpage/nft")
.then(res => {
    axios.get(`http://localhost:4200/nextpage/nft/${res.data}`)
        .then(res => {
            pageInfo = res.data
            console.log(pageInfo)
            pageSetup()
        })
    });


// Checkbox function and event listeners.
const updateCheckbox = (e, checkbox) => {
    if (checkbox === 0){
        if (addLEDLights){
            addLEDLights = false
            updateGrandTotal(false, addLEDAmount)
        } else {
            addLEDLights = true
            updateGrandTotal(true, addLEDAmount)
        }
    } else if (checkbox === 1){
        if (addSignedCopy){
            addSignedCopy = false
            updateGrandTotal(false, addSignedCopyAmount)
        } else {
            addSignedCopy = true
            updateGrandTotal(true, addSignedCopyAmount)
        }
    } else if (checkbox === 2){
        if (addPosterCopy){
            addPosterCopy = false
            updateGrandTotal(false, addPosterCopyAmount)
        } else {
            addPosterCopy = true
            updateGrandTotal(true, addPosterCopyAmount)
        }
    }
};

ledCheckBox.addEventListener("click", (e) => updateCheckbox(e, 0));
signedCopyCheckbox.addEventListener("click", (e) => updateCheckbox(e, 1));
posterCheckbox.addEventListener("click", (e) => updateCheckbox(e, 2));




const addToCartRequest = (e) => {
    body = {
        "item": nftID,
        "led": addLEDLights,
        "signedCopy": addSignedCopy,
        "poster": addPosterCopy,
        "grandTotal": grandTotalAmountNumber
    };

    axios.post("http://localhost:4200/addToCart", body)
        .then(res => {

            console.log(res.data.length)
        })

    updateCart()
};

addToCartBtn.addEventListener("click", addToCartRequest);
