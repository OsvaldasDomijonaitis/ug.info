# EXPRESS karkaso pavyzdys naudojant MySQL, MVC, CRUD, Auth

## Instaliavimas (pirmą kartą arba po didesnių pakeitimų)

Įeiname į katalogą express_db

Įdiegiame visus reikalingus NodeJS paketus

```bash
npm i
```

Padarome .env.example failo kopiją, kurią pavadiname .env

.env faile surašome savo kompiuterio nustatymus. Šis procesas atliekamas tik pirmą kartą.

Importuojame duomenų bazę iš failo js3_express_db.sql

## Paleidimas programuojant

Vykdome komandą

```bash
npm run dev
```


## Paleidimas serveryje

Vykdome komandą

```bash
npx tsc
npm start
```


## Demo vartotojai

Paprastas vartototjas

```
El. paštas: user@example.com
Slaptažodis: password
```

Administratorius

```
El. paštas: admin@example.com
Slaptažodis: password
```