with open('data/processed/pokemon_types.csv') as f:
	pokemon = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		p = int(parts[0])
		t = int(parts[1])

		if len(pokemon) < p:
			pokemon.append([])

		pokemon[p - 1].append(t)

	import json

	print json.dumps(pokemon, indent=4, sort_keys=True)