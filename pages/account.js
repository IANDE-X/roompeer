import React from "react";
import styled from "styled-components";
import Profile from "../components/ui/Profile";
import LoadingPage from "../components/ui/LoadingPage";
import { useAuth } from "../context/Auth";

export default function Account() {
  const { userData, user } = useAuth();

  return <Wrapper>{userData && user ? <Profile data={userData} user={user} /> : <LoadingPage />}</Wrapper>;
}

const Wrapper = styled.div``;
