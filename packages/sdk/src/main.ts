import './style.scss';
import core from '../core';
import axios from 'axios';

let n = 0
document.querySelector('#btn1')!.addEventListener('click', () => {
  console.log('--- 样式变更 ---')
  document.body.style.backgroundColor = ['#C1AEFC', '#D1FFF3', '#BEF0CB', '#F6F7C1'][n % 4]
  n++
})
document.querySelector('#rec_start')!.addEventListener('click', () => {
  console.log('--- 开始录制 ---')
  core.start()
})
document.querySelector('#rec_stop')!.addEventListener('click', () => {
  console.log('--- 停止录制 ---')
  core.stop()
})
document.querySelector('#rec_send')!.addEventListener('click', async () => {
  console.log('--- 发送数据 ---')
  const data = core.get()
  axios.post('http://localhost:8081/send/data', { data }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  /* const params = {
    data: data
  }
  const res = fetch('http://localhost:8081/send/data', {
    method: 'post',
    body: JSON.stringify(params),
    mode: 'no-cors',
    // useRaw: true,
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const json = await (await res).json()
  return json.data */
})
