import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Loader from "../src/components/Loader";
import Chat from "./components/Chat";
import KnowYourself from "./components/KnowYourself";

import { UserDetailsProvider } from "./context/UserDetails";

const App = () => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(false), 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      {loaded ? (
        <Loader />
      ) : (
        <Section>
          <Navbar />
          <UserDetailsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={`/exercise/:id`} element={<ExerciseDetail />} />
              <Route path={`/chat`} element={<Chat />} />
              <Route
                path={`/tell-us-about-yourself`}
                element={<KnowYourself />}
              />
            </Routes>
          </UserDetailsProvider>
          <Footer />
        </Section>
      )}
    </div>
  );
};

const Section = styled.section``;
export default App;
