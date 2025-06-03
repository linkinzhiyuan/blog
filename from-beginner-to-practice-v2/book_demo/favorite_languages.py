# 创建一个记录调查结果的字典
favorite_languages = {
    'jen': 'python',
    'sarah': 'c',
    'edward': 'ruby',
    'phil': 'python',
}

# 创建一个应该参与调查的人员名单
should_take_poll = ['jen', 'sarah', 'michael', 'phil', 'thomas']

# 遍历应该参与调查的人员名单
for person in should_take_poll:
    if person in favorite_languages.keys():
        # 如果此人已经参与调查
        print(f"感谢 {person.title()} 参与调查！")
    else:
        # 如果此人尚未参与调查
        print(f"{person.title()},请参与调查！")
