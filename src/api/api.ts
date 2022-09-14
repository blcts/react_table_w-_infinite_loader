import { User } from "../types/User";


const BASE_URL = 'https://jsonplaceholder.typicode.com';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url;

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getUsers = () => get<User[]>('/users');

