// // definizione della TRASLAZIONE senza clone()
// T = function (dims) {
// 	return function (values) {
// 		return function (object) {
// 			return object.translate(dims, values);
// 		};
// 	};
// }
//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

//Funzione che mi permette di inserire i colori in rgba con range [0,255]
function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}

function extrude(obj, h){
	return EXTRUDE([h])(obj);
}

/*circonferenza*/
function circle(r){
	var domain = DOMAIN([[0,2*PI]])([36]);

 var circ = function (r) {
 	 return function (v) {
  return [r*COS(v[0]), r*SIN(v[0])];
  };
 };
 var mapping = circ(r);
 return (MAP(mapping)(domain));
}

//funzione che mi restituisce una semicirconferenza
function semicircle(r){
 var domain = DOMAIN([[0,PI]])([36]);

 var circ = function (r) {
 	 return function (v) {
  return [r*COS(v[0]), r*SIN(v[0])];
  };
 };

 var mapping = circ(r);

 return (MAP(mapping)(domain));
}

function cilynder(r,h){
	return extrude(circle(r),h);
}

function calcola_nodi(points,grado){ 
  var m = points.length;
  var k = grado;
  var n = (m + k + 1);
  var l = n - 3;
  var j = 1;
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  }
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  }
  for (var i = l; i < n; i++) {
    knots[i] = j;
  }
  return knots;
}

function proporzione(a,percentuale){
	var calcolo_percentuale = 100/percentuale;
	var array = new Array();
	for(var i=0;i<a.length;i++){
		var p = new Array();
		for(var k=0;k<a[i].length;k++){
			p[k] = a[i][k]/calcolo_percentuale;
		}
		array[i] = p;
	}
return array;
}

function cambia_valore_coordinata(a,coordinata,valore){
	var array = new Array();
	for(var i=0;i<a.length;i++){
		var p = new Array();
		if(coordinata === 0){
			p[0] = a[i][0]+valore;
			p[1] = a[i][1];
			p[2] = a[i][2];}
		else if(coordinata === 1){
			p[0] = a[i][0];
			p[1] = a[i][1]+valore;
			p[2] = a[i][2];}
		else if(coordinata === 2){
			p[0] = a[i][0];
			p[1] = a[i][1];
			p[2] = a[i][2]+valore;
		}
		else
			console.log("coordinata errata");

		array[i] = p;
	}

return array;
}

function copia_array(a){
	var copia = new Array();
	for(var i=0;i<a.length;i++){
			copia[i] = a[i];
		}
	return copia;
}

function torus(R,r){

	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([36,72]);

	var mapping = function () {
	  return function (v) {
	    var a = v[0];
	    var b = v[1];

	    var u = (r * COS(a) + R) * COS(b);
	    var v = (r * COS(a) + R) * SIN(b);
	    var w = (r * SIN(a));

	    return [u,v,w];
	  }
	}
	return MAP(mapping(R,r))(domain);
}

 // prende i valori dell'array e fa operazioni uguali su di esso
 //vale per array di array
function modifica_valori(p,x,y,z){ 
	var array = new Array();
	for(var i=0;i<p.length;i++){
		var a = new Array();
		a[0] = p[i][0]+x;
		a[1] = p[i][1]+y;
		a[2] = p[i][2]+z;
		array[i] = a;
	}
	return array;
}

function inverti_coordinate(array,coordinata1,coordinata2){
	for(var i=0;i<array.length;i++){
		//inverto x e y
		if(coordinata1 === 0 && coordinata2 === 1 || coordinata1 === 1 && coordinata2 === 0){
			var a_supp = array[i][0];
			array[i][0] = array[i][1];
			array[i][1] = a_supp ;
		}
		else if(coordinata1 === 0 && coordinata2 === 2 || coordinata1 === 2 && coordinata2 === 0){
			var a_supp = array[i][0];
			array[i][0] = array[i][2];
			array[i][2] = a_supp ;
		}
		else if(coordinata1 === 2 && coordinata2 === 1 || coordinata1 === 1 && coordinata2 === 2){
			var a_supp = array[i][2];
			array[i][2] = array[i][1];
			array[i][1] = a_supp ;
		}

		else
			console.log("coordinata errata");
	}
	return array;
}

//dato un array inverto gli elementi, il primo diventa l'ultimo e cosi' via
function inverti_array(a){
	var array = new Array();
	//copio l'array in modo da non modificare i valori iniziali
	for(var i=0;i<a.length;i++){
		array[i] = copia_array(a[i])
	}
	for(var i=0;i<array.length/2;i++){
		var a_supp = array[i];
		array[i] = array[array.length-1-i];
		array[array.length-1-i] = a_supp;
	}
	return array;
}
function punti_controllo_cerchio(r){
	var c = [[0,0,1],[0.33,0,0.966,],[0.7,0,0.733],[0.966,0,0.33],[1,0,0],[0.966,0,-0.33],[0.7,0,-0.733],[0.33,0,-0.966],[0,0,-1],[-0.33,0,-0.966],[-0.7,0,-0.733],[-0.966,0,-0.33],[-1,0,0],[-0.966,0,0.33],[-0.7,0,0.733],[-0.33,0,0.966],[0,0,1]];
	for(var i=0;i<c.length;i++)
			for(var k=0;k<c[i].length;k++)
			c[i][k] = c[i][k]*r;
	return c;
}

function punti_controllo_cerchio_assi_x_y(r){
		var c = [[0,-1,0],[0.33,-0.966,0],[0.7,-0.733,0],[0.966,-0.33,0],[1,0,0],[0.966,0.33,0],[0.7,0.733,0],[0.33,0.966,0],[0,1,0],[-0.33,0.966,0],[-0.7,0.733,0],[-0.966,0.33,0],[-1,0,0],[-0.966,-0.33,0],[-0.7,-0.733,0],[-0.33,-0.966,0],[0,-1,0]];
	for(var i=0;i<c.length;i++)
		for(var k=0;k<c[i].length;k++)
		c[i][k] = c[i][k]*r;
	return c;
}

function punti_controllo_cerchio_assi_y_z(r){
	var c = inverti_array(inverti_coordinate(punti_controllo_cerchio(r),0,1))
	return c;
}

//funzione che ci serve per creare il cerchione della ruota
function crea_cerchione(raggio,spessore){
	var dominio = DOMAIN([[0,1],[0,1]])([45,60]);

	var c1 = punti_controllo_cerchio(raggio)
	var c2 = cambia_valore_coordinata(c1,1,spessore)
	var c3 = proporzione(cambia_valore_coordinata(c1,1,spessore/2),90)

	var nodi = calcola_nodi(c1,2)

	var nn1 = NUBS(S0)(2)(nodi)(c1);
	var nn2 = NUBS(S0)(2)(nodi)(c2);
	var nn3 = NUBS(S0)(2)(nodi)(c3);

	var bezier = BEZIER(S1)([nn1,nn3,nn2]);
	var unione = COLOR(rgb(grigio))(MAP(bezier)(dominio));

	return unione;
}

//spessore da 0 a 10
function crea_cerchio_spesso(raggio,spessore){
	var dominio3D = DOMAIN([[0,1],[0,1]])([30,40]);

	var c1 = punti_controllo_cerchio(raggio)
	var c2 = proporzione(c1,(10-spessore)*10)

	var nodi = calcola_nodi(c1,2)

	var nn1 = NUBS(S0)(2)(nodi)(c1);
	var nn2 = NUBS(S0)(2)(nodi)(c2);

	var bezier = BEZIER(S1)([nn1,nn2]);
	var unione = R([1,2])(PI/2)(MAP(bezier)(dominio3D));

	return unione;
}

function crea_ruota(r,numero_raggi,prof_gomma,profondita){

	var gomma = torus(r, prof_gomma); //gomma del pneumatico
	//var cerchione = torus(r-prof_gomma, profondita-prof_gomma);
	var  cerchione = crea_cerchione(r-prof_gomma+0.02, prof_gomma)

	var raggi = function(){

		var h = r-profondita;

		// struttura del raggio del cerchione
		var prima_meta = BEZIER(S0)([[0.05,0.1, 1.28-0.4], [0.13,0.1, 0.87-0.5], [0.11,0.1, 0]])
		var seconda_meta = BEZIER(S0)([[0.25,0.1, 1.28-0.4], [0.13,0.1, 0.87-0.5], [0.19,0.1, 0]])

		var sporgenza_tr_dav = BEZIER(S0)([[0.15,0, 1.28-0.4], [0.17,0, 0.71-0.5],[0.145,0, 0]])
		var sporgenza_tr_dietro = BEZIER(S0)([[0.15,0.2, 1.28-0.4], [0.17,0.2, 0.71-0.5],[0.145,0.2, 0]])

		var unione_raggio1 = MAP(BEZIER(S1)([prima_meta,sporgenza_tr_dav,seconda_meta]))(dom2D)
		var unione_raggio2 = MAP(BEZIER(S1)([prima_meta,sporgenza_tr_dietro,seconda_meta]))(dom2D)

		var raggio_cerchione = T([0,1])([-0.15,-0.1])(STRUCT([unione_raggio1,unione_raggio2]))
		///////////////

		var modello_raggi = R([1,2])(PI/2)(raggio_cerchione);
		var rayn = STRUCT([modello_raggi])
		 for (i=(2*PI)/numero_raggi; i<2*PI; i+=(2*PI)/numero_raggi){
		 	rayn = STRUCT([rayn,R([0,1])(i)(modello_raggi)])
		}

		return rayn;
	}

	//disco centro raggi
	var disco = extrude(DISK(0.28)([64, 2]),0.01)
	//creazione del cerchione più grande
	var cerchio_sp = COLOR(rgb(grigio_cerch_scuro))(crea_cerchio_spesso(0.55,2))
	var cerc_picc = crea_cerchio_spesso(0.38,0.7)
	
	//Coloro
	raggi = raggi();

	gomma = COLOR([0,0,0])(gomma)
	raggi = COLOR(rgb([192,192,192]))(raggi)
	cerchione = R([1,2])(PI/2)(T([1])([-0.1])(cerchione))

	return R([1,2])(PI/2)(STRUCT([gomma,cerchione, raggi, disco,cerchio_sp,cerc_picc]));
}

