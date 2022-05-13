import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';
import { useSelector, useDispatch } from 'react-redux';
import { cartRetrieveRequest, cartRetrieveSuccess, selectCart, setCart } from '../redux/slices/cart';
import { selectUser, userLogin, userLogout } from '../redux/slices/auth';


function Home(props) {
  const { products } = props;

  const dispatch = useDispatch()
  const authSelector = useSelector(selectUser)


  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
<p>Velcome</p>   
 </Layout>
  );
}

export async function getStaticProps(ctx) {


  const commerce = getCommerce();







  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,

    },
  };
}

export default (Home)


