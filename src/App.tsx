import { RouterProvider } from 'react-router-dom';
import "./App.css";
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/contexts/AuthContext';
// Set up your Socket.IO client connection
const queryClient = new QueryClient();
const App = () => {
 
   return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
