// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Products.css';

// function Products() {
//   return (
//     <div className="products-page">
//       {/* Navigation */}
//       <nav className="navbar">
//         <div className="nav-container">
//           <div className="nav-logo">
//             <Link to="/" className="nav-link">
//               <h2>MK & Buildings</h2>
//             </Link>
//           </div>
//           <div className="nav-menu">
//             <Link to="/" className="nav-link">Home</Link>
//             <Link to="/products" className="nav-link active">Products</Link>
//             <Link to="/engineers" className="nav-link">Engineers</Link>
//             <Link to="/" className="nav-link">About Us</Link>
//             <Link to="/" className="nav-link">Reviews</Link>
//             <Link to="/" className="nav-link">Contact</Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="products-hero">
//         <div className="container">
//           <h1>Our Product Categories</h1>
//           <p>Choose from our comprehensive range of building materials</p>
//         </div>
//       </section>

//       {/* Product Categories */}
//       <section className="product-categories">
//         <div className="container">
//           <div className="categories-grid">
//             <Link to="/products/exterior" className="category-card">
//               <div className="category-icon">🏠</div>
//               <h2>Exterior</h2>
//               <p>Building materials for the outside of your home</p>
//               <ul>
//                 <li>Roofing Materials</li>
//                 <li>Bricks & Blocks</li>
//                 <li>Windows & Doors</li>
//                 <li>Foundation Materials</li>
//                 <li>Exterior Finishes</li>
//               </ul>
//               <div className="category-arrow">→</div>
//             </Link>

//             <Link to="/products/interior" className="category-card">
//               <div className="category-icon">🏡</div>
//               <h2>Interior</h2>
//               <p>Materials and finishes for inside your home</p>
//               <ul>
//                 <li>Flooring Materials</li>
//                 <li>Wall Finishes</li>
//                 <li>Ceiling Materials</li>
//                 <li>Plumbing & Electrical</li>
//                 <li>Interior Decor</li>
//               </ul>
//               <div className="category-arrow">→</div>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <p>&copy; 2024 MK & Buildings. All rights reserved. | Quality Building Materials Since 2009</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Products; 


import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Products.css';

function Products() {
  return (
    <div className="products-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/LOGO.png" alt="MK & Buildings Logo" className="logo-image" />
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link active">Products</Link>
            <Link to="/engineers" className="nav-link">Engineers</Link>
            <Link to="/" className="nav-link">About Us</Link>
            <Link to="/" className="nav-link">Reviews</Link>
            <Link to="/" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1>Our Product Categories</h1>
          <p>Choose from our comprehensive range of building materials</p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="product-categories">
        <div className="container">
          <div className="categories-grid">
            <Link to="/products/exterior" className="category-card">
              <div className="category-icon">🏠</div>
              <h2>Exterior</h2>
              <p>Building materials for the outside of your home</p>
              <ul>
                <li>Roofing Materials</li>
                <li>Bricks & Blocks</li>
                <li>Windows & Doors</li>
                <li>Foundation Materials</li>
                <li>Exterior Finishes</li>
              </ul>
              <div className="category-arrow">→</div>
            </Link>
            <Link to="/products/interior" className="category-card">
              <div className="category-icon">🏡</div>
              <h2>Interior</h2>
              <p>Materials and finishes for inside your home</p>
              <ul>
                <li>Flooring Materials</li>
                <li>Wall Finishes</li>
                <li>Ceiling Materials</li>
                <li>Plumbing & Electrical</li>
                <li>Interior Decor</li>
              </ul>
              <div className="category-arrow">→</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MK & Buildings. All rights reserved. | Quality Building Materials Since 2009</p>
        </div>
      </footer>
    </div>
  );
}

export default Products;