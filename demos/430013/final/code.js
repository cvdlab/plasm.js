// RAY-BAN

//funzioni supporto

// definizione della TRASLAZIONE, ROTAZIONE E SCALAMENTO senza clone()
T = function (dims) {
	return function (values) {
		return function (object) {
			return object.translate(dims, values);
		};
	};
}

R = function (dims) {
    return function (angle) {
      	return function (object) {
        	return object.rotate(dims, angle);
		};
    };
}

S = function (dims) {
    return function (values) {
      	return function (object) {
        	return object.scale(dims, values);
      	};
    };
}

// definizione della TRASLAZIONE, ROTAZIONE E SCALAMENTO con clone()
T1 = function (dims) {
  return function (values) {
    return function (object) {
      return object.clone().translate(dims, values);
    };
  };
}

R1 = function (dims) {
    return function (angle) {
        return function (object) {
          return object.clone().rotate(dims, angle);
    };
    };
}

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
function rgb(color){
	return [color[0]/255, color[1]/255, color[2]/255];
}

//Funzione che mi permette di inserire i colori in rgba con range [0,255]
function rgba(color){
	return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
}
//creazione di un cerchio con bezier
function punti_cerchio_bezier(r){
	var c = [[0,1,0],[1.6,1,0],[1.6,-1.5,0],[0,-1.5,0],[-1.6,-1.5,0],[-1.6,1,0],[0,1,0]];
	for(var i=0;i<c.length;i++)
			for(var k=0;k<c[i].length;k++)
			c[i][k] = c[i][k]*r;
	return c;
}
function extrude(obj, h){
  return EXTRUDE([h])(obj);
}
// // forme diverse dentro la struttura della montatura, il tutto renderlo trasparente, per far venire fuori l'effetto a macchie 
var x = 32
var domain = INTERVALS(1)(x)
var dom2D = PROD1x1([INTERVALS(1)(x),INTERVALS(1)(x)])

///// COLORI
var oro = [204,158,80]
var oro_scuro = [167,144,100]
var marrone = [55,26,20,98] //per la montatura
var lente_vetro = [236,232,227,70]
var macchia = [22,7,5,95]
var gommino_trasp = [236,232,227,80]
var bianco = [325,325,325]

///----------------STRUTTURA SOPRA LA LENTE --------------__/////////////////
var ss1 = BEZIER(S0)([[1.56,0, 7.5], [1.86,0, 7.67],[5.86,0, 8.15],[7.33,0, 7]])
var ss1_y = BEZIER(S0)([[1.56,0.4, 7.5],[1.86,0.4, 7.67], [5.86,0.4, 8.15],[7.33,0.4, 7]])

//andando verso sinistra
var ss2 = BEZIER(S0)([[1.56,0, 7.5], [1.46,0, 7.52], [1.58,0, 6.82], [1.57,0, 6.82]])
var ss3 = BEZIER(S0)([[1.57,0, 6.82], [2,0, 6.75], [1.71,0, 6.07], [2.45,0, 6.21]])

var ss2_y = BEZIER(S0)([[1.56,0.4, 7.5], [1.46,0.4, 7.52], [1.58,0.4, 6.82], [1.57,0.4, 6.82]])
var ss3_y = BEZIER(S0)([[1.57,0.4, 6.82], [2.22,0.4, 6.75], [1.71,0.4, 6.07], [2.45,0.4, 6.21]])

//lente sotto
var ss4 = BEZIER(S0)([[2.45,0, 6.21], [2.33,0, 7.72], [4.23,0, 7.45], [4.76,0, 7.45], [4.35,0, 7.41], [6.92,0, 7.79], [6.98,0, 6.29]])
// var ss4_b = BEZIER(S0)([[4.76,0, 7.45], [4.35,0, 7.41], [6.92,0, 7.59], [6.98,0, 6.29]])

var ss4_y = BEZIER(S0)([[2.45,0.4, 6.21], [2.33,0.4, 7.72], [4.23,0.4, 7.45], [4.76,0.4, 7.45],[4.35,0.4, 7.41], [6.92,0.4, 7.79], [6.98,0.4, 6.29]])
// var ss4_yb = BEZIER(S0)([[4.76,0.4, 7.45], [4.35,0.4, 7.41], [6.92,0.4, 7.59], [6.98,0.4, 6.29]])

////lato destro
var ss5 = BEZIER(S0)([[6.98,0, 6.29], [7.07,0, 6.13], [7.63,0, 6.68], [7.33,0, 7]])
var ss5_y = BEZIER(S0)([[6.98,0.4, 6.29], [7.07,0.4, 6.13], [7.63,0.4, 6.68], [7.33,0.4, 7]])

///chiusura nel mezzo
// var ss_c = BEZIER(S0)([[6.98,0, 6.29], [7.7,0, 8.17], [1.59,0, 7.87], [1.57,0, 6.84]])
// var ss_c_y = BEZIER(S0)([[6.98,0.4, 6.29], [7.7,0.4, 8.17], [1.59,0.4, 7.87], [1.57,0.4, 6.82]])

