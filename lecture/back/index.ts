import * as express from 'express'; //express는 export default가 없어서 * as 반드시 써줘야됨
import {Request, Response, NextFunction} from 'express';
const app : express.Application = express();
const prod : boolean = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3065)
app.get('/', (req : Request, res : Response, next: NextFunction) => {   //타입 생략 가능 정확한 위치
    res.send('백엔드 정상 동작 확인');
});

app.listen(app.get('port'), () => {
    console.log(`server is running ${app.get('port')}`);
});

//변경해주고 자바스크립트로바꿔준다.
//npm i -D tsnode 개발용에서 타입스크립트를 실행
//npx ts-node index.ts
//npx tsc -> 타입스크립트 파일을 자바스크립트로 바꿔준다.
//tsc --traceResolution -> js로 컴파일할때 어떻게 찾아오는지 보여준다.
//바벨노드?
//