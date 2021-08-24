const path = require("path");

let cart = []


const artistArr = [];
let artistCount = 0;

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

    constructor(name, artist, artistName, price, ledPrice, signedCopyPrice, posterCopyPrice){
        this.id = nftCount;
        this.name = name; 
        this.artist = artist;
        this.artistName = artistName;
        this.price = price;
        this.largePic = `images/${this.id}-large.png`
        this.smallPic = `images/${this.id}-small.png`
        this.ledPrice = ledPrice;
        this.signedCopyPrice = signedCopyPrice;
        this.posterCopyPrice = posterCopyPrice;
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
const item01 = new NFT("First Emoji", 0, "Beeple", 1500000, 15000, 50000, 2000);
const item02 = new NFT("Observance", 2, "hipstergw", 5000, 2500, 500, 500);
const item03 = new NFT("Buddies", 4, "Polygonatic", 250000, 10000, 15000, 2000);
const item04 = new NFT("Journey Begins", 5, "Truth By Nature", 47500, 7500, 5000, 500);
const item05 = new NFT("HOUSTON, WE HAVE A PROBLEM!!!", 4, "leossenas", 12500, 5000, 2500, 1000);
const item06 = new NFT("Expedition", 2, "hipstergw", 2500, 2500, 500, 500);

// console.log(nftArr)



// Exporting functions
module.exports = {
    landingPage: (req, res) => {
        res.sendFile(path.join(__dirname, "/client/index.html"))
    },

    artists: (req, res) => {
        res.status(200).send(artistArr)
    },

    getArtist: (req, res) => {
        let artistname = artistArr[req.params.id].name
        res.status(200).send(artistname)
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
        res.status(200).send(nftArr[req.params.id - 1])
    },

       addToCart: (req, res) => {
        const { item, led, signedCopy, poster, grandTotal } = req.body;

        let alreadyUsed = false;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === item) {
                alreadyUsed = true;
                res.status(200).send(cart)
            }
        }

        if (alreadyUsed === false) {
            let newItem = {
                id: item,
                led: led,
                ledPrice: nftArr[item - 1].ledPrice,
                signedCopy: signedCopy,
                signedPrice: nftArr[item - 1].signedCopyPrice,
                poster: poster,
                posterPrice: nftArr[item - 1].posterCopyPrice,
                artName: nftArr[item - 1].name,
                artistName: nftArr[item - 1].artistName,
                basePrice: nftArr[item - 1].price,
                smallPic: nftArr[item - 1].smallPic,
                grandTotal: grandTotal
            }

            cart.push(newItem)
            console.log("New item pushed to cart: " + newItem.id)
            res.status(200).send(cart)
        };

    },

    itemsInCart: (req, res) => {
        let length = cart.length
        length = length.toString()
        res.status(200).send(length)
    },

    getCart: (req, res) => {
        res.status(200).send(cart)
    },

    removeItem: (req, res) => {
        console.log(cart.length)
        cart.splice(req.params.el, 1)
        console.log(cart.length)
        res.status(200).send(cart)
    }

};