var unione_ss1 = MAP(BEZIER(S1)([ss1,ss1_y]))(dom2D)
var unione_ss2 = MAP(BEZIER(S1)([ss2,ss2_y]))(dom2D)
var unione_ss3 = MAP(BEZIER(S1)([ss3,ss3_y]))(dom2D)
var unione_ss4 = MAP(BEZIER(S1)([ss4,ss4_y]))(dom2D)
// var unione_ss4b = MAP(BEZIER(S1)([ss4_b,ss4_yb]))(dom2D)
var unione_ss5 = MAP(BEZIER(S1)([ss5,ss5_y]))(dom2D)

// riempimento montatura
var unione_rm1 = MAP(BEZIER(S1)([ss4,ss1]))(dom2D)
var unione_rm2 = MAP(BEZIER(S1)([ss5,[7.1825,0, 6.7]]))(dom2D) //chiusura laterale destra

var unione_rm3 = MAP(BEZIER(S1)([ss2,[2.115,0,6.7]]))(dom2D)
var unione_rm4 = MAP(BEZIER(S1)([ss3,[2.115,0,6.7]]))(dom2D)

//---------lato spessore
var unione_rm1_y = MAP(BEZIER(S1)([ss4_y,ss1_y]))(dom2D)
var unione_rm2_y = MAP(BEZIER(S1)([ss5_y,[7.1825,0.4, 6.7]]))(dom2D) 

var unione_rm3_y = MAP(BEZIER(S1)([ss2_y,[2.115,0.4,6.7]]))(dom2D)
var unione_rm4_y = MAP(BEZIER(S1)([ss3_y,[2.115,0.4,6.7]]))(dom2D)

var struttura = COLOR(rgba(marrone))(STRUCT([unione_ss1,unione_ss2,unione_ss3,unione_ss4,unione_ss5,unione_rm1,unione_rm2,unione_rm3,unione_rm4,unione_rm1_y,unione_rm2_y,unione_rm3_y,unione_rm4_y]))

////////////////----------particolare dorato in alto a sinistra -------///////
var ds1 = BEZIER(S0)([[1.73,0, 7.1], [1.97,0, 6.93], [2.34,0, 7.01], [2.34,0, 7.09]])
var ds2 = BEZIER(S0)([[1.73,0, 7.1], [2.05,0, 7.31], [2.39,0, 7.11], [2.34,0, 7.09]])

var ds3_m = BEZIER(S0)([[1.73,0, 7.1], [1.87,-0.1, 7.12], [2.21,-0.1, 7.11], [2.34,0, 7.09]])
var ds4_m = BEZIER(S0)([[1.73,0, 7.1], [2.05,0.1, 7.1], [2.39,0.1, 7.09],[2.34,0, 7.09]])
 
var unione_ds1 = MAP(BEZIER(S1)([ds1,ds3_m,ds2]))(dom2D)
var unione_ds2 = MAP(BEZIER(S1)([ds1,ds4_m,ds2]))(dom2D)

var model_oro1 = COLOR(rgb(oro))(STRUCT([unione_ds1,unione_ds2]))
// DRAW(model_oro)

/////DESTRA
var ds1_d = BEZIER(S0)([[1.73,0.4, 7.1], [1.97,0.4, 6.93], [2.34,0.4, 7.01], [2.34,0.4, 7.09]])
var ds2_d = BEZIER(S0)([[1.73,0.4, 7.1], [2.05,0.4, 7.31], [2.39,0.4, 7.11], [2.34,0.4, 7.09]])

var ds3_md = BEZIER(S0)([[1.73,0.4, 7.1], [1.87,0.5, 7.12], [2.21,0.5, 7.11], [2.34,0.4, 7.09]])
var ds4_md = BEZIER(S0)([[1.73,0.4, 7.1], [2.05,0.3, 7.1], [2.39,0.3, 7.09],[2.34,0.4, 7.09]])

var unione_ds1_d = MAP(BEZIER(S1)([ds1_d,ds3_md,ds2_d]))(dom2D)
var unione_ds2_d = MAP(BEZIER(S1)([ds1_d,ds4_md,ds2_d]))(dom2D)

var model_oro2 = COLOR(rgb(oro))(STRUCT([unione_ds1_d,unione_ds2_d]))

////////////////---------- bordo dorato lente ------------//////////////////
//parte sotto lette
var bd1 = BEZIER(S0)([[2.46,0.1, 6.209], [2.29,0.1, 2.86], [7.12,0.1, 2.54], [6.97,0.1, 6.3]])
var bd2 = BEZIER(S0)([[2.26,0.1, 6.209], [2.09,0.1, 2.76], [7.32,0.1, 2.44], [7.13,0.1, 6.3]])
var bd3 = BEZIER(S0)([[2.6,0.38, 6.209], [2.29,0.38, 2.86], [7.12,0.38, 2.54], [6.87,0.38, 6.3]])
var bd4 = BEZIER(S0)([[2.26,0.38, 6.209], [2.09,0.38, 2.76], [7.32,0.38, 2.44], [7.13,0.38, 6.3]])

