const fs = require("fs");
const qs = require("qs");
const register = require('../model/register.model.js')
const handles={}

handles.register= async (req,res)=>{
    if(req.method==='GET'){
        let data= await handles.readFileData('./view/addhomestay.html')
        res.writeHead(200);
        res.write(data);
        res.end()
    }else{
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        res.on('end',async ()=>{
            let infoUser = qs.parse(data)
            console.log(infoUser)
            let {name,city,bedrooms,price,bathrooms,description} =infoUser
            await register.create(name,city,bedrooms,price,bathrooms,description)
            let html = await handles.listHomestay()
            res.writeHead(301, {location: '/listhomestay'})
            res.write(html)
        })
    }
}
handles.notfound= async (req,res)=>{
    let data= await handles.readFileData('./view/notfound.html')
    res.writeHead(200);
    res.write(data);
    res.end()
}
handles.listHomestay=async (req,res)=>{
    let data= await handles.readFileData('./view/listhomestay.html')
    res.writeHead(200);
    res.write(data);
    res.end()
}
handles.readFileData = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',(err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

module.exports = handles