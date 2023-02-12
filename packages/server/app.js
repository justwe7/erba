const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json({ limit: '20mb' }))
app.use(express.static('static'))

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
  res.header('Access-Control-Allow-Credentials', false); //允许携带cookies
  next();
});

app.get('/', function (req, res) {
   res.send('api server');
})

app.post('/send/data', function (req, res) {
  res.json({ code: 0, msg: 'success' })
  recordData(req.body.data)
  res.end()
})

function recordData (data) {
  console.log('接收数据')
  data = JSON.stringify(data)
  const writerStream = fs.createWriteStream('./logs/data.json');
  writerStream.write(data, 'UTF8');
  writerStream.end();
}

app.get('/get/detail', function (req, res) {
  const data = fs.readFileSync('./logs/data.json')
  res.json({
    code: 0,
    msg: 'success',
    data: JSON.parse(data)
  })
  res.end()
})

const server = app.listen(8081, function () {

  const host = server.address().address
  const port = server.address().port

  console.log("服务端访问地址为 http://localhost:%s", port)
})