//vale per array senza dover traslare e clonare ogni volta
function modifica_valori2(array,x,y,z){
	array[0] += x;
	array[1] += y;
	array[2] += z;	
	
	return array;
}


var x = 24
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])
var dom3D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x),INTERVALS(1)(x)])

var grigio = [239, 239, 239]
var grigio_trasp = [239, 239, 239, 80]
var grigio_trasp2 = [239, 239, 239, 90]
var grigio_scuro = [178, 178, 178]
var arancione = [255, 79, 0, 90]
var bianco = [255, 255, 240, 90]
var marrone_foca = [50, 20, 20]
var nero = [0,0,0]
var grigio_cerch_scuro = [95,95,95]
var grigio_marm = [47, 47, 47]
var rosso = [255,0,0]

var porpora = [178, 0, 0]

//RUOTE
var numero_raggi = 9;
var raggio_cilindri = 0.05
var raggio_ruota = 1.06;
var spessore_ruota = 0.3;
var spessore_gomma = 0.2;

var dimensione_totale_gomma = raggio_ruota + spessore_gomma 

var ruota_posteriore = T([0,1,2])([1.63,1,1.81-0.55])(crea_ruota(raggio_ruota,numero_raggi,spessore_gomma,spessore_ruota))
var ruota_anteriore = T([0,1,2])([1.63+5.9,1,1.81-0.55])(crea_ruota(raggio_ruota,numero_raggi,spessore_gomma,spessore_ruota))

//--------------------- SELLA -------------------//
var p1 = BEZIER(S0)([[1.31,0.4,3],[0.5,0,4],[3.39,-1,4.00], [2.40,0,1], [4.5,0.3,5],[4.34,0.8,3.2]])
var p2 = BEZIER(S0)([[1.31,1.6,3],[0.5,2,4],[3.39,3,4.00], [2.40,2,1], [4.5,1.7,5],[4.34,1.3,3.2]])
//curva interna per chiudere la parte sotto del sellino
var p3 = BEZIER(S0)([[1.31,1,3], [3.39,1,3.3], [2.40,1,0.8],[4.2,1,3.3]])

var unione_curve_sellino = T([2])([0.1-0.55])(COLOR([0,0,0])(MAP(BEZIER(S1)([p3,p1,p2,p3]))(dom2D)))
 
//--------------------- serbatoio con il prodotto --------------//
var serb1 = BEZIER(S0)([[0,0,0], [0.69,0,1.47], [1.5,0,3.4], [0,0,3.3]])
var base_serb1 = BEZIER(S1)([[0,-1.3,0],[0.9,-1.3,0],[0.9,0.2,0],[0,0.1,0],[-0.9,0.2,0],[-0.9,-1.3,0],[0,-1.3,0]])

var serb_prod = MAP(PROFILEPROD_SURFACE([serb1,base_serb1]))(dom2D)
var serbatoio = COLOR(rgb(porpora))(T([2])([-0.55])(S([0,1,2])([0.8,0.8,0.8])(T([0,1,2])([4.4,1.25,3.3])(R([2,0])(PI/2.5)(R([1,0])(-PI/2)(serb_prod))))))

//--------------------- parafango posteriore ------------------//
var pp1 = BEZIER(S0)([[0.14,0,2.04],[1.38,0, 3.81], [2.71,0, 2.99], [3.24,0, 1.97]])
var pp2 = BEZIER(S0)([[0.14,0.8,2.04],[1.38,0.8, 3.81], [2.71,0.8, 2.99], [3.24,0.8, 1.97]])

//spessore curve basse parafango
var pp3 = BEZIER(S0)([[0.64,0,2.04],[1.38,0, 3.11], [2.71,0, 2.29], [2.97,0, 1.75]])
var pp4 = BEZIER(S0)([[0.64,0.8,2.04],[1.38,0.8, 3.11], [2.71,0.8, 2.29], [2.97,0.8, 1.75]])
var unione_curve_parafango = COLOR(rgb(porpora))(T([0,1,2])([-0.1,0.6,0.4-0.55])(MAP(BEZIER(S1)([pp3,pp1,pp2,pp4]))(dom2D)))

//--------------------- parafango anteriore  ------------------//
var pa1 = BEZIER(S0)([[6.77,0, 0.83], [6.13,0, 2.55], [7.78,0, 3.3], [8.66,0, 2.79]])
var pa2 = BEZIER(S0)([[6.77,0.45, 0.83], [6.13,0.45, 2.55], [7.78,0.45, 3.3], [8.66,0.45, 2.79]])
//parte modificata per la ruota
var pa3 = BEZIER(S0)([[7.11,0, 0.84], [6.59,0, 2.04], [7.41,0, 2.4], [7.34,0, 2.24],[7.75,0, 1.9],[7.35,0, 2.75],[8.3,0, 2.5]])
var pa4 = BEZIER(S0)([[7.11,0.45, 0.84], [6.59,0.45, 2.04], [7.41,0.45, 2.4], [7.34,0.45, 2.24],[7.75,0.45, 1.9],[7.35,0.45, 2.75],[8.3,0.45, 2.5]])

var unione_curve_parafango_ant = T([0,1,2])([-0.55,0.77,-0.2])(COLOR(rgb(porpora))(MAP(BEZIER(S1)([pa3,pa1,pa2,pa4]))(dom2D)))

//-------------------- blocco motore -------------------------//

//------- blocco metallico -------
/////////--- DESTRA --- //////// 
//prima parte
var bm1 = BEZIER(S0)([[3.5,-0.1, 1.68], [3.22,0.03, 2.06], [2.9,0.03, 2.1], [3.715,-0.08, 2.03]])
var bm2 = BEZIER(S0)([[3.5,-0.1, 1.68], [3.87,-0.1, 1.9], [3.75,-0.1, 1.89], [3.715,-0.1, 2.03]])
//spessore
var bm4 = BEZIER(S0)([[3.5,-0.05, 1.68], [3.22,0.05, 2.06], [2.9,0.05, 2.1], [3.715,-0.05, 2.03]])
var bm3 = BEZIER(S0)([[3.5,-0.05, 1.68], [3.87,-0.05, 1.9], [3.75,-0.05, 1.89], [3.715,-0.05, 2.03]])

var unione_bm12 = MAP(BEZIER(S1)([bm1,bm2]))(dom2D)
var unione_bm34 = MAP(BEZIER(S1)([bm3,bm4]))(dom2D)
// 3D
var unione_bm14 = MAP(BEZIER(S1)([bm1,bm4]))(dom2D)
var unione_bm23 = MAP(BEZIER(S1)([bm2,bm3]))(dom2D)

//seconda parte
var bm5 = BEZIER(S0)([[3.25,-0.01, 2.08], [3.72,0, 2.43], [4.23,0.1, 2.68]])
var bm6 = BEZIER(S0)([[3.25,-0.01, 2.08], [4.14,-0.16, 2.05], [3.46,-0.12, 1.92], [4.23,0.1, 2.68]])
//spessore
var bm7 = BEZIER(S0)([[3.25,0.05, 2.08], [3.72,0.05, 2.43], [4.23,0.15, 2.68]])
var bm8 = BEZIER(S0)([[3.25,0.05, 2.08], [4.14,-0.1, 2.05], [3.46,-0.05, 1.92], [4.23,0.15, 2.68]])

var unione_bm56 = MAP(BEZIER(S1)([bm5,bm6]))(dom2D)
var unione_bm78 = MAP(BEZIER(S1)([bm7,bm8]))(dom2D)
// 3D
var unione_bm57 = MAP(BEZIER(S1)([bm5,bm7]))(dom2D)
var unione_bm68 = MAP(BEZIER(S1)([bm6,bm8]))(dom2D)

var unione_bm_1 = COLOR(rgb(grigio_scuro))(STRUCT([unione_bm12,unione_bm34,unione_bm14,unione_bm23]))
var unione_bm_2 = COLOR(rgb(grigio))(T([0,2])([-0.053,-0.04])(STRUCT([unione_bm56,unione_bm78,unione_bm57,unione_bm68])))

//blocco metallico in alto a sinistra completo
var unione_bm = T([0,1,2])([-0.1,0.75,-0.38])(STRUCT([unione_bm_1,unione_bm_2]))

//////--- SINISTRA ---//////
//prima parte
var bm1_s = BEZIER(S0)([[3.5,0.1, 1.68], [3.22,-0.03, 2.06], [2.9,-0.03, 2.1], [3.715,0.08, 2.03]])
var bm2_s = BEZIER(S0)([[3.5,0.1, 1.68], [3.87,0.1, 1.9], [3.75,0.1, 1.89], [3.715,0.1, 2.03]])
//spessore
var bm4_s = BEZIER(S0)([[3.5,0.05, 1.68], [3.22,-0.05, 2.06], [2.9,-0.05, 2.1], [3.715,0.05, 2.03]])
var bm3_s = BEZIER(S0)([[3.5,0.05, 1.68], [3.87,0.05, 1.9], [3.75,0.05, 1.89], [3.715,0.05, 2.03]])

