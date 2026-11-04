import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import UserList from './components/UserList';

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<Home />} />
<Route path="/registration" element={<Registration />} />
<Route path="/about" element={<About />} />
<Route path="/users" element={<UserList />} /> </Routes> </BrowserRouter>
);
}

export default App;
