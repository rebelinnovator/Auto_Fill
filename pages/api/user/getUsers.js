import executeQuery from "../../../lib/ProductionDB";
import bcrypt from 'bcrypt';

export default async function handler(req,res){
    try{
     //   console.log(bcrypt)
        const {pgsize,pg} = req.query;
        
        console.log(pgsize)
        console.log(pg)

        const result = await executeQuery({
            query:`SELECT * FROM users LIMIT ${pgsize} OFFSET ${(pg)*pgsize}`
        })
        
        const countresult = await executeQuery({
            query:`SELECT COUNT(*) FROM users`
        })
        console.log(countresult)
        console.log(countresult[0]['COUNT(*)'])
        let tpgcnt = Math.ceil(countresult[0]['COUNT(*)'] / pgsize)
        res.status(200).json({ users:result,count:tpgcnt})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}