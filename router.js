import { Router } from "express";
import * as rh from "./requestHandler.js";

const router = Router()
router.route("/addmovie").post(rh.addMovie);
router.route("/getmovies").get(rh.getMovies)
router.route("/getmovie/:id").get(rh.getMovie)
router.route("/updatemovie/:id").put(rh.updateMovie)


router.route("/deletemovie/:id").delete(rh.deleteMovie)


export  default router