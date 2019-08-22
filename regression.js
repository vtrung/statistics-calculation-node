
var dummydata = [[1,2], [4,5], [4,2], [5,6], [2, 3]];
//1,4,4,5,2
//2,5,2,6,3
console.log(dummydata);

function getSum(numarray){
    var sum = 0;
    numarray.forEach(function(i){
        sum += i;
    })
    return sum;
}

function getMean(numarray){
    var sum = getSum(numarray);
    var length = numarray.length;
    var mean = 0;
    if(length > 0){
        mean = sum/length;
    }
    return mean;
}

function getVariance(numarray){
    var mean = getMean(numarray);
    var length = numarray.length;
    var deltasum = 0;
    numarray.forEach(function(i){
        var delta = i - mean;
        deltasum += (delta * delta); //d^2
    })
    var variance = deltasum/length;
    return variance;
}

function getStdDev(numarray){
    var variance = getVariance(numarray);
    var stddev = Math.sqrt(variance);
    return stddev;
}

function getXs(data){
    var xarr = [];
    data.forEach(function(i){
        xarr.push(i[0]);
    })
    return xarr;
}
function getYs(data){
    var yarr = [];
    data.forEach(function(i){
        yarr.push(i[1]);
    })
    return yarr;
}

console.log("x: " + getXs(dummydata));
console.log("y: " + getYs(dummydata));

function getSumX(data){
    var x = getXs(data);
    return getSum(x);
};

function getSumY(data){
    var y = getYs(data);
    return getSum(y);
};

console.log("sum x: " + getSumX(dummydata));
console.log("sum y: " + getSumY(dummydata));

function getMeanX(data){
    var xs = getSumX(data);
    var length = data.length;
    return xs/length;
}

function getMeanY(data){
    var ys = getSumY(data);
    var length = data.length;
    return ys/length;
}

console.log("mean x: " + getMeanX(dummydata));
console.log("mean y: " + getMeanY(dummydata));

function getSSx(data){
    var meanx = getMeanX(data);
    var xs = getXs(data);
    var sum = 0;
    xs.forEach(function(i){
        var delta = (i-meanx);
        sum += (delta * delta);
    })
    return sum;
}

//(X - Mx)(Y - My)
function getSP(data){
    var meanx = getMeanX(data);
    var meany = getMeanY(data);
    var xs = getXs(data);
    var ys = getYs(data);
    var sum = 0;
    for(var i = 0; i < data.length; i++){
        var deltax = data[i][0] - meanx;
        var deltay = data[i][1] - meany;
        sum += deltax * deltay
    }
    return sum;
}

console.log("Sum of squares (SSX): " + getSSx(dummydata));
console.log("Sum of products (SP) : " + getSP(dummydata));

//b = SP/SSX
function getB(data){
    var sp = getSP(data);
    var ssx = getSSx(data);
    return (sp/ssx);
}

console.log("b: " + getB(dummydata));

// a = MY - bMX
function getA(data){
    var meany = getMeanY(data);
    var meanx = getMeanX(data);
    var b = getB(data);
    return (meany - (b * meanx));
}

console.log("a: " + getA(dummydata));
console.log("y = " + getB(dummydata) + "x + " + getA(dummydata));

function estimateY(data, x){
    var a = getA(data);
    var b = getB(data);
    var result = (b * x) + a;
    return result;
}

console.log("estimates: ");
console.log("5: " + estimateY(dummydata, 5));
console.log("10: " + estimateY(dummydata, 10));
console.log("3: " + estimateY(dummydata, 3));
console.log("17: " + estimateY(dummydata, 17));
//Calculate r-sq
//SSR=∑ni=1(ŷ i−y¯)2=119.1
//SSE=∑ni=1(yi−ŷ i)2=1708.5
//SSTO=∑ni=1(yi−y¯)2=1827.6
//SSR/SSTO = r2

function getSSR(data){
    var meany = getMeanY(data);
    var sum = 0;
    var xs = getXs(data);
    xs.forEach(function(i){
        var y = estimateY(data, i);
        var delta = y - meany;
        sum += (delta * delta);
    })
    return sum;
}

function getSSTO(data){
    var meany = getMeanY(data);
    var ys = getYs(data);
    var sum = 0;
    ys.forEach(function(i){
        var delta = i - meany;
        sum += (delta * delta);
    })
    return sum;
}

function getR2(data){
    var ssr = getSSR(data);
    var ssto = getSSTO(data);
    return ssr/ssto;
}

console.log("R-squared");
console.log("SSR: " + getSSR(dummydata));
console.log("SSTO: " + getSSTO(dummydata));
console.log("R2: " + getR2(dummydata));