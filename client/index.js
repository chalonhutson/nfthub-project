
// Grabs header elements
let headerLeftSide = document.getElementById("headerLeftSide");
let numOfCartItems = document.getElementById("numOfCartItems");
let navToCartBtn = document.getElementById("navToCartBtn");

axios.get("/cartLength")
        .then(res => {
            cartNum = res.data
            numOfCartItems.innerText = `# Items - ${cartNum}`
            // console.log(typeof(res.data))
        });

headerLeftSide.addEventListener("click", (e) => window.location.replace("./index.html"))
navToCartBtn.addEventListener("click", (e) => window.location.replace("./cart.html"))

// Grabs main elements on the DOM.
let largePics = document.getElementsByClassName("nft-large-pics");
let names = document.getElementsByClassName("names");
let prices = document.getElementsByClassName("prices");



// Variable that is updated with the initial GET request
const nftInfo = []


const getAllPics = () => {

}

const getArtistName = async (id) => {
    axios.get(`/artists/${id}`)
        .then (res => {
            let name = res.data
            console.log(name)
        })
};


axios.get("/getAllNFTs")
    .then (res => {
        for (i = 0; i < 6; i++){
            nftInfo.push([res.data[i].smallPic, res.data[i].id, res.data[i].name, res.data[i].artist, res.data[i].artistName, res.data[i].price])
        }
        if (nftInfo.length > 0){
            // let artistName = null
            for (j = 0; j < 6; j++){
                largePics[j].src = nftInfo[j][0]
                names[j].innerText = `${nftInfo[j][2]} - ${nftInfo[j][4]}`
                prices[j].innerText = `\$${(nftInfo[j][5])/100}`
            }
        }
    });
    
    
    const getNFTpage = (e, page) => {
        console.log(page)
        axios.get(`/nft/${page}`)
        .then((res) => {
            // console.log(res)
            window.location.replace("./nft.html")
        });
    }
    
    
    // console.log(newPics)
    // console.log(largePics)
    
        

largePics[0].addEventListener("click", (e) => {getNFTpage(e, nftInfo[0][1])})
largePics[1].addEventListener("click", (e) => {getNFTpage(e, nftInfo[1][1])})
largePics[2].addEventListener("click", (e) => {getNFTpage(e, nftInfo[2][1])})
largePics[3].addEventListener("click", (e) => {getNFTpage(e, nftInfo[3][1])})
largePics[4].addEventListener("click", (e) => {getNFTpage(e, nftInfo[4][1])})
largePics[5].addEventListener("click", (e) => {getNFTpage(e, nftInfo[5][1])})


// getAllPics()