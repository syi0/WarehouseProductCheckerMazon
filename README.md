# Mazon Program Magazynowy

> Strona została utworzona dla [MAZ-ON SERWIS Sp. z o. o.](https://maz-on.pl) podczas praktyk zawodowych. Celem aplikacji było stworzenie panelu magazynowego do zarządzania produktami (tj. dodawanie, edycja, usuwanie, wyświetlanie, filtracja itp.). 

### O projekcie:
Ten projekt to system zarządzania magazynem stworzony z wykorzystaniem React, Node.js, Express oraz lokalnej bazy danych SQLite. Umożliwia logowanie użytkowników z rolami, dodawanie, edycję, usuwanie oraz filtrowanie produktów w wybranych tabelach.

### Wymaganie:
 - [Node.js](https://nodejs.org/en/download)
 - [DB Browser for SQLite](https://sqlitebrowser.org/) (do obsługi bazy danych)

### Pierwsze uruchomienie:
W pierwszej kolejności trzeba uruchomić backend (serwer + bazę danych). Komendy są wykonywane z poziomu głównego katalogu projektu (gdzie widnieją 2 foldery i plik readme.md)
```
cd backend
npm install     (Po użyciu tej komendy powinien utworzyć się folder node_modules w folderze backend)
npm start
```

Następnie uruchamiamy frontend w nowej konsoli
```
cd frontend/mazon
npm install      (Po użyciu tej komendy powinien utworzyć się folder node_modules w folderze mazon)
npn run dev
```

### Ponowne uruchomienie i aktualizacja:
Ponowne uruchomienie będzie odbywało się w ten sam sposób co pierwsze uruchomienie, poza użyciem komendy `npm install`.

W celu aktualizacji pakietów (zalecamy przed ponownym uruchomieniem):

Backend
```
cd backend
npm update -g
npm start (skrypt rozpoczynający pracę backendu)
```

Frontend
```
cd frontend/mazon
npm update -g
npm run dev (skrypt rozpoczynający pracę frontendu)
```

### Dodawanie i usuwanie użytkowników:
Wpisanie odpowiedniej komendy w zależoności od danej akcji będzie przeprowadzało użytkownika przez bardzo prosty formularz wpisywania danych w konsoli

Dodawanie 
```
cd backend
node addUser.js
```

Usuwanie
```
cd backend
node deleteUser.js
```

#### Autorzy: Nataniel Sypko (lider), Wiktoria Kruk, Cyprian Głowacki.