const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(express.static('public'));

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

.get((req,res) => {
    Article.find((err, foundArticles) => {
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err)
        }
    })
})

.post((req,res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err) => {
        if(!err){
            res.send("Sucessfull added new article");
        } else {
            res.send(err);
        }
    });
})

.delete((req,res) => {
    Article.deleteMany((err) => {
        if(!err){
            res.send("Sucessfull deleted all article");
        } else {
            res.send(err);
        }
    })
});

app.route("/articles/:articleTitle")

.get((req,res) => {
 Article.findOne({title: req.body.articleTitle}, (err,foundArticle) => {
    if (foundArticle) {
        res.send(foundArticle);
    } else {
        res.send("No articles found with such title");
    }
 })
})

.put((req,res) => {
    Article.updateOne(
        {title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content}, 
        {overwrite: true}, (err) => {
            if(!err){
                res.send("Sucessfull updated article");
            } else {
                res.send(err);
            }
        })
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