var unione_bd1 = MAP(BEZIER(S1)([bd1,bd2,bd4,bd3,bd1]))(dom2D)

//parte sopra la lente
//////////////////////// 1  ////////////////// 2 ///////////////3 ///////////////4 ////////////// 5 /////////////// 6 ////////////// 
var bd5 = BEZIER(S0)([[2.46,0.1, 6.209], [2.37,0.1, 7.55], [4.23,0.1, 7.5], [4.76,0.1, 7.4], [4.35,0.1, 7.41], [6.75,0.1, 7.8], [6.94,0.1, 6.29]])
// var bd6 = BEZIER(S0)([[2.53,0.2, 6.209], [2.38,0.2, 7.63], [4.28,0.2, 7.36], [4.76,0.2, 7.36], [4.3,0.2, 7.32], [6.9,0.2, 7.7], [6.9,0.2, 6.28]])
// var bd7 = BEZIER(S0)([[2.45,0.3, 6.209], [2.33,0.3, 7.72], [4.23,0.3, 7.45], [4.76,0.3, 7.45], [4.35,0.3, 7.41], [6.92,0.3, 7.79], [6.978,0.3, 6.28]])
var bd6 = BEZIER(S0)([[2.26,0.1, 6.209], [2.17,0.1, 7.75], [4.03,0.1, 7.7], [4.76,0.1, 7.8], [4.55,0.1, 7.61], [6.95,0.1, 7.6], [7.14,0.1, 6.29]])
var bd7 = BEZIER(S0)([[2.6,0.38, 6.209], [2.37,0.38, 7.55], [4.23,0.38, 7.5], [4.76,0.38, 7.4], [4.35,0.38, 7.41], [6.75,0.38, 7.8], [6.94,0.38, 6.29]])
var bd8 = BEZIER(S0)([[2.26,0.38, 6.209], [2.17,0.38, 7.75], [4.03,0.38, 7.7], [4.76,0.38, 7.8], [4.55,0.38, 7.61], [6.95,0.38, 7.6], [7.14,0.38, 6.29]])

var unione_bd2 = MAP(BEZIER(S1)([bd5,bd6,bd8,bd7,bd5]))(dom2D)

///-------------------------- LENTE - VETRO ---------/////
var bd8 = BEZIER(S0)([[2.44,0.2, 6.23], [2.22,0.2, 2.82], [7.12,0.2, 2.5], [6.975,0.2, 6.3]]) //sotto
var bd9 = BEZIER(S0)([[2.44,0.2, 6.23], [2.33,0.2, 7.72], [4.23,0.2, 7.45], [4.76,0.2, 7.45], [4.35,0.2, 7.41], [6.92,0.2, 7.79], [6.975,0.2, 6.3]])


var lente = COLOR(rgba(lente_vetro))(MAP(BEZIER(S1)([bd8,bd9]))(dom2D))

///// Unione contorno
var contorno_lente = COLOR(rgb(oro))(STRUCT([unione_bd1,unione_bd2]))

////////// attaccatura d'orata centrale
var ac1 = BEZIER(S0)([[7.31,0.18, 7], [7.59,0.26, 7],[7.53,0.13, 7],[8.03,0, 7.1] ,[8.53,0.13, 7], [8.47,0.26, 7], [8.75,0.18, 7]])
var ac2 = BEZIER(S0)([[7.41,0.18, 6.7], [7.71,0.26, 6.7],[7.65,0.13, 6.7],[8.03,0, 6.78] ,[8.45,0.13, 6.7], [8.39,0.26, 6.7], [8.67,0.18, 6.7]])

var ac1_y = BEZIER(S0)([[7.31,0.18+0.1, 7], [7.59,0.26+0.1, 7],[7.53,0.13+0.1, 7],[8.03,0+0.1, 7.1] ,[8.53,0.13+0.1, 7], [8.47,0.26+0.1, 7], [8.75,0.18+0.1, 7]])
var ac2_y = BEZIER(S0)([[7.41,0.28, 6.7], [7.71,0.26+0.1, 6.7],[7.65,0.13+0.1, 6.7],[8.03,0+0.1, 6.78] ,[8.45,0.13+0.1, 6.7], [8.39,0.26+0.1, 6.7], [8.67,0.28, 6.7]])

var unione_ac1 = MAP(BEZIER(S1)([ac1,ac1_y]))(dom2D)
var unione_ac2 = MAP(BEZIER(S1)([ac2,ac2_y]))(dom2D)
var unione_ac3 = MAP(BEZIER(S1)([ac1,ac2]))(dom2D)
var unione_ac4 = MAP(BEZIER(S1)([ac1_y,ac2_y]))(dom2D)

var centro_oro = COLOR(rgb(oro))(STRUCT([unione_ac1,unione_ac2,unione_ac3,unione_ac4]))