var unione_bm12_s = MAP(BEZIER(S1)([bm1_s,bm2_s]))(dom2D)
var unione_bm34_s = MAP(BEZIER(S1)([bm3_s,bm4_s]))(dom2D)
// 3D
var unione_bm14_s = MAP(BEZIER(S1)([bm1_s,bm4_s]))(dom2D)
var unione_bm23_s = MAP(BEZIER(S1)([bm2_s,bm3_s]))(dom2D)

//seconda parte
var bm5_s = BEZIER(S0)([[3.25,0.01, 2.08], [3.72,0, 2.43], [4.23,-0.1, 2.64]])
var bm6_s = BEZIER(S0)([[3.25,0.01, 2.08], [4.14,0.16, 2.05], [3.46,0.12, 1.92], [4.23,-0.1, 2.64]])
//spessore
var bm7_s = BEZIER(S0)([[3.25,-0.05, 2.08], [3.72,-0.05, 2.43], [4.23,-0.15, 2.64]])
var bm8_s = BEZIER(S0)([[3.25,-0.05, 2.08], [4.14,0.1, 2.05], [3.46,0.05, 1.92], [4.23,-0.15, 2.64]])

var unione_bm56_s = MAP(BEZIER(S1)([bm5_s,bm6_s]))(dom2D)
var unione_bm78_s = MAP(BEZIER(S1)([bm7_s,bm8_s]))(dom2D)
// 3D
var unione_bm57_s = MAP(BEZIER(S1)([bm5_s,bm7_s]))(dom2D)
var unione_bm68_s = MAP(BEZIER(S1)([bm6_s,bm8_s]))(dom2D)

var unione_bm_1_s = COLOR(rgb(grigio_scuro))(STRUCT([unione_bm12_s,unione_bm34_s,unione_bm14_s,unione_bm23_s]))
var unione_bm_2_s = COLOR(rgb(grigio))(T([0,2])([-0.053,-0.04])(STRUCT([unione_bm56_s,unione_bm78_s,unione_bm57_s,unione_bm68_s])))

//blocco metallico in alto a sinistra completo
var unione_bm_s = T([0,1,2])([-0.08,0.75+0.5,-0.4])(STRUCT([unione_bm_1_s,unione_bm_2_s]))

/////--------------cilindri motore------------////
var cilindro_grande = T([0,1,2])([4.3,1.3,1.2])(R([1,2])([PI/2])(EXTRUDE([0.6])(DISK(0.5)([64, 2]))))
var cilindro_piccolo = T([0,1,2])([5.25,1.3,1.1])(R([1,2])([PI/2])(EXTRUDE([0.6])(DISK(0.27)([64, 2]))))

//struttura tra i due cerchi
var into = COLOR(rgb(grigio_scuro))(T([0,1,2])([3.7,0.78+0.47,0.7])(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[0,-0.1],[0.65,0.95],[1.6,0.4],[1.9,-0.1]])([[0,1,2],[0,2,3]]),0.5))))
// var doppio_into = STRUCT(REPLICA(2)([into,T([1])([0.5])]))
var strutt_cerchi = T([0])([-0.1])(STRUCT([cilindro_grande,cilindro_piccolo,into]))

//CUBOID
var cuboid_cerc = COLOR(rgb(grigio_trasp2))(T([0,1,2])([5,0.89,0.65])(CUBOID([0.5,0.25,0.85])))

/////--------------motore------------////
//fare tanti cilindri uno sopra l'altro, e un cilindro nero estruso che fa da sostegno
var cil_piatti = COLOR(rgb(grigio))(STRUCT(REPLICA(18)([DISK(0.2)([64, 2]),T([2])([0.04])])))
var cil_pilastro = COLOR(rgb(nero))(EXTRUDE([0.8])(DISK(0.18)([64,2])))
var cil_base_grigio = COLOR(rgba(grigio_trasp))(EXTRUDE([0.2])(DISK(0.2)([64,2])))

var cil_motore_s = T([0,1,2])([5.2,1,1.47])(R([0,2])([-PI/6])(STRUCT([cil_piatti,cil_pilastro,cil_base_grigio])))
var cil_motore_d = T([0,1,2])([5.35,1,1.47])(R([0,2])([PI/6])(STRUCT([cil_piatti,cil_pilastro,cil_base_grigio])))

////struttura sopra i cilindri------////
//primo cerchio-> cilindro estruso e ringonfiatura 

var primo_semicerchio = BEZIER(S0)([[0,-0.2,0],[0.265,-0.2,0],[0.265,0.2,0],[0,0.2,0]])
var primo_semicerchio2 = BEZIER(S0)([[0,-0.2,0],[-0.265,-0.2,0],[-0.265,0.2,0],[0,0.2,0]])
var primo_cerchio = MAP(BEZIER(S1)([primo_semicerchio,primo_semicerchio2]))(dom2D)

var secondo_semicerchio = BEZIER(S0)([[0,-0.25,0.12],[0.33125,-0.25,0.12],[0.33125,0.25,0.12],[0,0.25,0.12]])
var secondo_semicerchio2 = BEZIER(S0)([[0,-0.25,0.12],[-0.33125,-0.25,0.12],[-0.33125,0.25,0.12],[0,0.25,0.12]])
var secondo_cerchio = MAP(BEZIER(S1)([secondo_semicerchio,secondo_semicerchio2]))(dom2D)

var piccolo_cerchio = STRUCT([MAP(BEZIER(S1)([primo_semicerchio,secondo_semicerchio]))(dom2D),MAP(BEZIER(S1)([primo_semicerchio2,secondo_semicerchio2]))(dom2D),primo_cerchio,secondo_cerchio])

//estrusione cerchio piu grande
var secondo_semicerchio3 = BEZIER(S0)([[0,-0.25,0.2],[0.33125,-0.25,0.2],[0.33125,0.25,0.2],[0,0.25,0.2]])
var secondo_semicerchio4 = BEZIER(S0)([[0,-0.25,0.2],[-0.33125,-0.25,0.2],[-0.33125,0.25,0.2],[0,0.25,0.2]])
var rigonf = BEZIER(S0)([[0,-0.25,0.2],[0,-0.25,0.35],[0,0.25,0.35],[0,0.25,0.2]])
var cerchio_estruso = MAP(BEZIER(S1)([secondo_semicerchio3,secondo_semicerchio4]))(dom2D)
var gonfiat_cerchio = MAP(BEZIER(S1)([secondo_semicerchio3,rigonf,secondo_semicerchio4]))(dom2D)

var unione_cerchi = STRUCT([MAP(BEZIER(S1)([secondo_semicerchio,secondo_semicerchio3]))(dom2D),MAP(BEZIER(S1)([secondo_semicerchio2,secondo_semicerchio4]))(dom2D),cerchio_estruso,gonfiat_cerchio,piccolo_cerchio])
//posizionamento dei cerchi sopra i cilindri
var cerchi_s =T([0,1,2])([4.81,1,1.47+0.7])(R([0,2])([-PI/6])(unione_cerchi))
var cerchi_d =T([0,1,2])([5.71,1,1.47+0.69])(R([0,2])([PI/6])(unione_cerchi))

//----unione dei cilindri--> trapezi uniti
var trapezio1 = R([0,1])(-PI/9)(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[0.1,0.18],[0.15,0.18],[0.15,0.45],[0,0.45]])([[1,2,3],[0,1,3]]),0.02)))
var trapezio2 = T([0,1])([0.275,-0.0186])(R([0,1])(PI/4.5)(R([0,1])(PI)(trapezio1)))
//trapezio più piccolo superiore
var trapezio3 = R([0,1])(-PI/9)(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[0,0.45],[0.15,0.43],[0.15,0.08+0.45],[0.05,0.45+0.08]])([[1,2,3],[0,1,3]]),0.02)))
var trapezio4 = T([0,1])([0.275,-0.0186])(R([0,1])(PI/4.5)(R([0,1])(PI)(trapezio3)))
var trapezio34_rot = T([1,2])([-0.158,0.02])(R([1,2])(-PI/8.8)(STRUCT([trapezio3,trapezio4])))

var giuntura_cilindri_s = T([0,1,2])([4.83,0.94,1.83])(R([1,2])(PI/9)(R([0,2])([-PI/6])(STRUCT([trapezio1,trapezio2,trapezio34_rot]))))
var giuntura_cilindri_d = T([0,1,2])([5.45,0.88,1.95])(R([1,2])(PI/9)(R([0,2])([PI/6])(STRUCT([trapezio1,trapezio2,trapezio34_rot]))))
///stessa cosa per le giunture del lato sinistro della moto
var giuntura_sinis = T([0,1])([10.5,2])(R([0,1])(PI)(giuntura_cilindri_d))
var giuntura_des = T([0,1])([10.5,2])(R([0,1])(PI)(giuntura_cilindri_s))

///triangolo in mezzo ai due cilindri
var tri1 = BEZIER(S0)([[5.45,1, 1.88], [5.15,1, 2.54], [4.88,1, 2.65], [5.45,1, 2.8]])
var tri2 = BEZIER(S0)([[5.45,1, 1.88], [5.75,1, 2.54], [6.02,1, 2.65], [5.45,1, 2.8]])
//spessore
var tri3 = BEZIER(S0)([[5.45,1.5, 1.88], [5.15,1.5, 2.54], [4.88,1.5, 2.65], [5.45,1.5, 2.8]])
var tri4 = BEZIER(S0)([[5.45,1.5, 1.88], [5.75,1.5, 2.54], [6.02,1.5, 2.65], [5.45,1.5, 2.8]])

var unione_tri1 = MAP(BEZIER(S1)([tri2,tri1]))(dom2D)
var unione_tri2 = MAP(BEZIER(S1)([tri3,tri4]))(dom2D)

