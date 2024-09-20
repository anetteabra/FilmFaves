import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import fs from 'fs';
import path from 'path';

const moviesFilePath = path.resolve(__dirname, './mocking/movies.json');
const movies = JSON.parse(fs.readFileSync(moviesFilePath, 'utf-8'));

export const restHandlers = [
  http.get('https://api.themoviedb.org/3/movie/popular', () => {
    return HttpResponse.json(movies);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
