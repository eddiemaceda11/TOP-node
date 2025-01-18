const properties = [
  {
    id: 1,
    name: "Homes",
  },
  {
    id: 2,
    name: "Apartments",
  },
  {
    id: 3,
    name: "Land"
  },
  {
    id: 4,
    name: "Condos"
  }
]

exports.getIndexPage = (req, res) => {
  res.render("index", {
    title: "Choose a home type",
    properties: properties
  })
}
