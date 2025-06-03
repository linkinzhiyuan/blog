
myCat = {'size': 'fat', 'color': 'gray', 'disposition': 'loud'}
print(myCat.keys()) # dict_keys(['size', 'color', 'disposition'])

list_keys = list(myCat.keys())
print(list_keys) # ['size', 'color', 'disposition']

# for key in myCat.keys():
#   print(key, myCat[key])
#
# for value in myCat.values():
#   print(value)
#
# for key, value in myCat.items():
#   print(key, value)


print(myCat.get('size')) # fat
print(myCat.get('colors','red')) # red，第二个参数不填的情况是None
# print(myCat['colors'])
'''Traceback (most recent call last):
  File "/Users/chenzy/work/learning-py/from-beginner-to-practice-v2/dict.py", line 20, in <module>
    print(myCat['colors']) 
KeyError: 'colors' '''

pop_value = myCat.pop('size')
print(pop_value, myCat) # fat {'color': 'gray', 'disposition': 'loud'}

del myCat['color']
print(myCat) # {'disposition': 'loud'}

del myCat
# print(myCat) # NameError: name 'myCat' is not defined
# practice
user_info = {
  'id': 1,
  'username': 'chenz',
  'pwd': '123456',
  'created_time': '2025-01-01',
  'birthday': None
}

values = []

values.append(user_info['id'])
values.append(user_info['username'])
values.append(user_info['pwd'])
values.append(user_info['created_time'])
values.append(user_info.get('birthday','2025-01-01'))

print(values) # [1, 'chenz', '123456', '2025-01-01', None]

old_dict = { 'name': 'Davie', 'age': 18 }
new_dict = old_dict.copy()
print(old_dict)
print(new_dict) # {'name': 'Davie', 'age': 18}
print(id(new_dict) == id(old_dict)) # False

new_dict['birthday'] = '2023-10-01'
print(new_dict) # {'name': 'Davie', 'age': 18, 'birthday': '2023-10-01'}

popItem = new_dict.popitem()
print(new_dict) # {'name': 'Davie', 'age': 18}
print(popItem)  # ('birthday', '2023-10-01')
print('{} 是 {}'.format(popItem[0], popItem[1]) )  # birthday 是 2023-10-01

print(bool(0))
print(bool(False))
print(bool(()))
print(bool([]))
print(bool({}))
print(bool({'a'}))

# birthdays = {'Alice': 'Apr 1', 'Bob': 'Dec 12', 'Carol': 'Mar 4'}

# while True:
#   print('Enter a name: (blank to quit)')
#   name = input()
#   if name == '':
#       break

#   if name in birthdays:
#     print(birthdays[name] + ' is the birthday of ' + name)
#   else:
#     print('I do not have birthday information for ' + name)
#     print('What is their birthday?')
#     bday = input()
#     birthdays[name] = bday
#     print('Birthday database updated.')


