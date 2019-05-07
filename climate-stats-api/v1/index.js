module.exports = function(app, BASE_PATH, climate_stats) {


// GET /api/v1/climate-stats/

app.get(BASE_PATH, (req,res)=>{
    
    var estacion = req.query.estacion;
    var provincia = req.query.provincia;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var year = req.query.ano;
    var month = req.query.mes;
    var day = req.query.dia;
    var temperaturamaxima = req.query.temperatura_maxima;
    var temperaturaminima = req.query.temperatura_minima;
    var temperaturamedia = req.query.temperatura_media;
    
    if(year || month || day)
    {
        var correct = year && month && day;
        if (!correct) res.sendStatus(400);
        else
        {
            if (provincia) // ?ano= &mes= &dia= &provincia=
            {
                climate_stats.find({"provincia":provincia, "ano":year, "mes":month, "dia":day},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else if(temperaturamaxima) 
            { 
                climate_stats.find({"ano":year, "mes":month, "dia":day, "temperatura_maxima":temperaturamaxima},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
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
                climate_stats.find({"ano":year, "mes":month, "dia":day, "temperatura_minima":temperaturaminima},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
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
                climate_stats.find({"ano":year, "mes":month, "dia":day, "temperatura_media":temperaturamedia},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
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
            else //// ?ano= &mes= &dia= senza niente
            {
                climate_stats.find({"ano":year, "mes":month, "dia":day},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
        }
    }
    
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
    else if(provincia) //&provincia=
    {
        climate_stats.find({"provincia":provincia},{projection : {_id : 0}}).toArray((err, climateArray)=>{ 
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
    else // Without query
    {
        climate_stats.find({},{projection : {_id : 0}}).toArray((err, climateArray)=>{
            if(err) console.log("Error: "+err);
            res.send(climateArray);
        });
    }
});
    
};