module.exports = function(app, BASE_PATH, climate_stats) {


// GET /api/v1/climate-stats/

app.get(BASE_PATH, (req,res)=>{
    
    var date = req.query.FECHA;
    
    var name = req.query.NOMBRE;
    var provincia = req.query.PROVINCIA;
    
    var altitudmin = req.query.ALTITUDMIN;
    var altitudmax = req.query.ALTITUDMAX;
    
    var temperaturamediamin = req.query.TMEDIAMIN;
    var temperaturamediamax = req.query.TMEDIAMAX;
    
    var precipitazionimin = req.query.PRECIPITACIONMIN;
    var precipitazionimax = req.query.PRECIPITACIONMAX;

    
    var velmediamin = req.query.VELMEDIAMIN;
    var velmediamax = req.query.VELMEDIAMAX;
    
    var rachamin = req.query.RACHAMIN;
    var rachamax = req.query.RACHAMAX;

    
    var solmin = req.query.SOLMIN;
    var solmax = req.query.SOLMAX;
    
    //    var limit = req.query.limit;
    //    var offset = req.query.offset;
    
    if(date)
    {
        if (provincia) // ?FECHA= &PROVINCIA= 
        {
            climate_stats.find({"FECHA":date, "PROVINCIA":provincia}, { projection : {_id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0} }).toArray((err, climateArray)=>{
                if(err) console.log("Error: "+err);
                if (climateArray.length == 0) res.sendStatus(404);
                else res.send(climateArray);
            });
        }
        else if (altitudmin || altitudmax) // ?FECHA= &ALTITUDMIN= &ALTITUDMAX=
        {
            if (altitudmin && altitudmax)
            {
                var min = parseInt(altitudmin, 10); var max = parseInt(altitudmax, 10);
                    climate_stats.aggregate([
                                        { 
                                            "$addFields": {
                                             "ALTITUD": {
                                                "$convert": {
                                                    "input": "$ALTITUD",
                                                    "to": "int",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMEDIA" : {
                                                    "$convert": {
                                                    "input": "$TMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRECIPITACION" : {
                                                    "$convert": {
                                                    "input": "$PRECIPITACION",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMIN" : {
                                                    "$convert": {
                                                    "input": "$TMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMAX" : {
                                                    "$convert": {
                                                    "input": "$TMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "VELMEDIA" : {
                                                    "$convert": {
                                                    "input": "$VELMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "RACHA" : {
                                                    "$convert": {
                                                    "input": "$RACHA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "SOL" : {
                                                    "$convert": {
                                                    "input": "$SOL",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMIN" : {
                                                    "$convert": {
                                                    "input": "$PRESMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMAX" : {
                                                    "$convert": {
                                                    "input": "$PRESMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }
                                            }
                                        }, {
                                            
                                            "$match": {
                                                "ALTITUD" : { $gte : min, $lte : max}, 
                                                "FECHA":date
                                                }
                                            },
                                            {
                                            "$project": {
                                                _id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0
                                                }
                                            }
                                           
                                    ]).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        }
        else if (temperaturamediamin || temperaturamediamax) 
        {
            if (temperaturamediamin && temperaturamediamax)
            {
                var min = parseFloat(temperaturamediamin); var max = parseFloat(temperaturamediamax);
                    climate_stats.aggregate([
                                        { 
                                            "$addFields": {
                                             "ALTITUD": {
                                                "$convert": {
                                                    "input": "$ALTITUD",
                                                    "to": "int",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMEDIA" : {
                                                    "$convert": {
                                                    "input": "$TMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRECIPITACION" : {
                                                    "$convert": {
                                                    "input": "$PRECIPITACION",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMIN" : {
                                                    "$convert": {
                                                    "input": "$TMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMAX" : {
                                                    "$convert": {
                                                    "input": "$TMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "VELMEDIA" : {
                                                    "$convert": {
                                                    "input": "$VELMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "RACHA" : {
                                                    "$convert": {
                                                    "input": "$RACHA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "SOL" : {
                                                    "$convert": {
                                                    "input": "$SOL",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMIN" : {
                                                    "$convert": {
                                                    "input": "$PRESMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMAX" : {
                                                    "$convert": {
                                                    "input": "$PRESMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }
                                            }
                                        }, {
                                            
                                            "$match": {
                                                "TMEDIA" : { $gte : min, $lte : max}, 
                                                "FECHA":date
                                                }
                                            },
                                            {
                                            "$project": {
                                                _id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0
                                                }
                                            }
                                           
                                    ]).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        } 
        else if (precipitazionimin || precipitazionimax) 
        {
            if (precipitazionimin && precipitazionimax)
            {
                var min = parseFloat(precipitazionimin); var max = parseFloat(precipitazionimax);
                    climate_stats.aggregate([
                                        { 
                                            "$addFields": {
                                             "ALTITUD": {
                                                "$convert": {
                                                    "input": "$ALTITUD",
                                                    "to": "int",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMEDIA" : {
                                                    "$convert": {
                                                    "input": "$TMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRECIPITACION" : {
                                                    "$convert": {
                                                    "input": "$PRECIPITACION",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMIN" : {
                                                    "$convert": {
                                                    "input": "$TMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "TMAX" : {
                                                    "$convert": {
                                                    "input": "$TMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "VELMEDIA" : {
                                                    "$convert": {
                                                    "input": "$VELMEDIA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "RACHA" : {
                                                    "$convert": {
                                                    "input": "$RACHA",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "SOL" : {
                                                    "$convert": {
                                                    "input": "$SOL",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMIN" : {
                                                    "$convert": {
                                                    "input": "$PRESMIN",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }, 
                                                "PRESMAX" : {
                                                    "$convert": {
                                                    "input": "$PRESMAX",
                                                    "to": "double",
                                                    "onNull": 0,
                                                    "onError": 0
                                                    }
                                                }
                                            }
                                        }, {
                                            
                                            "$match": {
                                                "PRECIPITACION" : { $gte : min, $lte : max}, 
                                                "FECHA":date
                                                }
                                            },
                                            {
                                            "$project": {
                                                _id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0
                                                }
                                            }
                                           
                                    ]).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        } 
        else if (velmediamin || velmediamax) 
        {
            if (velmediamin && velmediamax)
            {
                var min = parseInt(velmediamin, 10); var max = parseInt(velmediamax, 10); 
                climate_stats.find({"FECHA":date, "VELMEDIA" : { $gte : min, $lte : max}}, { projection : {_id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0} }).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        } 
        else if (rachamin || rachamax) 
        {
            if (rachamin && rachamax)
            {
                var min = parseInt(rachamin, 10); var max = parseInt(rachamax, 10); 
                climate_stats.find({"FECHA":date, "RACHA" : { $gte : min, $lte : max}}, { projection : {_id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0} }).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        } 
        else if (solmin || solmax) 
        {
            if (solmin && solmax)
            {
                var min = parseInt(solmin, 10); var max = parseInt(solmax, 10); 
                climate_stats.find({"FECHA":date, "SOL" : { $gte : min, $lte : max}}, { projection : {_id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0} }).toArray((err, climateArray)=>{
                    if(err) console.log("Error: "+err);
                    if (climateArray.length == 0) res.sendStatus(404);
                    else res.send(climateArray);
                });
            }
            else res.sendStatus(400);
        } 
        else // ?fecha= senza niente
        {
           climate_stats.aggregate([
                                    { 
                                        "$addFields": {
                                         "ALTITUD": {
                                            "$convert": {
                                                "input": "$ALTITUD",
                                                "to": "int",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "TMEDIA" : {
                                                "$convert": {
                                                "input": "$TMEDIA",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "PRECIPITACION" : {
                                                "$convert": {
                                                "input": "$PRECIPITACION",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "TMIN" : {
                                                "$convert": {
                                                "input": "$TMIN",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "TMAX" : {
                                                "$convert": {
                                                "input": "$TMAX",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "VELMEDIA" : {
                                                "$convert": {
                                                "input": "$VELMEDIA",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "RACHA" : {
                                                "$convert": {
                                                "input": "$RACHA",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "SOL" : {
                                                "$convert": {
                                                "input": "$SOL",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "PRESMIN" : {
                                                "$convert": {
                                                "input": "$PRESMIN",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }, 
                                            "PRESMAX" : {
                                                "$convert": {
                                                "input": "$PRESMAX",
                                                "to": "double",
                                                "onNull": 0,
                                                "onError": 0
                                                }
                                            }
                                        }
                                        
                                    }, {
                                        
                                        "$match": {
                                            "FECHA":date
                                            }
                                        },
                                        {
                                        "$project": {
                                            _id : 0, HORATMIN : 0, HORATMAX : 0, DIR : 0, HORARACHA : 0, HORAPRESMAX : 0, HORAPRESMIN : 0
                                            }
                                        }
                                       
                                ]).toArray((err, climateArray)=>{
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