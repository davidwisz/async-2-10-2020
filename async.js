async function getNumber(num){
    numString = num.join(',');
    let resp = await axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    let output = '';
    for (item in resp.data) {
        console.log(item);
        output += resp.data[item].text + '<br>';
    }
    // console.log(resp.data)
    console.log(resp.data)
    return output
}

function getNumberPromise(num){
    numString = num.join(',');
    let output = ['first'];
    axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    .then(function(data){ 
        for (item in data.data) {
            output.push(data.data[item].text);
            console.log(output)
        }
        return output
    })
    //.then(function(){  });
    //console.log('output',output)
    
}

window.onload = function(){
    document.getElementById('content').innerHTML = getNumberPromise([2,7,10]);
};