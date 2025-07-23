# BITA QA Project Assessment


A web app for browsing and viewing available Electric Vehicles (EVs) with features like **search, enquiry form, filter, sorting, and pagination**. 


## Project Setup
Fork the repository to get started and run the project using the available options,

#### 1.Install dependencies

```bash
npm install
# or
yarn install
```

#### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

**With Build Docker Container**

#### 1. Build the Image
```bash
docker build -t bita-qa-test .
```

#### 2. Run the Container
```bash
docker run -p 3000:3000 bita-qa-test
```

- The app will be available at `http://localhost:3000`

---
