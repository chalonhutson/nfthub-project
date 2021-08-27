
// Grabs header elements
let headerLeftSide = document.getElementById("headerLeftSide");
let numOfCartItems = document.getElementById("numOfCartItems");
let navToCartBtn = document.getElementById("navToCartBtn");




// axios.get("/cartLength")
//             .then(res => {
    //                 cartNum = res.data
    //                 numOfCartItems.innerText = `# Items - ${cartNum}`
    //                 // console.log(typeof(res.data))
    //             });
    
    headerLeftSide.addEventListener("click", (e) => window.location.replace("./index.html"));
    navToCartBtn.addEventListener("click", (e) => window.location.replace("./cart.html"));
    
    
    
    
// Grabs main elements on DOM
const totalItemsText = document.getElementById("totalItemsText");
const itemsDiv = document.getElementById("itemsDiv");
const orderTotalAmount = document.getElementById("orderTotalAmount");
const placeOrderBtn = document.getElementById("placeOrderBtn");

let orderTotal = 0;
let itemsInCart = 0;


const updateCartLength = () => {
    axios.get("/cartLength")
            .then(res => {
                cartNum = res.data
                numOfCartItems.innerText = `# Items - ${cartNum}`
                totalItemsText.innerText = `Items in cart: ${itemsInCart}`
            });
};


const removeItem = (el) => {
    axios.get(`/remove/${el}`)
        .then((res) => {
            updateCartLength()
            orderTotalAmount.innerText = ` \$${orderTotal/100}`
        })
};


const constructPage = (arr) => {
    totalItemsText.innerText = `Items in cart: ${arr.length}`
    itemsInCart = arr.length

    for (i = 0; i < arr.length; i++) {
        const arrEl = i
        const arrGT = arr[i].grandTotal
        const itemImg = arr[i].smallPic
        orderTotal += arr[i].grandTotal
        orderTotalAmount.innerText = ` \$${orderTotal/100}`

        let singleItem = document.createElement("div")
        singleItem.className = "singleItem"

        let imageSmall = document.createElement("img")
        imageSmall.src = arr[i].smallPic
        imageSmall.className = "imageSmall"
        singleItem.appendChild(imageSmall)
        imageSmall.addEventListener("mouseenter", (e) => {
            tempImgSrc = imageSmall.src
            imageSmall.src = "./images/redx-small.png"
        })
        imageSmall.addEventListener("mouseleave", (e) => {
            imageSmall.src = itemImg
        })
        imageSmall.addEventListener("click", (e) => {
            singleItem.remove()
            orderTotal -= arrGT
            itemsInCart -= 1
            removeItem(arrEl)
        });
        
        let rightHalf = document.createElement("div")
        rightHalf.className = "rightHalf"
        singleItem.appendChild(rightHalf);

        let namesDiv = document.createElement("div")
        namesDiv.className = "names"
        rightHalf.appendChild(namesDiv);

        let artNameandArtist = document.createElement("h3")
        artNameandArtist.innerText = `"${arr[i].artName}" by ${arr[i].artistName} - `
        artNameandArtist.className = "artNameandArtist"
        namesDiv.appendChild(artNameandArtist);

        let basePrice = document.createElement("h3")
        basePrice.innerText = `\$${arr[i].basePrice/100}`
        basePrice.className = "basePrice"
        namesDiv.appendChild(basePrice);

        let allAddons = document.createElement("div")
        allAddons.className = "addAddons"
        rightHalf.appendChild(allAddons);


        if (arr[i].led) {
            let ledElement = document.createElement("h3")
            ledElement.innerText = `Add LED Lights - \$${arr[i].ledPrice/100}`
            ledElement.className = "addons"
            allAddons.appendChild(ledElement)
        };

        if (arr[i].signedCopy) {
            let signedCopyElement = document.createElement("h3")
            signedCopyElement.innerText = `Signed Copy - \$${arr[i].signedPrice/100}`
            signedCopyElement.className = "addons"
            allAddons.appendChild(signedCopyElement)
        };

        if (arr[i].poster) {
            let posterElement = document.createElement("h3")
            posterElement.innerText = `Add Poster - \$${arr[i].posterPrice/100}`
            posterElement.className = "addons"
            allAddons.appendChild(posterElement)
        };



        itemsDiv.appendChild(singleItem);



    }
};



axios.get("/cart")
    .then(res => {
        constructPage(res.data)
        updateCartLength();
    });

placeOrderBtn.addEventListener("click", (e) => {alert(`You have order a purchase of \$${orderTotal/100}. Thank you for your business.`)})