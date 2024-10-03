const url = window.location.href
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

let poster;
let banner;

async function editMovie(){
    try{
       
        const res = await fetch(`http://localhost:3000/api/getmovie/${id}`)
        // console.log(res);
        if(res.status==201){
            const data = await res.json()
            console.log(data);
            
           
            document.getElementById("frm").innerHTML=` <label for="title">Movie Title:</label>
            <input type="text" id="title" name="title" value="${data.title}" required>

            <label for="rating">Rating (out of 10):</label>
            <input type="number" id="rating" name="rating" value="${data.rating}" required>
            
            <select id="screenTypeDropdown">
                <option value="${data.screen}">${data.screen}</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX">IMAX</option>
                <option value="4DX">4DX</option>
                </select>

            <label for="duration">Duration (in minutes):</label>
            <input type="text" id="duration" name="duration" value="${data.duration}" required>

           

            <select id="genreDropdown">
                <option value="${data.genre}">${data.genre}</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Romance">Romance</option>
                </select>

            <label for="release-date">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value="${data.releaseDate}" required>

            <label for="language">Language:</label>
            <input type="text" id="language" name="language" value="${data.language}" required>

            <label for="certification">Certification:</label>
            <select id="certification" name="certification" required>
                <option value="${data.certification}">${data.certification}</option>

                <option value="U">U</option>
                <option value="UA">UA</option>
                <option value="A">A</option>
                <option value="S">S</option>
            </select>

            <label for="poster">Poster:</label>
            <input type="file" id="poster" name="poster" onchange="getPoster()"   >
            <div><img src="${data.poster}" alt="" id="poster-img" width="100px" height="100px"></div>

            <label for="banner">Banner:</label>
            <input type="file" id="banner" name="banner"  onchange="getBanner()" >
            <div><img src="${data.banner}" alt=""   width="200px" height="100px"id="banner-img"></div>

           

            <button type="submit">UPDATE</button>`
        }

    }
    catch(error){
        console.log(error);
        
    }

}

editMovie()

//update  movie details

document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const title=document.getElementById("title").value;
        const rating=document.getElementById("rating").value;
        const screen=document.getElementById("screenTypeDropdown").value;
        const duration=document.getElementById("duration").value;
        const genre=document.getElementById("genreDropdown").value;
        const releaseDate=document.getElementById("releaseDate").value;
        const language=document.getElementById("language").value;
        const certification=document.getElementById("certification").value;
        await fetch(`http://localhost:3000/api/updatemovie/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,rating,screen,duration,genre,releaseDate,language,certification,poster,banner}),
    }).then(async(res)=>{
        const data= await res.json()
        if(res.status==201){
            alert(data.msg)
            window.location.href="./movies.html"
        }else{
            alert("Failed to update")
        }
    }).catch((error)=>{
        console.log(error);
        
    })
    
    } catch (error) {
        console.log(error);
        
    }
})


// image  code


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