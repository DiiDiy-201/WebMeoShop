import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Fragment } from "react";

import { publicRoutes } from "./routes";
import { privateRoutes } from "./routes";
import { paymentRoutes } from "./routes";
import { adminPrivateRoutes } from "./routes";
import { nhanvienPrivateRoutes } from "./routes";
import { shipperPrivateRoutes } from "./routes";

import { DefaultLayout } from "./components/Layouts";

import ProtectedRoute from "./components/route/ProtectedRoute";
import AdminProtectedRoutes from "./components/route/AdminProtectedRoutes";
import NhanvienProtectedRoutes from "./components/route/NhanvienProtectedRoutes";
import ShipperProtectedRoutes from "./components/route/ShipperProtectedRoutes";

import { loadUser } from "./actions/userActions";
import { loadAdmin } from "./actions/adminActions";
import { loadNhanvien } from "./actions/nhanvienActions";
import { loadShipper } from "./actions/shipperActions";
import store from "./store";

//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
// import { useDispatch } from "react-redux";

//Chat
// import Chat from "./components/chat/Chat";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  // const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadAdmin());
    store.dispatch(loadNhanvien());
    store.dispatch(loadShipper());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <Chat /> */}
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route element={<ProtectedRoute />} key={index}>
                <Route
                  exact
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
          {paymentRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route element={<ProtectedRoute />} key={index}>
                {stripeApiKey && (
                  <Route
                    exact
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Elements stripe={loadStripe(stripeApiKey)}>
                          <Page />
                        </Elements>
                      </Layout>
                    }
                  />
                )}
              </Route>
            );
          })}
          {adminPrivateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route element={<AdminProtectedRoutes />} key={index}>
                <Route
                  exact
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}

          {nhanvienPrivateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route element={<NhanvienProtectedRoutes />} key={index}>
                <Route
                  exact
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}

          {shipperPrivateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route element={<ShipperProtectedRoutes />} key={index}>
                <Route
                  exact
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
