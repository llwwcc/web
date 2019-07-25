const t1 =Buffer.from('z')
console.log(t1)
const t2 =Buffer.from('你好')
console.log('000000',t2)

const buf1 =Buffer.alloc(2);
buf1[0]=0xAB;
buf1[1]=0XBA;
console.log(buf1)

const buf2 =Buffer.alloc(6); //e4 bd a0 e5 a5 bd
buf2[0]=0xe4;
buf2[1]=0xbd;
buf2[2]=0xa0;
buf2[3]=0xe5;
buf2[4]=0xa5;
buf2[5]=0xbd;
console.log(buf2.toString())