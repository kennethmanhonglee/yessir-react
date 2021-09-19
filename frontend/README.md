# Yessir!

Yessir! is a single-page Yelp clone which mimicks some of Yelp's functionalities, allowing users to search for businesses, leave a review for businesses, and to create a business page where others can interact with it.

## Live site

https://yessir-react.herokuapp.com/

## Technologies used

- ### Frontend
  - HTML,CSS,Javascript, React, Redux
- ### Backend
  - Express, Sequelize, PostgreSQL

## Screenshots

### Home page

![Home Page](https://user-images.githubusercontent.com/54250710/133942899-f2317f40-1d13-4bf4-be1a-9e21510e550e.png)

### Signup Page

![Signup Page](https://user-images.githubusercontent.com/54250710/133942936-342c104d-ff6c-4aca-a041-b989d13ac037.png)

### Search Page

![Search Page](https://user-images.githubusercontent.com/54250710/133942977-334daddb-4e51-42d1-9392-28c8ec7449a9.png)

## Features

Users are able to search for a business either by their title, or the location of the business (street address, city, state, or zip code.) Once they find it, they are also able to read reviews of that business left by other users, or login/signup for an account and leave a review of their own.

## Challenges

- Working on a solo project

  - As this is the first time I worked on a solo project, time management was definitely one of the biggest change compared to the previous group projects I worked on. One of the most important lessons I learned from this project is using a scrum board to keep track of my tasks and making sure that I am not too off track from the current task. Especially in the beginning of a project, it is easy to stray off of the current task as there are many things that need to be worked on, but using a scrum board or todo list really helped me stay focused and manage my time well.

- Search Feature
  - Implementing the search feature was one of the greater technical challenges I had to face during this project. I had implemented a search using the Sequelize `Op.iLike` where operator as one of the backend API routes. However, where to make the fetch request to this route was difficult since I had originally tried to make this request in the search bar component, which would then redirect the user to a search page. I was not able to pass in the list of businesses from the search bar to the search page as they are different routes inside of the React Router Dom package. I consulted a few of my colleagues, and one of them reminded me that conventionally, developers would first redirect the user, then make the fetch request at the new search page so that react component would have access to the list of businesses returned from the backend API route. 
