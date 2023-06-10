const axios = require('axios')
const httpStatus = require('http-status')
const { poll_list_table, poll_data_table } = require('./models')
const { nanoid } = require('nanoid')
const voteCreate = async (req, res) => {
  try {
    const placeId = req.body.placeId
    const userId = req.body.userId
    const placesData = {}
    const fetchData = {}
    await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=id&region=id&key=AIzaSyClh1AGWGGuXQM38uvxoxwjvdRNNP3h0mo`)
      .then(
        res => {
          const Category = res.data.result.types[0]
          const Rating = res.data.result.rating
          const TotalReview = res.data.result.user_ratings_total
          const placeNames = res.data.result.name
          let abOut
          if (res.data.result.editorial_summary !== undefined) {
            abOut = res.data.result.editorial_summary.overview || null
          } else {
            abOut = null
          }
          let links
          if (res.data.result.photos !== undefined) {
            links = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.data.result.photos[0].photo_reference}&sensor=false&key=AIzaSyClh1AGWGGuXQM38uvxoxwjvdRNNP3h0mo`
          } else {
            links = null
          }
          // get Maps Places URL
          const lat = res.data.result.geometry.location.lat
          const lng = res.data.result.geometry.location.lng
          const coord = encodeURIComponent(`${lat},${lng}`)
          const placeURL = `https://www.google.com/maps/search/?api=1&query=${coord}&query_place_id=${placeId}`
          placesData.name = placeNames
          placesData.category = Category
          placesData.rating = Rating
          placesData.totalReview = TotalReview
          placesData.url = placeURL
          placesData.link = links
          placesData.about = abOut
        }
      )
      .catch(
        err => {
          console.error(err)
        }
      )
  poll_list = {
    poll_id: nanoid(20),
    photo_url: placesData.link,
    place_name:  placesData.name,
    place_about: placesData.about,
    place_category: placesData.category,
    place_rating: placesData.rating,
    place_total_review: placesData.totalReview,
    maps_url: placesData.url,
    createdAt: Date.now(),
    user_id: userId
  }
  await poll_list_table.create(poll_list).then(() => {
    res.status(httpStatus.CREATED).send({
      status: 'success',
      message: 'Polling berhasil dibuat!',
      data: `http://localhost:8080/poll/${poll_list.poll_id}`
    })
  }).catch(error => {
    res.status(httpStatus.BAD_REQUEST).send(error)
  })
  // res.render('index', { place_category: "Shopping Mall", place_name: placesData.name, place_rating: placesData.rating, place_total_rating: placesData.totalReview, place_links: placesData.url, place_about: placesData.about, photo_link: placesData.link})
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err)
  }
}

const voteApp = async (req, res) => {
  const poll_data = await poll_list_table.findOne({ where: { poll_id: req.params.id }})
  const polls = await poll_data_table.findAll({ where: { poll_id: req.params.id }})
  res.render('index', { place_category: poll_data.place_category, place_name: poll_data.place_name, place_rating: poll_data.place_rating, place_total_rating: poll_data.place_total_review, place_links: poll_data.maps_url, place_about: poll_data.place_about, photo_link: poll_data.photo_url, polls: polls })
} 

const voteInput = async (req, res) => {
  const add_poll_data = {
    polling_person_name: req.body.name,
    agree: req.body.vote,
    polledAt: Date.now(),
    poll_id: req.params.id
  }
  await poll_data_table.create(add_poll_data)
  const poll_data = await poll_list_table.findOne({ where: { poll_id: req.params.id }})
  const polls = await poll_data_table.findAll({ where: { poll_id: req.params.id }})
  res.render('index', { place_category: poll_data.place_category, place_name: poll_data.place_name, place_rating: poll_data.place_rating, place_total_rating: poll_data.place_total_review, place_links: poll_data.maps_url, place_about: poll_data.place_about, photo_link: poll_data.photo_url, polls: polls })
} 

module.exports = { voteApp, voteCreate, voteInput }