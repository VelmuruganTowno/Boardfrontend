import React from "react";
import styled from "styled-components";
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const FooterContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1f1f1f;
  position: relative;
  padding-top:50px;

  
  @media screen and (max-width: 480px) {
    height: 230px;
  }
`;

const FooterText = styled.h1`
  font-size: 25px;
  font-weight: 500;
  color: #fff;
  margin: 5px;
  
  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;

const FooterTextContainer = styled.div`
  width: 80%;
  display: flex;
  border-top: 1px solid #cdcdcd;
  padding-top: 12px;
  padding-right: 10px;
  padding-left: 10px;
  color: #fff;
  justify-content: space-between;
  margin-top:30px;

  @media screen and (max-width: 480px) {
    width: 90%;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const PrivacyContainer = styled.div`
  display: flex;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  color: #fff;
  font-size: 20px;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: 11px;

    @media screen and (max-width: 480px) {
      margin-right: 9px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }

  &:hover {
    color: #adadad;
  }
`;

const Link = styled.a`
  color: #fff;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  font-size: 14px;

  &:not(:last-of-type) {
    margin-right: 11px;

    @media screen and (max-width: 480px) {
      margin-right: 9px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }

  &:hover {
    color: #adadad;
  }
`;

const RightsReserved = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 12px;
`;

const ButtonWrapper = styled.button`
  padding: 7px 15px;
  border-radius: 5px;
  background-color:#F46D25;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border: 2px solid transparent;
  transition: all 220ms ease-in-out;
  cursor: pointer;
  margin-top:15px;

  &:hover {
    background-color: transparent;
    border: 2px solid #F46D25;
  }
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterText>Just say the magical word</FooterText>
      <FooterText>and we will do the rest</FooterText>
      <ButtonWrapper >Start your Project</ButtonWrapper>
      <FooterTextContainer>
        <PrivacyContainer>
          <Link>Privacy Policy</Link>
          <Link>Terms of Service</Link>
          <Link>Contact</Link>
        </PrivacyContainer>
        <SocialContainer>
          <SocialIcon>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon>
            <LinkedInIcon />
          </SocialIcon>
          <SocialIcon>
            <InstagramIcon />
          </SocialIcon>
        </SocialContainer>
      </FooterTextContainer>
      <RightsReserved>&copy; 2021 Towno All rights reserved</RightsReserved>
    </FooterContainer>
  );
}