var unione_tri13 = MAP(BEZIER(S1)([tri1,tri3]))(dom2D)
var unione_tri24 = MAP(BEZIER(S1)([tri2,tri4]))(dom2D)

var unione_tri = STRUCT([unione_tri1,unione_tri2,unione_tri13,unione_tri24])

//dettagio tri, sporgenza in avanti
//tri più piccolo
var tri_p1 = BEZIER(S0)([[5.45,1, 2], [5.3,0.99, 2.44], [5,0.98, 2.55], [5.45,0.95, 2.6]])
var tri_p2 = BEZIER(S0)([[5.45,1, 2], [5.6,0.99, 2.44], [5.8,0.98, 2.55], [5.45,0.95, 2.6]])
var unione_tri_p12 = MAP(BEZIER(S1)([tri_p2,tri_p1]))(dom2D)
var unione_tri_1p1 = MAP(BEZIER(S1)([tri1,tri_p1]))(dom2D)
var unione_tri_2p2 = MAP(BEZIER(S1)([tri2,tri_p2]))(dom2D)

var tri_p3 = BEZIER(S0)([[5.45,1.5, 2], [5.3,1.51, 2.44], [5,1.52, 2.55], [5.45,1.55, 2.6]])
var tri_p4 = BEZIER(S0)([[5.45,1.5, 2], [5.6,1.51, 2.44], [5.8,1.52, 2.55], [5.45,1.55, 2.6]])
var unione_tri_p34 = MAP(BEZIER(S1)([tri_p3,tri_p4]))(dom2D)
var unione_tri_3p3 = MAP(BEZIER(S1)([tri3,tri_p3]))(dom2D)
var unione_tri_4p4 = MAP(BEZIER(S1)([tri4,tri_p4]))(dom2D)

var unione_tri_completo = T([0,1,2])([-0.2,-0.25,-0.3])(STRUCT([unione_tri,unione_tri_p12,unione_tri_1p1,unione_tri_2p2,unione_tri_p34,unione_tri_3p3,unione_tri_4p4]))

///MOTORE CILINDRI UNIONE PEZZI
var motore_cilindri = T([0,1])([-1.12,-0.15])(S([0,1,2])([1.2,1.1,1])(STRUCT([cuboid_cerc,cil_motore_s,cil_motore_d,cerchi_s,cerchi_d,giuntura_sinis,giuntura_des,unione_tri_completo,giuntura_cilindri_d,giuntura_cilindri_s])))

//-------------------- Marmitta ----------------.-------------//
var cilindro = cilynder(0.5,5.5);
//rotazione
var cilindro_ruotato = MAP([S1,S2,S0])(cilindro);
var cilindro_trasl = T([2])([0.5+1])(cilindro_ruotato)

//curve per la fine del tubo
var curv1 = BEZIER(S0)([[0,0,0],[0,0.65,0],[1,0.65,0],[1,0,0]])
var centro_curv = BEZIER(S0)([[0,0,0],[1,0,-0.6],[1,0,0]])
var curv2 = BEZIER(S0)([[0,0,0],[0,-0.65,0],[1,-0.65,0],[1,0,0]])
//creazione curva posteriore alla marmitta
var post_marmitta = MAP(BEZIER(S1)([curv1,centro_curv,curv2]))(dom2D);

var trasl_pm = T([2])([1])(MAP([S1,S2,S0])(post_marmitta))
//foro fine marmitta
var foro_fm = COLOR(rgb(nero))(T([1,2])([-0.12,1.3])(MAP([S1,S2,S0])(S([0,1,2])([0.4,0.4,0.4])(post_marmitta))));

var unione_tubo_marmitta = STRUCT([trasl_pm,cilindro_trasl,foro_fm])

var marmitta = STRUCT(REPLICA(2)([unione_tubo_marmitta, T([2])([1])]))

//rotazione della marmitta
var marmitta_ruotata = R([1,0])([PI/2])(marmitta)
var marmitta_rotaz2 = T([0,1,2])([3.5,1.7,7])(R([2,0])([PI])(marmitta_ruotata))
var marmitta_scal = S([0,1,2])([0.3,0.3,0.3])(marmitta_rotaz2)

// fine marmitta più stretta
var fine_marmitta = BEZIER(S0)([[0.37,0, 0], [0.33,0, 0.1], [0.12,0, 0.4], [0.16,0, 0.15]])
var base_fine_marm = BEZIER(S1)([[-0.5,0,0],[-0.5,0.65,0],[0.5,0.65,0],[0.5,0,0],[0.5,-0.65,0],[-0.5,-0.65,0],[-0.5,0,0]])

var prod_fine_marm = STRUCT(REPLICA(2)([T([0,1,2])([2.7,0.51,1.305])(R([0,2])([PI/2])(MAP(PROFILEPROD_SURFACE([fine_marmitta,base_fine_marm]))(dom2D))),T([2])([0.305])]))
var unione_marmitta_completa = T([2])([0.2-0.55])(STRUCT([marmitta_scal,prod_fine_marm]))

/////// LATO SINISTRO RUOTA-MOTORE ///////////////
var curva_sopra = BEZIER(S0)([[1.53,1.1, 1.3], [1.93,1.22, 1.43], [3.2,1.22, 1.45], [3.4,1.25, 1.25]])
var curva_sotto = BEZIER(S0)([[1.53,1.1, 1.15], [2.19,1.22, 0.99], [1.53,1.22, 1.04], [3.4,1.25, 1.1]])

var curva_sopra1 = BEZIER(S0)([[1.53,1.3, 1.3], [1.93,1.3, 1.43], [3.2,1.3, 1.45], [3.4,1.3, 1.25]])
var curva_sotto1 = BEZIER(S0)([[1.53,1.3, 1.15], [2.19,1.3, 0.99], [1.53,1.3, 1.04], [3.4,1.3, 1.1]])

var unione_curve_ss1 = MAP(BEZIER(S1)([curva_sopra,curva_sotto]))(dom2D);
var unione_curve_ss2 = MAP(BEZIER(S1)([curva_sopra1,curva_sotto1]))(dom2D);
var unione_curve_ss3 = MAP(BEZIER(S1)([curva_sopra,curva_sopra1]))(dom2D);
var unione_curve_ss4 = MAP(BEZIER(S1)([curva_sotto,curva_sotto1]))(dom2D);

var unione_curve_ss5 = MAP(BEZIER(S1)([BEZIER(S0)([[3.4,1.3, 1.25],[3.4,1.25, 1.25]]),BEZIER(S0)([[3.4,1.3, 1.1],[3.4,1.25, 1.1]])]))(dom2D);
var unione_curve_ss6 = MAP(BEZIER(S1)([BEZIER(S0)([[1.53,1.1, 1.3],[1.53,1.3, 1.3]]),BEZIER(S0)([[1.53,1.1, 1.22],[1.43,1.2, 1.22],[1.53,1.3, 1.22]]),BEZIER(S0)([[1.53,1.1, 1.15],[1.53,1.3, 1.15]])]))(dom2D);

var unione_pezzo_sinistro_ruota = COLOR(rgb(porpora))(STRUCT([unione_curve_ss1,unione_curve_ss2,unione_curve_ss3,unione_curve_ss4,unione_curve_ss5,unione_curve_ss6]))
var disco_unione = T([0,1,2])([1.63,1.32,1.25])(R([1,2])([PI/2])(EXTRUDE([0.3])(DISK(0.05)([64, 2]))))

//-----------parte davanti-tubi - FORCELLE--------------------------//
//tubo grandezza
var tubo_d = cilynder(0.07,2.85)

//chiusura dei tubi sopra e sotto - forcelle
var c1 = BEZIER(S0)([[-0.06,0,0],[-0.06,0.078,0],[0.06,0.078,0],[0.06,0,0]])
var centro_1 = BEZIER(S0)([[-0.06,0,0],[0,0,-0.06],[0.06,0,0]])
var c2 = BEZIER(S0)([[-0.06,0,0],[-0.06,-0.078,0],[0.06,-0.078,0],[0.06,0,0]])
var centro_2 = BEZIER(S0)([[-0.06,0,0],[0,0,0.06],[0.06,0,0]])

var sopra_forc = MAP(BEZIER(S1)([c2,centro_1,c1]))(dom2D)
var sotto_forc = T([2])([2.85])(MAP(BEZIER(S1)([c2,centro_2,c1]))(dom2D))
var tubi_chiusi = STRUCT([tubo_d,sopra_forc,sotto_forc])

//doppi tubi
var doppio_cil = COLOR(rgb(grigio))(STRUCT(REPLICA(2)([tubi_chiusi, T([1])([0.5])])))
//tubi che congiungono davanti
var cil_dav_c = COLOR(rgb(grigio))(cilynder(0.05,0.5))
//rotazione 
var cil_rot_dav = T([1,2])([0.5,2.1])(R([2,1])(PI/2)(cil_dav_c))
//cilindro basso che collega i tubi con la ruota
var cil_basso_ruota = T([1,2])([0.5,0.06])(R([2,1])(PI/2)(cil_dav_c))
//tubo congiungimento verticale davanti 
var tubo_cong = cilynder(0.05,0.54)
var tub_rot = COLOR(rgb(porpora))(T([0,1,2])([-0.03,0.23,2.1])(tubo_cong))

var unione_tubi_forcelle = STRUCT([cil_rot_dav,doppio_cil,cil_basso_ruota,tub_rot])

//posizionare i due cilindri davanti la moto
var cil_rot = R([2,0])(-PI/6)(unione_tubi_forcelle)
var forcelle = T([0,1,2])([7.55,0.75,1.8-0.55])(cil_rot)

