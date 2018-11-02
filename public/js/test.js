import Blockchain from './blockchain';
const bitcoin = new Blockchain();



  let a = 0 , b= 0;
  for(; a < 20; a++){
    bitcoin.createNewBlock(b+a,`a${a+2}b${a+1}`,`a${b+1}b${a+2}`);
  }
bitcoin.createNewTransaction(100,'멍청이', 'ㅁㄴㅇㅁㄴㅇ')


console.log(bitcoin.chain[1])