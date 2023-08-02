import Content from "../modules/Content.js";

export const addContent = async (req, res) =>{
    try{
        console.log(req);
        console.log(req.files);
    }
    catch(error){
      res.json({message: `something went wrong:${error}`})
      console.log(error);
    }
}