/////////////////////////////////////-------- alette in gomma/naso
/////SINISTRA///////////
var ag1 = BEZIER(S0)([[7.01,0+0.23, 5.61], [6.55-0.1,0.1+0.23, 5.83], [6.74-0.1,0.15+0.4, 6], [7.02-0.05,0.2+0.4, 5.73]])
var ag2 = BEZIER(S0)([[7.01,0+0.23, 5.49], [6.55-0.1,0.1+0.23, 5.71], [6.74-0.1,0.15+0.4, 5.88], [7.02-0.05,0.2+0.4, 5.61]])

var ag3 = BEZIER(S0)([[7.01,0.03+0.23, 5.61], [6.62-0.1,0.05+0.23, 5.93], [6.81-0.1,0.08+0.4, 6.1], [7.02-0.05,0.175+0.4, 5.73]]) //mezzo sopra
var ag4 = BEZIER(S0)([[7.01,0.03+0.23, 5.49], [6.55-0.1,0.05+0.23, 5.61], [6.81-0.1,0.08+0.4, 5.78], [7.02-0.05,0.175+0.4, 5.61]]) //mezzo sotto

var ag1_y = BEZIER(S0)([[6.99,0.05+0.23, 5.61], [6.7-0.1,0.1+0.23, 5.83], [6.9-0.1,0.12+0.4, 6], [7.02-0.05,0.15+0.4, 5.73]])
var ag2_y = BEZIER(S0)([[6.99,0.05+0.23, 5.49], [6.7-0.1,0.1+0.23, 5.71], [6.9-0.1,0.12+0.4, 5.88], [7.02-0.05,0.15+0.4, 5.61]])

var unione_ag1 = MAP(BEZIER(S1)([ag1,ag2]))(dom2D)
var unione_ag2 = MAP(BEZIER(S1)([ag1_y,ag2_y]))(dom2D)

var unione_ag3 = MAP(BEZIER(S1)([ag1,ag3,ag1_y]))(dom2D)
var unione_ag4 = MAP(BEZIER(S1)([ag2,ag4,ag2_y]))(dom2D)
///scendendo verso la gomma
var ag5 = BEZIER(S0)([[7.02-0.05,0.6, 5.73], [7.17,0.6, 5.55], [7.04,0.6, 5.48], [7.03,0.6, 5.4]])
var ag6 = BEZIER(S0)([[7.02-0.05,0.55, 5.73], [7.17,0.55, 5.55], [7.04,0.55, 5.48], [7.03,0.55, 5.4]])

var ag7 = BEZIER(S0)([[7.02-0.05,0.6, 5.61], [7,0.6, 5.53], [6.92,0.6, 5.36], [7.02,0.6, 5.35]])
var ag8 = BEZIER(S0)([[7.02-0.05,0.55, 5.61], [7,0.55, 5.53], [6.92,0.55, 5.36], [7.02,0.55, 5.35]])

var unione_ag5 = MAP(BEZIER(S1)([ag5,ag6]))(dom2D)
var unione_ag6 = MAP(BEZIER(S1)([ag7,ag8]))(dom2D)
var unione_ag7 = MAP(BEZIER(S1)([ag5,ag7]))(dom2D)
var unione_ag8 = MAP(BEZIER(S1)([ag6,ag8]))(dom2D)

//// DISCHETTO sostegno gomma
var dischetto = S([0,1,2])([1.6,1,1.2])(R([1,2])(PI/4)(R([0,2])(-PI/2.7)(EXTRUDE([0.03])(DISK(0.13)([64, 2])))))
dischetto = T([0,1,2])([7.038,0.57,5.36])(dischetto)
// DRAW(dischetto)
var strutt_gomma_sinistra = COLOR(rgb(oro))(STRUCT([dischetto,unione_ag1,unione_ag2,unione_ag3,unione_ag4,unione_ag5,unione_ag6,unione_ag7,unione_ag8]))

//////gommino
//SINISTRA
var g1 = BEZIER(S0)([[6.7+0.17,0.6, 4.67], [7.1+0.2,0, 4.65], [7.22+0.33,0, 6], [7+0.43,0.6, 6.02]])
var g2 = BEZIER(S0)([[6.7+0.17,0.6, 4.67], [6.23+0.2,1, 4.82],[6.422+0.33,1, 5.12],[6.6+0.43,1, 5.36], [6.7+0.25,1, 5.66], [6.8+0.25,1, 6.16], [7+0.43,0.6, 6.02]])

var g1_y = BEZIER(S0)([[6.7+0.25,0.6, 4.67], [7.09+0.5,0, 4.65], [7.2+0.53,0, 6], [7+0.48,0.6, 6.02]])
var g2_y = BEZIER(S0)([[6.7+0.25,0.6, 4.67], [6.31+0.5,1, 4.62],[6.5+0.53,0.8, 4.92],[6.7+0.63,1, 5.16], [6.8+0.45,1, 5.46], [6.9+0.4,1, 5.96], [7+0.48,0.6, 6.02]])

var unione_g1_sin = COLOR(rgba(gommino_trasp))(T([0,1])([-0.18,0.1])(MAP(BEZIER(S1)([g1,g2,g2_y,g1_y,g1]))(dom2D)))
// var unione_g1_des = COLOR(rgba(gommino_trasp))(T([1,2])([0,10])(R([0,1])(PI)(R([0,2])(PI)(MAP(BEZIER(S1)([g1,g2,g2_y,g1_y,g1]))(dom2D)))))

