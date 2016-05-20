with open('data/processed/gender.csv') as f:
	pokemon = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		r = int(parts[1])

		pokemon.append(r)

	import json

	print json.dumps(pokemon, indent=4, sort_keys=True)