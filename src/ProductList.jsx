import React, { useState } from "react";
import "./ProductList.css"; // Ensure this imports your CSS file
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [plantsArray, setPlantsArray] = useState([
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
          added: false,
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
          added: false,
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
          added: false,
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
          added: false,
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
          added: false,
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
          added: false,
        },
      ],
    },
    {
      category: "Flowering Plants",
      plants: [
        {
          name: "Rose",
          image: "https://cdn.pixabay.com/photo/2016/07/21/11/38/rose-1534214_1280.jpg",
          description: "Symbol of love and beauty.",
          cost: "$10",
          added: false,
        },
        {
          name: "Sunflower",
          image: "https://cdn.pixabay.com/photo/2016/06/28/00/37/sunflower-1484986_1280.jpg",
          description: "Bright and cheerful, they follow the sun.",
          cost: "$8",
          added: false,
        },
        {
          name: "Tulip",
          image: "https://cdn.pixabay.com/photo/2016/04/01/09/37/tulips-1391468_1280.jpg",
          description: "A classic spring flower.",
          cost: "$12",
          added: false,
        },
      ],
    },
    {
      category: "Succulents",
      plants: [
        {
          name: "Echeveria",
          image: "https://cdn.pixabay.com/photo/2016/03/27/21/17/echeveria-1280214_1280.jpg",
          description: "A stunning rosette shape that stores water.",
          cost: "$6",
          added: false,
        },
        {
          name: "Jade Plant",
          image: "https://cdn.pixabay.com/photo/2016/06/20/15/30/jade-1461657_1280.jpg",
          description: "A symbol of good luck.",
          cost: "$10",
          added: false,
        },
      ],
    },
    {
      category: "Foliage Plants",
      plants: [
        {
          name: "Monstera Deliciosa",
          image: "https://cdn.pixabay.com/photo/2018/01/20/21/12/monstera-3094386_1280.jpg",
          description: "Known for its large, split leaves.",
          cost: "$25",
          added: false,
        },
        {
          name: "Pothos",
          image: "https://cdn.pixabay.com/photo/2020/01/01/14/17/pothos-4767368_1280.jpg",
          description: "A low-maintenance plant perfect for beginners.",
          cost: "$10",
          added: false,
        },
      ],
    },
  ]);

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
  };

  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };

  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleAddToCart = (plantCategoryIndex, plantIndex) => {
    const plant = plantsArray[plantCategoryIndex].plants[plantIndex];
    dispatch(addItem(plant));

    setPlantsArray((prevPlantsArray) => {
      return prevPlantsArray.map((category, catIndex) => {
        if (catIndex === plantCategoryIndex) {
          return {
            ...category,
            plants: category.plants.map((p, pIndex) => {
              if (pIndex === plantIndex) {
                return { ...p, added: true };
              }
              return p;
            }),
          };
        }
        return category;
      });
    });
  };

  const handleRemoveFromCart = (removedItem) => {
    setPlantsArray((prevPlantsArray) => {
      return prevPlantsArray.map((category) => {
        return {
          ...category,
          plants: category.plants.map((plant) => {
            if (plant.name === removedItem.name) {
              return { ...plant, added: false };
            }
            return plant;
          }),
        };
      });
    });
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" style={{ textDecoration: 'none' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <div className="cart-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                {totalItemsInCart > 0 && (
                  <span className="item-count">{totalItemsInCart}</span>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, categoryIndex) => (
            <div key={category.category}>
              <h2 className="plant_heading">{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plant.name}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className={`product-button ${plant.added ? 'added' : ''}`}
                      onClick={() => handleAddToCart(categoryIndex, plantIndex)}
                      disabled={plant.added}
                    >
                      {plant.added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem
          onRemoveFromCart={handleRemoveFromCart}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
}

export default ProductList;
