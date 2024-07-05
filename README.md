# HH_parser
 fullstack application for parsing vacancy/resume from hh.ru

### Installation

```bash
# clone repository
git clone https://github.com/TAskMAster339/HH_parser HH_parser
cd HH_parser
```
### Usage with docker
create and run docker
```cmd
docker-compose up --build -d  
```
Application will be available on http://localhost:3000
---

### Usage without docker
Prepare backend (All needed libraries you can find in requirements.txt)
  ```cmd
  cd backend
  ```
  Activate virtual environment
  ```cmd
  .\venv\Scripts\activate
  ```
  or install dependencies
  ```cmd
  pip install -r requirements.txt
  ```
#### Then, when everything is ready
  Run the server in production mode
  ```cmd
  fastapi run main.py
  ```
  or in development mode
  ```cmd
  fastapi dev main.py
  ```
---
Run frontend
```cmd
cd frontend
```
install dependencies
```cmd
npm i
```
Run frontend in production mode
```cmd
npm start
```
or in developmnent
```cmd
npm run dev
```
---
