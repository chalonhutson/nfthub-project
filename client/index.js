// const axios = require("axios");


const largePics = document.getElementsByClassName("nft-large-pics");

const newPics = []

const getAllPics = () => {
    axios.get("http://localhost:4200/getAllNFTs")
        .then(res => {
            console.log(res.data[0].smallPic)
        })
}

getAllPics()