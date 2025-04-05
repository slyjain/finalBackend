const express=require("express")
const app=express()
const PORT=8000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Successful response");
})
app.get("/questions/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Question ID is: ${userId}`);
});
app.get("/search", (req, res) => {
    const { query, page } = req.query;
    res.send(`Search query: ${query}, Page number: ${page}`);
});

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})