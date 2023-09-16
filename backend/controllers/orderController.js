const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//new1
const sendEmail = require("../utils/sendEmail");

// Create a new order = api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    // taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    // taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  //new1
  // const resetUrl = `${process.env.FRONTEND_URL}/orders/me`;

  if (order) {
    try {
      await sendEmail({
        email: req.user.email,
        subject: "shopquaonline.com - Đặt hàng thành công",
        message: `Bạn đã đặt hàng thành công. Vui lòng xem lại đơn hàng của bạn`,
      });
    } catch (err) {
      console.log(err);
    }
  }
  //new1

  if (order) {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user order => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get logged in user order processing => /api/v1/orders/me/processing
exports.myOrdersProcessing = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    orderStatus: "Chờ xác nhận",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get logged in user order cancel => /api/v1/orders/me/cancel
exports.myOrdersCancel = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    orderStatus: "Hủy đơn",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get logged in user order processed => /api/v1/orders/me/processed
exports.myOrdersProcessed = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    orderStatus: "Đã xác nhận",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get logged in user order shipping => /api/v1/orders/me/shipping
exports.myOrdersShipping = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    orderStatus: "Đang giao",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get logged in user order shipped => /api/v1/orders/me/shipped
exports.myOrdersShipped = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
    orderStatus: "Đã giao hàng",
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders ---ADMIN  => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update / Process order ---ADMIN  => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.user);

  //moi
  if (!order) {
    return next(
      new ErrorHandler("Không tìm thấy đơn đặt hàng với id này", 404)
    );
  }
  //moi

  if (order.orderStatus === "Đã giao hàng") {
    return next(new ErrorHandler("Bạn đã giao đơn đặt hàng này", 400));
  }

  //cancel
  if (order.orderStatus === "Hủy đơn") {
    return next(new ErrorHandler("Bạn đã gửi hủy đơn hàng", 400));
  }

  //moi
  //Hủy đơn
  if (req.body.status === "Hủy đơn") {
    order.orderItems.forEach(async (item) => {
      await congStock(item.product, item.quantity);
    });
  }
  //moi

  //new1
  const message = `Đơn hàng của bạn đã được giao thành công.\n\nMã đơn hàng của bạn là ${order._id}.\n\nVui lòng kiểm tra đơn đặt hàng của bạn.`;

  const messagecancel = `Đơn hàng của bạn đã được hủy thành công.\n\nMã đơn hàng được hủy là ${order._id}.`;

  if (req.body.status === "Đã giao hàng") {
    try {
      await sendEmail({
        email: user.email,
        subject: "shopquaonline.com - Đơn hàng được giao thành công",
        message: message,
      });
      console.log("Email sent");
    } catch (err) {
      console.log(err);
    }
  }
  //new1

  //cancel
  if (req.body.status === "Hủy đơn") {
    try {
      await sendEmail({
        email: req.user.email,
        subject: "shopquaonline.com - Hủy đơn hàng thành công",
        message: messagecancel,
      });
      console.log("Email sent");
    } catch (err) {
      console.log(err);
    }
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Đã giao hàng") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

async function congStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock + quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

//order filter
// Get all order processing ---ADMIN  => /api/v1/admin/orders/processing
exports.allOrderProcessing = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Chờ xác nhận" });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Get all order cancel ---ADMIN  => /api/v1/admin/orders/cancel
exports.allOrderCancel = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Hủy đơn" });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Get all order processed ---ADMIN  => /api/v1/admin/orders/
exports.allOrderProcessed = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Đã xác nhận" });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Get all order shipping ---ADMIN  => /api/v1/admin/orders/shipping
exports.allOrderShipping = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Đang giao" });
  // const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Get all order shipped ---ADMIN  => /api/v1/admin/orders/shipped
exports.allOrderShipped = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Đã giao hàng" });
  // const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Sales chart
exports.totalOrders = async (req, res, next) => {
  const totalOrders = await Order.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  if (!totalOrders) {
    return next(new ErrorHandler("error total orders", 404));
  }
  res.status(200).json({
    success: true,
    totalOrders,
  });
};

exports.totalSales = async (req, res, next) => {
  const totalSales = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  if (!totalSales) {
    return next(new ErrorHandler("error total saless", 404));
  }
  res.status(200).json({
    success: true,
    totalSales,
  });
};

exports.customerSales = async (req, res, next) => {
  const customerSales = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails",
      },
    },

    { $unwind: "$userDetails" },

    {
      $group: {
        _id: "$user",
        total: { $sum: "$totalPrice" },
        doc: { $first: "$$ROOT" },
      },
    },

    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ total: "$total" }, "$doc"] },
      },
    },

    { $sort: { total: -1 } },
    {
      $project: {
        _id: 0,
        "userDetails.name": 1,
        total: 1,
      },
    },
  ]);

  if (!customerSales) {
    return next(new ErrorHandler("error customer sales", 404));
  }

  res.status(200).json({
    success: true,
    customerSales,
  });
};

exports.salesPerMonth = async (req, res, next) => {
  const salesPerMonth = await Order.aggregate([
    {
      $group: {
        _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
        total: { $sum: "$totalPrice" },
      },
    },

    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month"],
            },
          },
        },
      },
    },
    { $sort: { "_id.month": 1 } },
    {
      $project: {
        _id: 1,
        month: 1,

        total: 1,
      },
    },
  ]);

  if (!salesPerMonth) {
    return next(new ErrorHandler("error sales per month", 404));
  }

  res.status(200).json({
    success: true,
    salesPerMonth,
  });
};
