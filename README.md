# REACT, EXPRESS API, PRISMA DB, DOCKER

## Paleidimas

Vykdome komandą:

```bash
docker compose up
```

## Instaliavimas (pirmą kartą arba po didesnių DB schemo pakeitimų)

Atsidarome naują terminalą ir vykdome komandą:
 
```bash
docker-compose exec api sh
```

Tada rašome komandą:

```bash
npm run reset
```

Ši komanda paleis migracijas ir seeding failą


## Padarius DB schemos pakeitimus

Atsidarome naują terminalą ir vykdome komandą:
 
```bash
docker-compose exec api sh
```

Tada rašome komandą:

```bash
npm run migrate
```

Ši komanda sukurs naujas migracijas.
Jei neleis kurti migracijų, galima paleisti reset komandą



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