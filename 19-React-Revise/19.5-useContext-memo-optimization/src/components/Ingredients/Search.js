import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadingIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    // reduce the number of sending request. this is for memory efficiency
    // sending request after 500ms
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          "https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadingIngredients(loadedIngredients);
          });
      }
    }, 500);

    // clean up function. clear the old timer
    return () => {
      clearTimeout(timer);
    }
  }, [enteredFilter, onLoadingIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
