var api = require("./v1");
module.exports =  {
    checkALL : function(app, BASE_PATH, climate_stats){
        api(app, BASE_PATH+"/v1/climate-stats", climate_stats);
    }
};