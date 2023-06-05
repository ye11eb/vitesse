import User from '../modules/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register user
export const Register = async (req, res) => {
  try {
    const { name, surname, email, state, street, post, number, houseNum, password} = req.body.userData

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
      state,
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
    // console.log(req.body);
    const { email, password } = req.body.userData
    const user = await User.findOne({ email });

    if(!user){
      return res.json({
        message: 'This user does not exist',
        status: 404,
      });
    }

    // console.log(user);

    // console.log(password);
    // console.log(user.password);

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

// //getUserInfo
// export const getUserInfo = async (req, res) => {
//   try {
//     const user = await User.findById(req.userID)

//     if(!user){
//       return res.json({ message: 'something went wrong' })
//     }



//     return res.json( user )

//   }
//   catch (error) {
//     res.json({
//       message: "no permision"
//     })
    
//   }
// }

// //deliveryInfo
// export const deliveryInfo = async (req, res) => {
//   try {
//     const { firstName, secondName, number, adress1, adress2, country, city, state, zipcode } = req.body
//     const user = await User.findById(req.userID)

//     if(!user){
//       return res.json({ message: 'something went wrong' })
//     }

//     user.firstName = firstName

//     user.secondName = secondName
    
//     user.number = number

//     user.adress1 = adress1

//     user.adress2 = adress2

//     user.country = country

//     user.city = city

//     user.state = state

//     user.zipcode = zipcode


//     await user.save()

    
//     res.json({user, status: true})
//   }
//   catch (error) {
//     res.json({
//       message: "${error}",
//       status: false,
//     })
    
//   }
// }


// //login user
// export const changeMail = async (req, res) => {
//   try {
 
//     const { email } = await req.body
//     console.log(email);
//     const user = await User.findById(req.userID)

//     if(!user){
//       return res.json({
//         message: 'this user is not exist',
//         status: false,
//       })
//     }

//     const isUsed = await User.findOne({email})

//     if(isUsed){
//       return res.json({
//         message: "this email alredy used",
//         status: false,
//       })
//     }

//     // const isPasswordCorrect = await bcrypt.compare(password, user.password)

//     // if(!isPasswordCorrect) {
//     //   res.json({
//     //     message:"incorrect password"
//     //   })
//     // }

//     // const token = jwt.sign({
//     //   id: user._id,
//     //   },process.env.JWT_SECRET,
//     //   {expiresIn: '30d'},
//     // )

//     user.email = await email

//     console.log(user.email);

//     console.log(user);

//     await user.save()

//     if(user) {
//       res.json({user, message: 'succes', status: true})
//     }
    
//   }
//   catch (error) {
//     console.log(error);
//     res.json({message: `error while login:${error}`})
//   }
// }


// export const verifyPass = async (req, res) => {
//   try {

//     const {token, password} = req.body
//     let userID = 0
//     console.log(req.body);

//     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//       if (err) {
//         console.log('Invalid token:', err);
//       } else {
//         console.log('Decoded token:', decoded);
//         userID = decoded
//       }
//     });


//     const user = await User.findById(userID.id)

//     if(!user){
//       return res.json({
//         message: 'this user is not exist',
//         status: false,
//       })
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password)

//     if(!isPasswordCorrect) {
//       res.json({
//         message:"incorrect password",
//         isPasswordCorrect,
//         status: false,
//       })
//     }

//     if(isPasswordCorrect && user) {
//       res.json({user, message: 'correct', status: true})
//     }
    
//   }
//   catch (error) {
//     res.json({message: `error while login:${error}`, status: false})
//   }
// }