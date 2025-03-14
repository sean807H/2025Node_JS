const letter = ['a','b','c','d'];

for(let i=0; i<letter.length; i++){
    console.log(letter[i]);
}

letter.forEach(L => console.log(L))

for(const l of letter){
    console.log(l);
}