import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Page from './pages/Page/Page';
import './App.scss';
import Product from './pages/Product/Product';

const Layout = () => {
  return (
    <div className='app'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },{
        path: '/:pageSlug',
        element: <Page />
      },{
        path: "/product/:id",
        element: <Product />
      }
    ]
  }
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
