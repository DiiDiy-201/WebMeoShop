import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryChart, VictoryBar } from "victory";

import Sidebar from "../admin/Sidebar";
import Metadata from "../layout/MetaData";
import Loader from "../layout/Loader";
import { allOrders } from "../../actions/orderActions";

const AdminAnalytics = () => {
  const dispatch = useDispatch();
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );

  let ordersForMonth = [];

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  let monthlyDateForOrders = (date, dateMonth) => {
    let numberOfOrderPerMonth = 0;

    orders &&
      orders.map((order) => {
        let dateOfOrder = new Date(order.createdAt);

        if (
          date.getMonth() + 1 === dateOfOrder.getMonth() + 1 &&
          dateOfOrder.getMonth() + 1 === dateMonth
        ) {
          numberOfOrderPerMonth = numberOfOrderPerMonth + 1;
        }
      });

    if (new Date().getDay() + 1 === 28) {
      ordersForMonth.push({
        dateMonth: dateMonth,
        payments: numberOfOrderPerMonth,
      });
    }
    return numberOfOrderPerMonth;
  };

  // ordersForMonth.push(monthlyDateForOrders());
  console.log("The date " + new Date().getDay() + 1);

  const data = [
    { x: "1", y: monthlyDateForOrders(new Date(), 1) },
    { x: "2", y: monthlyDateForOrders(new Date(), 2) },
    { x: "3", y: monthlyDateForOrders(new Date(), 3) },
    { x: "4", y: monthlyDateForOrders(new Date(), 4) },
    { x: "5", y: monthlyDateForOrders(new Date(), 5) },
    { x: "6", y: monthlyDateForOrders(new Date(), 6) },
    { x: "7", y: monthlyDateForOrders(new Date(), 7) },
    { x: "8", y: monthlyDateForOrders(new Date(), 8) },
    { x: "9", y: monthlyDateForOrders(new Date(), 9) },
    { x: "10", y: monthlyDateForOrders(new Date(), 10) },
    { x: "11", y: monthlyDateForOrders(new Date(), 11) },
    { x: "12", y: monthlyDateForOrders(new Date(), 12) },
  ];

  let monthlyDateForTotalAmountDate = (date, dateMonth) => {
    let totalAmountOfOrders = 0;

    orders &&
      orders.map((order) => {
        let dateOfOrder = new Date(order.createdAt);

        if (
          date.getMonth() + 1 === dateOfOrder.getMonth() + 1 &&
          dateOfOrder.getMonth() + 1 === dateMonth
        ) {
          totalAmountOfOrders = totalAmountOfOrders + order.totalPrice;
        }
      });
    return totalAmountOfOrders;
  };

  const totalAmountData = [
    { x: "1", y: monthlyDateForTotalAmountDate(new Date(), 1) },
    { x: "2", y: monthlyDateForTotalAmountDate(new Date(), 2) },
    { x: "3", y: monthlyDateForTotalAmountDate(new Date(), 3) },
    { x: "4", y: monthlyDateForTotalAmountDate(new Date(), 4) },
    { x: "5", y: monthlyDateForTotalAmountDate(new Date(), 5) },
    { x: "6", y: monthlyDateForTotalAmountDate(new Date(), 6) },
    { x: "7", y: monthlyDateForTotalAmountDate(new Date(), 7) },
    { x: "8", y: monthlyDateForTotalAmountDate(new Date(), 8) },
    { x: "9", y: monthlyDateForTotalAmountDate(new Date(), 9) },
    { x: "10", y: monthlyDateForTotalAmountDate(new Date(), 10) },
    { x: "11", y: monthlyDateForTotalAmountDate(new Date(), 11) },
    { x: "12", y: monthlyDateForTotalAmountDate(new Date(), 12) },
  ];

  //   const styles = {
  //     display: "flex",
  //     flexDirection: "row",
  //   };

  return (
    <div className="row">
      <Metadata title={"Analytics"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div id="victoryCharts">
          <Fragment className="col-6 col-md-9">
            <div className="analytics_heading">
              <h4>Số lượng đơn hàng/tháng</h4>
              <h4>Tổng số tiền mỗi tháng</h4>
            </div>

            <div id="analytics_flex">
              <VictoryChart
                domainPadding={{ x: 20 }}
                animate={{ duration: 500 }}
              >
                <VictoryBar
                  data={data}
                  x="x"
                  y="y"
                  style={{
                    data: { fill: "tomato", width: 12 },
                  }}
                  animate={{
                    onExit: {
                      duration: 500,
                      before: () => ({
                        _y: 0,
                        fill: "orange",
                        label: "BYE",
                      }),
                    },
                  }}
                />
              </VictoryChart>

              <VictoryChart
                domainPadding={{ x: 20 }}
                animate={{ duration: 500 }}
              >
                <VictoryBar
                  data={totalAmountData}
                  x="x"
                  y="y"
                  style={{
                    data: { fill: "tomato", width: 12 },
                  }}
                  animate={{
                    onExit: {
                      duration: 500,
                      before: () => ({
                        _y: 0,
                        fill: "orange",
                        label: "BYE",
                      }),
                    },
                  }}
                />
              </VictoryChart>
            </div>
          </Fragment>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
