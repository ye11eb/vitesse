import BestSellers from "../modules/Bestsellers.js";

export const GetBestSellers = async (req, res) =>{
    try{
        const bestSellers = await BestSellers.find().sort({ createdAt: -1 });
        

        // console.log(bestSellers);
  
        return res.json({bestSellers})
    }
    catch(error){
      res.json({message: `something went wrong:${error}`})
      console.log(error);
    }
}

