import mongoose, { mongo } from "mongoose";

const movieSchema=new mongoose.Schema({
    title:{type:String},
    rating:{type:Number},
    screen:{type:String},
    duration:{type:String},
    genre:{type:String},
    releaseDate:{type:String},
    language:{type:String},
    certification:{type:String},
    poster:{type:String},
    banner:{type:String}
});
export default mongoose.model.Movies||mongoose.model("Movie",movieSchema);