
import {Endpoint} from "../config/Api";

export async function getNews() {
  let url = new URL(Endpoint + "/news");
  const response = await fetch(url, {headers : {"Access-Control-Allow-Headers":"*" }});
  if (response.status != 200) {
    const {message} = await response.json();
    console.log(message);
  } else {
    const data = await response.json();
    return data;
  }
}
