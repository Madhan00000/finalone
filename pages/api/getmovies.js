// pages/api/getmovies.js
import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

export default async function handle(req, res) {
  const { method } = req;

  // ---- 1. Connect to DB -------------------------------------------------
  try {
    await mongooseConnect();
  } catch (err) {
    console.error("DB connection failed:", err);
    return res
      .status(500)
      .json({ error: "Database connection failed", details: err.message });
  }

  // ---- 2. Prevent caching ------------------------------------------------
  res.setHeader("Cache-Control", "no-store");

  // ---- 3. Only allow GET -------------------------------------------------
  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // ---- 4. Query logic ----------------------------------------------------
  try {
    // 1. By ID
    if (req.query?.id) {
      const movie = await Movie.findById(req.query.id).lean();
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.json(movie);
    }

    // 2. Search by title (case-insensitive)
    if (req.query?.title) {
      const regex = new RegExp(req.query.title, "i");
      const movies = await Movie.find({ title: regex }).lean();
      return res.json(movies);
    }

    // 3. By titlecategory
    if (req.query?.titlecategory) {
      const movies = await Movie.find({
        titlecategory: req.query.titlecategory,
      })
        .lean()
        .sort({ createdAt: -1 });
      return res.json(movies);
    }

    // 4. By genre
    if (req.query?.genre) {
      const movies = await Movie.find({ genre: req.query.genre })
        .lean()
        .sort({ createdAt: -1 });
      return res.json(movies);
    }

    // 5. By category
    if (req.query?.category) {
      const movies = await Movie.find({ category: req.query.category })
        .lean()
        .sort({ createdAt: -1 });
      return res.json(movies);
    }

    // 6. By slug
    if (req.query?.slug) {
      const movies = await Movie.find({ slug: req.query.slug })
        .lean()
        .sort({ createdAt: -1 });
      if (!movies.length) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.json(movies);
    }

    // 7. Default: All movies (newest first)
    const movies = await Movie.find().lean().sort({ createdAt: -1 });
    return res.json(movies);
  } catch (err) {
    console.error("Query error:", err);
    return res
      .status(500)
      .json({ error: "Query failed", details: err.message });
  }
}
