import axios from "axios";
import { Place } from "../types/Place";

const API_URL = 'https://geo-app-api.up.railway.app/';

type Response = {
  data: Place[],
}

export function getAllPlaces(): Promise<Response> {
  return axios.get(API_URL + 'places');
}

export function postPlace(place: Omit<Place, 'id'>): Promise<Place> {
  return axios.post(API_URL + 'places', place);
}
