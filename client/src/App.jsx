import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults";

export const BASE_URL = "http://localhost:9000";

const App = () => {

const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [filteredData, setFilteredData] = useState(null);
const [error, setError] = useState(null);
const [selectedButton, setSelectedButton] = useState('all');

const handleSearch = (event) => {
  const searchValue = event.target.value;
  console.log(searchValue);

  if (searchValue == ""){
    setFilteredData(null);
  }

  const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilteredData(filter)
}

const filterFood = (type) => {
  if(type == 'all'){
    setFilteredData(data);
    setSelectedButton('all');
    return;
  }
  const filter = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectedButton(type);
};

const filterBtns = [
  {
    name: 'All',
    type: 'all'
  },
  {
    name: 'Breakfast',
    type: 'breakfast'
  },
  {
    name: 'Lunch',
    type: 'lunch'
  },
  {
    name: 'Dinner',
    type: 'dinner'
  }
];

useEffect(() => {
  const fetchFoodData = async () => {

    setLoading(true);
     try {
       const response = await fetch(BASE_URL);
       const json = await response.json();
       setData(json);
       setFilteredData(json);
       setLoading(false);
       console.log(json)
     } catch (error) {
       console.log(error);
       setError(error);
     }
   };
   fetchFoodData();
}, []);

if(error) return <div>{error}</div>
if(loading) return <div>Loading...</div>

  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/foodyzone.svg" alt="" />
        </div>

        <div className="search">
          <input onChange={handleSearch} type="text" placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>

        {
          filterBtns.map(obj => 
            <Button 
            
            isSelected={selectedButton == obj.type}
            key={obj.name} onClick={() => filterFood(obj.type)}>{obj.name}</Button>
          )
        }

      </FilterContainer>

    </Container>
     <SearchResults data={filteredData} />
</>
  );
};

export default App;

export const Container = styled.div`
  background-color: #323334;
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      height: 40px;
      font-size: 16px;
      border-radius: 5px;
      padding: 4px 8px;

      &::placeholder{
        color: white;
      }
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  color: white;
  padding-bottom: 40px;
`
export const Button = styled.button `
  background: ${(props) => (props.isSelected ? '#a51c1c' : '#ff4343')};
  outline: 1px solid ${(props) => (props.isSelected ? 'white' : '#ff4343')};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover{
    background: #a51c1c;
  }
`;

