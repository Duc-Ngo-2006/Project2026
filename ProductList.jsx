
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Tính tổng số lượng mặt hàng trong giỏ
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Restores moisture naturally.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for indoor plant.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/12/aloe-vera-3284710_1280.jpg", description: "Soothes skin & purifies air.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828841_1280.jpg", description: "Calming and relaxing aroma.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2015/04/10/17/03/jasmine-716630_1280.jpg", description: "Sweet, fragrant white flowers.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herbal scent.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/18/16/peppermint-1163013_1280.jpg", description: "Fresh and crisp scent.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/07/28/14/29/lemon-balm-2548817_1280.jpg", description: "Citrusy fragrance.", cost: "$12" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/09/08/18/31/eucalyptus-2729683_1280.jpg", description: "Refreshing and aromatic.", cost: "$25" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2020/05/26/09/32/zz-plant-5222230_1280.jpg", description: "Thrives in low light.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816941_1280.jpg", description: "Tolerates neglect easily.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2019/02/10/15/09/plant-3987392_1280.jpg", description: "Extremely durable.", cost: "$20" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2019/09/20/12/03/succulent-4491533_1280.jpg", description: "Requires minimal watering.", cost: "$15" },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/succulents-1846147_1280.jpg", description: "Great for small spaces.", cost: "$18" },
        { name: "Cactus", image: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cactus-2536531_1280.jpg", description: "Thrives with light and heat.", cost: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <div className="tag">
          <div className="luxury">
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
              Paradise Nursery
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '18px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <h1 className="cart" style={{ margin: 0, fontSize: '20px' }}>
                🛒 <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#2e7d32' }}>{categoryObj.category}</h2>
              <div className="plant-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                      style={{
                        backgroundColor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'not-allowed' : 'pointer',
                        borderRadius: '5px'
                      }}
                    >
                      {(addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