//--------------------------- MANUBRIO -------------------------------//
var curva_unica_manubrio = BEZIER(S0)([[1.01,5, -1], [0.85,0, 1.28], [1.17,0,1.3], [2,0, 1.92], [3.5,0, 2.25], [3.2,0, 2.75], [3,0, 4.2],[2.8,0, 5.52],[2.9,0, 5.67],[2,0, 6.07],[0.63,0, 6.86], [1.01,0, 6.89], [1.01,5, 8.2]])
var curva_unica_manubrio2 = BEZIER(S0)([[0.51,5, -1], [0.35,0, 1.28], [0.67,0,1.3], [1.5,0, 1.92], [2.53,0, 2.25], [2.3,0, 2.75], [2.26,0, 4.2],[2.3,0, 5.52],[2.4,0, 5.67],[1.5,0, 6.07],[0.13,0, 6.86], [0.51,0, 6.89], [0.51,5, 8.2]])
//parte sotto 
var curva_unica_manubrio3 = BEZIER(S0)([[1.01,6, -1], [0.85,1, 1.28], [1.17,1,1.3], [2,1, 1.92], [3.5,1, 2.25], [3.2,1, 2.75], [3,1, 4.2],[2.8,1, 5.52],[2.9,1, 5.67],[2,1, 6.07],[0.63,1, 6.86], [1.01,1, 6.89], [1.01,5, 8.2]])
var curva_unica_manubrio4 = BEZIER(S0)([[0.51,6, -1], [0.35,1, 1.28], [0.67,1,1.3], [1.5,1, 1.92], [2.53,1, 2.25], [2.3,1, 2.75], [2.26,1, 4.2],[2.3,1, 5.52],[2.4,1, 5.67],[1.5,1, 6.07],[0.13,1, 6.86], [0.51,1, 6.89], [0.51,5, 8.2]])

var manubrio_unione = MAP(BEZIER(S1)([curva_unica_manubrio,curva_unica_manubrio2,curva_unica_manubrio4,curva_unica_manubrio3,curva_unica_manubrio]))(dom2D)

//aggiunta di manici
var manico = cilynder(0.06,0.5)
// var manico_rot = R([1,2])([PI/2])(manico_destro)
var curv1 = BEZIER(S0)([[-0.06,0,0],[-0.06,0.078,0],[0.06,0.078,0],[0.06,0,0]])
var centro_curv = BEZIER(S0)([[-0.06,0,0],[0,0,-0.06],[0.06,0,0]])
var curv2 = BEZIER(S0)([[-0.06,0,0],[-0.06,-0.078,0],[0.06,-0.078,0],[0.06,0,0]])

var centro_curv2 = BEZIER(S0)([[-0.06,0,0],[0,0,0.06],[0.06,0,0]])
//chiusura della maniglia
var davanti_cilindro = MAP(BEZIER(S1)([curv2,centro_curv,curv1]))(dom2D)
var dietro_cilindro = T([2])([0.5])(MAP(BEZIER(S1)([curv2,centro_curv2,curv1]))(dom2D))

var maniglia = COLOR(rgb([47, 47, 47]))(STRUCT([davanti_cilindro,manico,dietro_cilindro]))

//manico destro
var manico_sinistro = T([0,1,2])([-1.2,1.75,-0.15])(R([0,1])(PI/2.7)(R([1,2])([PI/2])(maniglia)))
var manico_destro = T([0,1,2])([-1.2,-0.3,-0.15])(R([0,1])(-PI/3)(R([1,2])([-PI/2])(maniglia)))

//posizionare il manubrio 
var rot_manubr = R([0,2])(PI/2)(R([1,2])(-PI/2)(manubrio_unione))
var manub_scal = S([0,1,2])([0.2,0.2,0.2])(rot_manubr)

var manubrio_completo = STRUCT([manico_destro,manub_scal,manico_sinistro])
var manubrio_trasl = T([0,1,2])([6.26,0.23,4.62-0.55])(manubrio_completo)

//////------------------- TACHIMETRO ------------------------////////
//parte bianca interna
var t1 = BEZIER(S0)([[1.98,0, 3.24], [2.42,0, 5.17], [3.14,0, 4.75], [5.12,0, 4.88], [6.98,0, 4.75],[7.7,0, 5.17],[8.14,0, 3.24]])
var t2 = BEZIER(S0)([[1.98,0, 3.24], [5.59,0, 1.82],[4.67,0, 1.85], [8.14,0, 3.24]])

var unionet1 = COLOR([255,255,255])(MAP(BEZIER(S1)([t1,t2]))(dom2D))
//---- -----//
//spessore 1
var t3 = BEZIER(S0)([[1.98-0.7,0.4, 3.24], [2.42-0.7,0.4, 5.17+0.1], [3.14-0.7,0.4, 4.75+0.1], [5.12,0.4, 4.88+0.1], [6.98+0.7,0.4, 4.75+0.1],[7.7+0.7,0.4, 5.17+0.1],[8.14+0.7,0.4, 3.24]])
var t4 = BEZIER(S0)([[1.98-0.7,0.4, 3.24], [5.59,0.4, 1.82-0.2],[4.67,0.4, 1.85-0.2], [8.14+0.7,0.4, 3.24]])

var unionet2 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t1,t3]))(dom2D))
var unionet3 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t2,t4]))(dom2D))

//spessore 2
var t5 = BEZIER(S0)([[1.98-0.9,0.4, 3.24], [2.42-0.9,0.4, 5.17+0.2], [3.14-0.9,0.4, 4.75+0.2], [5.12,0.4, 4.88+0.2], [6.98+0.9,0.4, 4.75+0.2],[7.7+0.9,0.4, 5.17+0.2],[8.14+0.9,0.4, 3.24]])
var t6 = BEZIER(S0)([[1.98-0.9,0.4, 3.24], [5.59,0.4, 1.82-0.3],[4.67,0.4, 1.85-0.3], [8.14+0.9,0.4, 3.24]])

var unionet5 = COLOR(rgb(grigio_marm))(MAP(BEZIER(S1)([t5,t3]))(dom2D))
var unionet6 = COLOR(rgb(grigio_marm))(MAP(BEZIER(S1)([t6,t4]))(dom2D))
//spessore 3
var t7 = BEZIER(S0)([[1.98-1.3,0.1, 3.24], [2.42-1.3,0.1, 5.17+0.4], [3.14-1.3,0.1, 4.75+0.4], [5.12,0.1, 4.88+0.4], [6.98+1.3,0.1, 4.75+0.4],[7.7+1.3,0.1, 5.17+0.4],[8.14+1.3,0.1, 3.24]])
var t8 = BEZIER(S0)([[1.98-1.3,0.1, 3.24], [5.59,0.1, 1.82-0.3],[4.67,0.1, 1.85-0.3], [8.14+1.3,0.1, 3.24]])

var unionet7 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t5,t7]))(dom2D))
var unionet8 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t6,t8]))(dom2D))

//spessore 4
var t9 = BEZIER(S0)([[1.98+1.2,0.1-3, 3.24], [2.42+1.2,0.1-3, 5.17+0.4], [3.14+1.2,0.1-3, 4.75+0.4], [5.12,0.1-3, 4.88+0.4], [6.98-1.2,0.1-3, 4.75+0.4],[7.7-1.2,0.1-3, 5.17+0.4],[8.14-1.2,0.1-3, 3.24]])
var t10 = BEZIER(S0)([[1.98+1.2,0.1-3, 3.24], [5.59,0.1-2, 1.82-0.3],[4.67,0.1-2, 1.85-0.3], [8.14-1.2,0.1-3, 3.24]])
var t11 = BEZIER(S0)([[1.98+1.2,0.1-3, 3.24],[5.06,-2.9-3,3.24],[8.14-1.2,0.1-3, 3.24]])

var unionet9 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t9,t7]))(dom2D))
var unionet10 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t10,t8]))(dom2D))
var unionet11 = COLOR(rgb(grigio_scuro))(MAP(BEZIER(S1)([t10,t11,t9]))(dom2D))

//vetro trasparente tachimetro
var vetro = COLOR(rgba([255,255,255,50]))(T([1])([-0.09])(MAP(BEZIER(S1)([t3,t4]))(dom2D)))

/// lancetta
var linea_kmh = COLOR(rgb(nero))(MAP(BEZIER(S0)([[6.73,0.01, 2.79], [6.89,0.01, 3.92], [5.19,0.01, 4.92], [3.82,0.01, 3.91]]))(domain))

var disco_sotto_lancetta = T([0,1,2])([5.2,0.02,2.53])(R([1,2])(PI/2)(EXTRUDE([0.03])(DISK(0.15)([64, 2]))))
var lancetta = COLOR(rgb(rosso))(T([1])([0.03])(R([1,2])(PI/2)(extrude(SIMPLICIAL_COMPLEX([[5.22,2.5],[5.22,2.6],[6.72,2.92]])([[0,1,2]]),0.01))))

//segnali luci
var orologio = COLOR(rgb([139,144,112]))(T([0,1,2])([2.7,0.01,3.3])(R([1,2])(PI/2)(CUBOID([1.2,0.4,0.1]))))
var luce_rossa = COLOR(rgb([217,22,22]))(T([0,1,2])([7,0.01,4.2])(R([1,2])(PI/2)(EXTRUDE([0.03])(DISK(0.18)([64,2])))))
var luce_verde = COLOR(rgb([34,165,68]))(T([0,1,2])([7.2,0.01,3.7])(R([1,2])(PI/2)(EXTRUDE([0.03])(DISK(0.18)([64,2])))))

var tac_unione = R([0,1])([PI/2])(STRUCT([unionet1,linea_kmh,disco_sotto_lancetta,lancetta,orologio,luce_verde,luce_rossa,vetro,unionet2,unionet3,unionet5,unionet6,unionet7,unionet8,unionet9,unionet10,unionet11]))
var tachimetro = T([0,1,2])([5.85,0.6,3.45])(R([0,2])([PI/9])(S([0,1,2])([0.08,0.08,0.08])(tac_unione)))

