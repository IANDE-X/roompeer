import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/Auth";
import Profile from "../components/ui/Profile";
import LoadingPage from "../components/ui/LoadingPage";

export default function Account() {
  const { user } = useAuth();
  return (
    <Wrapper>{user ? <Profile uid={user.uid} /> : <LoadingPage />}</Wrapper>
  );
}

const Wrapper = styled.div``;

const ContentWrapper = styled.div``;
