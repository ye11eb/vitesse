import Product from "../modules/Product.js";

//Get all manufactures
export const GetProducts = async (req, res) => {
  try {
    function extractIndicesFromRoute(route) {
      const startIndex = parseInt(route.split(':')[1].split('-')[0]);
      const endIndex = parseInt(route.split(':')[1].split('-')[1]);

      return [startIndex, endIndex];
    }

    const [startIndex, endIndex] = extractIndicesFromRoute(req.url);



    const products = await Product.find().skip(startIndex).limit(endIndex - startIndex + 1);

    return res.json({ products })
  } catch (error) {
    res.json({message: `something went wrong: ${error}`})
  }
}

export const GetProduct = async (req, res) => {
  // console.log(req);

  function getIdFromUrl(url) {
    const parts = url.split('/');
    const idWithColon = parts[parts.length - 1];
    const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
    return (id);
  }

  const reqId = getIdFromUrl(req.url)


  try {
    const product = await Product.findById(reqId)
    if(!product){
      return res.json({ message: 'something went wrong' })
    }


    
    // console.log(product);
    return res.json({ product })
  } catch (error) {
    res.json({message: `something went wrong: ${error}`})
  }
}

export const GetFilterOpts = async (req, res) => {
  try {
    // function getOptFromUrl(url) {
    //   const parts = url.split('/');
    //   const idWithColon = parts[parts.length - 1];
    //   const opt = idWithColon.replace(':', '');
    //   return opt;
    // }

    // const reqOpt = getOptFromUrl(req.url);

    const values = await Product.find({})
      .select('type typeEng -_id')
      .lean();

    // console.log(distinctValues);

    const distinctValues = Array.from(new Set(values.map(JSON.stringify)), JSON.parse);

  // console.log(uniqueValues);

    return res.json({ distinctValues });
  } catch (error) {
    res.json({ message: `something went wrong: ${error}` });
  }
};





export const GetFilteredProducts = async (req, res) => {

  function extractValuesFromLink(link) {
    const linkParts = link.split('/').filter(part => part !== ''); // Split the link and remove empty parts
    const type = linkParts[1].replace(':', ''); // Extract the value for type
    const range = linkParts[2].split(':').pop(); // Extract the range part
    const [startIndex, endIndex] = range.split('-'); // Split the range into startIndex and endIndex
    return { type, startIndex, endIndex };
  }
  
  // const { type, startIndex, endIndex } = extractValuesFromLink(req.url);
  
  // console.log('Type:', type);
  // console.log('Start Index:', startIndex);
  // console.log('End Index:', endIndex);
  
  
  try {
    const { type, startIndex, endIndex } = extractValuesFromLink(req.url);

    console.log('gdfgdf');
    console.log(type)
    if (type == 'all') {
      const products = await Product.find().skip(startIndex).limit(endIndex - startIndex + 1);
      // console.log('End Index:', endIndex);
      return res.json({products})

    } else {;
      const products = await Product.find(
          { typeEng: type }).skip(startIndex).limit(endIndex - startIndex + 1);
        // console.log(products);
        return res.json({products})
    }

    // console.log('Type:', type);
    // console.log('Start Index:', startIndex);
    // console.log('End Index:', endIndex);
    // console.log(products);
    // return res.json({products})
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  
  
  
  
}


// export const DeleteProduct = async (req, res) => {;

//   function getIdFromUrl(url) {
//     const parts = url.split('/');
//     const idWithColon = parts[parts.length - 1];
//     const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
//     return (id);
//   }

//   const reqId = getIdFromUrl(req.url)

//   console.log(reqId);

//   try {
//     await Product.deleteOne({"_id": reqId})


//     return res.json({ status: 200, message : 'товар успішно видалено'});
//   } catch (error) {
//     res.json({message: `something went wrong: ${error}`})
//   }
// }

// export const ChangeProduct = async (req, res) => {;
//   const {images, imagesEng, title, titleEng, subtitle, subtitleEng, capacity, price, priceEng, info, infoEng, type, typeEng} = req.body
//   function getIdFromUrl(url) {
//     const parts = url.split('/');
//     const idWithColon = parts[parts.length - 1];
//     const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
//     return (id);
//   }

//   const reqId = getIdFromUrl(req.url)

//   try {
//     const updateData = { 
//       images,
//       imagesEng,
//       title,
//       titleEng,
//       subtitle,
//       subtitleEng,
//       capacity,
//       price,
//       priceEng,
//       info,
//       infoEng,
//       type,
//       typeEng,
//     }
    
//     await Product.updateOne(
//       { _id: reqId },
//       { $set: updateData }
//     );

//     return res.json({ status: 200, message : 'товар успішно змінено'});
//   } catch (error) {
//     res.json({message: `something went wrong: ${error}`})
//   }
// }