//---------------------------- LUCI -------------------------//
//frecce dietro
var curva1_freccia = BEZIER(S0)([[0,0, 2], [0.28,0, 2], [1,0, 0.89], [1,0, 0]])
var base_freccia = BEZIER(S1)([[0,-1.1,0],[1.5,-1.1,0],[1.5,1.1,0],[0,1.1,0]])
var curva2_freccia = BEZIER(S0)([[0,0, 2], [-0.28,0, 2], [-1,0, 0.89], [-1,0, 0]])

var freccia_meta1 = MAP(PROFILEPROD_SURFACE([curva1_freccia,base_freccia]))(dom2D)
var freccia_meta2 = MAP(PROFILEPROD_SURFACE([curva2_freccia,base_freccia]))(dom2D)
var freccia_contorno = COLOR(rgb(grigio))(STRUCT([freccia_meta1,freccia_meta2]))

//parte davanti illuminata arancione
var cerchio = T([2])([-0.33])(R([0,1])(-PI/2)(EXTRUDE([0.4])(DISK(0.97)([64, 2]))))
var base_luce = R([0,1])(-PI/2)((DISK(1.1)([64, 2])))
var luce = COLOR(rgba(arancione))(STRUCT([cerchio,base_luce]))

var freccia = S([0,1,2])([0.15,0.15,0.15])(R([0,2])([PI/2])(STRUCT([freccia_contorno,luce])))
var doppie_frecce_dietro = T([0,1,2])([0.5,0.48,2.35-0.55])(STRUCT(REPLICA(2)([freccia, T([1])([1.05])])))
//frecce davanti al manubrio -- bisogna ruotarle
var doppie_frecce_davanti = T([0,1,2])([7,1.93,1.6-0.55])(R([0,1])(PI)(T([0,1,2])([0.5,0.48,2.35])(STRUCT(REPLICA(2)([freccia, T([1])([0.9])])))))

/////--- fanalino avanti ---////
//sporgenza avanti fanalino
var curva1_sporg = BEZIER(S0)([[0,-0.5,0],[0,-0.5,0.65],[0,0.5,0.65],[0,0.5,0]])
var curva2_sporg = BEZIER(S0)([[0.05,-0.5,0],[0.35,0,0.95],[0.05,0.5,0]])

var sporgenza = COLOR(rgb(grigio))(MAP(BEZIER(S1)([curva1_sporg,curva2_sporg]))(dom2D))
var semicircle_basso = COLOR(rgb(grigio))(R([0,2])([PI/2])(R([0,1])(-PI/2)(extrude(semicircle(0.5),0.05))))

var luce_bianca = R([0,2])(-PI/2)(COLOR(rgba(bianco))(EXTRUDE([0.1])(DISK(0.49)([24, 2]))))

var fanalino_rot = S([0,1,2])([0.45,0.45,0.45])(R([0,2])(-PI/2)(freccia_contorno))
var fanalino_avanti = T([0,1,2])([6.85,1,4-0.55])(S([0,1,2])([0.68,0.7,0.79])(STRUCT([fanalino_rot,sporgenza,semicircle_basso,luce_bianca])))

//------------------------- TUBI STRUTTURA --------------------------//

var curva_1 = BEZIER(S0)([[3.24,0, 2.22], [4.17,0+0.1, 2.84], [4.7,0+0.15, 2.91], [5.41,0.2, 3.23]]) 
var curva_2 = BEZIER(S0)([[3.24,0.1, 2.22+0.15], [4.17,0.1+0.1, 2.84+0.15], [4.7,0.1+0.15, 2.91+0.15], [5.41,0.1+0.2, 3.23+0.15]])
var curva_3 = BEZIER(S0)([[3.24,0.2, 2.22], [4.17,0.2+0.1, 2.84], [4.7,0.2+0.15, 2.91], [5.41,0.2+0.2, 3.23]])
var curva_4 = BEZIER(S0)([[3.24,0.1, 2.22-0.15], [4.17,0.1+0.1, 2.84-0.15], [4.7,0.1+0.15, 2.91-0.15], [5.41,0.1+0.2, 3.23-0.15]])
var tubo_Scal = S([0,1,2])([1.2,1,1.3])(MAP(BEZIER(S1)([curva_1,curva_2,curva_3,curva_4,curva_1]))(dom2D))
var unione_tubo_serbatoio_destro = T([0,1,2])([-0.95,0.7,-0.72-0.55])(COLOR(rgb(porpora))(tubo_Scal))
var unione_tubo_serbatoio_sinistro = T([0,1])([-0.055,1.03])(R([1,0])(6.1)(unione_tubo_serbatoio_destro))

// TUBO da manubrio fino a sotto al motore //
var tubo_m1 = BEZIER(S0)([[2.82,0,0.66], [6.57,0, 0.8], [4.92,0.1, 0.03], [6.27,0.3, 3.2]])
var tubo_m2 = BEZIER(S0)([[2.82,0.2,0.66+0.15], [6.57,0.2, 0.8+0.15], [4.82,0.2, 0.03+0.15], [6.07,0.5, 3.2+0.15]])
var tubo_m3 = BEZIER(S0)([[2.82,0.2,0.66], [6.57,0.2, 0.8], [4.92,0.2, 0.03], [6.27,0.5, 3.15]])
var tubo_m4 = BEZIER(S0)([[2.82,0.2,0.66-0.15], [6.57,0.2, 0.8-0.15], [5.02,0.2, 0.03-0.15], [6.27,0.5, 3.15-0.15]])

//riempimento fine tubo 
var riemp = T([0,1,2])([2.82,0.16,0.66])(S([0,1,2])([1,0.9,1.1])(R([0,2])([PI/2])(DISK(0.05)([64, 2]))))

var tubo_compl = T([0,1,2])([0.25,0.5,0.45-0.55])(COLOR(rgb(porpora))(STRUCT([MAP(BEZIER(S1)([tubo_m3,tubo_m4,tubo_m1,tubo_m2,tubo_m3]))(dom2D),riemp])))

var tubo_adiac = T([1,2])([0.82,-0.1])(R([1,2])(0.25)(tubo_compl))

//---------- SPESSORE TRA RUOTA E MOTORE ---------------//////////////////
//spessore destro
var t_r_m = BEZIER(S0)([[3.1,0.75, 1.9], [2.99,0.55, 1.81], [3.58,0.55, 1.42], [3.22,0.6, 0.68]])
var t_r_spessore = BEZIER(S0)([[3.24,0.75, 2], [3.74,0.55, 1.23], [3.98,0.55, 1.66], [3.55,0.55, 0.86],[3.46,0.55, 0.78],[3.67,0.6, 0.68]])
//--------------------------y--------------------//
var t_r_m2 = BEZIER(S0)([[3.1,0.8, 1.9], [2.99,0.55, 1.81], [3.58,0.7, 1.42], [3.22,0.7, 0.68]])
var t_r_spessore2 = BEZIER(S0)([[3.24,0.8, 2], [3.74,0.5, 1.23], [3.98,0.65, 1.66], [3.55,0.65, 0.86],[3.46,0.65, 0.78],[3.67,0.65, 0.68]])

//spessore sinistro
var t_r_m_s = BEZIER(S0)([[3.1,0.35, 1.9], [2.99,0.55, 1.81], [3.58,0.55, 1.42], [3.22,0.5, 0.68]])
var t_r_spessore_s = BEZIER(S0)([[3.24,0.35, 2], [3.74,0.55, 1.23], [3.98,0.45, 1.66], [3.55,0.55, 0.86],[3.46,0.55, 0.78],[3.67,0.5, 0.68]])
//--------------------------y-------------------//
var t_r_m2_s = BEZIER(S0)([[3.1,0.3, 1.9], [2.99,0.55, 1.81], [3.58,0.4, 1.42], [3.22,0.45, 0.68]])
var t_r_spessore2_s = BEZIER(S0)([[3.24,0.3, 2], [3.74,0.5, 1.23], [3.98,0.35, 1.66], [3.55,0.45, 0.86],[3.46,0.45, 0.78],[3.67,0.45, 0.68]])

//----- destra -----//// 
var unione_spessore = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m,t_r_spessore]))(dom2D))
var unione_spessore2 = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m2,t_r_spessore2]))(dom2D))
//spessore 3D
var unione_lati1 = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m,t_r_m2]))(dom2D))
var unione_lati2 = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_spessore,t_r_spessore2]))(dom2D))

var spessore_completo_destro = T([0,1,2])([0.5,0.16,0.072])(COLOR(rgb(porpora))(STRUCT([unione_spessore,unione_spessore2,unione_lati1,unione_lati2])))

////----- sinistra----////
var unione_spessore_s = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m_s,t_r_spessore_s]))(dom2D))
var unione_spessore2_s = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m2_s,t_r_spessore2_s]))(dom2D))
//spessore 3D
var unione_lati1_s = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_m_s,t_r_m2_s]))(dom2D))
var unione_lati2_s = S([0,1,2])([0.8,0.8,0.8])(MAP(BEZIER(S1)([t_r_spessore_s,t_r_spessore2_s]))(dom2D))

////// chiusura posteriore NERA
var t_r_m_2 = BEZIER(S0)([[3.1,0.3+0.9, 1.9], [2.99,0.55+1, 1.88], [3.58,0.4+1, 1.49], [3.25,0.45+1, 0.7]])
var unione_chiusura_post = COLOR(rgb(nero))(S([0,1,2])([0.8,0.8,0.8])(T([0,1,2])([0.66,0.2,0.1])(MAP(BEZIER(S1)([t_r_m2,t_r_m_2]))(dom2D))))

