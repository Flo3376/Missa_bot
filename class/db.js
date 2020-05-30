const sqlite3 = require('sqlite3').verbose()
var db

exports.db = db

exports.open=function(path) {
    return new Promise(function(resolve) {
        this.db = new sqlite3.Database(path, 
            function(err) {
                if(err) reject("Open error: "+ err.message)
                    else    resolve(path + " opened")
                }
            )   
    })
}

// any query: insert/delete/update
exports.run=function(query) {
    function getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return day + "/" + month + "/" + year  + " à " + hour + ":" + min + ":" + sec;
    }

    let log=getDateTime() +" : "+query;


    let rawdata = fs.readFileSync('./db/log_sql.txt');
    if(rawdata.length>0)
    {
        log = log+"\n"+rawdata;
    }
    

    fs.writeFileSync('./db/log_sql.txt', log);

    return new Promise(function(resolve, reject) {
        this.db.run(query, 
            function(err)  {
                if(err) reject(err.message)
                    else    resolve(true)
                })
    })    
}

// first row read
exports.get=function(query, params) {
    return new Promise(function(resolve, reject) {
        this.db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
                else {
                    resolve(row)
                }
            })
    }) 
}

// set of rows read
exports.all=function(query, params) {

    function getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return day + "/" + month + "/" + year  + " à " + hour + ":" + min + ":" + sec;
    }

    let log=getDateTime() +" : "+query+" ?___? "+params;


    let rawdata = fs.readFileSync('./db/log_sql.txt');
    if(rawdata.length>0)
    {
        log = log+"\n"+rawdata;
    }
    

    fs.writeFileSync('./db/log_sql.txt', log);


    return new Promise(function(resolve, reject) {
        if(params == undefined) params=[]

            this.db.all(query, params, function(err, rows)  {
                if(err) reject("Read error: " + err.message)
                    else {
                        resolve(rows)
                    }
                })
    }) 
}

// each row returned one by one 
exports.each=function(query, params, action) {
    return new Promise(function(resolve, reject) {
        var db = this.db
        db.serialize(function() {
            db.each(query, params, function(err, row)  {
                if(err) reject("Read error: " + err.message)
                    else {
                        if(row) {
                            action(row)
                        }    
                    }
                })
            db.get("", function(err, row)  {
                resolve(true)
            })            
        })
    }) 
}

exports.close=function() {
    return new Promise(function(resolve, reject) {
        this.db.close()
        resolve(true)
    }) 
}