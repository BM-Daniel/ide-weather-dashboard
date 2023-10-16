// controller functions

export async function getCurrentWeather(req, res) {
    const {location} = req.body;

    return res.status(201).send({msg: `Today's weather in ${location} is supper cool`});
  }