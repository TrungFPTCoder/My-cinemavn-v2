import "./App.css";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./component/MovieStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import { lazy, Suspense } from "react";
import LoadingComponent from "./component/LoadingComponent";
import Introduction from "./component/Introduction";
import ErrorBoundary from "./component/ErrorBoundary";
import ErrorPage from "./component/ErrorPage";
import NewHeader from "./component/NewHeader";
import { HelmetProvider } from "react-helmet-async";
import ChatWithAI from "./ChatWithAI/ChatWithAI";
import ScrollToTop from "./component/ScrollToTop";
// import ErrorPage from './component/ErrorPage';

const WatchMovie = lazy(() => import("./component/WatchMovie"));
const MovieList = lazy(() => import("./component/MovieList"));
const Cinema = lazy(() => import("./component/Cinema"));
const MovieCate = lazy(() => import("./component/MovieCate"));
const SearchMovie = lazy(() => import("./component/SearchMovie"));
const NewMovie = lazy(() => import("./component/MovieCate/NewMovie"));
const CountryMovie = lazy(() => import("./component/MovieCate/CountryMovie"));
// thử nghiệm login
const Login = lazy(() => import("./component/Auth-function/Login"));
const SignUp = lazy(() => import("./component/Auth-function/SignUp"));
const Forget = lazy(() => import("./component/Auth-function/Forget"));
const ResetPass = lazy(() => import("./component/Auth-function/ResetPass"));
const LoginGoogle = lazy(() => import("./component/Auth-function/LoginGoogle"));
// thử nghiệm trang cá nhân
const PersonalPage = lazy(() =>
  import("./component/Personal Page/PersonalPage")
);

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<LoadingComponent />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              {/* <Header /> */}
              <NewHeader />
              <ErrorBoundary>
                <ScrollToTop />
                <Routes>
                  <Route path="*" element={<ErrorPage />} />
                  <Route path="/" element={<MovieList />} />
                  <Route path="/danh-sach/:cate" element={<MovieCate />} />
                  <Route
                    path="/danh-sach/phim-moi-cap-nhat"
                    element={<NewMovie />}
                  />
                  <Route
                    path="/danh-sach/quoc-gia/:country"
                    element={<CountryMovie />}
                  />
                  <Route path="/tim-kiem" element={<SearchMovie />} />
                  <Route path="/watch/:slug" element={<WatchMovie />} />
                  <Route path="/watch/cinema/:slug" element={<Cinema />} />
                  <Route path="/introduction" element={<Introduction />} />
                  <Route path="/error" element={<ErrorPage />} />
                  {/* thử nghiệm login */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forget" element={<Forget />} />
                  <Route path="/resetpass" element={<ResetPass />} />
                  <Route path="/loginGoogle" element={<LoginGoogle />} />
                  {/* thử nghiệm personal page */}
                  <Route path="/personal" element={<PersonalPage />} />
                  {/* thử nghiệm gợi ý search */}
                  <Route path="/askMyAI" element={<ChatWithAI />} />
                </Routes>
              </ErrorBoundary>
              <Footer />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
