import React, { useReducer, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...currHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  const filterIngredientsHandler = useCallback((filterIngredients) => {
    dispatch({ type: "SET", ingredients: filterIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-type": "application/json" },
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        // if fetch request is done then this section will execute

        // response.json() extract the body and convert it to normal
        return response.json();
      })
      .then((responseData) => {
        // return data
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      });
  }, []);

  const removeIngredientHandler = useCallback((ingredientId) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-update-6740b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: ingredientId });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: error.message });
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: "CLEAR" });
  },[]);

  // useMemo can be used instead of React.memo
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  },[userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadingIngredients={filterIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
