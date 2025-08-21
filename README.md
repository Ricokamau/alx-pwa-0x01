# alx-project-0x14: CineSeek Movie App

This repository contains the CineSeek movie discovery application, built with Next.js, TypeScript, and Tailwind CSS, integrating the MoviesDatabase API.

## API Overview
The MoviesDatabase API is a comprehensive database providing metadata for movies, TV series, episodes, and related personnel. Key features include:
- Access to over 9 million titles (movies, series, and episodes) with details like titles, release years, genres, posters, and more.
- Information on over 11 million actors, crew, and cast members, including biographies, awards, and trailers (e.g., YouTube URLs).
- Support for filtering, sorting, and pagination to efficiently query large datasets.
- Real-time updates for current and upcoming content.
- Useful for building movie discovery apps, recommendation systems, or entertainment analytics tools.

## Version
The API is currently at version 1 (as hosted on RapidAPI, with no explicit version number in endpoints, implying the latest stable release).

## Available Endpoints
The API offers several endpoints for querying movie and related data. Main ones include:
- `/titles`: Fetches a list of movie/TV titles. Supports filtering by year, genre, and pagination. Brief description: Main endpoint for browsing and searching movies/series.
- `/titles/{id}`: Retrieves detailed information for a specific title by ID. Brief description: Gets in-depth data like cast, plot, ratings, and trailers.
- `/titles/series/{id}`: Fetches series-specific details, including episodes. Brief description: For TV series metadata and episode lists.
- `/actors/{id}`: Gets actor/crew details. Brief description: Biographies, filmography, and awards for personnel.
- `/titles/utils/lists`: Utility endpoint for available lists (e.g., genres, title types). Brief description: Helps with dynamic filtering options.

## Request and Response Format
Requests are made via HTTP GET (or POST for some advanced queries) to the base URL `https://moviesdatabase.p.rapidapi.com/`. Query parameters filter results (e.g., `year=2024&genre=Action&page=1&limit=12`).

- **Typical Request Example** (for `/titles`):
GET https://moviesdatabase.p.rapidapi.com/titles?year=2024&genre=Action&sort=year.decr&limit=12&page=1
Headers:

x-rapidapi-host: moviesdatabase.p.rapidapi.com
x-rapidapi-key: YOUR_API_KEY


- **Typical Response Example** (JSON format):
{
"page": 1,
"next": "/titles?page=2&year=2024&genre=Action",
"entries": 12,
"results": [
{
"id": "tt1234567",
"titleText": { "text": "Movie Title" },
"primaryImage": { "url": "https://example.com/poster.jpg" },
"releaseYear": { "year": "2024" },
"genres": { "genres": [{ "text": "Action" }] }
},
// More movie objects...
]
}

Responses are always in JSON. The `results` array contains the core data, with pagination info like `page` and `next`.

## Authentication
Authentication requires an API key obtained from RapidAPI. Include it in every request via headers:
- `x-rapidapi-key: YOUR_API_KEY`
- `x-rapidapi-host: moviesdatabase.p.rapidapi.com`
No OAuth or tokens are needed; it's simple key-based auth. Store the key in environment variables (e.g., `.env.local`) to avoid exposure.

## Error Handling
Common error responses include:
- 401 Unauthorized: Invalid or missing API key. Handle by checking auth headers and retrying with a valid key.
- 429 Too Many Requests: Rate limit exceeded. Handle by implementing exponential backoff retries or displaying a user message like "Rate limit reached, try again later."
- 404 Not Found: Invalid endpoint or no results. Handle by checking status codes and falling back to default data or error messages.
- 500 Internal Server Error: API-side issue. Log the error and show a generic "Something went wrong" to users.

In code, use try/catch around fetch calls, check `response.ok`, and parse error details from the response body (e.g., `{ "message": "Error description" }`).

## Usage Limits and Best Practices
- **Limits**: Free tier has a soft limit (e.g., 500 requests/day, varies by plan). Paid plans offer higher quotas (e.g., 10,000/month). Rate limits are enforced (e.g., 10 requests/second).
- **Best Practices**:
- Use pagination (`page` and `limit`) to avoid large responses and stay under limits.
- Cache responses client-side (e.g., with React state or libraries like SWR) to reduce API calls.
- Handle errors gracefully with loading states and user feedback.
- Filter queries precisely (e.g., by Year/Genre) for efficiency.
- Monitor usage via RapidAPI dashboard to avoid overages.
- For production, upgrade to a paid plan for reliability.