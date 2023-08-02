import Order from "../modules/Order.js";
import User from "../modules/User.js"

export const CreateOrder = async (req, res) => {
  try{
    const {paymentId, name, surname, email, country, city, number, region, zipcode, street, homeNumber,postNum,products,deliveryPrice, result, orderStatus, trackNumber, priceValue} = req.body

      const user = await User.findOne({"email" : email})


      const newOrder = new Order({
        paymentId,
        name,
        surname,
        email,
        country,
        city,
        number,
        region,
        zipcode,
        street,
        homeNumber,
        postNum,
        products,
        deliveryPrice,
        result,
        orderStatus,
        trackNumber,
        priceValue,
      })  

      if (user) {
        user.Orders.push(newOrder)

        await user.save()
      }
      await newOrder.save()

      return res.json({newOrder})
  }
  catch(error){
    res.json({message: `something went wrong:${error}`})
    console.log(error);
  }
}

// export const CreateUregisteredUsersOrder = async (req, res) => {
//   try{
//     const {paymentId, name, surname, email, country, city, number, region, zipcode, street, homeNumber,postNum,products,deliveryPrice, result, orderStatus, trackNumber, priceValue} = req.body

//       const user = await User.findOne({"email" : email})


//       const newOrder = new Order({
//         paymentId,
//         name,
//         surname,
//         email,
//         country,
//         city,
//         number,
//         region,
//         zipcode,
//         street,
//         homeNumber,
//         postNum,
//         products,
//         deliveryPrice,
//         result,
//         orderStatus,
//         trackNumber,
//         priceValue,
//       })  

//       console.log(newOrder);

//       // user.Orders.push(newOrder)

//       // await user.save()
//       await newOrder.save()

//       return res.json({newOrder})
//   }
//   catch(error){
//     res.json({message: `something went wrong:${error}`})
//     console.log(error);
//   }
// }

export const GetOrder = async (req, res) => {
  try{
      // console.log(req.url);
      function getIdFromUrl(url) {
        const parts = url.split('/');
        const idWithColon = parts[parts.length - 1];
        const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
        return (id);
      }


      const reqId = getIdFromUrl(req.url)


      const order = await Order.findOne({"_id" : reqId})

      return res.json({order})
  }
  catch(error){
    res.json({message: `something went wrong:${error}`})
    console.log(error);
  }
}