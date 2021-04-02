import express from "express";
import { pool } from "../config";
import cors from "cors";
import { index } from "./get/index";
import { getMovies } from "./get/movies";
import { getUserInfo } from "./post/users";
import { addMovie } from "./post/movies";

const app = express();
app.use(cors());
app.use(express.json());

const getIMDBMovies = (request, response) => {
  pool.query("SELECT * FROM imdb_movies", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

app.route("/").get(index);
app.route("/api/(:groupId)/movies").get(getMovies);

app.route("/api/user-info").post(getUserInfo);
app.route("/api/movies/add").post(addMovie);
app.route("/api/(:groupId)/movies/mark-seen").post(addMovie);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
