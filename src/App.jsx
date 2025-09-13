import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import BaggageChecker from './pages/BaggageChecker'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baggage-checker" element={<BaggageChecker />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App