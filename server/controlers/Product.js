import Product from "../modules/Product.js";

//Create Manufacture
// export const CreateProduct = async (req, res) => {
//   try{
//     const {images, imagesEng, title, titleEng, subtitle, subtitleEng, capacity, price, priceEng, info, infoEng, type, typeEng} = req.body

//       const newProduct = new Product({
//         images,
//         imagesEng,
//         title,
//         titleEng,
//         subtitle,
//         subtitleEng,
//         capacity,
//         price,
//         priceEng,
//         info,
//         infoEng,
//         type,
//         typeEng,
//       })  

//       await newProduct.save()

//       return res.json({newProduct, message : 'товар успішно додано'})
//   }
//   catch(error){
//     res.json({message: `something went wrong:${error}`})
//     console.log(error);
//   }
// }


//ChangeManufacture
// export const ChangeManufacture = async (req, res) => {
//   try{
//     const {_id, images, title, name, price, priceValue, colections, clothesType, description, sizingText, sizingImg, materials, care, options, titleEng, nameEng, priceEng, priceValueEng, colectionsEng,clothesTypeEng, descriptionEng, sizingTextEng, sizingImgEng, materialsEng, careEng, optionsEng} = req.body


//     const manufacture = await Manufacture.findById(_id)
//       if (manufacture) {
//         manufacture.imgUrl = images;
//         manufacture.title = title;
//         manufacture.name = name;
//         manufacture.price = price;
//         manufacture.priceValue = priceValue;
//         manufacture.colections = colections;
//         manufacture.clothesType = clothesType;
//         manufacture.description = description;
//         manufacture.sizingText = sizingText;
//         manufacture.sizingImg = sizingImg;
//         manufacture.materials = materials;
//         manufacture.care = care;
//         manufacture.options = options;
//         manufacture.titleEng = titleEng;
//         manufacture.nameEng = nameEng;
//         manufacture.priceEng = priceEng;
//         manufacture.priceValueEng = priceValueEng;
//         manufacture.colectionsEng = colectionsEng;
//         manufacture.clothesTypeEng = clothesTypeEng;
//         manufacture.descriptionEng = descriptionEng;
//         manufacture.sizingTextEng = sizingTextEng;
//         manufacture.sizingImgEng = sizingImgEng;
//         manufacture.materialsEng = materialsEng;
//         manufacture.careEng = careEng;
//         manufacture.optionsEng = optionsEng
//       }
//     await manufacture.save()

//     return res.json({manufacture})
//   }
//   catch(error){
//     res.json({message: `something went wrong:${error}`})
//     console.log(error);
//   }
// }

// export const deleteManufacture = async (req, res) => {
//   try{
//     const {_id} = req.body

//     await Manufacture.deleteOne( {'_id': _id } )

//     return res.json({_id})
//   }
//   catch(error){
//     res.json({message: `something went wrong:${error}`})
//     console.log(error);
//   }
// }

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
    function getOptFromUrl(url) {
      const parts = url.split('/');
      const idWithColon = parts[parts.length - 1];
      const opt = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
      return (opt);
    }
  
    const reqOpt = getOptFromUrl(req.url)
  
    const distinctValues = await Product.distinct(reqOpt);

    return res.json({ distinctValues })
  } catch (error) {
    res.json({message: `something went wrong: ${error}`})
  }
}

export const GetFilteredProducts = async (req, res) => {

  function extractValuesFromLink(link) {
    const linkParts = link.split('/').filter(part => part !== ''); // Split the link and remove empty parts
    const type = linkParts[1].replace(':', ''); // Extract the value for type
    const range = linkParts[2].split(':').pop(); // Extract the range part
    const [startIndex, endIndex] = range.split('-'); // Split the range into startIndex and endIndex
    return { type, startIndex, endIndex };
  }
  
  const { type, startIndex, endIndex } = extractValuesFromLink(req.url);
  
  // console.log('Type:', type);
  // console.log('Start Index:', startIndex);
  // console.log('End Index:', endIndex);
  
  
  try {
    const { type, startIndex, endIndex } = extractValuesFromLink(req.url);
    if (type == 'all') {
      const products = await Product.find().skip(startIndex).limit(endIndex - startIndex + 1);
      // console.log('End Index:', endIndex);
      return res.json({products})

    } else {
      const products = await Product.find({
        $or: [
          { type: type },
          { typeEng: type }
        ],}).skip(startIndex).limit(endIndex - startIndex + 1);
        return res.json({products})
    }

    // console.log('Type:', type);
    // console.log('Start Index:', startIndex);
    // console.log('End Index:', endIndex);
    // console.log(products);
    return res.json({products})
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