var spessore_completo_sinistra = T([0,1,2])([0.51,0.95,0.074])(COLOR(rgb(porpora))(STRUCT([unione_spessore_s,unione_spessore2_s,unione_lati1_s,unione_lati2_s])))

//------------------TUBI unione forcelle-serbatoio------------------ //
var tubo_fs = COLOR(rgb(porpora))(cilynder(0.05,0.8))
var tubo_1fs = T([0,1,2])([5.8,1,3.1])(R([0,2])(PI/3)(tubo_fs))
var tubo_2fs = T([0,1,2])([5.7,1,3])(R([0,2])(PI/2.15)(tubo_fs))

////chiusura sotto + cuboid nero ---- MOTORE ------------///////////////
var cub_sottostante = COLOR(rgb(nero))(T([0,1,2])([3.11,0.7,0.56])(CUBOID([2.39,0.63,0.07])))
//chiusura anteriore
var curva_chius1 = BEZIER(S0)([[5.21,0.68, 0.61], [5.89,0.7, 0.45], [5.84,0.8, 1.36], [6.2,0.9, 2.22]])
var curva_chius2 = BEZIER(S0)([[5.21,1.35, 0.61], [5.89,1.35, 0.45], [5.84,1.27, 1.36], [6.2,1.15, 2.22]])
//cilindri-chiusura
var c_c1 =  BEZIER(S0)([[5.5,0.79, 1.17], [5.49,0.84, 0.45], [6.2,0.9, 2.22]])
var c_c2 =  BEZIER(S0)([[5.5,1.19, 1.17], [5.49,1, 0.45], [6.2,1.15, 2.22]])

var unione_cc1 = MAP(BEZIER(S1)([c_c1,c_c2]))(dom2D)
var unione_cc2 = MAP(BEZIER(S1)([c_c1,curva_chius1]))(dom2D)
var unione_cc3 = MAP(BEZIER(S1)([c_c2,curva_chius2]))(dom2D)

var unione_curv_chius = COLOR(rgb(nero))(STRUCT([MAP(BEZIER(S1)([curva_chius1,curva_chius2]))(dom2D),unione_cc1,unione_cc2,unione_cc3]))

var cuboid_nero_motore = COLOR(rgb(nero))(T([0,1,2])([3.28,0.79,0.59])(CUBOID([0.55,0.4,1])))
var cuboid_nero_ant =  COLOR(rgb(nero))(T([0,1,2])([5.28,0.79,0.57])(CUBOID([0.25,0.4,0.6])))

///---------- TUBI MARMITTA MOTORE -----------///
function ruota_cerchio_nubs(raggio,d,h,punti){
		
	/////////////////////////////////////
	var lung_array = punti.length-1 //17 e' la lunghezza ma a me serve la lunghezza - 1
	
		//copio l'array dei punti in modo da non modificare l'originale
	var cerchio_r = new Array();
		for(var i=0;i<punti.length;i++){
			cerchio_r[i] = copia_array(punti[i])
		}

//misure ricavate per arrotondare la curva
	var increm1 = (0.18*raggio)/3
	var increm2 = (0.2*raggio)/3
	var increm3 = (0.15*raggio)/3
	var increm4 = (0.13*raggio)/3

		if(h>0) {
				var y_tot = h+d;
				var increm = h/(lung_array/2) // 1.2/8
			//primo e ultimo valore dell'array dei punti
			//esempio con l'inizio del secondo tubo con la stessa z della fine del primo tubo
			var primo = modifica_valori2(cerchio_r[0],0,d+increm3,d+(increm+increm2))
			var ultimo = modifica_valori2(cerchio_r[lung_array],0,d+increm3,d+(increm+increm2))

			//elemento centrale dell'array che deve essere alto h essendo il piu alto punto
			var centro = modifica_valori2(cerchio_r[lung_array/2],0,y_tot+increm1*8,y_tot+increm1*8)
			
				//scorro l'array e modifico i valori
				for(var k = 1; k < lung_array/2; k++){			
				var supporto1 = modifica_valori2(cerchio_r[k],0,d+(increm+increm2)*k,(d+(increm+increm2)*k))
				var supporto2 = modifica_valori2(cerchio_r[lung_array-k],0,d+(increm+increm2)*k,(d+(increm+increm2)*k))
				}
			}

		else if(h === 0){
			var y_tot = h+d;
			var increm = h/(lung_array/2) // 1.2/8
			var meta = lung_array/4
			//esempio con l'inizio del secondo tubo con la stessa z della fine del primo tubo
			var centro1 = modifica_valori2(cerchio_r[meta],increm4,increm4,0)
		
			//elemento centrale dell'array che deve essere alto h essendo il piu alto punto
			var centro2 = modifica_valori2(cerchio_r[lung_array-meta],increm4*7.5,increm4*7.5,0)
			
				//scorro l'array e modifico i valori
			for(var k = 1; k <= lung_array/4; k++){
			var supporto1 = modifica_valori2(cerchio_r[meta-k],(increm4)*k,increm4*k,0)
			var supporto2 = modifica_valori2(cerchio_r[meta+k],(increm4)*k,increm4*k,0)
			}

			var supp_lung = modifica_valori2(cerchio_r[lung_array],(increm4)*meta,increm4*meta,0)

			for(var k =meta+1 ; k < lung_array/2; k++){
			var supporto1 = modifica_valori2(cerchio_r[k+meta],(increm4)*k,increm4*k,0) //mi riparte da 1-2-3
			var supporto2 = modifica_valori2(cerchio_r[20-k],(increm4)*k,increm4*k,0) //mi riparte da 7-6-5
			}
		}

		else {
			if(d<0)
				var i = -1
			else 
				var i = 1

			var y_tot = -h+d;
			var increm = -h/(lung_array/2) // 1.2/8
			//primo e ultimo elemento dell'array che devono essere alti h essendo il punto piu alto 
			var primo = modifica_valori2(cerchio_r[0],0,increm4*7.5*i,-(increm4*8)+increm2)
			var ultimo = modifica_valori2(cerchio_r[lung_array],0,increm4*7.5*i,-(increm4*8)+increm2)

			var meta = modifica_valori2(cerchio_r[lung_array/2],0,increm4*i,-(increm4))
		
				for(var k = 1; k < lung_array/2; k++){		
				var supporto1 = modifica_valori2(cerchio_r[lung_array/2-k],0,(increm4)*k*i,-(increm4*k))
				var supporto2 = modifica_valori2(cerchio_r[lung_array/2+k],0,(increm4)*k*i,-(increm4*k))
				}
			}

	return cerchio_r;
}

