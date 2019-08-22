var dummydata = [1, 2, 3, 5, 1, 2, 6, 9, 3, 10];

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

console.log(dummydata);
console.log("Sum: " + getSum(dummydata));
console.log("Mean: " + getMean(dummydata));
console.log("Variance: " + getVariance(dummydata));
console.log("Std Dev: " + getStdDev(dummydata));