/////DESTRA///////////
var ag1_d = BEZIER(S0)([[7.01,0+0.23, 5.61], [7.57,0.1+0.23, 5.83], [7.38,0.15+0.4, 6], [7.05,0.2+0.4, 5.73]])
var ag2_d = BEZIER(S0)([[7.01,0+0.23, 5.49], [7.57,0.1+0.23, 5.71], [7.38,0.15+0.4, 5.88], [7.05,0.2+0.4, 5.61]])

var ag3_d = BEZIER(S0)([[7.01,0.03+0.23, 5.61], [7.5,0.05+0.23, 5.93], [7.33,0.08+0.4, 6.1], [7.05,0.175+0.4, 5.73]]) //mezzo sopra
var ag4_d = BEZIER(S0)([[7.01,0.03+0.23, 5.49], [7.57,0.05+0.23, 5.61], [7.33,0.08+0.4, 5.78], [7.05,0.175+0.4, 5.61]]) //mezzo sotto

var ag1_yd = BEZIER(S0)([[7.03,0.05+0.23, 5.61], [7.22,0.1+0.23, 5.83], [7.42,0.12+0.4, 6], [7.05,0.15+0.4, 5.73]])
var ag2_yd = BEZIER(S0)([[7.03,0.05+0.23, 5.49], [7.22,0.1+0.23, 5.71], [7.42,0.12+0.4, 5.88], [7.05,0.15+0.4, 5.61]])

var unione_ag1_d = MAP(BEZIER(S1)([ag1_d,ag2_d]))(dom2D)
var unione_ag2_d = MAP(BEZIER(S1)([ag1_yd,ag2_yd]))(dom2D)

var unione_ag3_d = MAP(BEZIER(S1)([ag1_d,ag3_d,ag1_yd]))(dom2D)
var unione_ag4_d = MAP(BEZIER(S1)([ag2_d,ag4_d,ag2_yd]))(dom2D)

///scendendo verso la gomma
var ag5_d = BEZIER(S0)([[7.05,0.6, 5.73], [6.85,0.6, 5.55], [6.98,0.6, 5.48], [6.99,0.6, 5.4]])
var ag6_d = BEZIER(S0)([[7.05,0.55, 5.73], [6.85,0.55, 5.55], [6.98,0.55, 5.48], [6.99,0.55, 5.4]])

var ag7_d = BEZIER(S0)([[7.05,0.6, 5.61], [7,0.6, 5.53], [7.1,0.6, 5.36], [7,0.6, 5.35]])
var ag8_d = BEZIER(S0)([[7.05,0.55, 5.61], [7.02,0.55, 5.53], [7.1,0.55, 5.36], [7,0.55, 5.35]])

var unione_ag5_d = MAP(BEZIER(S1)([ag5_d,ag6_d]))(dom2D)
var unione_ag6_d = MAP(BEZIER(S1)([ag7_d,ag8_d]))(dom2D)
var unione_ag7_d = MAP(BEZIER(S1)([ag5_d,ag7_d]))(dom2D)
var unione_ag8_d = MAP(BEZIER(S1)([ag6_d,ag8_d]))(dom2D)

//// DISCHETTO sostegno gomma
var dischetto_d = S([0,1,2])([1.6,1,1.2])(R([1,2])(PI/4)(R([0,2])(PI/2.7)(EXTRUDE([0.03])(DISK(0.13)([64, 2])))))
dischetto_d = T([0,1,2])([6.96,0.57,5.36])(dischetto_d)
// DRAW(dischetto)
var strutt_gomma_destra = COLOR(rgb(oro))(T([0])([2.1])(STRUCT([dischetto_d,unione_ag1_d,unione_ag2_d,unione_ag3_d,unione_ag4_d,unione_ag5_d,unione_ag6_d,unione_ag7_d,unione_ag8_d])))

///gommino
var g1_d = BEZIER(S0)([[8.16,0.6, 4.67], [7.73,0, 4.65], [7.28,0, 6], [7.43,0.6, 6.02]])
var g2_d = BEZIER(S0)([[8.16,0.6, 4.67], [8.6,1, 4.82],[8.278,1, 5.12],[7.83,1, 5.36], [7.91,1, 5.66], [7.81,1, 6.16], [7.43,0.6, 6.02]])

var g1_yd = BEZIER(S0)([[8.08,0.6, 4.67], [7.24,0, 4.65], [7.46,0, 6], [7.38,0.6, 6.02]])
var g2_yd = BEZIER(S0)([[8.08,0.6, 4.67], [8.22,1, 4.62],[8,0.8, 4.92],[7.53,1, 5.16], [7.61,1, 5.46], [7.56,1, 5.96], [7.38,0.6, 6.02]])

var unione_g1_des = COLOR(rgba(gommino_trasp))(T([0,1])([1.36,0.1])(MAP(BEZIER(S1)([g1_d,g2_d,g2_yd,g1_yd,g1_d]))(dom2D)))

