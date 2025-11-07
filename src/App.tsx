import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Members from './pages/Members'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Solution from './pages/Solution'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
           <Route path="/members/:rm" element={<Members />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solution" element={<Solution />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App