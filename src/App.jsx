
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import Membership from "./pages/Membership";
import News from "./pages/News";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import ContentDetail from "./pages/ContentDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />

          {/* Individual news detail page */}
          <Route
            path="/news/:id"
            element={<ContentDetail type="news" />}
          />

          {/* Individual article detail page */}
          <Route
            path="/articles/:id"
            element={<ContentDetail type="articles" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
