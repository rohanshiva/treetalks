import { newsApi } from "../config/Api";

export async function getNews() {
  let keyword = "social injustice";
  let url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&pageSize=10&apiKey=${newsApi}`;

  const response = await fetch(url);

  if (response.status != 200) {
    const message = `An error has occured: ${response.message}`;
    console.log(message);
  } else {
    const data = await response.json();
    return data;
  }
}
