import React, {
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import './App.css';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';
import ModalComponent from '../Modal/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from 'axios';

const Context = React.createContext(null);

const API_ENDPOINT = 'https://api.spacexdata.com/v3/';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        loading: true,
        isError: false,
      };
    case 'DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case 'DATA_ERROR':
      return {
        ...state,
        loading: false,
        isError: true,
      }
    case 'SET_URL':
      return {
        ...state,
        url: `${API_ENDPOINT}${action.payload}`,
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        activeItem: action.payload,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      }
    default:
      throw new Error();
  }
};

const App = () => {
  const initialState = {
    data: [],
    loading: false,
    isError: false,
    url: '',
    isOpen: false,
    activeItem: '',
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const isMounted = useRef(false);

  const fetchData = useCallback(async () => {
    console.log('Comp: B');
    dispatch({ type: 'DATA_LOADING' });

    try {
      const result = await axios.get(state.url);
      dispatch({
        type: 'DATA_SUCCESS',
        payload: result.data
      });
    } catch {
        dispatch({ type: 'DATA_ERROR' });
    }
  }, [state.url]);

  console.log('Comp: A');
  console.log('Comp A isOpen: ', state.isOpen);

  const handleClick = event => {
    dispatch({ type: 'SET_URL', payload: event.target.innerHTML });
  }

  const handleOpenModal = item => {
    dispatch({ type: 'OPEN_MODAL', payload: item});
  }

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  }

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);

  return (
    <Context.Provider value={{
        ...state,
        handleClick: handleClick,
        handleOpenModal: handleOpenModal,
        handleCloseModal: handleCloseModal,
        dispatch: dispatch,
      }}
      >
      <NavBar />
      <Container>
        <Row className='justify-content-center'>
          <h2>
            “You want to wake up in the morning and think the future is going
            to be great - and that’s what being a spacefaring civilization is all
            about. It’s about believing in the future and thinking that the future
            will be better than the past. And I can’t think of anything more
            exciting than going out there and being among the stars.”
            -Elon Musk
          </h2>
        </Row>

        {state.isError && <h3>Something is wrong ...</h3>}

        {state.loading ? <p>Loading ...</p> : <List />}

        {state.isOpen && <ModalComponent />}
      </Container>
    </Context.Provider>
  )
};

export default App;
export { Context };