var al_gomma_sin = STRUCT([strutt_gomma_sinistra,unione_g1_sin])
var al_gomma_des = STRUCT([strutt_gomma_destra,unione_g1_des])

// DRAW(al_gomma_des)
// DRAW(al_gomma_sin)

/////////////////////////// STECCHE ----------------------////////////////////
var s1 = BEZIER(S0)([[0,0.6, 1.39], [0,3.07, 1.26], [0,4.28, 1.31], [0,4.64, 1.08]]) //sopra
var s2 = BEZIER(S0)([[0,5.28, 0.43], [0,5.47, 0.53], [0,5.3, 0.6], [0,4.64, 1.08]]) //sopra

var s3 = BEZIER(S0)([[0,0.62, 1.18], [0,1.82, 1.09], [0,4.3, 1.23], [0,4.59, 0.96]])
var s4 = BEZIER(S0)([[0,5.28, 0.43], [0,5, 0.23], [0,5.11, 0.59], [0,4.59, 0.96]]) //sotto

var union_s13 = MAP(BEZIER(S1)([s1,s3]))(dom2D)
var union_s24 = MAP(BEZIER(S1)([s2,s4]))(dom2D)
/////////////////--------------------------------------------------------------------------
var s1_x = BEZIER(S0)([[-0.1,0.6, 1.39], [-0.1,3.07, 1.26], [-0.1,4.28, 1.31], [-0.1,4.64, 1.08]]) //sopra
var s2_x = BEZIER(S0)([[-0.1,5.28, 0.43], [-0.1,5.47, 0.53], [-0.1,5.3, 0.6], [-0.1,4.64, 1.08]]) //sopra

var s3_x = BEZIER(S0)([[-0.1,0.62, 1.18], [-0.1,1.82, 1.09], [-0.1,4.3, 1.23], [-0.1,4.59, 0.96]]) //sotto
var s4_x = BEZIER(S0)([[-0.1,5.28, 0.43], [-0.1,5, 0.23], [-0.1,5.11, 0.59], [-0.1,4.59, 0.96]])  //sotto

var sm1_x = BEZIER(S0)([[-0.15,0.6, 1.285], [-0.15,3.07, 1.175], [-0.15,4.28, 1.27], [-0.15,4.64, 1.02]]) //mezzo 
var sm2_x = BEZIER(S0)([[-0.15,5.25, 0.43], [-0.15,5.47, 0.38], [-0.15,5.3, 0.595], [-0.15,4.64, 1.02]]) //mezzo

var union_s13_x = MAP(BEZIER(S1)([s1_x,sm1_x,s3_x]))(dom2D)
var union_s24_x = MAP(BEZIER(S1)([s2_x,sm2_x,s4_x]))(dom2D)
//unione
var union_s11 = MAP(BEZIER(S1)([s1_x,s1]))(dom2D)
var union_s22 = MAP(BEZIER(S1)([s2_x,s2]))(dom2D)
var union_s33 = MAP(BEZIER(S1)([s3_x,s3]))(dom2D)
var union_s44 = MAP(BEZIER(S1)([s4_x,s4]))(dom2D)

/// giunture stecca lente
var giunt1 = BEZIER(S0)([[0,1.27, 1.94], [0,1.25, 2.01], [0,1.16, 2.02], [0,1.02, 2.01]])
var giunt2 = BEZIER(S0)([[0,1.27, 1.94], [0,1.25, 1.87], [0,1.16, 1.86], [0,1.02, 1.87]])

var giunt3 = BEZIER(S0)([[0.03,1.27, 1.94], [0.03,1.25, 2.01], [0.03,1.16, 2.02], [0.03,1.02, 2.01]])
var giunt4 = BEZIER(S0)([[0.03,1.27, 1.94], [0.03,1.25, 1.87], [0.03,1.16, 1.86], [0.03,1.02, 1.87]])

var union_giunt1 = MAP(BEZIER(S1)([giunt1,giunt2]))(dom2D)
var union_giunt2 = MAP(BEZIER(S1)([giunt3,giunt4]))(dom2D)
var union_giunt3 = MAP(BEZIER(S1)([giunt1,giunt3]))(dom2D)
var union_giunt4 = MAP(BEZIER(S1)([giunt2,giunt4]))(dom2D)

//disk
var d_g1 = T([0,1,2])([0.04,1,1.87])(extrude(DISK(0.05)([64, 2]),0.02))
var disks_g1 = STRUCT(REPLICA(3)([d_g1,T1([2])([0.048])]))

var d_g2 = T([0,1,2])([0.041,1,1.894])(extrude(DISK(0.05)([64, 2]),0.02))
var disks_g2 = STRUCT(REPLICA(3)([d_g2,T1([2])([0.048])]))

var giunt_rot = T([0,1])([-0.95,0.973])(R([0,1])([-PI/2])(STRUCT([union_giunt1,union_giunt2,union_giunt3,union_giunt4])))
var giuntura = T([0,1,2])([-0.02,-0.35,-0.66])(COLOR(rgb(oro))(STRUCT([union_giunt1,union_giunt2,union_giunt3,union_giunt4,disks_g1,disks_g2,giunt_rot])))

