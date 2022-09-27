const request = require("supertest");
const db = require("../db");
const app = require("../app");
const Books = require("../models/book");
const { Server } = require("http");

describe("Books Routes Test", function () {

    beforeEach(async function () {
      await db.query("DELETE FROM books");
      
      let u1 = await Books.create({
        isbn: "test1",
        amazon_url: "amazonTest@amazon.com",
        author: "Test1",
        language: "Polish",
        pages: 141,
        publisher:"Books Inc",
        titel:"tootles",
        year: 2015
      });
    });




    describe("POST /books", function () {

      test("can create book", async function () {
        let response = await request(app)
          .post("/books")
          .send({
            "isbn": "123",
            "amazon-url": "http://a.co/eobPtX2",
            "author": "james",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton your mom Press",
            "title": "monkey butt",
            "year": 2020   
    });
    expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual( {
          book: {
            isbn: '123',
            amazon_url: null,
            author: 'james',
            language: 'english',
            pages: 264,
            publisher: 'Princeton your mom Press',
            title: 'monkey butt',
            year: 2020
          }
        });
        
    
    
      });
    });


    describe("PUT /books", function () {

      test("can update books", async function () {
        let response = await request(app)
          .put("/books/test1")
          .send({
            "amazon_url": "amazonsucks.com",
            "author": "bobby",
            "language": "chinese",
            "pages": 264,
            "publisher": "Princeton your dad Press",
            "title": "monkey butt",
            "year": 2020   
    });
    expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual( {
          book: {
            isbn: 'test1',
            amazon_url: "amazonsucks.com",
            author: 'bobby',
            language: 'chinese',
            pages: 264,
            publisher: 'Princeton your dad Press',
            title: 'monkey butt',
            year: 2020
          }
        });
        
    
    
      });
    });

    

});

afterAll(async function () {
  await db.end();
});




