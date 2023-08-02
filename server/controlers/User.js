import User from '../modules/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register user
export const Register = async (req, res) => {
  try {
    const { name, surname, email, country, street, post, number, houseNum, password} = req.body.userData

    const isUsed = await User.findOne({email})

    if(isUsed){
      return res.json({
        message: "this email alredy used",
        status: 400
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
      // username: user._id,
    const newUser = new User({
      name,
      surname,
      email,
      country,
      street,
      post,
      number,
      houseNum,
      Orders : [],
      password:hash,
    })



    await newUser.save()

    res.json({
      newUser, status: 201
    })
  }
  catch (error) {
    console.log(error);
    res.json({message: `error while creating user${error}`, status: 400})
  }
}


// login user
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData
    const user = await User.findOne({ email });

    if(!user){
      return res.json({
        message: 'This user does not exist',
        status: 404,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
      res.json({
        message:"incorrect password",
        status: 401 ,
      })
    }

    const token = jwt.sign({
      id: user._id,
      },process.env.JWT_SECRET,
      {expiresIn: '30d'},
    )

    if(!token) {
      res.json({message: 'something went wrong', status: 500})
    }

    res.json({
      token, user, message: 'You successfully entered the system', status: 201,
    })

  }
  catch (error) {
    res.json({message: 'something went wrong', status: 500})
  }
}

// //get me
export const GetMe = async (req, res) => {
  // console.log(req);
  function getIdFromUrl(url) {
    const parts = url.split('/');
    const idWithColon = parts[parts.length - 1];
    const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
    return (id);
  }

  const reqId = getIdFromUrl(req.url)
  // console.log(reqId);
  try {
    const user = await User.findById(reqId);
    // console.log(user);

    if(!user){
      return res.json({
        message: 'this user is not exist'
      })
    }

    const token = jwt.sign({
      id: user._id,
      },process.env.JWT_SECRET,
      {expiresIn: '30d'},
    )

    res.json({
      user, token
    })

  }
  catch (error) {
    console.log(error);
    res.json({
      message: "no permision"
    })
    
  }
}

export const updateInfo = async (req, res) => {

  const data = req.body.userData;
  // console.log(req);
  // function getIdFromUrl(url) {
  //   const parts = url.split('/');
  //   const idWithColon = parts[parts.length - 1];
  //   const id = idWithColon.replace(':', ''); // замінити ":" на порожній рядок
  //   return (id);
  // }

  // const reqId = getIdFromUrl(req.url)

  try {
    const user = await User.findById(data._id);

      if (user) {
        user._id = data._id,
        user.name = data.name,
        user.surname = data.surname,
        user.email = data.email,
        user.state = data.state,
        user.city = data.city,
        user.region = data.region,
        user.number = data.number,
        user.email = data.email,
        user.country = user.country,
        user.password = user.password,
        user.Orders = user.Orders
      };
        

    await user.save()

    res.json({user})
  }
  catch (error) {
    console.log(error);
    res.json({
      message: `no permision ${error}`
    })
    
  }
}