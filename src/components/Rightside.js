import styled from "styled-components";
import React from "react";

const Rightside = (props) => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>
        <Recommendation>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="/images/linkedin-banner.jpeg" alt="" />
      </BannerCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  margin-bottom: 8px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
`;

const FeedList = styled.ul`
  margin-top: 12px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      border-radius: 15px;
      display: inline-flex;
      justify-content: cneter;
      align-items: center;
      box-sizing: border-box;
      font-weight: 600;
      text-align: center;
      outline: none;
      max-height: 32px;
      max-width: 480px;
    }
  }
`;
const Avatar = styled.div`
  background-image: url("/images/followTag.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  background-color: rgb(197, 201, 208);
  border-radius: 24px;
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const BannerCard = styled(FollowCard)`
  img {
    height: 100%;
    width: 100%;
  }
`;

export default Rightside;
