import { createRouter, createWebHistory } from "vue-router";
import ItemList from "../components/ItemList.vue";
import ItemCreate from "../components/ItemCreate.vue";
import ItemDetails from "../components/ItemDetails.vue";
import ItemEdit from "../components/ItemEdit.vue";
import PriceList from "../components/PriceList.vue";
import PriceCreate from "../components/PriceCreate.vue";
import PriceDetails from "../components/PriceDetails.vue";
import PriceEdit from "../components/PriceEdit.vue";
import CustomerList from "../components/CustomerList.vue";
import CustomerCreate from "../components/CustomerCreate.vue";
import CustomerDetails from "../components/CustomerDetails.vue";
import CustomerEdit from "../components/CustomerEdit.vue";
import UserList from "../components/UserList.vue";
import UserCreate from "../components/UserCreate.vue";
import UserDetails from "../components/UserDetails.vue";
import UserEdit from "../components/UserEdit.vue";
import Login from "../components/Login.vue";
import OrderList from "../components/OrderList.vue";
import OrderDetails from "../components/OrderDetails.vue";
import OrderCreate from "../components/OrderCreate.vue";
import OrderEdit from "../components/OrderEdit.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "itemlist",
      component: ItemList,
    },
    {
      path: "/item/create",
      name: "itemcreate",
      component: ItemCreate,
    },
    {
      path: "/item/:id",
      name: "itemdetails",
      component: ItemDetails,
    },
    {
      path: "/item/:id/edit",
      name: "itemedit",
      component: ItemEdit,
    },
    {
      path: "/price",
      name: "pricelist",
      component: PriceList,
    },
    {
      path: "/price/create",
      name: "pricecreate",
      component: PriceCreate,
    },
    {
      path: "/price/:id",
      name: "pricedetails",
      component: PriceDetails,
    },
    {
      path: "/price/:id/edit",
      name: "priceedit",
      component: PriceEdit,
    },
    {
      path: "/customer",
      name: "customerlist",
      component: CustomerList,
    },
    {
      path: "/customer/create",
      name: "customercreate",
      component: CustomerCreate,
    },
    {
      path: "/customer/:id",
      name: "customerdetails",
      component: CustomerDetails,
    },
    {
      path: "/customer/:id/edit",
      name: "customeredit",
      component: CustomerEdit,
    },
    {
      path: "/users",
      name: "userlist",
      component: UserList,
    },
    {
      path: "/users/create",
      name: "usercreate",
      component: UserCreate,
    },
    {
      path: "/users/:id",
      name: "userdetail",
      component: UserDetails,
    },
    {
      path: "/users/:id/edit",
      name: "useredit",
      component: UserEdit,
    },
    {
      path: "/orders",
      name: "orderlist",
      component: OrderList,
    }, // Create order route
    {
      path: "/orders/create",
      name: "ordercreate",
      component: OrderCreate,
    }, // Order details route
    {
      path: "/orders/:id",
      name: "orderdetail",
      component: OrderDetails,
    }, // Edit order route
    {
      path: "/orders/:id/edit",
      name: "orderedit",
      component: OrderEdit,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== "login" && !authStore.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
