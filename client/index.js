

let largePics = document.getElementsByClassName("nft-large-pics");

const testBtn = document.getElementById("test-btn")

const newPics = []


const getAllPics = () => {

}

axios.get("http://localhost:4200/getAllNFTs")
    .then (res => {
        for (i = 0; i < 6; i++){
            newPics.push([res.data[i].smallPic, res.data[i].id])
        }
        if (newPics.length > 0){
            for (i = 0; i < newPics.length; i++){
                largePics[i].src = newPics[i][0]
            }
        }
    })

// const getSinglePic = () => {
//     axios.get("http://localhost:4200/getImg")
//         .then(res => {
//             console.log(res)
//         })
// }


const getNFTpage = (e, page) => {
    console.log(page)
    axios.get(`http://localhost:4200/nft/${page}`)
        .then((res) => {
            console.log(res)
            window.location.replace("./nft.html")
        });
}


console.log(newPics)
console.log(largePics)


largePics[0].addEventListener("click", (e) => {getNFTpage(e, newPics[0][1])})
largePics[1].addEventListener("click", (e) => {getNFTpage(e, newPics[1][1])})
largePics[2].addEventListener("click", (e) => {getNFTpage(e,newPics[2][1])})
largePics[3].addEventListener("click", (e) => {getNFTpage(e, newPics[3][1])})
largePics[4].addEventListener("click", (e) => {getNFTpage(e, newPics[4][1])})
largePics[5].addEventListener("click", (e) => {getNFTpage(e, newPics[5][1])})


// getAllPics()