var stecca_sinistra = COLOR(rgba(marrone))(STRUCT([union_s13,union_s24,union_s13_x,union_s24_x,union_s11,union_s22,union_s33,union_s44]))
stecca_sinistra = T([0,1,2])([1.84,-1,4.3])(S([0,1,2])([2.3,2.3,2.3])(STRUCT([stecca_sinistra,giuntura])))

var sm1_xd = BEZIER(S0)([[0.05,0.6, 1.285], [0.05,3.07, 1.175], [0.05,4.28, 1.27], [0.05,4.64, 1.02]]) //mezzo 
var sm2_xd =  BEZIER(S0)([[0.05,5.25, 0.43], [0.05,5.47, 0.38], [0.05,5.3, 0.595], [0.05,4.64, 1.02]]) ///mezzo

var union_s13_xd = MAP(BEZIER(S1)([s1,sm1_xd,s3]))(dom2D)
var union_s24_xd = MAP(BEZIER(S1)([s2,sm2_xd,s4]))(dom2D)

var union_s13_d = MAP(BEZIER(S1)([s1_x,s3_x]))(dom2D)
var union_s24_d = MAP(BEZIER(S1)([s2_x,s4_x]))(dom2D)

var giuntura_d = T([0,1,2])([0.51,0.61,0])(R1([0,1])(PI/2)(giuntura))
var stecca_destra = COLOR(rgba(marrone))(STRUCT([union_s13_d,union_s24_d,union_s13_xd,union_s24_xd,union_s11,union_s22,union_s33,union_s44]))
stecca_destra = T([0,1,2])([1.84+12.6,-1,4.3])(S([0,1,2])([2.3,2.3,2.3])(STRUCT([stecca_destra,giuntura_d])))

///////// scritta laterale
///////----------- R ------------------
var r1 = BEZIER(S0)([[0,0.08, 1.09], [0,0.85, 1.59], [0,0.8, 0.96], [0,0.41, 0.78]])
var r2 = BEZIER(S0)([[0,0.07, 0.98], [0,0.55, 1.45], [0,0.96, 1.17],[0,0.29, 0.78]])
var union_r12 = MAP(BEZIER(S1)([r1,r2]))(dom2D)
 // var rms = COLOR([0,0,0])(MAP(r1)(domain))
 // var rjk = COLOR([255,0,0])(MAP(r2)(domain))
 // DRAW(rms)
 // DRAW(rjk)
var r3 = BEZIER(S0)([[0,0.68, 0.59], [0,0.5, 0.66], [0,0.28, 0.78]])
var r4 = BEZIER(S0)([[0,0.71, 0.63], [0,0.59, 0.7], [0,0.38, 0.8]])
var union_r34 = MAP(BEZIER(S1)([r3,r4]))(dom2D)

var r5 = BEZIER(S0)([[0,0.4, 0.58], [0,0.4, 0.58],[0,0.4, 1.15]])
var r6 = BEZIER(S0)([[0,0.45, 0.61], [0,0.45, 0.79], [0,0.45, 1.16]])
var union_r56 = MAP(BEZIER(S1)([r5,r6]))(dom2D)

var r = STRUCT([union_r12,union_r34,union_r56])

///////----------- a ------------------
var a1 = BEZIER(S0)([[0,0.71, 0.8], [0,0.53, 0.62], [0,0.51, 0.87], [0,0.71, 0.87]])
var a2 = BEZIER(S0)([[0,0.71, 0.83], [0,0.63, 0.73], [0,0.56, 0.8], [0,0.71, 0.85]])
var union_a12 = MAP(BEZIER(S1)([a1,a2]))(dom2D)

var a3 = BEZIER(S0)([[0,0.8, 0.86], [0,0.75, 0.77], [0,0.69, 0.85], [0,0.72, 0.88]])
var a4 = BEZIER(S0)([[0,0.8, 0.82], [0,0.74, 0.75], [0,0.67, 0.7], [0,0.69, 0.88]])
var union_a34 = MAP(BEZIER(S1)([a3,a4]))(dom2D)

var a = STRUCT([union_a12,union_a34])

//////------------y--------------------
var y1 = BEZIER(S0)([[0,0.96, 0.96], [0,0.88, 0.76], [0,0.77, 0.74], [0,0.8, 0.91]])
var y2 = BEZIER(S0)([[0,0.94, 0.96], [0,0.89, 0.86], [0,0.85, 0.83], [0,0.84, 0.92]])
var union_y12 = MAP(BEZIER(S1)([y1,y2]))(dom2D)

var y3 = BEZIER(S0)([[0,0.95, 0.96], [0,0.96, 0.86], [0,0.95, 0.55]])
var y4 = BEZIER(S0)([[0,0.94, 0.96], [0,0.88, 0.84], [0,0.9, 0.56]])
var union_y34 = MAP(BEZIER(S1)([y3,y4]))(dom2D)

var y = STRUCT([union_y12,union_y34])

