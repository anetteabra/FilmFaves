
import { render } from '@testing-library/react';
import Home from '../../routes/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

test("renders Home page correctly", () => {

const home = render(
<QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Home />
    </BrowserRouter>
</QueryClientProvider>

);
expect(home).toMatchSnapshot();
});