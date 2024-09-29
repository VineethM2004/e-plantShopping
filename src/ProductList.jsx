import React, { useState } from "react";
import "./ProductList.css"; // Ensure this imports your CSS file
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
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
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
          added: false,
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
          added: false,
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin ailments.",
          cost: "$14",
          added: false,
        },
        {
          name: "Chamomile",
          image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15",
          added: false,
        },
      ],
    },
  ]);

  const [toolsArray, setToolsArray] = useState([
    {
      name: "Garden Spade",
      image: "https://cdn.pixabay.com/photo/2017/06/05/18/34/garden-tools-2375795_1280.jpg", // Updated example URL
      description: "Perfect for digging and planting.",
      cost: "$25",
      added: false,
    },
    {
      name: "Pruning Shears",
      image: "https://cdn.pixabay.com/photo/2015/04/19/08/13/pruning-shears-731559_1280.jpg", // Updated example URL
      description: "Ideal for trimming and shaping plants.",
      cost: "$20",
      added: false,
    },
    {
      name: "Garden Hose",
      image: "https://cdn.pixabay.com/photo/2015/04/19/08/16/garden-hose-731568_1280.jpg", // Updated example URL
      description: "Durable and flexible for all your watering needs.",
      cost: "$30",
      added: false,
    },
    {
      name: "Rake",
      image: "https://cdn.pixabay.com/photo/2016/04/20/18/12/rake-1331437_1280.jpg", // Updated example URL
      description: "Great for leveling soil and gathering debris.",
      cost: "$18",
      added: false,
    },
    {
      name: "Trowel",
      image: "https://cdn.pixabay.com/photo/2016/04/20/18/09/trowel-1331431_1280.jpg", // Updated example URL
      description: "Essential for planting and transplanting.",
      cost: "$10",
      added: false,
    },
  ]);

  const handleAddToCart = (itemArray, itemIndex) => {
    const item = itemArray[itemIndex];
    dispatch(addItem(item));

    // Update the button state immutably
    if (itemArray === plantsArray) {
      setPlantsArray((prevPlantsArray) => {
        return prevPlantsArray.map((category) => {
          return {
            ...category,
            plants: category.plants.map((p) => {
              if (p.name === item.name) {
                return { ...p, added: true };
              }
              return p;
            }),
          };
        });
      });
    } else {
      setToolsArray((prevToolsArray) => {
        return prevToolsArray.map((t) => {
          if (t.name === item.name) {
            return { ...t, added: true };
          }
          return t;
        });
      });
    }
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
      <div className="navbar" style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px" }}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" style={{ textDecoration: 'none' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "1100px" }}>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ color: "white", fontSize: "30px", textDecoration: "none", marginRight: '20px' }}>
              Plants
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ color: "white", fontSize: "30px", textDecoration: "none" }}>
              Tools
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); }} style={{ color: "white", fontSize: "30px", textDecoration: "none" }}>
              <div className="cart-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                {totalItemsInCart > 0 && <span className="item-count">{totalItemsInCart}</span>}
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="product-list">
        {plantsArray.map((category) => (
          <div key={category.category}>
            <h2 className="plant_heading">{category.category}</h2>
            <div className="product-list">
              {category.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <h3 className="product-title">{plant.name}</h3>
                  <p className="product-description">{plant.description}</p>
                  <p className="product-price">{plant.cost}</p>
                  <button
                    className={`product-button ${plant.added ? 'added' : ''}`}
                    onClick={() => handleAddToCart(category.plants, category.plants.indexOf(plant))}
                    disabled={plant.added}
                  >
                    {plant.added ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tools Section */}
        <div>
          <h2 className="plant_heading">Tools</h2>
          <div className="product-list">
            {toolsArray.map((tool) => (
              <div className="product-card" key={tool.name}>
                <img className="product-image" src={tool.image} alt={tool.name} />
                <h3 className="product-title">{tool.name}</h3>
                <p className="product-description">{tool.description}</p>
                <p className="product-price">{tool.cost}</p>
                <button
                  className={`product-button ${tool.added ? 'added' : ''}`}
                  onClick={() => handleAddToCart(toolsArray, toolsArray.indexOf(tool))}
                  disabled={tool.added}
                >
                  {tool.added ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showCart && (
        <CartItem
          onRemoveFromCart={handleRemoveFromCart}
          onContinueShopping={() => setShowCart(false)}
        />
      )}
    </div>
  );
}

export default ProductList;
