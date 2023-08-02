import Stats from '../modules/Stats.js'

//Register user
export const UserEntrie = async (req, res) => {
  try {

    console.log(req.body);
    const {UserId, UserBrowserId} = req.body

    let userStats = await Stats.findOne({UserBrowserId})

    if (UserId) {
        userStats = await Stats.findOne({UserId})
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const currentYear = currentDate.getFullYear();

    const currentMonthAndYear = currentMonth.toString().padStart(2, '0') + '-' + currentYear.toString();

    // const currentMonthAndYear = "07-2023"
    // console.log(currentMonthAndYear); // Output: "06-2023" (for June 2023)

    if (!userStats) {
        const newStats = new Stats({
            UserId,
            UserBrowserId,
            EntriesNumber: 1,
            byMonth: [{date: currentMonthAndYear, entries: 1}],
        })

        console.log(newStats);
        await newStats.save()
    }else{
        userStats.EntriesNumber = userStats.EntriesNumber + 1
        if (userStats.byMonth[userStats.byMonth.length - 1].date !== currentMonthAndYear) { 
            userStats.byMonth.push({date: currentMonthAndYear, entries: 1})
        }else{
            const statusEntries = userStats.byMonth[userStats.byMonth.length - 1].entries
            userStats.byMonth[userStats.byMonth.length - 1] = ({date: currentMonthAndYear, entries : statusEntries + 1})
        }

        await userStats.save()
        // console.log(userStats);
    }


    res.json({
         status: 201
    })
  }
  catch (error) {
    console.log(error);
    res.json({message: `error while creating user${error}`, status: 400})
  }
}