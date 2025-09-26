import { ToastContainer } from "react-toastify";
import "./App.css";
import RouterConfig from "./config/RouterConfig";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import ProductService from "./services/ProductService";
import type { ProductType, UserType } from "./types/Types";
import { setCurrentUser, setProducts } from "./redux/AppSlice";
import { useEffect } from "react";
import { setBasket } from "./redux/BasketSlice";
import Footer from "./components/Footer";
import StaggeredMenu from "./components/StaggeredMenu";

function App() {
  // const { currentUser } = useSelector((state: RootState) => state.app); // Artık kullanılmıyor
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    const products: ProductType[] = await ProductService.getAllProducts();
    dispatch(setProducts(products));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const currentUserString: string | null =
      localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket));
    }
  }, []);

  const menuItems = [
    { label: "Ürünler", ariaLabel: "Ürünler", link: "/products" },
    { label: "Hakkımızda", ariaLabel: "Hakkımızda", link: "/about" },
    { label: "İletişim", ariaLabel: "İletişim", link: "/contact" },
    { label: "Blog", ariaLabel: "Blog", link: "/blog" },
  ];
  const socialItems = [
    { label: "Facebook", link: "https://facebook.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "Twitter", link: "https://twitter.com" },
  ];
  return (
    <>
      <StaggeredMenu items={menuItems} socialItems={socialItems} />
      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Spinner />
      <Footer />
    </>
  );
}

export default App;
