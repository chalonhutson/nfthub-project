const path = require("path");

// const artists = ["Beeple", "mad\.dog\.jones", "hipstergw", "TruthByNature", "Leossenas", "polygonatic"];
const artistArr = [];
let artistCount = 1;

let nftPageOnDeck = null

const nftArr = [];
let nftCount = 1;

class artist {
    // add() { artistArr.push(this) }
    add() { artistArr.push(this) }
    increment() { artistCount++ }

    constructor(name, at, link){
        this.id = artistCount;
        this.name = name;
        this.at = at;
        // this.link = link;
        this.add();
        this.increment()
    }
};

class NFT {
    add() {nftArr.push(this)}
    increment() {nftCount ++}
    largePic() {}

    constructor(name, artist, price){
        this.id = nftCount;
        this.name = name; 
        this.artist = artist;
        this.price = price;
        this.largePic = `images/${this.id}-large.png`
        this.smallPic = `images/${this.id}-small.png`
        this.add();
        this.increment();
        // this.announce();
    }

};


// Instantiating all the artists.
const artist01 = new artist("Beeple", "@beeple");
const artist02 = new artist("MadDogJones", "@mad\.dog\.jones");
const artist03 = new artist("hipstergw", "@hipstergw");
const artist04 = new artist("leossenas", "@leossenas");
const artist05 = new artist("Polygonatic", "@polygonatic");
const artist06 = new artist("Truth By Nature", "@TruthByNature");

// console.log(artistArr)

// Instantiating all the NFTs.
const item01 = new NFT("First Emoji", 0, 1500000);
const item02 = new NFT("Observance", 2, 5000);
const item03 = new NFT("Buddies", 4, 250000);
const item04 = new NFT("Journey Begins", 5, 47500);
const item05 = new NFT("HOUSTON, WE HAVE A PROBLEM!!!", 4, 12500);
const item06 = new NFT("Expedition", 2, 2500);

// console.log(nftArr)



// Exporting functions
module.exports = {
    landingPage: (req, res) => {
        res.sendFile(path.join(__dirname, "/client/index.html"))
    },

    artists: (req, res) => {
        res.status(200).send(artistArr)
    },

    getAllNFTs: (req, res) => {
        res.status(200).send(nftArr)
    },

    nftSend: (req, res) => {
        nftPageOnDeck = req.params.id
        res.status(200).send("Cool cool cool.")
    },

    nftPage: (req, res) => {
        res.status(200).send(nftPageOnDeck)
    },

    nftSetup: (req, res) => {
        res.status(200).send(nftArr[req.params.id-1])
    }

}