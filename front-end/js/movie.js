async function getMovie(){
    try{
        const url = window.location.href
        const urlParams=new URLSearchParams(url.split("?")[1]);
        const id=urlParams.get("id");
        console.log(id);
        const res = await fetch(`http://localhost:3000/api/getmovie/${id}`)
        // console.log(res);
        if(res.status==201){
            const data = await res.json()
            console.log(data);
            
           
            document.getElementById("main").innerHTML=`<div> <img src="${data.banner}" class="dead" alt="">
            <div class="main-img">
                <img src="${data.poster}" alt="">
                <div class="main-content">
                    <h2>${data.title}</h2>
                    <div class="ratings">
                        <span><i class="fa-solid fa-star" style="color: rgb(190, 82, 82);"></i></span>
                    <span class="rate"><span style="font-weight: bold;">${data.rating}/10</span>
                        (41.4K Votes)  <span><button class="rate-now">Rate Now</button></span></span>
                    </div>
                     <div class="para1">
                        <p>${data.language}</p>
                    </div>
                    <div class="para">
                        <p>${data.screen}</p>
                    </div>
                   
                    <div class="para2">
                        <p>${data.duration}• ${data.genre} • ${data.certification} •${data.releaseDate}</p>
                    </div>
                    <div class="btn">
                        <a href="./edit.html?id=${data._id}"><button>EDIT</button></a>
                        <button onclick="deleteMovie('${data._id}')">DELETE</button>

                    </div>
                        
                </div>
            </div></div>`
        }

    }
    catch(error){
        console.log(error);
        
    }

}

getMovie()

 async function deleteMovie(id){
    console.log(id);
    if(confirm("Do you want to delete this movie?")){
        await fetch(`http://localhost:3000/api/deletemovie/${id}`,{
            method:"DELETE"
        }).then((res)=>{
            if(res.status==201){
                alert("Deleted successfully")
                getMovie()
                window.location.href="./movies.html";

            }
            else{
                alert("Failed to delete");
               
            }
        }).catch ((error)=>{
            console.log(error);
            
        })
    }
   


    


}