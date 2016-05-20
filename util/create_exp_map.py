with open('data/processed/experience.csv') as f:
	exp = []

	# Skip header
	f.readline()

	for line in f.readlines():
		line = line.strip()
		parts = line.split(',')

		i = int(parts[0])
		e = int(parts[2])

		if len(exp) < i:
			exp.append([])

		exp[i - 1].append(e)

	import json

	print json.dumps(exp, indent=4, sort_keys=True)