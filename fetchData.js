var fs = require("fs");
var JSONStream = require('JSONStream');
var input = fs.createReadStream("file1.json");


/**
DOSSIERS
**/
var streamDossier = input.pipe(JSONStream.parse(['export', 'dossiersLegislatifs','dossier']));
var count = 0;
streamDossier.on('data', function(data){
	//console.log("Dossiers : " + data.length);
	//console.log(data[0].dossierParlementaire.actesLegislatifs.acteLegislatif.actesLegislatifs.acteLegislatif);
	var types = [];
	//console.log(JSON.stringify(data[0],null,4));
	data.forEach(function(elt, index, arr){
		//types.push(getTypeDossier(elt));
		if(elt.dossierParlementaire.uid == "DLR5L14N29173") {
			console.log(JSON.stringify(elt,null,4));
		}
	});
	//console.log(reduce(types));
});


/**
TEXTES
**/
var streamTxt = input.pipe(JSONStream.parse(['export', 'textesLegislatifs','document']));
streamTxt.on('data', function(data){
	//console.log("Textes : " + data.length);
	//console.log(JSON.stringify(data[0],null,4));
	var types = [];
	data.forEach(function(elt, index, arr){
		//types.push(getTypeText(elt));
		if(elt.uid == "VD172493DI"){
			//console.log(JSON.stringify(elt,null,4));
		}
	});
	//console.log(reduce(types));
});
//streamTxt.on('end', function(){ console.log("FOUND : " + count)})

function reduce(array){
	return array.reduce(function (acc, curr) {
		if (typeof acc[curr] == 'undefined') {
			acc[curr] = 1;
		} else {
			acc[curr] += 1;
		}
		return acc;
	}, {});
}

function getTypeDossier(elt){
	return elt.dossierParlementaire["@xsi:type"];
}

function getTypeText(elt){
	return elt["@xsi:type"];
}

function traverse(o) {
    for (i in o) {
        if (typeof(o[i])=="object") {
            console.log(i, o[i]);
            traverse(o[i] );
        }
    }
}

//"DLR5L14N29173"
function findPromulgation(o){
	o.actesLegislatifs.acteLegislatif.forEach(function(elt){
		if(typeof(elt.codeActe) != 'undefined' && elt.codeActe == "PROM"){
			//console.log(o.actesLegislatifs.acteLegislatif);
			console.log(elt);
			return;
		}
		/*if(typeof(o.actesLegislatifs) != 'undefined' && typeof(o.actesLegislatifs.acteLegislatif) != 'undefined'){
			console.log(elt);
			//console.log(o.actesLegislatifs.acteLegislatif);
			findPromulgation(elt.actesLegislatifs.acteLegislatif, 1);
		}*/
	});
    /*} else {
    	findPromulgation(o.actesLegislatifs.acteLegislatif, 1);
    	console.log("1")
    }*/
}

//

/*streamDossier.on('data', function(data){
	console.log("Dossiers : " + data.length);
});*/

//stream.on('end', function(){ console.log("found : " + count) });
