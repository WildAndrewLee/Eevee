def normalize(str):
	return str[0].upper() + str[1:]

with open('data/processed/pokemon.csv') as f:
	pokemon = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		i = int(parts[0])
		n = parts[1]

		pokemon.append(normalize(n))

	import json

	print json.dumps(pokemon, indent=4, sort_keys=True)