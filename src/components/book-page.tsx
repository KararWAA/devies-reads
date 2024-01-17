import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BookConfig } from "../App";

type Params = {
  id: string;
};

function BookPage() {
  const params = useParams<Params>();
  const [book, setBook] = useState<BookConfig>();
  const [status, setStatus] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState("no");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://devies-reads-be.onrender.com/books/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBook(data);
      });
  }, [params.id]);

  useEffect(() => {
    fetch("https://devies-reads-be.onrender.com/is-logged-in", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res) {
        setIsLoggedIn("Yes");
      }
    });
  }, []);

  const rateBook = async () => {
    await fetch(`https://devies-reads-be.onrender.com/books/${params.id}/rate`, {
      method: "POST",
      body: JSON.stringify({ rating: rating, bookId: book?.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };

  const addToShelf = async () => {
    await fetch(`https://devies-reads-be.onrender.com/users/${params.id}/shelf`, {
      method: "POST",
      body: JSON.stringify({ status: status, bookId: book?.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };

  return (
    <BookWrapper>
      <h1>{book?.name}</h1>
      {isLoggedIn === "Yes" && (
        <>
          <Row>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select...</option>
              <option value="wantToRead">Want To Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="haveRead">Have Read</option>
            </select>
          </Row>
          <Row>
            <span>Rating</span>

            <input
              type="range"
              id="rating"
              name="rating"
              min="0"
              max="5"
              onChange={(value) => {
                setRating(value.target.valueAsNumber);
              }}
            />
            <span>{rating}</span>
          </Row>
          <SaveButton
            onClick={() => {
              rateBook();
              addToShelf();
            }}
          >
            Save
          </SaveButton>
        </>
      )}

      <button onClick={() => navigate("../books")}>Go Back to All books</button>
      <BookInfo>
        <img src={book?.coverUrl} alt="cover" />
      </BookInfo>
      <BookInfo>
        <Item>Genre: {book?.genre}</Item>
        <Item> Average Rating: {Math.round(book?.averageRating ?? 0)}</Item>
        <Item>Currently Reading: {book?.currentlyReading}</Item>
        <Item>Have Read: {book?.haveRead}</Item>
        <Item> Want To Read: {book?.wantToRead}</Item>
      </BookInfo>
      <Description>{book?.description}</Description>
      <BookInfo></BookInfo>
    </BookWrapper>
  );
}

export default BookPage;

const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Item = styled.div`
  font-size: 0.9rem;
`;

const BookInfo = styled.div``;

const Description = styled.div`
  font-size: 1rem;
  width: 50%;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  margin: 4px;
  cursor: pointer;
  width: 100px;
`;
