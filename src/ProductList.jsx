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
    // Existing plant categories...
  ]);

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff!important",
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
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
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
                    id="mainIconPathAttribute"
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
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '24px' }}>Cart Items</h2>
          {/* Replace with your cart item rendering */}
          <CartItem
            onRemoveFromCart={handleRemoveFromCart}
            onContinueShopping={handleContinueShopping}
          />
          <div style={{ fontSize: '20px' }}>Name: [Your Name Here]</div>
          <div style={{ fontSize: '20px' }}>Email: [Your Email Here]</div>
          <div style={{ fontSize: '20px' }}>Payment Mode: [Your Payment Mode]</div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
