let pageInfo = null

const mainPic = document.getElementById("mainPic");

const pageSetup = () => {
    if (pageInfo !== null){
        mainPic.src = pageInfo.largePic
    } else {alert("Error loading page.")}
}



axios.get("http://localhost:4200/nextpage/nft")
.then(res => {
    axios.get(`http://localhost:4200/nextpage/nft/${res.data}`)
        .then(res => {
            pageInfo = res.data
            console.log(pageInfo)
            pageSetup()
        })
    });
    