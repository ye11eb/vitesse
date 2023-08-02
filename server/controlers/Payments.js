import CloudIpsp from 'cloudipsp-node-js-sdk';
import axios from 'axios'
import crypto from 'crypto'
import bodyParser from 'body-parser'
import Order from "../modules/Order.js";
import User from "../modules/User.js";

export const Payments = async (req, res) => {
    try {
        const fondyPassword = 'test'

        const dataPayment = req.body
        const fondy = new CloudIpsp(
            {
              merchantId: 1396424,
              secretKey: 'test'
            }
          )
          
          const data = {
            order_id: dataPayment.payment_id,
            order_desc: dataPayment.order_desc,
            currency: dataPayment.priceValue,
            amount: dataPayment.totalPrice,
            response_url: `http://localhost:5000/api/paymentsRoute/payments/payment/:${dataPayment.payment_id}`,
            server_callback_url : "http://localhost:5000/api/paymentRoute/payments/payment/res",
          }

          const signatureRAW = `${fondyPassword}|${data.actual_amount}|${data.actual_currency}|${data.amount}|${data.currency}|${data.merchant_id}|${data.order_desc}|${data.order_id}`
          const signature = crypto.createHash('sha1');
          const signature2 = crypto.createHash('sha1');
          signature.update(signatureRAW);
            fondy.Checkout(data).then(data => {
            return res.json({data})
          }).catch((error) => {
            console.log(error)
          })         
        
    } catch (error) {
      res.json({message: `something went wrong: ${error}`})
    }
  }



  export const CallBack = async (req, res) => {
    const fondyPassword = 'test'


  
    const data = req.body;

    console.log(data);

    // const user = await User.findOne({"email" : data.email})
    // console.log(user);
  
    let signatureRaw = 0
    if (data.approval_code && data.rrn) {
      signatureRaw = `${data.actual_amount}|${data.actual_currency}|${data.additional_info}|${data.amount}|${data.approval_code}|${data.card_bin}|${data.card_type}|${data.currency}|${data.eci}|${data.masked_card}|${data.merchant_id}|${data.order_id}|${data.order_status}|${data.order_time}|${data.payment_id}|${data.payment_system}|${data.response_status}|${data.reversal_amount}|${data.rrn}|${data.sender_email}|${data.reversal_amount}|${data.tran_type}`
    } else {
      signatureRaw = `${data.actual_amount}|${data.actual_currency}|${data.additional_info}|${data.amount}|${data.card_bin}|${data.card_type}|${data.currency}|${data.eci}|${data.masked_card}|${data.merchant_id}|${data.order_id}|${data.order_status}|${data.order_time}|${data.payment_id}|${data.payment_system}|${data.response_status}|${data.reversal_amount}|${data.sender_email}|${data.reversal_amount}|${data.tran_type}`
    }

  
    const signature = crypto.createHash('sha1');
    signature.update(`${fondyPassword}|${signatureRaw}`);
  
    const serverSignature = signature.digest('hex');
    const clientSignature = data.signature;
    const order_id = data.order_id;
    console.log(serverSignature);
    console.log(clientSignature);


    // Update order status function
    // async function updateOrderStatus(userId, orderId, status) {
    //   try {
    //     // Find the user by userId and orderId
        
    
    //     console.log('Order status updated successfully');
    //   } catch (error) {
    //     console.error('Error updating order status:', error);
    //   }
    // }
    
    // // Usage example
    // const userId = '647bc53a03f26be85ea1ee96';
    // const orderId = '647bdcde03f26be85ea1efc7';
    // const newStatus = {
    //   eng: 'accepted',
    //   ukr: 'прийнято',
    // };
    
    // updateOrderStatus(userId, orderId, newStatus);

    
    try {
      if (serverSignature == clientSignature && data.order_status == 'approved') {
        // Find the order with the given payment ID
        const order = await Order.findOne({ "paymentId": order_id });
        console.log(order);
        if (!order) {
          throw new Error(`Could not find order with payment ID: ${order_id}`);
        }
  
        // Update the order's status
        // await Order.findOneAndUpdate({ "payment_id": order_id }, {
        //   $set: {
        //     orderStatus: {
        //       eng: 'accepted',
        //       ukr: 'прийнято',
        //     },
        //   },
        // });

        const user = await User.findOne({ 'email': order.email, 'Orders.paymentId': order_id });
        // console.log(order.email);
        // console.log(order_id);
        // console.log(user);

        // if (!user) {
        //   console.log('User or order not found');
        //   return;
        // }
    
        // Find the order index in the Orders array
        // const orderIndex = user.Orders.findIndex(order => order._id.toString() === order_id);
    
        // if (orderIndex === -1) {
        //   console.log('Order not found');
        //   return;
        // }

        // console.log('user.Orders[user.Orders.length-1]');
        // console.log(user.Orders[user.Orders.length-1].orderStatus); //return  {eng: 'not payed', ukr: 'не оплачено',},
    
        // // Update the order status
        // user.Orders[user.Orders.length-1].orderStatus = {
        //   eng: 'accepted',
        //   ukr: 'прийнято',
        // },

        // console.log(user.Orders[user.Orders.length-1].orderStatus);//return {eng: 'accepted', ukr: 'прийнято',},
    
        // // Save the updated user
        // await user.save();



        // try {
        //   // Update the order status
        //   user.Orders[user.Orders.length - 1].orderStatus = {
        //     eng: 'accepted',
        //     ukr: 'прийнято',
        //   };
        
        //   // Save the updated user
        //   await User.save();
        
        //   console.log('User updated successfully');
        // } catch (error) {
        //   console.error('Error updating user:', error);
        // }



        const orderId = order._id
      
        console.log(orderId);

        await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { orderStatus: { eng: 'accepted', ukr: 'прийнято' } } }
        );

        if (user) {
          await User.updateOne(
            { 'Orders._id': orderId },
            { $set: { 'Orders.$.orderStatus': { eng: 'accepted', ukr: 'прийнято' } } }
          );
        }



        // const updatedUser = await User.findOne({ 'Orders._id': orderId });

        // // Access the updated order status from the user
        // const updatedOrderStatus = updatedUser.Orders.find(order => order._id.toString() === orderId).orderStatus;

        // console.log(updatedOrderStatus); // { eng: 'accepted', ukr: 'прийнято' }
        // console.log(updatedUser); // { eng: 'accepted', ukr: 'прийнято' }
        
        
        
        // order.orderStatus = {
        //         eng: 'accepted',
        //         ukr: 'прийнято',
        //       },
        // order.save()
        const updatedOrder = await Order.findOne({ "paymentId": order_id });

        if (updatedOrder.orderStatus.eng === 'accepted') {
          res.redirect(`http://localhost:3000/OrderSuccessful/:${order._id}`);
        }else{
          console.log(order);
        }
        
  
      } else {
        res.json({ message: 'ne dyakuyu' })
      }
  
    } catch (error) {
      res.json({ message: `something went wrong: ${error}` })
    }
  }


  export const FinalResponse = async (req, res) => {
    try {
      res.sendStatus(200)
        
    } catch (error) {
      res.json({message: `something went wrong: ${error}`})
    }
  }

  