function tubi_uniti(){
	//misure primo tubi marmitta motore
	var larghezza_tubo = 0.7
	var larghezza_tubob = 1
	var lunghezza_tubo1 = 6
	var lunghezza_tubo2 = 2
	var angolo = 30
	// var coordinata = 0
	var lunghezza_tubo3 = 14
	var angolo2 = 70
	var lunghezza_tubo4 = 12.7

	//in base alla coordinata possiamo scegliere in che direzione mandare il tubo
	var dominio = DOMAIN([[0,1],[0,1]])([30,40]);
	var distanza_y_tubo = 1;
	////----- TUBO 1 -----////
	//posso farlo anche con disk
	var inizio_1 = punti_controllo_cerchio(larghezza_tubo)
	var fine_1 = cambia_valore_coordinata(inizio_1,1,lunghezza_tubo1)

	// che ho definito i punti di controllo dei due tubi li devo creare
	var nodi = calcola_nodi(inizio_1,2)

	var nubs1 = NUBS(S0)(2)(nodi)(inizio_1);
	var nubs2 = NUBS(S0)(2)(nodi)(fine_1);

	///////----- TUBO 2 ------/////
	///////---- calcolo dell'angolo del secondo tubo
	var distanza_z_tubo2 = (angolo/45);

	var angolo_radianti = (angolo*2*PI)/360
	//mi servono le distranze per poter trovare anche il cerchio finale del secondo tubo -- regole di trigonometria per trovare i cateti
	var y_2 = lunghezza_tubo2 * Math.cos(angolo_radianti) //cateto 1 base
	var z_2 = lunghezza_tubo2 * Math.sin(angolo_radianti) //cateto 2 altezza

	var nuovo_cerchio = punti_controllo_cerchio(larghezza_tubob)
	var inizio_p = cambia_valore_coordinata(nuovo_cerchio,1,distanza_y_tubo+lunghezza_tubo1) //traslo di 1
	var inizio_2 = cambia_valore_coordinata(ruota_cerchio_nubs(larghezza_tubob,distanza_y_tubo,distanza_z_tubo2,inizio_p),2,z_2)
	var fine_2 = modifica_valori(inizio_2,0,y_2,z_2)

	var nubs3 = NUBS(S0)(2)(nodi)(inizio_2);
	var nubs4 = NUBS(S0)(2)(nodi)(fine_2);

	///--------------unione primo e secondo-------------------///////
	// mi serve un array di nubs per creare poi la curva in bezier

	var array_bezier = new Array();
	//l'array e' fatto da 4 curve che rappresentano i tubi e 4 di rotazione del tubo
	//tubo 1
	array_bezier[0] = nubs1;
	array_bezier[1] = nubs2;

	var incremy = distanza_y_tubo/5
	var incremz = distanza_z_tubo2/5

	//lunghezza array, ovvero quante nubs mi servono per la curva
	var fine_1b = cambia_valore_coordinata(punti_controllo_cerchio(larghezza_tubob),1,lunghezza_tubo1)
	fine_1b = cambia_valore_coordinata(fine_1b,2,-1)

		for(i=1;i<5;i++){
		var r_i = ruota_cerchio_nubs(larghezza_tubob,incremy*i,incremz*i,fine_1b);
		array_bezier[i+1] = NUBS(S0)(2)(nodi)(r_i);
	}

	//tubo 2
	array_bezier[6] = nubs3;
	array_bezier[7] = nubs4;

	///////----- TERZO TUBO ------///
	///devo creare il cerchio in base alla coordinata passata come parametro
	//con y vai nella stessa direzione

	var cerchi = new Array()
	var inizio_3b = punti_controllo_cerchio(larghezza_tubob)

	cerchi[0] = modifica_valori(inizio_3b,1,lunghezza_tubo1+lunghezza_tubo2+distanza_y_tubo+larghezza_tubo*3.6,lunghezza_tubo2*2) //la fine del primo cerchio
	
	for(i=1;i<5;i++){
		var r_i = ruota_cerchio_nubs(larghezza_tubob,-incremy*i,-incremz*i,cerchi[i-1]);
		array_bezier[i+7] = NUBS(S0)(2)(nodi)(r_i);
		cerchi[i] = r_i //aggiungo i punti nell'array perche' mi serve l'ultimo memorizzato
	}
		
	var inizio_3 = modifica_valori(punti_controllo_cerchio(0.85),1,lunghezza_tubo1+lunghezza_tubo2+distanza_y_tubo+larghezza_tubo*4,lunghezza_tubo2*2)
	var fine_3a = modifica_valori(punti_controllo_cerchio(larghezza_tubob),1,lunghezza_tubo1+lunghezza_tubo2+distanza_y_tubo+larghezza_tubo*4+lunghezza_tubo3/2,lunghezza_tubo2*2-1)
	
	var fine_3b = modifica_valori(fine_3a,-0.5,lunghezza_tubo3/2,+0.5)	

	var nubs5 = NUBS(S0)(2)(nodi)(inizio_3);
	var nubs6 = NUBS(S0)(2)(nodi)(fine_3a);
	var nubs7 = NUBS(S0)(2)(nodi)(fine_3b);

	//tubo 3
	array_bezier[12] = nubs5;
	array_bezier[13] = nubs6;
	array_bezier[14] = nubs7;

	////////// ------------ TUBO 4 ------------////////////////

	var cerchi2 = new Array()
	cerchi2[0] = modifica_valori(punti_controllo_cerchio(larghezza_tubob),+1,lunghezza_tubo1+lunghezza_tubo2+distanza_y_tubo+larghezza_tubo*4+lunghezza_tubo3,lunghezza_tubo2*2-0.5)

	for(i=1;i<5;i++){
		var r_i = ruota_cerchio_nubs(larghezza_tubob,incremy*i,-incremz*i,cerchi2[i-1]);
		array_bezier[14+i] = NUBS(S0)(2)(nodi)(r_i);
		cerchi2[i] = r_i //aggiungo i punti nell'array perche' mi serve l'ultimo memorizzato
	}
	
	// //mi servono le distanze per poter trovare anche il cerchio finale del secondo tubo -- regole di trigonometria per trovare i cateti
	var y_4 = lunghezza_tubo4 * Math.cos((70*2*PI)/360) //cateto 1 base
	var z_4 = lunghezza_tubo4 * Math.sin((70*2*PI)/360) //cateto 2 altezza

	
	var inizio_4 = modifica_valori(cerchi2[cerchi2.length-1],+0.5,0.5,-0.5);
	var fine_4 = modifica_valori(inizio_4,0,y_4,-z_4)
// 
	var nubs7 = NUBS(S0)(2)(nodi)(inizio_4);
	var nubs8 = NUBS(S0)(2)(nodi)(fine_4);

	array_bezier[19] = nubs7;
	array_bezier[20] = nubs8;

//// -------------TUBO 5 --------- ////////
	//creo un nuovo array per farci una seconda unione in modo da non rovinare le curve precedenti
	var array_bezier2 = new Array()
	//nell'array, il primo elemento e' l'ultimo cerchio generato in array_bezier
	array_bezier2[0] = NUBS(S0)(2)(nodi)(fine_4);

	var cerchi3 = new Array()
	cerchi3[0] = modifica_valori(punti_controllo_cerchio(larghezza_tubob),1.5,32,-11)

	for(i=1;i<5;i++){
		var r_i = ruota_cerchio_nubs(larghezza_tubob,incremy*i,0,cerchi3[i-1]);
		array_bezier2[i] = NUBS(S0)(2)(nodi)(r_i);
		cerchi3[i] = r_i //aggiungo i punti nell'array perche' mi serve l'ultimo memorizzato
	}

	var inizio_5 = modifica_valori(punti_controllo_cerchio_assi_y_z(larghezza_tubo),3,32.8,-10.9)
	var fine_5 = modifica_valori(inizio_5,1.5,0,0)
	
	var nubs1b = NUBS(S0)(2)(nodi)(inizio_5);
	var nubs2b = NUBS(S0)(2)(nodi)(fine_5);

	array_bezier2[5] = nubs1b;
	array_bezier2[6] = nubs2b;

	//////------ SECONDO TUBO MARMITTA MOTORE
	////misure uguali in parte al primo tubo 
	var array_bezier3 = new Array();

	for(var i=0;i<8;i++){
			array_bezier3[i] = array_bezier[i];
		}

	/////// tubo piu' grande uguale
	var array_bezier4 = new Array();

	for(var i=2;i<array_bezier3.length-1;i++){
			array_bezier4[i] = array_bezier3[i];
		}
	
	var inizio_0 = punti_controllo_cerchio(larghezza_tubob+0.1)
	var fine_0 = cambia_valore_coordinata(inizio_0,1,lunghezza_tubo1-0.3)

	array_bezier4[0] = NUBS(S0)(2)(nodi)(inizio_0);
	array_bezier4[1] = NUBS(S0)(2)(nodi)(fine_0);
	
	var z_2b = (lunghezza_tubo2+5) * Math.sin(angolo_radianti)

	var fine_7 = modifica_valori(inizio_2,0,y_2,z_2b)

	array_bezier4[7] = NUBS(S0)(2)(nodi)(fine_7);
	
	///parte avanti e dietro più stretta
	var array_bezier5 = new Array();

	var inizio_stretto = cambia_valore_coordinata(punti_controllo_cerchio(larghezza_tubo-0.4),1,-1)

	array_bezier5[0] = NUBS(S0)(2)(nodi)(inizio_stretto);
	array_bezier5[1] = NUBS(S0)(2)(nodi)(inizio_0);

	var array_bezier6 = new Array();
	var z_2c = (lunghezza_tubo2+6) * Math.sin(angolo_radianti)

	// var iniz_p = cambia_valore_coordinata(punti_controllo_cerchio(larghezza_tubo-0.4),1,distanza_y_tubo+lunghezza_tubo1) //traslo di 1
	// var inizio_8 = cambia_valore_coordinata(ruota_cerchio_nubs(larghezza_tubo-0.4,distanza_y_tubo+1,distanza_z_tubo2,iniz_p),2,z_2c)

	var fine_8 = modifica_valori(punti_controllo_cerchio(larghezza_tubo-0.2),0,y_2+13,z_2c+3)

	array_bezier6[0] = NUBS(S0)(2)(nodi)(fine_7);
	array_bezier6[1] = NUBS(S0)(2)(nodi)(fine_8);

	//////////////////////--------- unione curve
	var bez = BEZIER(S1)(array_bezier);
	var bez2 = BEZIER(S1)(array_bezier2);
	var bez3 = BEZIER(S1)(array_bezier3);
	var bez4 = BEZIER(S1)(array_bezier4);
	//parte davanti del tubo piu' stretta
	var bez5 = BEZIER(S1)(array_bezier5);
	var bez6 = BEZIER(S1)(array_bezier6);

	var unione_1 = MAP(bez)(dominio);
	var unione_2 = MAP(bez2)(dominio);
	var unione_3 = MAP(bez3)(dominio);
	var unione_4 = T([1,2])([8.15,1.33])(R([1,2])(PI/4.3)(R([0,2])(-PI/1.5)(STRUCT([MAP(bez4)(dominio),MAP(bez5)(dominio),MAP(bez6)(dominio)]))));


	var unione_primo_tubo = R([1,2])([PI])(R([0,1])(-PI/2)(STRUCT([unione_1,unione_2])));
	var unione_secondo_tubo = T([2])([3.5])(R([0,1])(-PI/2)(STRUCT([unione_3,unione_4])))

	var unione = STRUCT([unione_primo_tubo,unione_secondo_tubo])

	return unione;
}

var tubi_motore = T([0,1,2])([2.85,0.51,0.97])(S([0,1,2])([0.09,0.09,0.09])(tubi_uniti()))

///FINE MOTO ----- ASSEMBLAGGIO PEZZI
var model = STRUCT([manubrio_trasl,unione_marmitta_completa,forcelle,ruota_posteriore,ruota_anteriore,unione_curve_parafango,unione_curve_sellino,serbatoio,doppie_frecce_dietro,doppie_frecce_davanti,tubo_compl,fanalino_avanti,unione_tubo_serbatoio_sinistro,unione_tubo_serbatoio_destro,tubo_adiac,cuboid_nero_ant,unione_curv_chius,tachimetro,cuboid_nero_motore,cub_sottostante,unione_chiusura_post,unione_pezzo_sinistro_ruota,disco_unione,tubi_motore,motore_cilindri,strutt_cerchi,unione_bm_s, unione_bm,spessore_completo_sinistra,spessore_completo_destro, unione_curve_parafango_ant,tubo_1fs,tubo_2fs])
DRAW(model)
