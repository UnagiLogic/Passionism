# Passionism

Setup Environment
1. Install Visual Studio Code [Visual Studio Code](https://code.visualstudio.com/)
2. Setup GitHub Repo for version control
4. Install Deno CLI.
5. Install Deno Marketplace Extension in VSC
6. Install Vite


Summary: 
Visual Studio Code as the Foundation IDE
Copilot for pair programming
GitHub Repo for version control
Deno as the server side back-end
React as the Javascript Framework Frontend (for rendering)
Typescript for code quality
Vite for local testing development server
Discord.js library to help with API and allowing the game to be played on Discord.

Next Steps:


Potential Code

Establish Database Connection and Perform Queries
const { Pool } = require('pg');
const dbConfig = require('./database.config');

const pool = new Pool(dbConfig);

async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;   

  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

// Example usage:
query('SELECT * FROM users')
  .then(result => console.log(result))
  .catch(err => console.error(err));


  Create a Redux Store
  import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store; 1 

Reducers to handle state change
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;   

    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer

Define actions to trigger state changes
// In your actions file:
import { setUsers } from './userSlice';

export const fetchUsers = () => async (dispatch) => {
  const users = await fetchUsersFromDatabase(); // Replace with your database query
  dispatch(setUsers(users));
};

Connect Redux to your React Components
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './actions';

function MyComponent() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}