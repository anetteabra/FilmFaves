# FilmFaves

FilmFaves is a webpage where you can view popular movies and favorite them. The movies are fetched through a REST API call to TMDB. Popular movies are fetched to avoid fetching too many resources while still providing a good variety.

## Run the project

1. **To run the project go into the prosjekt1 folder**:

   ```sh
   cd prosjekt1
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the project**:

   ```sh
   npm run dev
   ```

4. **Navigate to the project**:
   Open your browser and go to http://localhost:5173/project1

## Features

- **Carousel of Featured Movies**: A dynamic carousel showcasing popular movies for easy browsing.
- **Search Functionality**: Search for movies using keywords.
- **Sorting Options**: Sort movies by rating.
- **Dedicated Movie Details Page**: Access a details page for each movie.
- **Like Functionality**: Express your favorites by liking movies with a simple click on the heart icon.

Additionally, we've implemented a responsive design that makes most features adaptable to various screen sizes. We see potential for improvement in the features, particularly by enhancing the search function with filtering capabilities and expanding the sorting function with additional options.

## Testing

For the testing of the web application vitest is used to write component tests and snapshot tests. We met challenges in setting up tests, especially with mocking. This is because we had little to no experience in writing such tests. Therefore, we have tried, but are unsure about the test's quality. Also, when running the npm run test, we get warnings of deprecation, these were chosen to be ignored as they do not affect the tests.

### Component Tests

The components tests cover some functionalities for MovieBox, MovieCarousel, MovieDetail, SearchBar and Navbar. However, we see that these tests have room for improvement.

### Snapshot Tests

Snapshot tests are made for the whole application, as well as for `MovieBox` and `MovieCarousel` components. These tests take a snapshot of the rendered application and compare it to the reference snapshot in the `__snapshot__` folder.

## To lint your code, run:

```sh
npm run lint
```

## Use Prettier

```sh
npx prettier --write .
```

## Run tests with vitest

```sh
npm run test
```
