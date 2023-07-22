
// bt1=document.getElementById("bt1");
techers=document.getElementById("techers");
luqu=document.getElementById("luqu");
for(let s of students){
    luqu.innerHTML+=(s.name+""+s.school+""+s.city+""+s.province+'</br>');
}


function techs(){
    if(techers.style.display=="none"){
        techers.style.display="block";
        setTimeout(function(){techers.style.opacity="1";},0);
        
    }else{
        techers.style.opacity="0";
        setTimeout(function(){techers.style.display='none'},500);
    }
}
function Luqu(){
    if(luqu.style.display=="none"){
        luqu.style.display="block";
        setTimeout(function(){luqu.style.opacity="1";},0);
        
    }else{
        luqu.style.opacity="0";
        setTimeout(function(){luqu.style.display='none'},500);
    }
}