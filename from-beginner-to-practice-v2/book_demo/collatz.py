# def collatz(number):
#     """
#     对于偶数，返回number // 2
#     对于奇数，返回3 * number + 1
#     """
#     if number % 2 == 0:
#         result = number // 2
#     else:
#         result = 3 * number + 1
#     print(result)
#     return result
#
#
# def main():
#     try:
#         print('请输入一个整数：')
#         number = int(input())
#
#         while number != 1:
#             number = collatz(number)
#
#     except ValueError:
#         print('错误：请输入一个整数。')

def collatz(number):
    """增强版的Collatz序列函数"""
    steps = 0
    while number != 1:
        print(number, end=' -> ')
        if number % 2 == 0:
            number = number // 2
        else:
            number = 3 * number + 1
        steps += 1
    print(1)
    print(f'总共用了 {steps} 步')
    return steps

def main():
    try:
        num = int(input('请输入一个正整数：'))
        if num < 1:
            print('请输入一个正整数！')
        else:
            collatz(num)
    except ValueError:
        print('请输入有效的整数！')

if __name__ == '__main__':
    main()



