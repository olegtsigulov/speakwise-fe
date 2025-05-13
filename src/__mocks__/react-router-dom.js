const BrowserRouter = ({ children }) => children;
const Routes = ({ children }) => children;
const Route = ({ children }) => children;
const Link = ({ children, to }) => <a href={to}>{children}</a>;
const Outlet = () => <div data-testid="outlet" />;
const Navigate = jest.fn(({ to }) => <div>Redirected to {to}</div>);
const useNavigate = jest.fn(() => jest.fn());
const useLocation = jest.fn(() => ({ pathname: '/' }));
const useParams = jest.fn(() => ({}));

module.exports = {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
    Navigate,
    useNavigate,
    useLocation,
    useParams
}; 