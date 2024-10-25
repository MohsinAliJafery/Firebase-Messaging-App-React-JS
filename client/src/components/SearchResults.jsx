import React from "react";
import styled from "styled-components";
import { BASE_URL, Button, Container } from "../App";

const SearchResults = ({ data: foods }) => {
  console.log(foods);



  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
          {foods?.map(({ name, image, text, price }) => (
            <FoodCard key={name}>
              <div className="food_image">
                <img src={BASE_URL + image} alt="" />
              </div>

              <div className="food_info">
                <div className="info">
                  <h2>{name}</h2>
                  <p>{text}</p>
                </div>

                <Button>${price.toFixed(2)}</Button>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardContainer>
  );
};

export default SearchResults;

const FoodCardContainer = styled.div`
  height: calc(100vh - 140px);
`;
const FoodCards = styled.section`
  background-image: url("/bg.png");
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  padding: 70px;
`;
const FoodCard = styled.section`
  width: 340px;
  height: 167px;
  border-radius: 19.45px;

    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.66px solid;

  border-image-source: radial-gradient(
        80.38% 222.5% at -13.75% -12.36%,
        #98f9ff 0%,
        rgba(255, 255, 255, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected, */
 radial-gradient(
        80.69% 208.78% at 108.28% 112.58%,
        #eabfff 0%,
        rgba(135, 38, 183, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

  display: flex;
  padding: 8px;

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
  }

  h2 {
    font: 16px;
    margin-top: 8px;
  }
  p {
    margin-top: 4px;
    font-size: 12px;
  }
  button {
    font-size: 12px;
  }
`;
