// import rrwebRecord from 'rrweb/lib/record/rrweb-record'
import { eventWithTime, listenerHandler } from '@rrweb/types';
import { record, getRecordConsolePlugin } from 'rrweb';
// console.log(record)
let instanceStop: listenerHandler = null
const events: eventWithTime[] = []
export default {
  start () {
    setTimeout(() => {
      console.log('写network事件')
      record.addCustomEvent('xhr-log', {
        type: 'XMLHttpRequest',
        url: '/api/v1',
        endTime: Date.now(),
      })
    }, 2000);
    instanceStop = record({
      emit(event) {
        // console.log.__rrweb_original__(event)
        events.push(event)
        // if (events.length > 100) {
        //   // 当事件数量大于 100 时停止录制
        //   instanceStop();
        // }
      },
      plugins: [
        // https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/console.zh_CN.md
        getRecordConsolePlugin({
          level: ['info', 'log', 'warn', 'error'],
          lengthThreshold: 10000,
          stringifyOptions: {
            stringLengthLimit: 1000,
            numOfKeysLimit: 100,
            depthOfLimit: 1,
          },
          logger: window.console,
        })
      ],
    })
  },
  get () {
    return events
  },
  stop () {
    instanceStop && instanceStop()
  }
}
