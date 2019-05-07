module.exports = function(app, BASE_PATH, climate_stats) {


// GET /api/v1/climate-stats/

app.get(BASE_PATH, (req,res)=>{
    
    var estacion = req.query.estacion;
    var provincia = req.query.provincia;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var date = req.query.fecha;
    var temperaturamaxima = req.query.temperatura_maxima;
    var temperaturaminima = req.query.temperatura_minima;
    var temperaturamedia = req.query.temperatura_media;
    
    if(date)
    {
        if (provincia) // ?fecha= &provincia=
        {
            climate_stats.find({"provincia":provincia, "fecha":date},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else res.send(climateArray);
            });
        }
        else if(temperaturamaxima) 
        { 
            climate_stats.find({"fecha":date, "temperatura_maxima":temperaturamaxima},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else
                {
                    if (climateArray.length>1)
                    res.send(climateArray);
                    else res.send(climateArray[0]);
                }
            });
        }
        else if (temperaturaminima)
        {
            climate_stats.find({"fecha":date, "temperatura_minima":temperaturaminima},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else
                {
                    if (climateArray.length>1)
                    res.send(climateArray);
                    else res.send(climateArray[0]);
                }
            });
        }
        else if (temperaturamedia)
        {
            climate_stats.find({"fecha":date, "temperatura_media":temperaturamedia},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else
                {
                    if (climateArray.length>1)
                    res.send(climateArray);
                    else res.send(climateArray[0]);
                }
            });
        }
        else // ?fecha= senza niente
        {
            climate_stats.find({"fecha":date},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else res.send(climateArray);
            });
        }
    }
    else res.sendStatus(400);
    
    /*
    else if(limit)
    {
        
        climate_stats.find({},{projection : {_id : 0}}).limit(parseInt(limit,10)).skip(parseInt(offset,10)).toArray((err, climateArray)=>{
            if(err) console.log("Error: "+err);
            if (climateArray.length == 0) res.sendStatus(404);
            else
            {
                if (climateArray.length>1)
                res.send(climateArray);
                else res.send(climateArray[0]);
            }
        });
    }
    
    else if(from || to) //from to
    {
        if (from && to)
        {
            climate_stats.find({ "provincia" : { $gte : from, $lte : to }},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (climateArray.length>1)
                        res.send(climateArray);
                        else res.send(climateArray[0]);
                    }
                });
        }
        else if (from)
        {
            climate_stats.find({ "provincia" : { $gte : from }},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (climateArray.length>1)
                        res.send(climateArray);
                        else res.send(climateArray[0]);
                    }
                });
        }
        else
        {
            climate_stats.find({ "provincia" : { $lte : to }},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (climateArray.length>1)
                        res.send(climateArray);
                        else res.send(climateArray[0]);
                    }
                });
        }
    }
    */
});
    
};