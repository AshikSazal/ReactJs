import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm'

const NewQuote = () => {
  // switch another page by Programmatic
  const history = useHistory();

  const addQuoteHandler = quoteData => {
    console.log(quoteData);

    // switch to quotes page
    history.push('/quotes');
  }

  return <QuoteForm onAddQuote={addQuoteHandler} />
};

export default NewQuote;
