import { isValid} from './_20_valid-parentheses'

describe('是否符合',()=>{
  it('正常情况', () => {
    const str = '({[]})'
    const res = isValid(str)
    expect(res).toBe(true)
  })
  it('错误情况', () => {
    const str = '(1{b[cc[c]v]b})'
    const res = isValid(str)
    expect(res).toBe(false)
  })
})