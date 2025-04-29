// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Contact from "./pages/Contact";
// import PageNotFound from "./pages/PageNotFound";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/privacy" element={<Privacy />} />
//       <Route path="/*" element={<PageNotFound />} />
//     </Routes>
//   );
// }

// export default App;
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout"; 
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Routes>
      {/* Layout wrapper for common Header/Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
