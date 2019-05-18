from pyeasyga import pyeasyga
from GameGenetics import *

print("imported")

seed_data = GameGenetics()

# initialise the GA
ga = pyeasyga.GeneticAlgorithm(seed_data,
                               population_size=200,
                               generations=100,
                               mutation_probability=0.2,
                               elitism=True,
                               maximise_fitness=True)

print("initialized")

# define and set function to create a candidate solution representation
def create_individual(data):
    return data.create_individual()


ga.create_individual = create_individual

print("created individual")

# define and set the GA's crossover operation
def crossover(parent_1, parent_2):
    fit1 = parent_1.fitness()
    fit2 = parent_2.fitness()
    prob = fit1 / (fit1 + fit2)
    if random() < prob:
        return parent_1
    return parent_2


ga.crossover_function = crossover

print("crossed over")

# define and set the GA's mutation operation
def mutate(individual):
    individual.mutate()


ga.mutate_function = mutate

print("mutated")

# define and set the GA's selection operation
def selection(population):
    r = random()
    fitness_list = [element.fitness() for element in population]
    sum_of_fitness = sum(fitness_list)
    probs = [fit / sum_of_fitness for fit in fitness_list]
    i = 0
    while r > 0:
        r -= probs[i]
    return population[i]


ga.selection_function = selection

print("selected")

# define a fitness function
def fitness(individual,data):
    individual.fitness()


ga.fitness_function = fitness  # set the GA's fitness function

print("finessed")

ga.run()  # run the GA

print("run")

GameBoard(ga.best_individual().get_board()).update_viz()

print("printed")