import json
import re
counts = {'chuck': 1, 'annie': 42, 'jan': 100}
for key in counts:
    if counts[key] > 10:
        print(key, counts[key])

print()

d = dict()
d['quincy'] = 1
d['beau'] = 5
d['kris'] = 9
print(d.items())
for (k, i) in d.items():
    print(k, i)

print()
print(sorted([(v, k) for k, v in counts.items()], reverse=True), end='\n\n')

s = 'A message from csev@umich.edu to cwen@iupui.edu about meeting @2PM'
lst = re.findall('\\S+@\\S+', s)
print(lst)


print('Home 123456787 \rtest', end='\n\n')

data = '''
  [
    { 
      "id" : "001",
      "x" : "2",
      "name" : "Quincy"
    },
    { 
      "id" : "009",
      "x" : "7",
      "name" : "Mrugesh"
    }
  ]
'''
info = json.loads(data)
print(info[1]['name'], end='\n\n')


# class PartyAnimal:
#     x = 0

#     def party(self):
#         self.x = self.x + 2
#         print(self.x)


# an = PartyAnimal()
# an.party()
# an.party()
# print()


class PartyAnimal:
    x = 0
    name = ''

    def __init__(self, nam):
        self.name = nam
        print(self.name, 'constructed')

    def party(self):
        self.x = self.x + 1
        print(self.name, 'party count', self.x)


q = PartyAnimal('Quincy')
m = PartyAnimal('Miya')

q.party()
m.party()
q.party()
