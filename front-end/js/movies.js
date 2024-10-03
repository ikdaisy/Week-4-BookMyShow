async function getMovies(){
    try{
        const res = await fetch("http://localhost:3000/api/getmovies")
        // console.log(res);
        if(res.status==201){
            const data = await res.json()
            // console.log(data);
            str=``
            data.map((movies)=>{
                // console.log(movies._id);
                
                str+=`<div class="left">
                            <div class="box">
                                <a href="./movie.html?id=${movies._id}">
                                   <img src="${movies.poster}" alt="">


                                    <h6>${movies.title}</h6>
                                    <span>${movies.genre}</span>
                                </a>
                            </div>
                        </div>`
            })
            document.getElementById("cards").innerHTML=str
        }

    }
    catch(error){
        console.log(error);
        
    }

}

getMovies()