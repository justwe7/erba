import Mock from 'mockjs'

import './user'
import './message-box'

import '@/views/dashboard/workplace/mock'

// eslint-disable-next-line import/no-named-as-default-member
Mock.setup({
  timeout: '600-1000',
})
