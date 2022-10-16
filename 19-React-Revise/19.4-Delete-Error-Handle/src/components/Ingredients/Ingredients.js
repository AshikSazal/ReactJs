import React, { useState, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal'
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()

  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  const filterIngredientsHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients)
  },[])

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true)
    fetch(
      "https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false)
        // if fetch request is done then this section will execute

        // response.json() extract the body and convert it to normal
        return response.json();
      })
      .then((responseData) => {
        // return data
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true)
    fetch(`https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
    }).catch(error => {
      setError(error.message);
    })
  };

  const clearError = () => {
    setError(null);
    setIsLoading(false)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadingIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
