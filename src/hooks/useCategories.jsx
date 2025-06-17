export const categories = [
    {
      _id: "1",
      category: "Smartphones",
      subcategories: [
        "Apple",
        "Google",
        "iQOO",
        "Mi",
        "Motorola",
        "OnePlus",
        "Oppo",
        "POCO",
        "Realme",
        "Redmi",
        "Samsung",
        "Vivo",
        "Xioami"
      ]
    },
    {
      _id: "2",
      category: "Laptops",
      subcategories: [
        "Gaming",
        "Business",
        "Student",
        "Renewed"
      ]
    },
    {
      _id: "3",
      category: "Headphones",
      subcategories: [
        "Headphones",
        "Neckband",
        "TWS",
        "Wired Earphones"
      ]
    },
    {
      _id: "4",
      category: "Speakers",
      subcategories: [
        "Portable",
        "Premium",
        "Wired",
        "Soundbar",
        "Home Theatre"
      ]
    },
    {
      _id: "5",
      category: "Smart Watches",
      subcategories: [
        "Premium",
        "Others"
      ]
    },
    {
      _id: "6",
      category: "4K Smart TV",
      subcategories: [
        "43 inches",
        "50 inches",
        "55 inches",
        "55+ inches"
      ]
    },
    {
      _id: "7",
      category: "Tablet",
      subcategories: [
        "iPad",
        "Android"
      ]
    },
    {
      _id: "8",
      category: "Keyboards",
      subcategories: [
        "Gaming",
        "Mechanical",
        "Set",
        "Others"
      ]
    },
    {
      _id: "9",
      category: "Monitors",
      subcategories: [
        "Gaming",
        "Others"
      ]
    },
    {
      _id: "10",
      category: "Mouse",
      subcategories: [
        "Wired",
        "Wireless"
      ]
    },
    {
      _id: "11",
      category: "Printer",
      subcategories: [
        "Laser",
        "Ink Tank",
        "Inkjet",
        "Label",
        "Thermal"
      ]
    },
    {
      _id: "12",
      category: "PC",
      subcategories: [
        "RAM",
        "SSD",
        "HDD",
        "Cooling Pad",
        "Webcams"
      ]
    }
]


export const subCategoriesGenerator = (name) => {
    const found = categories.find(category => category.category === name)
    return found.subcategories
}
