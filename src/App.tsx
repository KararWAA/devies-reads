import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Dropdown from "./components/dropdown";
export type BookConfig = {
  averageRating: number;
  coverUrl: string;
  currentlyReading: number;
  description: string;
  genre: string;
  haveRead: number;
  id: string;
  name: string;
  wantToRead: number;
};
type SortValue = {
  text: string;
  value: "haveRead" | "currentlyReading" | "wantToRead" | "name";
};

function App() {
  const [books, setBooks] = useState<BookConfig[]>([]);
  const [sortValue, setSortValue] = useState<string>("name");
  const [order, setOrder] = useState<string>("asc");
  const navigate = useNavigate();

  function sortBooks(value: SortValue["value"], order: "asc" | "desc" = "asc") {
    const sortedBooks = [...books].sort((a, b) => {
      let sortingValue = 0;
      if (value === "name") {
        sortingValue = a.name.localeCompare(b.name);
      } else {
        sortingValue = a[value] - b[value];
      }
      return order === "asc" ? sortingValue : sortingValue * -1;
    });
    setBooks(sortedBooks);
  }

  useEffect(() => {
    fetch("https://devies-reads-be.onrender.com/books")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <ListWrapper className="App">
      <Title>Books</Title>

      <Row>
        <Dropdown
          onChange={(value) => {
            setSortValue(value);
            sortBooks(value as "haveRead" | "currentlyReading" | "wantToRead" | "name");
          }}
          options={[
            {
              text: "Have Read",
              value: "haveRead",
            },
            {
              text: "Currently Reading",
              value: "currentlyReading",
            },
            {
              text: "Want to Read",
              value: "wantToRead",
            },
            {
              text: "Name",
              value: "name",
            },
          ]}
          value={sortValue}
        />
        <Dropdown
          onChange={(value) => {
            sortBooks(sortValue as any, value as any);
            setOrder(value);
          }}
          options={[
            { text: "Ascending", value: "asc" },
            { text: "Descending", value: "desc" },
          ]}
          value={order}
        />
      </Row>
      <List>
        {books.map((b) => (
          <ListItem key={b.id + b.name} onClick={() => navigate(`/books/${b.id}`)}>
            {b.name}
          </ListItem>
        ))}
      </List>
    </ListWrapper>
  );
}

export default App;

const ListWrapper = styled.div`
  min-height: 100vh;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: sans-serif;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  &:hover {
    background-color: grey;
  }
  border-radius: 5px;
  height: 50px;
  width: 80%;
  background-color: #f5f5f5;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
