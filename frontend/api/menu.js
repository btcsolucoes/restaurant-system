module.exports = (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Croissant Especial",
      description: "Croissant amanteigado com recheio premium.",
      price: 24.9
    },
    {
      id: 2,
      name: "Cappuccino Cremoso",
      description: "Café especial com leite vaporizado.",
      price: 14.5
    }
  ]);
};
