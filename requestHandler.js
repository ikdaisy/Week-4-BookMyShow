import { log } from "console"
import movieSchema from "./models/movie.model.js"

//Add movie
export async function addMovie(req,res){
   try{
    // console.log(req.body);
    const {...movie}=req.body
    // console.log(movie);
    const data = await movieSchema.create({...movie})
    return res.status(201).send({msg:data})
   }
   catch(error){
        res.status(404).send({msg:error})

   } 
}

//Get all movies
export async function getMovies(req,res) {
    try{
        await movieSchema.find().then((movies)=>{
            console.log(movies);
            
             res.status(201).send(movies)
        }).catch((error)=>{
             res.status(404).send({msg:error})
        })
       
    }
    catch(error){
        res.status(404).send({msg:error})
    }
   
    
}

//get movie 
export async function getMovie(req,res){
    try{
        console.log(req.params);
        const {id}=req.params
        await movieSchema.findOne({_id:id}).then((movie)=>{
            res.status(201).send(movie)


        }).catch((error)=>{
             res.status(404).send({msg:error})

        })
    }
    catch(error){
        res.status(404).send({msg:error})
    }
   

}

export async function updateMovie(req,res) {
    try{
        const {id}=req.params;
        console.log(id);
        const {...movie} = req.body
        await movieSchema.updateOne({_id:id},{$set:{...movie}}).then((data)=>{
            res.status(201).send({msg:"Updated Successfully"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        })
        

    }
    catch(error){
        res.status(404).send({msg:error})
    }
}


//delete movie
export async function deleteMovie(req,res) {
    try{
        const {id}=req.params;
        console.log(id);
        const data=await movieSchema.deleteOne({_id:id});
        res.status(201).send(data);
    }
    catch(error){
        res.status(404).send({msg:error})
    }
    
}