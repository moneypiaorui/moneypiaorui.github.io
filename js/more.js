
// bt1=document.getElementById("bt1");
techers=document.getElementById("techers");
luqu=document.getElementById("luqu");
for(let s of students){
    luqu.innerHTML+=("<ul><p>"+s.name+"</p><p>"+s.school+"</p><p>"+s.city+"</p><p>"+s.province+'</p></sapn>');
}


function techs(){
    if(techers.style.display=="none"){
        techers.style.display="block";
        if(luqu.style.display=="block"){
            luqu.style.opacity="0";
            luqu.style.top="100%"
            
        }
        setTimeout(function(){techers.style.opacity="1";techers.style.top="0";techers.style.bottom="0"},0);       
    }else{
        techers.style.opacity="0";
        techers.style.top="100%"
        // luqu.style.margin="0 auto"
        setTimeout(function(){techers.style.display='none';techers.style.bottom="100%";techers.style.top="0"},500);
        
    }
}
function Luqu(){
    if(luqu.style.display=="none"){
        luqu.style.display="block";
        if(techers.style.display=="block"){
            techers.style.opacity="0";
            techers.style.top="100%"
            
        }
        setTimeout(function(){luqu.style.opacity="1";luqu.style.top="0";luqu.style.bottom="0"},0);       
    }else{
        luqu.style.opacity="0";
        luqu.style.top="100%"
        // luqu.style.margin="0 auto"
        setTimeout(function(){luqu.style.display='none';luqu.style.bottom="100%";luqu.style.top="0"},500);
        
    }
}