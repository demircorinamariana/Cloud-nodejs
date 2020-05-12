# Proiect Cloud Computing
## Introducere
Aceasta aplicatie a fost creata in limbajul HTML si Javascipt si integreaza doua api-uri si anume api-ul de la Google Books si api-ul Movie Database (IMDB Alternative).In ceea ce priveste workspace-ul am ales Cloud9, iar deployment-ul a fost facut pe App Service, de la Microsoft Azure.
## Descriere problema
Problema tratata de proiect visezeaza pasionatii de muzica si carti, care nu stiu ce carte sa citeasca sau ce film sa vizioneze. Astfel, aceasta aplicatie le ofera posibilitatea de a alege in functie de un cuvand cheie, o tema favorita, un subiect favorit.
## Descriere api 
API-urile din Familia API Google Books  permit utilizarea unot functii Google Books orice site sau aplicatie.  API Google Books permite efectuarea majoritatii operațiunilor care se pot efectua în mod interactiv pe site-ul web Google Books.
API-ul de la Google Books ofera acces la multe dintre operațiunile disponibile pe site-ul Google Books. Poate fi utilizat pentru a crea aplicații puternice care asigură o integrare profundă cu Google Books. 
Unele dintre caracteristicile principale pe care le oferă API sunt:

- cautarea si parcurgerea listei de cărți care se potrivesc cu o anumită caracterstica.
- vizualizarea informațiilor despre o carte, inclusiv metadate, disponibilitate și preț, link-uri către pagina de previzualizare.
- gestionarea propriilor rafturi de cărți.

Cererile către API-ul Books pentru date publice trebuie să fie însoțite de un identificator, care poate fi un API Key sau un token de acces. Eu am folosit varianta cu API Key.

Al doilea API folosit este  API-ul IMDb Alternative. Acesta primește date din surse precum IMDb și returnează rezultate în format JSON sau XML. Se poate căuta chiar și prin ID IMDb pentru a obține rezultate similare din baza de date IMDb.
Cererile către API-ul Books pentru date publice trebuie să fie însoțite de un identificator, care poate fi un API Key 

Se pot interoga diferite tipuri de date, inclusiv:

- liste cu titluri de film
- afise de filme
- Episoade de emisiuni TV.


## Flux de date
Ca si metoda HTTP am folosit GET: GET By Search
Un exemplu de request/ response oentru Google Books:

GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

```json 

{
 "kind": "books#volumes",
 "items": [
  {
   "kind": "books#volume",
   "id": "_ojXNuzgHRcC",
   "etag": "OTD2tB19qn4",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/_ojXNuzgHRcC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Vijaya Khisty Bodach"
    ],
  
  },
  {
   "kind": "books#volume",
   "id": "RJxWIQOvoZUC",
   "etag": "NsxMT6kCCVs",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/RJxWIQOvoZUC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Gail Saunders-Smith"
    ],
    
  },
  {
   "kind": "books#volume",
   "id": "zaRoX10_UsMC",
   "etag": "pm1sLMgKfMA",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/zaRoX10_UsMC",
   "volumeInfo": {
    "title": "Flowers",
    "authors": [
     "Paul McEvoy"
    ],
   
  },
  "totalItems": 3
}
```
Exemplu de request/response pentru api-ul IMDb Alternative:

Request:
```
Var unirest = require("unirest");

var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

req.query({
	"page": "1",
	"r": "json",
	"s": "Love"
});

req.headers({
	"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	"x-rapidapi-key": "fe90eb8794mshbbb4ff7435b21bcp15f0e3jsnfd61dcebddbf",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
```
Response :
```
{
"Search":[
    {
    "Title":"Avengers: Endgame",
    "Year":"2019","imdbID":"tt4154796",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"},
    {
    "Title":"Avengers: Endgame",
    "Year":"2019","imdbID":"tt4154796",
    "Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"},
    {
    "Title":"Marvel Studios' Avengers: Endgame LIVE Red Carpet World Premiere",
    "Year":"2019","imdbID":"tt10240638",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BNThjZDgwZTYtMjdmYy00ZmUyLTk4NTUtMzdjZmExODQ3ZmY4XkEyXkFqcGdeQXVyMjkzMDgyNTg@._V1_SX300.jpg"},
    {
    "Title":"Avengers Endgame: the Butt Plan",
    "Year":"2019","imdbID":"tt10399328",
    "Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNTQ1OWQzODktMTY3Zi00OTQxLWExOTYtZTNjZjY5ZTY4M2UyXkEyXkFqcGdeQXVyMTAzMzk0NjAy._V1_SX300.jpg"}],
    "totalResults":"4",
    "Response":"True"
 
}
```
### Capturi de ecran aplicatie 
![Pagina Start](pagStart.JPG)
