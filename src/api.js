import axios from 'axios';
const BASE_URL = 'http://localhost:3001/todos';

// READ
export function ReadData() {
  return axios(`${BASE_URL}`).then((Response) => Response.data);
}

// CREATE
export async function CreateData(myData) {
  const { data } = await axios.post(`${BASE_URL}`, myData);
  return data;
}

// DELETE
export async function DeleteData(myId) {
  const { data } = await axios.delete(`http://localhost:3001/todos/${myId}`);
  return data;
}
// `${(BASE_URL, '/', myId)}`

// UPDATE
export async function UpdateData({ todoId, editData }) {
  const { data } = await axios.put(`http://localhost:3001/todos/${todoId}`, editData);
  return data;
}
