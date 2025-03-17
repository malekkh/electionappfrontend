import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <header>
        <h1>My App</h1>
        {/* Add your navigation here */}
      </header>
      <main>
        <Outlet /> {/* Renders the nested route content */}
      </main>
    </div>
  );
};

export default RootLayout;
