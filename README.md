# Marvel-characters STD24069

## | Back-end

### Installation

1 Clone the repository

```bash
git clone https://github.com/Rindra17/marvel-characters.git
cd backend
```

2 Install dependencies

```bash
npm Install
```

3 Start the development server (using nodemon)

```bash
npm run dev
```

The server will start on port 300 by default.

### API Endpoints

#### Get all Characters

**Endpoints**: `GET /characters`

Returns an array of all characters.

#### Get Single Character

**Endpoints**: `GET /characters/:id`

Returns a Single Character by ID.

#### Create a Character

**Endpoints**: `POST /characters`

Create a new characters. Require `name`, `realName`, and `universe` fields.

#### Delete a Character

**Endpoints**: `DELETE /characters/:id`

Delete a character by ID.

## Front-end
