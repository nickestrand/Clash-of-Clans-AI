import board
import buildings
import random


def generate_random_base(quants, levels):
    buildings = []
    for i in range(1, len(quants)):
        for j in range(quants[i]):
            while True:
                x, y = tuple(random.sample(range(0, 12), 2))
                curr_obj = board.get_obj_from_index(i)(pos=(x, y), level=levels[i])
                if not any([curr_obj.overlap(other) for other in buildings]):
                    break
            buildings.append(curr_obj)
    return buildings


def generate_random_base_3():
    QUANTS = [0, 2, 1, 1, 50, 1]
    LEVELS = [0, 3, 2, 3, 3, 1]
    return generate_random_base(QUANTS, LEVELS)


def main():
    gb = board.GameBoard(generate_random_base_3())
    gb.update_viz()


if __name__ == "__main__":
    main()