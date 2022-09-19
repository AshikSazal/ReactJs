import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const {sendRequest, status } = useHttp(addQuote);

  // switch another page by Programmatic
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      // switch to quotes page
      history.push('/quotes')
    }
  }, [status, history]);

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  }

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
};

export default NewQuote;
