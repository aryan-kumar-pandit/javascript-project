let input = document.getElementById('inputBox');
// querySelectorAll will return NodeList of all matching elements on the page
//querySelector → returns the first match only.
//getElementById -- returns single element
let buttons = document.querySelectorAll('button');
let string="";
//convert NodeList into array
// can also use spread operator :  const arr = [...buttons];
let arr=Array.from(buttons);

arr.forEach(button=> {
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML == '=')
        {
            string=String(eval(string));
            input.value=string;
        }
        else if(e.target.innerHTML=='AC')
        {
            string="";
            input.value=string;
        }
        else if(e.target.innerHTML=='DEL')
        {
            string=string.substring(0,string.length-1);
            input.value=string;
        }
        else{
        string+=e.target.innerHTML;
        input.value=string;
        }


    })
})