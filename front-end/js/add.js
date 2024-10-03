document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault()
    const title=document.getElementById("title").value;
    const rating=document.getElementById("rating").value;
    const screen=document.getElementById("screenTypeDropdown").value;


    const duration=(document.getElementById("duration").value);
    const genre=document.getElementById("genreDropdown").value;
    const releaseDate=document.getElementById("releaseDate").value;
    const language=document.getElementById("language").value;
    const certification=document.getElementById("certification").value;

    console.log(title,rating,screen,duration,genre,releaseDate,language,certification);

    await fetch("http://localhost:3000/api/addmovie",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,rating,screen,duration,genre,releaseDate,language,certification,poster,banner}),
    }).then(async(res)=>{
        console.log(res);
        const data = await res.json()
        console.log(data);
        
        if(res.status==201){
            alert("Successfully Added")
            window.location.href="../index.html"
        }
        else{
            alert("Failed to add")

        }
        
        
    }).catch((error)=>{
        console.log(error);
        
    })
    
})


// image  code
let poster;
let banner;

async function getPoster() {
    console.log(document.getElementById("poster").files[0]);
    poster=await convertBase64(document.getElementById("poster").files[0]);
    document.getElementById("poster-img").src=poster

    
    
}
async function getBanner() {
    console.log(document.getElementById("banner").files[0]);
    banner=await convertBase64(document.getElementById("banner").files[0]);
    document.getElementById("banner-img").src=banner

    
    
}

function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })

}