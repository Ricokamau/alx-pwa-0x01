import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const { year, page, genre } = request.body;
      const date = new Date();

      // Build query params safely
      const params = new URLSearchParams({
        year: year?.toString() || date.getFullYear().toString(),
        sort: "year.decr",
        limit: "12",
        page: page?.toString() || "1",
      });

      if (genre) {
        params.append("genre", genre);
      }

      const resp = await fetch(`https://moviesdatabase.p.rapidapi.com/titles?${params.toString()}`, {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": process.env.MOVIE_API_KEY || "",
        },
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to fetch movies: ${errText}`);
      }

      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results || [];

      return response.status(200).json({ movies });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("API Fetch Error:", error.message);
        return response.status(500).json({ error: "Failed to fetch movies", details: error.message });
      } else {
        console.error("API Fetch Error: Unknown error", error);
        return response.status(500).json({ error: "Failed to fetch movies", details: "Unknown error occurred" });
      }
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
