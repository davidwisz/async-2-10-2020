async function getNumber(num){
    numString = num.join(',');
    let resp = await axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    let output = '';
    for (item in resp.data) {
        
        output += resp.data[item].text + '<br>';
    }
    
    
    return output
}

function getNumberPromise(num){
    numString = num.join(',');
    let output = [];
    axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    .then(function(data){ 
        for (item in data.data) {
            
            document.getElementById('content').innerHTML+= (data.data[item].text+"<br>");
            console.log(output)
        }
        return output
    })
    //.then(function(){  });
    //console.log('output',output)
    
}

function getText(data){
    output = []
    
    for (num in data){
        output.push(data[num].text + "<br>")
        
    }
    
    document.getElementById('content').innerHTML = output;
    
}


function getNumberCallback(num){
    numString = num.join(',');
    
    $.ajax({url: `http://numbersapi.com/${numString}?json&notfound=floor`,success: data => getText(data)})
    // console.log("Output:", output )
    // return output
   
}

window.onload = function(){

    getNumberCallback([1,4,7]);
};