//////////---- pallino meta
// var pm = BEZIER(S0)([[0,1.02, 0.97], [0,0.96, 0.8], [0,1.25, 1.05], [0,1.02, 0.97]])

var pm1 = BEZIER(S0)([[0,1.08, 0.92], [0,1.16, 0.95], [0,1.1, 1.02], [0,1.05, 0.99]])
var pm2 = BEZIER(S0)([[0,1.08, 0.92], [0,1, 0.89], [0,0.96, 0.97], [0,1.05, 0.99]])

var pm = MAP(BEZIER(S1)([pm1,pm2]))(dom2D)

////////----------- B----------------
var b1 = BEZIER(S0)([[0,1.17, 0.87], [0,1.18, 1], [0,1.2, 1.28]]) // stecca B
var b2 = BEZIER(S0)([[0,1.24, 0.91], [0,1.24, 1.01], [0,1.26, 1.28]])
var union_b12 = MAP(BEZIER(S1)([b1,b2]))(dom2D)

var b3 = BEZIER(S0)([[0,1.28, 1.16], [0,1.52, 1.4], [0,1.34, 1.56], [0,1.26, 1.28]])
var b4 = BEZIER(S0)([[0,1.3, 1.14], [0,1.68, 1.41], [0,1.32, 1.63], [0,1.2, 1.28]])
var union_b34 = MAP(BEZIER(S1)([b3,b4]))(dom2D)

var b5 = BEZIER(S0)([[0,1.3, 1.13], [0,1.61, 0.96], [0,1.23, 0.83], [0,1.25, 0.75]])
var b6 = BEZIER(S0)([[0,1.28, 1.11], [0,1.46, 0.94], [0,1.31, 0.98], [0,1.21, 0.82]])
var union_b56 = MAP(BEZIER(S1)([b5,b6]))(dom2D)

var b7 = BEZIER(S0)([[0,1.3, 1.12],[0,1.3, 1.15]])
var b8 = BEZIER(S0)([[0,1.28, 1.11],[0,1.28, 1.16]])
var union_b78 = MAP(BEZIER(S1)([b7,b8]))(dom2D)

var B = STRUCT([union_b12,union_b34,union_b56,union_b78])

///////////// ---------a------------
var a2_1 = BEZIER(S0)([[0,1.57, 1.07], [0,1.38, 1.02], [0,1.45, 0.81], [0,1.57, 0.99]])
var a2_2 = BEZIER(S0)([[0,1.56, 1.05], [0,1.47, 1.06], [0,1.49, 0.92], [0,1.57, 1.02]])
var union_a2_12 = MAP(BEZIER(S1)([a2_1,a2_2]))(dom2D)

var a2_3 = BEZIER(S0)([[0,1.58-0.02, 1.08], [0,1.58-0.02, 0.87], [0,1.66-0.02, 0.99], [0,1.67-0.01, 1.01]]) //stecca
var a2_4 = BEZIER(S0)([[0,1.61-0.03, 1.11], [0,1.63-0.03, 1.03], [0,1.68-0.03, 1.01], [0,1.67-0.02, 1.02]])
var union_a2_34 = MAP(BEZIER(S1)([a2_3,a2_4]))(dom2D)

var a_2 = STRUCT([union_a2_12,union_a2_34])

// ////////// ----------- n -----------
var n1 = BEZIER(S0)([[0,1.74, 1.13], [0,1.7, 1.21], [0,1.68, 1.02], [0,1.65, 1.02]])
var n2 =BEZIER(S0)([[0,1.77, 1.05], [0,1.64, 0.85], [0,1.78, 1.14], [0,1.66, 1.01]])
var union_n12 = MAP(BEZIER(S1)([n1,n2]))(dom2D)

var n3 = BEZIER(S0)([[0,1.77, 1.05], [0,1.79, 1.16], [0,1.82, 0.9], [0,1.9, 1.04]])
var n4 = BEZIER(S0)([[0,1.75, 1.09], [0,1.86, 1.31], [0,1.84, 1], [0,1.9, 1.04]])
var union_n34 = MAP(BEZIER(S1)([n3,n4]))(dom2D)

var n = STRUCT([union_n12,union_n34])

/////////////////////////////////////////////////////////////////////////////////
var scritta = COLOR(rgb(bianco))(STRUCT([r,a,y,pm,B,a_2,n]))
scritta = T([0,1,2])([1.841,1.5,6.79])(S([0,1,2])([0.4,0.4,0.4])(scritta))

////////////////////////////////////////////////////////////////////////////////


var montatura_sinistra = STRUCT([struttura,contorno_lente,model_oro1,lente,al_gomma_sin,stecca_sinistra,scritta])
var montatura_destra = T([0,1])([16.05,0.4])(R([0,1])(PI)(STRUCT([struttura,contorno_lente,model_oro2,lente])))
montatura_destra = STRUCT([al_gomma_des,montatura_destra, stecca_destra])
var montatura = STRUCT([montatura_sinistra,centro_oro,montatura_destra])

var model = montatura;
DRAW(model)





