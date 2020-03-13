db.shop.insert({
  catalogs: [
    {
      id: "1",
      name: "Процессоры",
      products: [
        {
          id: "1",
          name: "Intel Core i3-8100",
          description: " Процессор Intel",
          price: "7890.00"
        },
        {
          id: "2",
          name: "Intel Core i5-7400",
          description: "Процессор Intel",
          price: "12700.00"
        }
      ]
    },
    {
      id: "2",
      name: "Мат.платы",
      products: [
        {
          id: "3",
          name: "ASUS ROG MAXIMUS X HERO",
          description: "Z370, Socket 1151-V2, DDR4, ATX",
          price: " 19310.00"
        },
        {
          id: "4",
          name: "Gigabyte H310M S2",
          description: " H310, Socket 1151-V2, DDR4, mATX",
          price: "4790.00"
        }
      ]
    }
  ]
});
