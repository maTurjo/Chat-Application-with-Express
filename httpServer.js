var http = require('http');




var server = http.createServer((req,res)=>{
    console.log("request received")
    console.log(`url is ${req.url}`);

    if(req.url==='/'){

        let responseData={Test:"UserName",Text:"Hello "};
        res.write(JSON.stringify(responseData));
        res.end();
    }
    // console.log(req);
    // console.log(res);

});

server.listen(3200,()=>{
    console.log(`Server listenining on port 3200`)
});
