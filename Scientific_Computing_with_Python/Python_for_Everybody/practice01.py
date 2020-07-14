x = 6
print(x)

x = 43
x = x + 1
print(x)

width = 15
height = 12
print(height / 3)

x = 0
y = 10

if x == 0:
    if y == 10:
        print('YES')

temp = "5"
cel = 0
fahr = float(temp)
cel = (fahr - 32.0) * 5.0 / 9.0
print(cel, end='\n')


def fred():
    print("Zap")


def jane():
    print("ABC")


jane()
fred()
jane()

n = 0
while True:
    if n == 3:
        break
    print(n)
    n = n + 1

print()

for i in [2, 1, 5]:
    print(i)

print()

smallest = None
print("Before:", smallest)
for itervar in [3, 41, 12, 9, 74, 15]:
    if smallest is None or itervar < smallest:
        smallest = itervar
        # break
        continue
    print("Loop:", itervar, smallest)
print("Smallest:", smallest, end='\n\n')

# is keyword check object
print(0 is 0.0, 0 is not 0.0, end='\n\n')

for n in "banana":
    print(n)

print()

word = "bananana"
i = word.find("na")
print(i, end='\n\n')

fruit = "banana"
x = fruit[1]
print(x, end='\n\n')

words = 'His e-mail is q-lar@freecodecamp.org'
pieces = words.split()
print(pieces)
parts = pieces[3].split('-')
print(parts)
n = parts[1]
print(n, end='\n\n')

dict = {"Fri": 20, "Thu": 6, "Sat": 1}
dict["Thu"] = 13
dict["Sat"] = 2
dict["Sun"] = 9
print(dict, end='\n\n')

counts = {'quincy': 1, 'mrugesh': 42, 'beau': 100, '0': 10}
print(counts.get('kris', 0))
